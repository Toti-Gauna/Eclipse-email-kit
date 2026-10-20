// Static poster for the trailer slot while the real trailer (kinetic-studio) is not ready:
// the product's first demo screen, dimmed, with the play mark of the web. Preview only:
// send output omits the trailer until trailerUrl and posterUrl are verified.
import sharp from 'sharp';
const W=1088,H=612;
const overlay=Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs><radialGradient id="v" cx="50%" cy="50%" r="75%"><stop offset="30%" stop-color="#05050a" stop-opacity="0.1"/><stop offset="100%" stop-color="#05050a" stop-opacity="0.92"/></radialGradient><radialGradient id="glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#f5b942" stop-opacity="0.45"/><stop offset="100%" stop-color="#f5b942" stop-opacity="0"/></radialGradient></defs><rect width="100%" height="100%" fill="url(#v)"/><circle cx="${W/2}" cy="${H/2}" r="150" fill="url(#glow)"/><circle cx="${W/2}" cy="${H/2}" r="74" fill="none" stroke="#ffe8b0" stroke-opacity="0.35" stroke-width="1.5"/><circle cx="${W/2}" cy="${H/2}" r="58" fill="#f5b942"/><path d="M ${W/2-17} ${H/2-25} L ${W/2+27} ${H/2} L ${W/2-17} ${H/2+25} Z" fill="#05050a"/></svg>`);
for(const file of ['volta-cliente-inicio.jpg','tableflow-cliente-inicio.jpg','tableflow-cafe-cliente-inicio.jpg','dentalos-cliente-inicio.jpg']){
 const base=await sharp(`assets/${file}`).extract({left:0,top:0,width:1120,height:630}).resize(W,H).modulate({brightness:0.3,saturation:0.6}).toBuffer();
 await sharp(base).composite([{input:overlay}]).jpeg({quality:80,mozjpeg:true}).toFile(`assets/poster-${file}`);
}
console.log('4 pósters en assets/');
