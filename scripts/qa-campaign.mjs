import {chromium} from 'playwright';import {chromiumOptions} from './browser-options.mjs';import assert from 'node:assert/strict';import fs from 'node:fs/promises';
const browser=await chromium.launch(chromiumOptions),context=await browser.newContext({permissions:['clipboard-read','clipboard-write'],viewport:{width:1440,height:1000}}),page=await context.newPage();page.setDefaultTimeout(10000);const report=[];
const name='Nutri & Fit "José"';const ready=()=>page.waitForFunction(()=>document.querySelector('#copy')?.disabled===false);
await page.goto('http://127.0.0.1:4173/previews/?model=volta');await ready();
await page.locator('#business-name').fill(name);await ready();
for(const version of ['original','improved']){
 await page.getByRole('tab',{name:version==='original'?'Original':'Mejorada',exact:true}).click();await ready();assert.equal(await page.locator('#business-name').inputValue(),name);
 for(const format of ['full','short']){
  await page.locator('#toggle').click();await page.selectOption('#length',format);await ready();
  const html=await page.locator('#download-html').evaluate(async a=>await (await fetch(a.href)).text());
  const plain=await page.locator('#download-text').evaluate(async a=>await (await fetch(a.href)).text());
  const frameHtml=await page.locator('#email').evaluate(async f=>await (await fetch(f.src)).text());assert.equal(html,frameHtml);assert.ok(html.includes('Nutri &amp; Fit &quot;José&quot;'));assert.ok(plain.includes(name));assert.ok(!/<(script|iframe|form|video)\b/.test(html));
  await page.locator('#copy').click();assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),html);await page.locator('#copy-text').click();assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),plain);
  for(const id of ['download-html','download-text']){const dl=page.waitForEvent('download');await page.locator('#'+id).click();assert.equal(await fs.readFile(await (await dl).path(),'utf8'),id==='download-html'?html:plain)}
  if(version==='improved'){assert.equal(await page.locator('#subject').textContent(),name+': una idea para potenciar tu tienda de suplementos');assert.ok(html.includes('ARS 375.000'));assert.ok(!html.includes('Seña 50 %'))}else{assert.ok(html.includes('USD 500'));assert.ok(!html.includes('Precio al contado'))}
  assert.ok((await page.locator('#errors').textContent()).includes('ficticio'));assert.ok(!page.url().includes('Nutri'));await page.keyboard.press('Escape');report.push({version,format,namePreserved:true,copyHtmlExact:true,copyTextExact:true,downloadHtmlExact:true,downloadTextExact:true});
 }
}
await page.getByRole('tab',{name:'Original',exact:true}).focus();await page.keyboard.press('ArrowRight');await ready();assert.equal(await page.getByRole('tab',{name:'Mejorada',exact:true}).getAttribute('aria-selected'),'true');assert.equal(await page.evaluate(()=>document.activeElement.id),'tab-improved');
await page.locator('#business-name').fill('<img src=x onerror="window.BAD=1">');await ready();assert.equal(await page.frameLocator('#email').locator('img[src=x]').count(),0);assert.equal(await page.evaluate(()=>window.BAD),undefined);
await page.locator('#business-name').fill('');await ready();assert.match(await page.locator('#errors').textContent(),/Ingresá el nombre/);assert.match(await page.frameLocator('#email').locator('body').innerText(),/completá Nombre del negocio/);
await page.locator('#business-name').fill(name);await ready();await page.locator('#toggle').click();await page.selectOption('#length','full');await ready();await page.keyboard.press('Escape');
for(const width of [320,390,640,1440]){await page.setViewportSize({width,height:900});await page.waitForTimeout(250);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert.ok(await page.frameLocator('#email').locator('html').evaluate(e=>e.scrollWidth<=e.ownerDocument.defaultView.innerWidth));await page.screenshot({path:`docs/qa/screenshots/campaign-gallery-${width}.png`,fullPage:false});report.push({width,overflow:false})}
await page.setViewportSize({width:1440,height:1000});await page.locator('#toggle').click();for(const product of ['tableflow','dentalos','volta']){await page.locator(`[data-product=${product}]`).click();await ready();const html=await page.locator('#download-html').evaluate(async a=>(await fetch(a.href)).text());if(product!=='volta'){assert.ok(html.includes('USD 500'));assert.ok(!html.includes('Precio al contado'));assert.equal(await page.locator('#version-tabs').isVisible(),false)}assert.equal(await page.locator('#business-name').inputValue(),name)}await page.keyboard.press('Escape');
assert.equal(await page.evaluate(n=>Object.values(localStorage).some(x=>x.includes(n)),name),false);report.push({keyboardTabs:true,emptyDraft:true,injectionEscaped:true,productIsolation:true,noNamePersistence:true});
await fs.writeFile('docs/qa/campaign-browser.json',JSON.stringify(report,null,2)+'\n');await browser.close();console.log('Campaign QA:',report.length,'checks passed');
