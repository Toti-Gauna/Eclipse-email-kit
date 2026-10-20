import fs from 'node:fs/promises';import {load} from '../src/load.mjs';import {readiness} from '../src/offers.mjs';import {render} from '../src/email/templates/eclipse.mjs';import {trailerReady} from '../src/email/components/content.mjs';
const report=[];
for(const id of ['volta','tableflow','dentalos'])for(const version of (id==='volta'?['original','improved']:['original'])){
 const c=await load(id,`${id}-example`,undefined,undefined,version);
 for(const format of ['full','short']){
  const html=render(c,format),errors=readiness(c,format);
  if(Buffer.byteLength(html)>=96000)throw Error('Tamaño excedido');
  if(/<(script|iframe|video|form)\b|var\(--|display:\s*(grid|flex)/i.test(html))throw Error('Contaminación de galería');
  for(const s of c.product.screens)await fs.access('assets/'+s.file);
  c.mode='send';const send=render(c,format);
  if(c.offer.type==='campaign'){
   if(!send.includes('Conocé Volta en acción.'))throw Error('Tráiler de campaña eliminado');
   if(!trailerReady(c)&&format==='full'&&!errors.some(e=>e.includes('Tráiler obligatorio')))throw Error('Tráiler obligatorio sin gate');
  }else if(!trailerReady(c)&&send.includes('Trailer pendiente'))throw Error('Tráiler opcional incompleto no omitido');
  c.mode='preview';report.push({product:id,version,format,bytes:Buffer.byteLength(html),checks:'schema, assets, estructura, política de tráiler por oferta, tamaño',sendReady:!errors.length,blockers:errors});
 }
}
await fs.writeFile('docs/qa/validation.json',JSON.stringify(report,null,2)+'\n');console.log(`${report.length} variantes validadas; bloqueos documentados.`);
