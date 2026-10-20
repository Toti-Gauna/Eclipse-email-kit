import {NAME_SLOT} from '../previews/personalize.js';
import fs from 'node:fs/promises';import path from 'node:path';import {fileURLToPath} from 'node:url';import {plainText} from '../src/plain.mjs';import {load} from '../src/load.mjs';import {readiness} from '../src/offers.mjs';import {render} from '../src/email/templates/eclipse.mjs';import {safeHttps,safeMailto} from '../src/schema.mjs';import {conditions} from '../src/conditions.mjs';import {giftsPage} from '../src/gifts-page.mjs';import {trailerPage} from '../src/trailer-page.mjs';
process.chdir(path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'));
const args=process.argv.slice(2),arg=k=>{const i=args.indexOf('--'+k);return i<0?undefined:args[i+1]},mode=arg('mode')||'preview';
if(!['preview','send'].includes(mode))throw Error('Modo inválido');
const products=arg('product')?[arg('product')]:['volta','tableflow','dentalos'];const formats=arg('format')?[arg('format')]:['full','short'];if(formats.some(x=>!['full','short'].includes(x)))throw Error('Formato inválido');
const manifest=[];const conditionPages=new Set();
if(arg('version')&&!['original','improved'].includes(arg('version')))throw Error('Versión inválida');
for(const product of products)for(const version of (arg('version')?[arg('version')]:product==='volta'&&!arg('product')?['improved','original']:['improved'])){const c=await load(product,arg('prospect')||`${product}-example`,arg('offer'),arg('vertical'),version);c.mode=mode;const suffix=(arg('vertical')?'-'+arg('vertical'):'')+(arg('offer')?'-'+arg('offer'):'')+(product==='volta'&&c.version==='original'?'-original':'');c.previewFullFile=`${product}-${c.prospect.id}-full${suffix}.html`;
 for(const format of formats){const errors=readiness(c,format);if(mode==='send'&&errors.length)throw Error(`Exportación bloqueada (${product}/${format}):\n- ${errors.join('\n- ')}`);
  const html=render(c,format);if(Buffer.byteLength(html)>96000)throw Error('HTML supera 96 kB (Gmail recorta a 102 kB)');
  if(/<(script|iframe|video|form)\b|var\(--|display:\s*(grid|flex)/i.test(html))throw Error('Contenido incompatible en email');
  if(mode==='send'){
   if(/pendiente|placeholder|BORRADOR|ejemplo ficticio|\{\{|\}\}/i.test(html))throw Error('Placeholder visible');
   for(const m of html.matchAll(/(?:href|src)="([^"]+)"|url\('([^']+)'\)/g)){const u=(m[1]||m[2]).replaceAll('&amp;','&');if(!safeHttps(u)&&!safeMailto(u))throw Error('Recurso no HTTPS: '+u)}
   await verifyResources(html);
  }
  const stem=`${product}-${c.prospect.id}-${format}${suffix}`,dir=`dist/emails/${mode==='send'?'ready':'drafts'}`;await fs.mkdir(dir,{recursive:true});
  const plain=plainText(html,c.product);
  await fs.writeFile(`${dir}/${stem}.html`,html+'\n');await fs.writeFile(`${dir}/${stem}.txt`,plain+'\n');await fs.writeFile(`${dir}/${stem}.json`,JSON.stringify({subject:c.product.subject,preheader:c.product.preheader,status:mode==='send'?'ready':'draft',errors,bytes:Buffer.byteLength(html),priceVersion:c.prices.version,offerId:c.offer.id,version:c.version,currency:c.prices.currency,calculation:c.calc,conditionsFile:c.conditionsFile},null,2)+'\n');
  let preview;
  // Only the built-in fictional examples become gallery payloads. Private prospects stay local exports.
  if(mode==='preview'&&c.prospect.fictional&&c.prospect.id===`${product}-example`){
   const slot=structuredClone(c);slot.prospect.businessName=NAME_SLOT;
   if(slot.offer.type==='campaign')slot.product.subject=`${NAME_SLOT}: una idea para potenciar tu tienda de suplementos`;
   const template=render(slot,format)+'\n';
   const payload={html:template.split(NAME_SLOT),text:(plainText(template,slot.product)+'\n').split(NAME_SLOT),subject:slot.product.subject.split(NAME_SLOT),preheader:slot.product.preheader.split(NAME_SLOT)};
   preview=`../${dir}/${stem}.preview.json`;await fs.writeFile(`${dir}/${stem}.preview.json`,JSON.stringify(payload)+'\n');
  }
  manifest.push({id:product,version:c.version,offerId:c.offer.id,currency:c.prices.currency,businessName:c.prospect.businessName,conditions:`${c.conditionsFile}`,preview,label:c.product.label,format,subject:c.product.subject,preheader:c.product.preheader,html:`../${dir}/${stem}.html`,text:`../${dir}/${stem}.txt`,bytes:Buffer.byteLength(html),status:mode==='send'?'ready':'draft',errors});console.log(`${dir}/${stem}.html · ${Buffer.byteLength(html)} bytes · ${mode==='send'?'VALIDADO':'BORRADOR'}`);
 }
 if(!conditionPages.has(c.conditionsFile)){await fs.writeFile(`previews/${c.conditionsFile}`,conditions(c));conditionPages.add(c.conditionsFile)}
 if(c.product.gifts.length&&c.version!=='original')await fs.writeFile(`previews/regalos-${product}.html`,giftsPage(c));
 if(c.product.trailer.file)await fs.writeFile(`previews/trailer-${product}.html`,trailerPage(c));
}
if(!arg('product')&&mode==='preview')await fs.writeFile('previews/manifest.json',JSON.stringify(manifest,null,2)+'\n');
async function verifyResources(html){
 const urls=[...new Set([...html.matchAll(/(?:href|src)="([^"]+)"|url\('([^']+)'\)/g)].map(m=>(m[1]||m[2]).replaceAll('&amp;','&')).filter(u=>u.startsWith('https:')))];
 // Native fetch uses the environment proxy with NODE_USE_ENV_PROXY=1 (Node >=24).
 for(const url of urls){const r=await fetch(url,{method:'GET',signal:AbortSignal.timeout(15000)});if(!r.ok)throw Error(`Recurso inaccesible ${r.status}: ${url}`);if(!safeHttps(r.url))throw Error('Redirección no HTTPS');const isImage=/\.(png|jpg|jpeg|webp)(\?|$)/i.test(new URL(url).pathname);if(isImage&&!r.headers.get('content-type')?.startsWith('image/'))throw Error('Imagen inválida: '+url);await r.body?.cancel();}
}
