// Loads a product's trailer into the kit (see assets/trailers/README.md).
//   --product volta                         product id (data/products/<id>.json)
//   --video <file>                          a local video: remuxed/encoded to H.264+AAC (faststart),
//                                           copied to assets/trailers/<id>.mp4, poster extracted
//   --url <https://…>                       an already published video (YouTube, Vimeo, Drive…)
//   --poster <image>                        poster image (required with --url; optional with --video)
//   --at <seconds>                          frame for the poster (default: 10 % of the duration)
//   --seconds <n>                           duration to print (default: read from the video)
//   --compress                              re-encode smaller (1280 px, CRF 26) to fit GitHub's 100 MB
//   --verified | --unverified               human approval for send output (default: unchanged,
//                                           and always false when a new video is loaded)
//   --commercial-ok                         (volta) you watched it: it shows no prices, installments or
//                                           conditions foreign to the campaign
import {execFile} from 'node:child_process';import {promisify} from 'node:util';import fs from 'node:fs/promises';import path from 'node:path';import {fileURLToPath} from 'node:url';import sharp from 'sharp';
import {productSchema,safeHttps} from '../src/schema.mjs';
process.chdir(path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'));
const run=promisify(execFile),args=process.argv.slice(2),opt=k=>{const i=args.indexOf('--'+k);return i<0?undefined:args[i+1]},flag=k=>args.includes('--'+k);
const fail=m=>{console.error('✗ '+m);process.exit(1)};
const id=opt('product');if(!id||!/^[a-z0-9-]+$/.test(id))fail('Falta --product <id> (volta, tableflow, dentalos…)');
const file=`data/products/${id}.json`,raw=await fs.readFile(file,'utf8').catch(()=>fail(`No existe ${file}`)),data=JSON.parse(raw);
const brand=JSON.parse(await fs.readFile('data/brand.json','utf8'));
const video=opt('video'),url=opt('url'),posterIn=opt('poster');
const t={...data.trailer};
const W=1088,H=612,badge=Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs><radialGradient id="v" cx="50%" cy="50%" r="75%"><stop offset="30%" stop-color="#05050a" stop-opacity="0"/><stop offset="100%" stop-color="#05050a" stop-opacity="0.55"/></radialGradient><radialGradient id="g" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#f5b942" stop-opacity="0.4"/><stop offset="100%" stop-color="#f5b942" stop-opacity="0"/></radialGradient></defs><rect width="100%" height="100%" fill="url(#v)"/><circle cx="${W/2}" cy="${H/2}" r="150" fill="url(#g)"/><circle cx="${W/2}" cy="${H/2}" r="74" fill="none" stroke="#ffe8b0" stroke-opacity="0.4" stroke-width="1.5"/><circle cx="${W/2}" cy="${H/2}" r="58" fill="#f5b942"/><path d="M ${W/2-17} ${H/2-25} L ${W/2+27} ${H/2} L ${W/2-17} ${H/2+25} Z" fill="#05050a"/></svg>`);
const poster=async(input,out)=>{await sharp(input).resize(W,H,{fit:'cover'}).composite([{input:badge}]).jpeg({quality:82,mozjpeg:true}).toFile(out)};

if(video){
 const probe=JSON.parse((await run('ffprobe',['-v','error','-print_format','json','-show_format','-show_streams',video]).catch(()=>fail(`No pude leer el video: ${video}`))).stdout);
 const v=probe.streams.find(s=>s.codec_type==='video');if(!v)fail('El archivo no tiene video');
 const a=probe.streams.find(s=>s.codec_type==='audio'),seconds=Math.round(Number(probe.format.duration));
 if(!a)console.warn('! El video no tiene audio: el trailer se promete «con música». Revisalo antes de aprobarlo.');
 if(seconds<20||seconds>90)console.warn(`! Dura ${seconds} s; el trailer estándar es de 60 s.`);
 await fs.mkdir('assets/trailers',{recursive:true});
 const out=`assets/trailers/${id}.mp4`,tmp=`${out}.tmp.mp4`,compress=flag('compress');
 const copyable=!compress&&v.codec_name==='h264'&&(!a||a.codec_name==='aac')&&/mp4|mov/.test(probe.format.format_name);
 const ff=copyable?['-c','copy']:['-c:v','libx264','-preset','medium','-crf',compress?'26':'21','-pix_fmt','yuv420p','-vf',`scale='min(${compress?1280:1920},iw)':-2`,'-c:a','aac','-b:a','160k'];
 console.log(copyable?'Ya es H.264/AAC: solo se reordena para que arranque rápido…':'Convirtiendo a H.264/AAC (puede tardar unos minutos)…');
 await run('ffmpeg',['-y','-v','error','-i',video,...ff,'-movflags','+faststart',tmp],{maxBuffer:1<<26}).catch(e=>fail('ffmpeg falló: '+e.stderr));
 await fs.rename(tmp,out);const mb=(await fs.stat(out)).size/1e6;
 if(mb>95)fail(`El video pesa ${mb.toFixed(0)} MB y GitHub no acepta archivos de más de 100 MB. Volvé a correrlo con --compress.`);
 const at=Number(opt('at')??Math.max(1,seconds*0.1));
 const frame=`assets/trailers/${id}-frame.png`;
 if(posterIn)await poster(posterIn,`assets/trailers/${id}-poster.jpg`);
 else{await run('ffmpeg',['-y','-v','error','-ss',String(at),'-i',out,'-frames:v','1',frame]);await poster(frame,`assets/trailers/${id}-poster.jpg`);await fs.rm(frame)}
 Object.assign(t,{file:`${id}.mp4`,posterFile:`${id}-poster.jpg`,durationSeconds:Number(opt('seconds')??seconds),state:'ready',verified:false});
 const base=brand.galleryUrl.replace(/\/$/,'');
 t.trailerUrl=`${base}/previews/trailer-${id}.html`;t.posterUrl=`${base}/assets/trailers/${id}-poster.jpg`;
 console.log(`✓ ${out} · ${mb.toFixed(1)} MB · ${seconds} s · ${v.width}×${v.height}`);
}else if(url){
 if(!safeHttps(url))fail('--url tiene que ser un enlace HTTPS público');
 if(!posterIn)fail('Con --url hace falta --poster <imagen> (el correo muestra el póster)');
 await fs.mkdir('assets/trailers',{recursive:true});await poster(posterIn,`assets/trailers/${id}-poster.jpg`);
 const base=brand.galleryUrl.replace(/\/$/,'');
 delete t.file;Object.assign(t,{posterFile:`${id}-poster.jpg`,trailerUrl:url,posterUrl:`${base}/assets/trailers/${id}-poster.jpg`,state:'ready',verified:false});
 if(opt('seconds'))t.durationSeconds=Number(opt('seconds'));
 console.log('✓ póster guardado; el trailer se abre en '+url);
}else if(!flag('verified')&&!flag('unverified'))fail('Pasá --video <archivo> o --url <enlace>, o --verified / --unverified');
if(flag('verified')||flag('unverified')){if(t.state!=='ready')fail('Primero cargá un trailer (--video o --url)');t.verified=flag('verified')}
data.trailer=t;productSchema.parse(data);
await fs.writeFile(file,JSON.stringify(data,null,2)+'\n');
// Volta's campaign (the Mejorada version) carries its own trailer inside its offer: keep both in step.
if(id==='volta'){
 const of='data/offers/volta-2026-10-19.json',offer=JSON.parse(await fs.readFile(of,'utf8'));
 offer.resources.trailer={...t};
 if(flag('commercial-ok')){offer.resources.trailerCommercialVerified=true;offer.resources.trailerCommercialNote='Confirmado por una persona: el video no muestra condiciones incompatibles con esta campaña.'}
 else if(video||url){offer.resources.trailerCommercialVerified=false;offer.resources.trailerCommercialNote='Video nuevo pendiente de revisión comercial: confirmá que no muestra precios, cuotas ni condiciones ajenas a esta campaña y corré el comando con --commercial-ok.'}
 await fs.writeFile(of,JSON.stringify(offer,null,2)+'\n');
 console.log(`✓ ${of}: trailer de la campaña ${offer.resources.trailerCommercialVerified?'con revisión comercial confirmada':'pendiente de revisión comercial (--commercial-ok)'}`);
}
console.log(`✓ ${file}: trailer ${t.state}${t.verified?' · VERIFICADO (habilitado para envío)':' · sin verificar (solo preview)'}`);
console.log('Siguiente: npm run build  →  revisá el correo  →  npm run trailer -- --product '+id+' --verified  →  subí a GitHub');
