import {chromium} from 'playwright';
import fs from 'node:fs/promises';
const browser=await chromium.launch({headless:true,proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY}:undefined});
const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
await fs.mkdir('docs/sources/live',{recursive:true});
const targets={eclipse:'https://toti-gauna.github.io/Eclipse-Web/es/',volta:'https://toti-gauna.github.io/supplements-ecommerce/', 'volta-admin':'https://toti-gauna.github.io/supplements-ecommerce/admin-demo/', tableflow:'https://toti-gauna.github.io/Tableflow/#/mesa-clara', 'tableflow-admin':'https://toti-gauna.github.io/Tableflow/#/admin/reservas',dentalos:'https://toti-gauna.github.io/DentalOS/#/', 'dentalos-admin':'https://toti-gauna.github.io/DentalOS/#/admin'};
for(const [name,url] of Object.entries(targets)){
 try{await page.goto(url,{waitUntil:'networkidle',timeout:45000});await page.waitForTimeout(1800);await page.screenshot({path:`docs/sources/live/${name}.png`});await fs.writeFile(`docs/sources/live/${name}.json`,JSON.stringify({url,title:await page.title(),text:(await page.locator('body').innerText()).slice(0,22000),links:await page.locator('a[href]').evaluateAll(a=>a.map(x=>({text:x.textContent,url:x.href})))},null,2));console.log(name,'OK');}catch(e){console.log(name,e.message)}
}
await browser.close();
