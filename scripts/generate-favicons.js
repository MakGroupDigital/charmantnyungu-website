const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

// SVG du favicon principal
const faviconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#F59E0B;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#D97706;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#B45309;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="20" fill="#0F172A"/>
  <rect x="3" y="3" width="94" height="94" rx="17" fill="none" stroke="url(#goldGradient)" stroke-width="3"/>
  <text x="8" y="70" font-family="Georgia, serif" font-size="45" font-weight="bold" font-style="italic" fill="#F59E0B">C</text>
  <text x="38" y="70" font-family="Georgia, serif" font-size="45" font-weight="bold" fill="#FFFFFF">N</text>
  <text x="68" y="70" font-family="Georgia, serif" font-size="45" font-weight="bold" fill="#FFFFFF">K</text>
</svg>`;

// SVG de l'image OG (Open Graph)
const ogImageSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0F172A;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#1E293B;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#334155;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#F59E0B;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#D97706;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#B45309;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <rect width="1200" height="630" fill="url(#bgGradient)"/>
  
  <circle cx="100" cy="100" r="200" fill="#F59E0B" opacity="0.05"/>
  <circle cx="1100" cy="530" r="250" fill="#F59E0B" opacity="0.05"/>
  
  <rect x="80" y="180" width="8" height="280" fill="url(#goldGrad)" rx="4"/>
  
  <text x="120" y="260" font-family="Georgia, serif" font-size="80" font-weight="bold">
    <tspan font-style="italic" fill="#F59E0B">Charmant</tspan>
    <tspan fill="#FFFFFF"> Nyungu K.</tspan>
  </text>
  
  <text x="120" y="340" font-family="Arial, sans-serif" font-size="28" fill="#94A3B8" letter-spacing="6">
    CONSULTANT • INNOVATEUR • PANAFRICANISTE
  </text>
  
  <text x="120" y="410" font-family="Arial, sans-serif" font-size="24" fill="#CBD5E1">
    Expert en transformation digitale, data science et cybersécurité
  </text>
  
  <text x="120" y="540" font-family="Arial, sans-serif" font-size="32" fill="#F59E0B" font-weight="bold">
    charmantnyungu.com
  </text>
  
  <g transform="translate(920, 180)">
    <circle cx="110" cy="110" r="105" fill="#1E293B" stroke="url(#goldGrad)" stroke-width="5"/>
    <text x="25" y="140" font-family="Georgia, serif" font-size="80" font-weight="bold" font-style="italic" fill="#F59E0B">C</text>
    <text x="80" y="140" font-family="Georgia, serif" font-size="80" font-weight="bold" fill="#FFFFFF">N</text>
    <text x="140" y="140" font-family="Georgia, serif" font-size="80" font-weight="bold" fill="#FFFFFF">K</text>
  </g>
</svg>`;

async function generateFavicons() {
  console.log('🎨 Génération des favicons pour charmantnyungu.com...\n');

  const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 },
    { name: 'mstile-70x70.png', size: 70 },
    { name: 'mstile-144x144.png', size: 144 },
    { name: 'mstile-150x150.png', size: 150 },
    { name: 'mstile-310x310.png', size: 310 },
  ];

  // Générer les favicons carrés
  for (const { name, size } of sizes) {
    try {
      await sharp(Buffer.from(faviconSVG))
        .resize(size, size)
        .png()
        .toFile(path.join(publicDir, name));
      console.log(`✅ ${name} (${size}x${size})`);
    } catch (err) {
      console.error(`❌ Erreur pour ${name}:`, err.message);
    }
  }

  // Générer mstile-310x150 (format wide)
  try {
    await sharp(Buffer.from(faviconSVG))
      .resize(150, 150)
      .extend({
        top: 0,
        bottom: 0,
        left: 80,
        right: 80,
        background: { r: 15, g: 23, b: 42, alpha: 1 }
      })
      .png()
      .toFile(path.join(publicDir, 'mstile-310x150.png'));
    console.log('✅ mstile-310x150.png (310x150)');
  } catch (err) {
    console.error('❌ Erreur pour mstile-310x150.png:', err.message);
  }

  // Générer l'image OG
  try {
    await sharp(Buffer.from(ogImageSVG))
      .resize(1200, 630)
      .png()
      .toFile(path.join(publicDir, 'og-image.png'));
    console.log('✅ og-image.png (1200x630)');
  } catch (err) {
    console.error('❌ Erreur pour og-image.png:', err.message);
  }

  // Générer le favicon.ico (multi-résolution)
  try {
    // Pour le .ico, on utilise le PNG 32x32
    await sharp(Buffer.from(faviconSVG))
      .resize(32, 32)
      .png()
      .toFile(path.join(publicDir, 'favicon.ico'));
    console.log('✅ favicon.ico (32x32)');
  } catch (err) {
    console.error('❌ Erreur pour favicon.ico:', err.message);
  }

  console.log('\n🎉 Génération terminée!');
  console.log('📁 Fichiers créés dans:', publicDir);
}

generateFavicons().catch(console.error);

