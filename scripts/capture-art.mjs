// Captures the email artwork from the Eclipse site itself (hero eclipse, without its dial, and the risen
// sun), so the email shows the same light as the web. Needs the site:
// published by default, or a local `next dev` with --url http://localhost:3200/es/.
import {chromium} from 'playwright';import sharp from 'sharp';import fs from 'node:fs/promises';
const args=process.argv.slice(2),i=args.indexOf('--url'),url=i<0?'https://toti-gauna.github.io/Eclipse-Web/es/':args[i+1];
const b=await chromium.launch({proxy:process.env.HTTPS_PROXY&&!/localhost|127\.0\.0\.1/.test(url)?{server:process.env.HTTPS_PROXY}:undefined,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
// Only the artwork: no copy, header, page index or framework overlays.
const open=async(width,height)=>{const page=await b.newPage({viewport:{width,height},deviceScaleFactor:2,reducedMotion:'reduce'});await page.goto(url,{waitUntil:'networkidle',timeout:90000});await page.waitForTimeout(3000);await page.addStyleTag({content:'.hero-copy-cell,.site-header,header,.eph-rail,nextjs-portal,.agent-dawn-type,[data-hero-dial]{visibility:hidden!important}.agent-dawn-sun{left:50%!important}'});return page};
// Seams: the sun melts into the flat color of the email sections around them.
const dawnColor='#fbf9f6';
const fade=(w,h,stops,dir='v')=>Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="${dir==='h'?1:0}" y2="${dir==='v'?1:0}">${stops.map(([o,c,a])=>`<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`).join('')}</linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>`);
let page=await open(1800,1300);
const center=()=>page.evaluate(()=>{const r=document.querySelector('.eclipse').getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}});
let c=await center();await page.addStyleTag({content:`[data-hero-eclipse-anchor]{translate:${Math.round(720-c.x)}px ${Math.round(650-c.y)}px}`});await page.waitForTimeout(1500);c=await center();
const jpeg=async(buffer,file,w,h,layers=[])=>{const base=await sharp(buffer).resize(w,h).toBuffer();await sharp(base).composite(layers.map(input=>({input}))).jpeg({quality:82,mozjpeg:true,chromaSubsampling:'4:4:4'}).toFile(`assets/${file}`)};
await jpeg(await page.screenshot({clip:{x:c.x-640,y:c.y-440,width:1280,height:880}}),'art-hero.jpg',1280,880);
await page.close();page=await open(960,900);
const dawn=page.locator('.agent-dawn').first();await dawn.scrollIntoViewIfNeeded();await page.waitForTimeout(2500);const d=await dawn.boundingBox();
await jpeg(await page.screenshot({clip:{x:0,y:d.y+d.height-412,width:960,height:420}}),'art-dawn.jpg',1280,560,[fade(1280,560,[[0,dawnColor,1],[0.2,dawnColor,0]]),fade(1280,560,[[0,dawnColor,1],[0.14,dawnColor,0],[0.86,dawnColor,0],[1,dawnColor,1]],'h')]);
for(const f of ['art-hero.jpg','art-dawn.jpg'])console.log(f,(await fs.stat('assets/'+f)).size);
await b.close();
