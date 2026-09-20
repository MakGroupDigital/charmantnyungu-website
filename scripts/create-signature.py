"""Outline the OFL-licensed Allura signature; requires fontTools."""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
import json
root=Path(__file__).resolve().parent.parent
font=TTFont(root/'assets/brand/Allura-Regular.ttf')
glyphs=font.getGlyphSet(); cmap=font.getBestCmap()
def outline(text):
    paths=[];x=0;bounds=[];previous=None
    kern={}
    if 'kern' in font:
        for table in font['kern'].kernTables: kern.update(table.kernTable)
    for c in text:
        name=cmap[ord(c)]
        x+=kern.get((previous,name),0)
        pen=SVGPathPen(glyphs);glyphs[name].draw(TransformPen(pen,(1,0,0,-1,x,0)))
        paths.append(pen.getCommands())
        bp=BoundsPen(glyphs);glyphs[name].draw(TransformPen(bp,(1,0,0,-1,x,0)))
        if bp.bounds:bounds.append(bp.bounds)
        x+=font['hmtx'][name][0];previous=name
    box=[min(b[0] for b in bounds), min(b[1] for b in bounds),max(b[2] for b in bounds),max(b[3] for b in bounds)]
    return {'path':' '.join(paths),'bounds':box}
(root/'assets/brand/signature-paths.json').write_text(json.dumps({'name':outline('Charmant Nyungu K.'),'initial':outline('C')})+'\n')
