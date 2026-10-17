// Brand glyphs as PNG (email clients don't render SVG): the <PhaseGlyph> of the web at
// seven phases for the section marks, and the <MiniEclipse> logo at totality (dark
// sections) and at dawn (light sections). Same geometry as Eclipse-Web/components.
import sharp from 'sharp';
const colors={dark:'#f5b942',light:'#8a5a00'};
function phaseGlyph(phase,color){
 const c=12,r=8,d=(1-phase)*2*r,total=phase>0.985,f=n=>n.toFixed(3);let lit='';
 if(d>=2*r-0.01)lit=`M ${c-r} ${c} a ${r} ${r} 0 1 0 ${2*r} 0 a ${r} ${r} 0 1 0 ${-2*r} 0 Z`;
 else if(!total){const x=c+d/2,h=Math.sqrt(r*r-(d/2)**2);lit=`M ${f(x)} ${f(c-h)} A ${r} ${r} 0 1 0 ${f(x)} ${f(c+h)} A ${r} ${r} 0 0 1 ${f(x)} ${f(c-h)} Z`}
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="72" height="72"><circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="${color}" stroke-opacity="0.3" stroke-width="1"/>${lit?`<path d="${lit}" fill="${color}"/>`:''}${total?`<circle cx="${c}" cy="${c}" r="${r+2}" fill="none" stroke="${color}" stroke-opacity="0.55" stroke-width="1"/><circle cx="${f(c+(r+1)*0.7071)}" cy="${f(c-(r+1)*0.7071)}" r="1.6" fill="${color}"/>`:''}</svg>`;
}
function mark(p,limb){
 const o=n=>Math.max(0,n).toFixed(3);
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="72" height="72"><defs><radialGradient id="glow" cx="50%" cy="50%" r="50%"><stop offset="40%" stop-color="#FFE8B0" stop-opacity="0.85"/><stop offset="62%" stop-color="#F5B942" stop-opacity="0.4"/><stop offset="100%" stop-color="#F5B942" stop-opacity="0"/></radialGradient><radialGradient id="sun" cx="45%" cy="42%" r="60%"><stop offset="0%" stop-color="#FFFAF0"/><stop offset="60%" stop-color="#FFE8B0"/><stop offset="100%" stop-color="#F5B942"/></radialGradient><mask id="moon" maskUnits="userSpaceOnUse" x="-8" y="-8" width="40" height="40"><rect x="-8" y="-8" width="40" height="40" fill="#fff"/><circle cx="12" cy="12" r="6.75" fill="#000" transform="translate(${(p*-12.6).toFixed(2)} ${(p*6.4).toFixed(2)})"/></mask></defs><circle cx="12" cy="12" r="12" fill="url(#glow)" opacity="${o(0.12+p*0.88)}"/><circle cx="12" cy="12" r="6.5" fill="none" stroke="${limb}" stroke-opacity="0.28" stroke-width="0.75"/><circle cx="12" cy="12" r="6.5" fill="url(#sun)" mask="url(#moon)"/><circle cx="12" cy="12" r="8.6" fill="none" stroke="#F5B942" stroke-width="0.9" opacity="${o(1-p*3.2)}"/><g opacity="${o(1-p*7)}"><circle cx="16.95" cy="7.05" r="1.35" fill="#FFF8E6"/><path d="M16.95 3.6v6.9M13.5 7.05h6.9" stroke="#FFF8E6" stroke-width="0.5" stroke-linecap="round" opacity="0.85"/></g></svg>`;
}
const png=(svg,file)=>sharp(Buffer.from(svg)).png({compressionLevel:9,palette:false}).toFile(`assets/${file}`);
for(let k=0;k<=6;k++)for(const [theme,color] of Object.entries(colors))await png(phaseGlyph(k/6,color),`glyph-${k}-${theme}.png`);
await png(mark(0,'#f4efe6'),'mark-dark.png');await png(mark(1,'#111114'),'mark-light.png');
console.log('16 glifos en assets/');
