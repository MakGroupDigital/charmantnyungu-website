import sharp from 'sharp';
import { readFile, writeFile, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const publicDir = fileURLToPath(new URL('../public/', import.meta.url));
const ink = '#183d35';
const paper = '#f5f4ee';
// Outlined handwriting: consistent on every device, without a font request.
const outlines=JSON.parse(await readFile(new URL('../assets/brand/signature-paths.json',import.meta.url),'utf8'));
function signature(kind,x,y,width,color) {
  const {path,bounds:[left,top,right,bottom]}=outlines[kind];
  const scale=width/(right-left);
  return `<g transform="translate(${x} ${y}) scale(${scale}) translate(${-left} ${-top})" fill="${color}"><path d="${path}"/></g>`;
}
const signatureHeight=1000*(outlines.name.bounds[3]-outlines.name.bounds[1])/(outlines.name.bounds[2]-outlines.name.bounds[0]);
function wordmark(color) {return `<svg xmlns="http://www.w3.org/2000/svg" width="1060" height="${signatureHeight+50}" viewBox="0 0 1060 ${signatureHeight+50}" role="img" aria-labelledby="title"><title id="title">Charmant Nyungu K. — Signature manuscrite</title>${signature('name',30,25,1000,color)}</svg>`;}
const logo=wordmark(ink);
await writeFile(publicDir+'cnk-logo.svg',logo);
await writeFile(publicDir+'cnk-signature.svg',logo);
await writeFile(publicDir+'cnk-signature-ivory.svg',wordmark(paper));
const mark=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" role="img" aria-labelledby="title"><title id="title">C — Signature de Charmant Nyungu K.</title><rect width="256" height="256" fill="${ink}"/>${signature('initial',52,40,152,paper)}</svg>`;
await writeFile(publicDir+'cnk-mark.svg',mark);
for(const name of ['favicon.svg','favicon-16x16.svg','favicon-32x32.svg','apple-touch-icon.svg']) await writeFile(publicDir+name,mark);

for (const [name,size] of [['favicon-16x16.png',16],['favicon-32x32.png',32],['apple-touch-icon.png',180],['android-chrome-192x192.png',192],['android-chrome-512x512.png',512],['favicon-70.png',70],['favicon-150.png',150],['favicon-310.png',310],['cnk-mark.png',512]]) {
  await sharp(Buffer.from(mark)).resize(size,size).png().toFile(publicDir+name);
}
await sharp(Buffer.from(mark)).resize(150,150).extend({left:80,right:80,top:0,bottom:0,background:ink}).png().toFile(publicDir+'favicon-wide.png');
await sharp(Buffer.from(mark)).resize(1024).jpeg({quality:95}).toFile(publicDir+'cnk-mark.jpg');
await sharp(Buffer.from(logo)).png().toFile(publicDir+'cnk-logo.png');
await sharp(Buffer.from(logo)).flatten({background:paper}).jpeg({quality:95}).toFile(publicDir+'cnk-logo.jpg');

// A real ICO container with PNG-encoded 16, 32 and 48 pixel entries.
const sizes=[16,32,48];
const icons=await Promise.all(sizes.map(size=>sharp(Buffer.from(mark)).resize(size,size).png().toBuffer()));
const header=Buffer.alloc(6+16*icons.length);header.writeUInt16LE(1,2);header.writeUInt16LE(icons.length,4);
let offset=header.length;
icons.forEach((icon,i)=>{const pos=6+i*16;header[pos]=sizes[i];header[pos+1]=sizes[i];header.writeUInt16LE(1,pos+4);header.writeUInt16LE(32,pos+6);header.writeUInt32LE(icon.length,pos+8);header.writeUInt32LE(offset,pos+12);offset+=icon.length;});
await writeFile(publicDir+'favicon.ico',Buffer.concat([header,...icons]));

const card=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-labelledby="title"><title id="title">Signature de Charmant Nyungu K. — Consultant en technologie et panafricaniste</title>
<rect width="1200" height="630" fill="${paper}"/>
<text x="72" y="76" font-family="Helvetica,Arial,sans-serif" font-size="12" letter-spacing="3" fill="#67716a">UNE VISION AFRICAINE. UNE AMBITION MONDIALE.</text>
<path d="M72 108H1128" stroke="#d7dad1"/>
${signature('name',85,183,1030,ink)}
<text x="600" y="417" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="21" fill="${ink}">Consultant en technologie et panafricaniste</text>
<text x="600" y="458" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="12" letter-spacing="3" fill="#67716a">INNOVATION &amp; SOUVERAINETÉ NUMÉRIQUE</text>
<rect y="528" width="1200" height="102" fill="${ink}"/>
<text x="72" y="586" font-family="Helvetica,Arial,sans-serif" font-size="17" fill="${paper}">charmantnyungu.com</text>
<text x="1128" y="586" text-anchor="end" font-family="Helvetica,Arial,sans-serif" font-size="12" letter-spacing="2" fill="${paper}">KINSHASA / DAKAR</text>
</svg>`;
await writeFile(publicDir+'og-image.svg',card);
await sharp(Buffer.from(card)).png().toFile(publicDir+'og-cnk-signature-v3.png');
await copyFile(publicDir+'og-cnk-signature-v3.png',publicDir+'og-image.png');
console.log('Logo vectoriel, carte de partage 1200 × 630 et icônes générés.');
