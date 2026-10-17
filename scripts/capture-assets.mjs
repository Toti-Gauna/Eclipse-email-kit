import {chromium} from 'playwright';import fs from 'node:fs/promises';import sharp from 'sharp';
const b=await chromium.launch({proxy:{server:process.env.HTTPS_PROXY}});const page=await b.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
const targets={volta:'https://toti-gauna.github.io/supplements-ecommerce/','volta-admin':'https://toti-gauna.github.io/supplements-ecommerce/admin-demo/',tableflow:'https://toti-gauna.github.io/Tableflow/#/mesa-clara','tableflow-admin':'https://toti-gauna.github.io/Tableflow/#/admin/reservas','tableflow-cafe':'https://toti-gauna.github.io/Tableflow/#/ritual-cafe',dentalos:'https://toti-gauna.github.io/DentalOS/#/','dentalos-admin':'https://toti-gauna.github.io/DentalOS/#/admin'};
for(const [name,url] of Object.entries(targets)){
 await page.goto(url,{waitUntil:'networkidle'});await page.waitForTimeout(3500);
 for(const label of ['Ahora no','Explorar sin elegir']){const btn=page.getByRole('button',{name:label,exact:true});if(await btn.isVisible())await btn.click()}
 await page.waitForTimeout(1200);
 if(name==='dentalos-admin'){await page.locator('h1').filter({hasText:'Hoy'}).waitFor({timeout:15000}).catch(()=>{});await page.waitForTimeout(1000)}
 const buffer=await page.screenshot({path:`docs/sources/live/${name}-clean.png`});await sharp(buffer).resize(1120).jpeg({quality:80,mozjpeg:true}).toFile(`assets/${name}.jpg`);
 console.log(name,(await fs.stat(`assets/${name}.jpg`)).size);
}
const gifts=[];
for(const [code,label] of [['REGALO-VE1M-AR7X','Regalo Volta'],['REGALO-NAV1-DADP','Regalo de Navidad']]){
 const url=`https://toti-gauna.github.io/supplements-ecommerce/regalo/?c=${code}`;await page.goto(url,{waitUntil:'networkidle'});await page.waitForTimeout(2500);const txt=await page.locator('body').innerText();await fs.writeFile(`docs/sources/live/${code}.txt`,txt);await page.screenshot({path:`docs/sources/live/${code}.png`});const verified=!/No encontramos|no existe|Revisá el código/.test(txt)&&/regalo/i.test(txt);gifts.push({label,url,verified,evidence:`docs/sources/live/${code}.txt; fixture gifts.ts; 2026-10-17`});console.log(code,verified,txt.slice(-500));
}
const product=JSON.parse(await fs.readFile('data/products/volta.json','utf8'));product.gifts=gifts;await fs.writeFile('data/products/volta.json',JSON.stringify(product,null,2)+'\n');
await page.goto('https://toti-gauna.github.io/Eclipse-Web/es/',{waitUntil:'networkidle'});
const mark=page.locator('.mini-eclipse svg').first();await mark.screenshot({path:'assets/eclipse-mark.png',scale:'css'});
await b.close();
