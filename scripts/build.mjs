import fs from 'node:fs/promises';import path from 'node:path';import {fileURLToPath} from 'node:url';import {plainText} from '../src/plain.mjs';import {load} from '../src/load.mjs';import {readiness} from '../src/offers.mjs';import {render} from '../src/email/templates/eclipse.mjs';import {safeHttps} from '../src/schema.mjs';import {conditions} from '../src/conditions.mjs';
process.chdir(path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'));
const args=process.argv.slice(2),arg=k=>{const i=args.indexOf('--'+k);return i<0?undefined:args[i+1]},mode=arg('mode')||'preview';
if(!['preview','send'].includes(mode))throw Error('Modo inválido');
const products=arg('product')?[arg('product')]:['volta','tableflow','dentalos'];const formats=arg('format')?[arg('format')]:['full','short'];if(formats.some(x=>!['full','short'].includes(x)))throw Error('Formato inválido');
const manifest=[];
for(const product of products){const c=await load(product,arg('prospect')||`${product}-example`,arg('offer'),arg('vertical'));c.mode=mode;const suffix=(arg('vertical')?'-'+arg('vertical'):'')+(arg('offer')?'-'+arg('offer'):'');c.previewFullFile=`${product}-${c.prospect.id}-full${suffix}.html`;
 for(const format of formats){const errors=readiness(c,format);if(mode==='send'&&errors.length)throw Error(`Exportación bloqueada (${product}/${format}):\n- ${errors.join('\n- ')}`);
  const html=render(c,format);if(Buffer.byteLength(html)>90000)throw Error('HTML supera 90 kB');
  if(/<(script|iframe|video|form)\b|var\(--|display:\s*(grid|flex)/i.test(html))throw Error('Contenido incompatible en email');
  if(mode==='send'){
   if(/pendiente|placeholder|BORRADOR|ejemplo ficticio/i.test(html))throw Error('Placeholder visible');
   for(const m of html.matchAll(/(?:href|src)="([^"]+)"|url\('([^']+)'\)/g)){const u=(m[1]||m[2]).replaceAll('&amp;','&');if(!safeHttps(u)&&!/^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/.test(u))throw Error('Recurso no HTTPS: '+u)}
   await verifyResources(html);
  }
  const stem=`${product}-${c.prospect.id}-${format}${suffix}`,dir=`dist/emails/${mode==='send'?'ready':'drafts'}`;await fs.mkdir(dir,{recursive:true});
  const plain=plainText(html,c.product);
  await fs.writeFile(`${dir}/${stem}.html`,html+'\n');await fs.writeFile(`${dir}/${stem}.txt`,plain+'\n');await fs.writeFile(`${dir}/${stem}.json`,JSON.stringify({subject:c.product.subject,preheader:c.product.preheader,status:mode==='send'?'ready':'draft',errors,bytes:Buffer.byteLength(html),priceVersion:c.prices.version},null,2)+'\n');
  manifest.push({id:product,label:c.product.label,format,subject:c.product.subject,preheader:c.product.preheader,html:`../${dir}/${stem}.html`,text:`../${dir}/${stem}.txt`,bytes:Buffer.byteLength(html),status:mode==='send'?'ready':'draft',errors});console.log(`${dir}/${stem}.html · ${Buffer.byteLength(html)} bytes · ${mode==='send'?'VALIDADO':'BORRADOR'}`);
 }
 await fs.writeFile('previews/conditions.html',conditions(c));
}
if(!arg('product')&&mode==='preview')await fs.writeFile('previews/manifest.json',JSON.stringify(manifest,null,2)+'\n');
async function verifyResources(html){
 const urls=[...new Set([...html.matchAll(/(?:href|src)="([^"]+)"|url\('([^']+)'\)/g)].map(m=>(m[1]||m[2]).replaceAll('&amp;','&')).filter(u=>u.startsWith('https:')))];
 // Native fetch uses the environment proxy with NODE_USE_ENV_PROXY=1 (Node >=24).
 for(const url of urls){const r=await fetch(url,{method:'GET',signal:AbortSignal.timeout(15000)});if(!r.ok)throw Error(`Recurso inaccesible ${r.status}: ${url}`);if(!safeHttps(r.url))throw Error('Redirección no HTTPS');const isImage=/\.(png|jpg|jpeg|webp)(\?|$)/i.test(new URL(url).pathname);if(isImage&&!r.headers.get('content-type')?.startsWith('image/'))throw Error('Imagen inválida: '+url);await r.body?.cancel();}
}
