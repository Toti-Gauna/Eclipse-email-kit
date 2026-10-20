// Captures the demo screens shown in the emails: the CLIENT view and the OWNER / admin view of
// each product, from the demos themselves (data is fictitious). Each demo is opened at its own
// base URL: the published one by default, or a local build / dev server (the sandbox where this
// was written cannot reach GitHub Pages):
//   node scripts/capture-demos.mjs [--only volta,tableflow,dentalos] \
//     [--volta http://127.0.0.1:3400/supplements-ecommerce] [--tableflow http://127.0.0.1:5201] \
//     [--dentalos http://127.0.0.1:5202]
// Writes assets/<product>-<view>-<slug>.jpg (1120 px wide) and prints the list for the data files.
import {chromium} from 'playwright';import sharp from 'sharp';import fs from 'node:fs/promises';
const args=process.argv.slice(2),opt=(k,d)=>{const i=args.indexOf('--'+k);return i<0?d:args[i+1]};
const base={volta:opt('volta','https://toti-gauna.github.io/supplements-ecommerce'),tableflow:opt('tableflow','https://toti-gauna.github.io/Tableflow'),dentalos:opt('dentalos','https://toti-gauna.github.io/DentalOS')};
const only=opt('only','volta,tableflow,dentalos').split(',');
const proxy=process.env.HTTPS_PROXY&&only.map(k=>base[k]).some(u=>!/127\.0\.0\.1|localhost/.test(u))?{server:process.env.HTTPS_PROXY}:undefined;
const browser=await chromium.launch({proxy});const done=[];
const settle=async p=>{await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(700)};
async function shot(p,name){await p.mouse.move(900,640);await settle(p);const buf=await p.screenshot();await sharp(buf).resize(1120).jpeg({quality:80,mozjpeg:true}).toFile(`assets/${name}.jpg`);done.push(name);console.log(name)}
async function open(width=1440,height=1000){const ctx=await browser.newContext({viewport:{width,height},reducedMotion:'reduce'});return {ctx,page:await ctx.newPage()}}

// ---- Volta: static export, one URL per screen --------------------------------------------------
async function volta(){
 const {ctx,page:p}=await open();const go=async path=>{await p.goto(base.volta+path,{waitUntil:'networkidle'}).catch(()=>{});await p.waitForTimeout(2200);for(const l of ['Ahora no','Explorar sin elegir']){const b=p.getByRole('button',{name:l,exact:true});if(await b.isVisible().catch(()=>false))await b.click()}};
 for(const [name,path] of [['volta-cliente-inicio','/'],['volta-cliente-ficha','/p/ionic-whey/'],['volta-cliente-packs','/packs/'],['volta-cliente-club','/club/'],['volta-cliente-regalar','/regalar/'],['volta-admin-inicio','/admin-demo/'],['volta-admin-pedidos','/admin-demo/pedidos/'],['volta-admin-stock','/admin-demo/productos/'],['volta-admin-regalos','/admin-demo/regalos/'],['volta-admin-campanas','/admin-demo/campanas/']]){await go(path);await shot(p,name)}
 await ctx.close();
}

// ---- TableFlow: hash routes, a role selector in the demo dock ---------------------------------
async function tableflow(){
 const {ctx,page:p}=await open();
 const prefs=JSON.stringify({roleIntroSeen:true});
 await p.goto(base.tableflow+'/');await p.evaluate(v=>{localStorage.clear();localStorage.setItem('tableflow.demo.v1.prefs',v)},prefs);
 const route=async h=>{await p.goto(`${base.tableflow}/#${h}`);await p.waitForTimeout(900)};
 const dock=async()=>{if(!(await p.getByTestId('role-select').isVisible().catch(()=>false)))await p.getByRole('button',{name:'Controles de la demo'}).click();await p.getByTestId('dock-panel').waitFor()};
 const closeDock=async()=>{if(await p.getByTestId('dock-panel').isVisible().catch(()=>false))await p.keyboard.press('Escape')};
 const role=async re=>{await dock();const opts=await p.getByTestId('role-select').locator('option').allTextContents();await p.getByTestId('role-select').selectOption({label:opts.find(o=>re.test(o))});await closeDock()};
 const biz=async id=>{await dock();await p.getByTestId('biz-select').selectOption(id);await closeDock()};
 const jump=async label=>{await dock();await p.getByTestId('clock-jump').selectOption({label});await closeDock()};
 await route('/mesa-clara');await p.reload();await p.waitForTimeout(900);
 // Mesa Clara (restaurant)
 await shot(p,'tableflow-cliente-inicio');
 await route('/mesa-clara/carta');await shot(p,'tableflow-cliente-carta');
 await route('/mesa-clara/reservar');await shot(p,'tableflow-cliente-reservar');
 await route('/mesa-clara/simulador');await p.waitForTimeout(1500);await p.getByTestId('chat-input').fill('Mesa para 4 el lunes a las 20');await p.getByTestId('chat-send').click();await p.waitForTimeout(900);await shot(p,'tableflow-cliente-simulador');
 await route('/mesa-clara/regalar');await shot(p,'tableflow-cliente-regalar');
 await role(/Encargado/);await route('/admin/resumen');await shot(p,'tableflow-admin-resumen');
 await role(/Recepción/);await route('/admin/reservas');await shot(p,'tableflow-admin-reservas');
 await route('/admin/salon');await shot(p,'tableflow-admin-salon');
 await role(/Encargado/);await route('/admin/pedidos');await shot(p,'tableflow-admin-pedidos');
 await route('/admin/automatizaciones');await shot(p,'tableflow-admin-automatizaciones');
 // Ritual Café (cafe vertical)
 await biz('ritual-cafe');
 await role(/invitado/);
 await route('/ritual-cafe');await shot(p,'tableflow-cafe-cliente-inicio');
 await route('/ritual-cafe/carta');await shot(p,'tableflow-cafe-cliente-carta');
 await route('/ritual-cafe/pedido/O-008');await shot(p,'tableflow-cafe-cliente-seguimiento');
 await route('/ritual-cafe/explorar');await shot(p,'tableflow-cafe-cliente-pasaporte');
 await route('/ritual-cafe/regalar');await shot(p,'tableflow-cafe-cliente-regalar');
 await role(/Encargado/);await biz('ritual-cafe');
 await route('/admin/cocina');await shot(p,'tableflow-cafe-admin-cocina');
 await route('/admin/resumen');await shot(p,'tableflow-cafe-admin-resumen');
 await route('/admin/caja');await shot(p,'tableflow-cafe-admin-caja');
 await route('/admin/stock');await shot(p,'tableflow-cafe-admin-stock');
 await route('/admin/automatizaciones');await shot(p,'tableflow-cafe-admin-automatizaciones');
 await ctx.close();
}

// ---- DentalOS: hash routes; the first-visit role question is answered in storage --------------
async function dentalos(){
 const {ctx,page:p}=await open();
 await p.addInitScript(()=>{try{const k='dentalos.demo.v1:ui';if(!localStorage.getItem(k))localStorage.setItem(k,JSON.stringify({roleChosen:true}))}catch{}});
 for(const [name,hash] of [['dentalos-cliente-inicio','#/'],['dentalos-cliente-reservar','#/reservar'],['dentalos-cliente-turnos','#/mis-turnos'],['dentalos-cliente-whatsapp','#/whatsapp'],['dentalos-cliente-aprender','#/aprender'],['dentalos-admin-agenda','#/admin'],['dentalos-admin-informes','#/admin/informes'],['dentalos-admin-ficha','#/admin/personas/P-003'],['dentalos-admin-odontograma','#/admin/personas/P-008/odontograma'],['dentalos-admin-presupuestos','#/admin/presupuestos']]){await p.goto(`${base.dentalos}/${hash}`);await p.waitForTimeout(900);await shot(p,name)}
 await ctx.close();
}
const jobs={volta,tableflow,dentalos};
for(const k of only)await jobs[k]();
await browser.close();console.log(`${done.length} pantallas en assets/`);
