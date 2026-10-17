import {e,p,label,heading,badge,table,row,section,bleed,spacer,mark,button,ledger,ticks,asset,image,money,FONT,THEME} from './primitives.mjs';

// A price as an instrument reading: small unit, big mono figure.
const readout=(n,t,unit='USD')=>`<p class="mono" style="margin:0;font-family:${FONT.mono};color:${t.fg};line-height:1"><span style="font-size:15px;line-height:20px;letter-spacing:1px;vertical-align:top">${unit}</span>&nbsp;<span class="readout" style="font-size:72px;line-height:76px;letter-spacing:-3px">${n}</span></p>`;
const dash=(s,t)=>`<tr><td class="mono" aria-hidden="true" style="width:26px;padding:0 0 10px;font-family:${FONT.mono};font-size:15px;line-height:24px;color:${t.accent};vertical-align:top">—</td><td style="padding:0 0 10px;font-family:${FONT.sans};font-size:16px;line-height:24px;color:${t.fg};vertical-align:top">${s}</td></tr>`;

// What it costs and how it is paid: the seña starts a plan and software made to measure, with
// the maintenance credit of the campaign on the same card.
export function offer(c,n,total){
 const {product:d,prospect:q,prices:v,offer:o,calc}=c,t=THEME.dawn,card=THEME.paper,pack=o.type==='pack',promo=o.promotion.enabled;
 const includes=pack?[`Adaptación de ${e(d.name)}: marca, contenido y configuración`,'Landing premium adicional, si tu producto no la trae','Asesoría de growth y marca + asesoría de gestión económica',`${o.promotion.months} meses de plan mensual bonificados (el equivalente a Esencial)`]:d.includes.map(e);
 let inner=`<p class="mono" style="margin:0 0 14px;font-family:${FONT.mono};font-size:11px;line-height:22px;letter-spacing:1.3px;color:${card.accent}">${pack?'A2':'A1'}&nbsp;&nbsp;<span style="color:${card.muted}">OFERTA</span>${pack?`&nbsp;&nbsp; ${badge('Para salir con todo')}`:''}</p>`;
 inner+=heading(pack?'Pack lanzamiento':'Adaptación de producto',card,{level:3,size:36,mb:10,cls:'h3'})+p(pack?`Para salir con ${e(d.name)}, landing y un plan claro desde el primer día.`:`Un plan y un software a la medida de ${e(q.businessName)}, sobre ${e(d.name)}: tu marca, tu contenido y tu configuración.`,card,{size:15,lh:24,color:card.muted,mb:28});
 inner+=label('Desde · implementación',card,{mb:10})+readout(calc.base,card)+spacer(24);
 // The focus of the offer: what the USD 500 already bring, on a lit strip of the card.
 if(calc.included.includes('growth'))inner+=table(row(label(`Incluido en los ${money(calc.base)}`,card,{color:card.accent,mb:6})+`<p class="serif" style="margin:0 0 6px;font-family:${FONT.serif};font-size:24px;line-height:28px;color:${card.fg}">Asesoría inicial de growth marketing y retención de clientes.</p>`+p('Una sesión para ordenar tu propuesta, tus mensajes y cómo hacer que tus clientes vuelvan, con una métrica para medirlo.',card,{size:14,lh:22,color:card.muted,mb:0}),`padding:18px 20px;background-color:__ECLIPSE_FLARE__;border-left:2px solid __ECLIPSE_CORONA__`))+spacer(28);
 else inner+=spacer(6);
 inner+=label('Qué incluye',card,{mb:14})+table(includes.map(s=>dash(s,card)).join(''))+(pack?'':p(e(d.apart),card,{size:13,lh:21,color:card.muted,mb:0,style:'padding:4px 0 0 26px'}));
 if(pack&&!c.brand.economicAdvisor.confirmed)inner+=p('BORRADOR · La gestión económica requiere responsable confirmado.',card,{size:13,lh:21,color:'#8c291d',mb:0,style:'padding:4px 0 0 26px'});
 inner+=spacer(26)+label('Cómo se paga',card,{mb:0})+table(ledger(`Seña ${v.depositRatio*100} %`,money(calc.base*v.depositRatio),card,{sub:'Para empezar: plan y software a medida'})+ledger(`Saldo ${100-v.depositRatio*100} %`,money(calc.base*(1-v.depositRatio)),card,{sub:'A la entrega aprobada',last:true}))+spacer(26);
 // Paying the adaptation lowers every monthly plan during the first months.
 if(promo){const credit=calc.plans[0].monthly-calc.plans[0].promo;inner+=label(`Y por sumarte, tu plan mensual baja · por mes, meses 1 a ${o.promotion.months}`,card,{mb:0})+table(calc.plans.map((x,i)=>ledger(x.name,money(x.promo),card,{sub:`<span style="color:${card.accent}">${x.promo===0?'Bonificado':`${money(credit)} menos por mes`}</span> · después ${money(x.monthly)}/mes`,last:i===calc.plans.length-1})).join(''))+spacer(30)}
 inner+=button('Hablemos de tu proyecto',c.brand.contactUrl,card,{primary:true});
 const html=mark(c,n,total,'Precio',t)+heading('Cuánto cuesta\ny cómo se paga.',t,{size:52,mb:20})+p('Precios en dólares, sin letra chica. El número final te lo confirmamos por escrito, con el alcance acordado.',t,{size:17,lh:28,color:t.muted,mb:40})+ticks(inner,t,{pad:30,bg:card.bg})+p('El proyecto arranca con la seña. Antes, definimos juntos alcance, entregables y factibilidad. El precio es por adaptar un producto que ya funciona; las funciones nuevas se cotizan aparte.',t,{size:14,lh:22,color:t.muted,mb:0,style:'padding:20px 10px 0'});
 return section(html,t,'padding-top:24px');
}

// One monthly plan, with the campaign credit read month by month.
export function plans(c,n,total){
 const {offer:o,calc}=c,t=THEME.dawn,promo=o.promotion.enabled,m=o.promotion.months;
 // Desktop reads it as a table; phones get the same figures as one line under each name.
 const th=(s,align='left',cls='')=>`<td class="mono ${cls}" align="${align}" style="padding:0 0 12px ${align==='right'?16:0}px;border-bottom:1px solid ${t.fg};font-family:${FONT.mono};font-size:11px;line-height:16px;letter-spacing:1.3px;text-transform:uppercase;color:${t.muted};text-align:${align}">${s}</td>`;
 const cell=(s,strong)=>`<td class="mono hide-m" align="right" style="width:96px;padding:22px 0 22px 16px;border-bottom:1px solid ${t.line};font-family:${FONT.mono};font-size:16px;line-height:30px;color:${strong?t.fg:t.muted};text-align:right;vertical-align:top">${s}</td>`;
 const inline=x=>`<div class="show-m mono" style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-family:${FONT.mono};font-size:14px;line-height:22px;color:${t.fg}">${promo?`${money(x.promo)}/mes <span style="color:${t.muted}">· meses 1–${m}</span><br>${money(x.monthly)}/mes <span style="color:${t.muted}">· desde el mes ${m+1}</span>`:`${money(x.monthly)}/mes`}</div>`;
 const rows=calc.plans.map(x=>`<tr><td style="padding:22px 0;border-bottom:1px solid ${t.line};vertical-align:top;overflow-wrap:anywhere;word-break:break-word"><span class="serif" style="font-family:${FONT.serif};font-size:28px;line-height:30px;color:${t.fg}">${e(x.name)}</span>${x.id===o.selectedPlan?`&nbsp;&nbsp;${badge('Elegido')}`:''}${p(e(x.scope),t,{size:14,lh:22,color:t.muted,mb:6,style:'padding-top:8px'})}${inline(x)}${label(`Terceros hasta ${money(x.thirdPartyBudget)}/mes, dentro del precio`,t,{color:t.accent,mb:0,style:'padding-top:4px'})}</td>${promo?cell(money(x.promo),true)+cell(money(x.monthly)):cell(money(x.monthly),true)}</tr>`).join('');
 let html=mark(c,n,total,'Mantenimiento',t)+heading('Un plan mensual.\nUno solo.',t,{size:52,mb:20})+p('Hosting, mantenimiento y mejoras en un solo pago mensual. Elegís el nivel según lo que construimos; no se paga por canal.',t,{size:17,lh:28,color:t.muted,mb:36});
 if(promo)html+=table(row(label('Beneficio por la adaptación',t,{color:t.accent,mb:8})+`<p class="serif" style="margin:0 0 8px;font-family:${FONT.serif};font-size:28px;line-height:32px;color:${t.fg}">Esencial gratis ${m} meses. Los demás, ${money(calc.plans[0].monthly-calc.plans[0].promo)} menos por mes.</p>`+p(`Desde la publicación y durante ${m} meses, descontamos el valor de Esencial de cualquier plan. Desde el mes ${m+1}, el precio normal.`,t,{size:14,lh:22,color:t.muted,mb:0}),`padding:22px 24px;background-color:__ECLIPSE_FLARE__;border-left:2px solid __ECLIPSE_CORONA__`))+spacer(32);
 html+=table(`<tr>${th('Plan')}${promo?th(`Meses 1–${m}`,'right','hide-m')+th(`Desde mes ${m+1}`,'right','hide-m'):th('Por mes','right','hide-m')}</tr>${rows}`);
 html+=p('Los planes son alternativas: elegís uno, no se suman.',t,{size:14,lh:22,color:t.muted,mb:0,style:'padding-top:18px'});
 return section(html,t,'padding-top:24px');
}

// Extra pieces for the plan, priced once, never twice: what the offer already selected, the
// channels that fit this product, then the offer's recommendations. None → no section.
export function extraIds(c){
 const {offer:o,product:d}=c,seen=new Set(),out=[];
 for(const [list,selected] of [[o.selectedExtras,true],[d.recommends,false],[o.recommendedExtras,false]])for(const id of list)if(!seen.has(id)){seen.add(id);out.push({id,selected})}
 return out;
}
export function extras(c,n,total){
 const {offer:o,prices:v,calc}=c,t=THEME.dawn;
 const ids=extraIds(c);
 const scope=id=>v.extras[id].scope+(id==='both'?` Cada una suelta: ${money(v.extras.growth.price)}.`:'')+(['both','economics'].includes(id)&&!c.brand.economicAdvisor.confirmed?' Gestión económica sujeta a validación.':'');
 let html=mark(c,n,total,'Piezas extra',t)+heading('Para ir\nmás lejos.',t,{size:52,mb:20})+p('Lo que te recomendamos sumar, cuando quieras. Sobre esta propuesta cada pieza va a precio de complemento, más bajo que por separado, y se paga una sola vez.',t,{size:17,lh:28,color:t.muted,mb:28});
 if(ids.length)html+=table(ids.map(({id,selected},i)=>ledger(`${e(v.extras[id].name)}<br><span style="font-size:14px;line-height:22px;color:${t.muted}">${e(scope(id))}</span><br><span class="mono" style="font-family:${FONT.mono};font-size:11px;line-height:24px;letter-spacing:1.3px;color:${selected?t.accent:t.muted}">${selected?'SELECCIONADO · PAGO ÚNICO':'RECOMENDADO · OPCIONAL'}</span>`,`+ ${money(v.extras[id].price)}`,t,{size:17,last:i===ids.length-1})).join(''),'',`border-top:1px solid ${t.fg}`);
 if(calc.economic&&!c.brand.economicAdvisor.confirmed)html+=p('BORRADOR · Asesoría económica pendiente de responsable y capacidad. Esta oferta no se puede exportar para envío.',t,{size:12,lh:19,color:'#8c291d',mb:0,style:'padding-top:16px'});
 if(o.selectedExtras.length)html+=spacer(20)+table(ledger(`<strong>Implementación con complementos</strong>`,money(calc.total),t)+ledger(`Seña ${v.depositRatio*100} % · saldo a la entrega`,`${money(calc.deposit)} · ${money(calc.balance)}`,t,{last:true}));
 return section(html,t,'padding-top:24px');
}

// Conditions in plain sight, before any seña.
export function conditions(c,n,total){
 const v=c.prices,t=THEME.soft;
 const items=[
  `Todos los planes incluyen hasta ${v.monthlyHours} h humanas por mes en total (no se acumulan) para mantenimiento, configuración y mejoras priorizadas.`,
  `Lo de terceros (alojamiento, datos y consumos compatibles) ya está dentro del precio. Te avisamos al ${v.noticePercent} % y no hay recargos automáticos.`,
  'Si el cupo no alcanza, acordamos cómo ampliarlo y qué automatización se pausa. Tu producto y tus datos siguen disponibles.',
  'Proveedor y factibilidad se validan por cuenta, antes de empezar.',
  `Migración desde Excel o PDF: ${money(v.migration.min)}–${v.migration.max}, por única vez, después de revisar una muestra.`,
  `Módulos operativos fuera de la adaptación: desde ${money(v.operationalModuleFrom)}, según alcance.`,
  'El dominio y su renovación van aparte, salvo que la propuesta los incluya.'];
 const url=c.mode==='send'?c.brand.conditionsUrl:'../../../previews/conditions.html';
 const html=mark(c,n,total,'Condiciones',t)+heading('Condiciones,\na la vista.',t,{size:44,mb:28})+table(items.map((s,i)=>`<tr><td class="mono" style="width:30px;padding:14px 0;border-top:1px solid ${t.rule};font-family:${FONT.mono};font-size:11px;line-height:22px;color:${t.accent};vertical-align:top">${'abcdefg'[i]}.</td><td style="padding:14px 0;border-top:1px solid ${t.rule};font-family:${FONT.sans};font-size:15px;line-height:22px;color:${t.fg};vertical-align:top">${e(s)}</td></tr>`).join(''),'',`border-bottom:1px solid ${t.rule}`)+p(`<a href="${e(url)}" target="_blank" style="color:${t.fg};text-decoration:underline">Leé las condiciones completas antes de la seña</a>&nbsp;→`,t,{size:15,lh:22,mb:0,style:'padding-top:22px'});
 return section(html,t,'padding-top:48px;padding-bottom:56px');
}

// After the yes: the account, the client portal and the rest of Eclipse.
export function process(c,n,total){
 const t=THEME.dawn,b=c.brand,d=c.product;
 const steps=[['Hablamos y definimos el alcance','Una llamada para entender qué querés resolver primero. Te mandamos la propuesta por escrito: alcance, precio y plazos.'],['Seña, tu cuenta y tu portal','Con la seña te creamos tu cuenta de cliente y tu portal: ahí ves el proyecto, sus etapas y lo que necesitamos de vos.'],['Construcción, a la vista','Adaptamos ' + d.name + ' a tu negocio. Seguís cada avance en el portal: preparación, construcción, revisión y entrega.'],['Entrega y capacitación','Lo publicamos, lo dejamos andando y te enseñamos a usarlo, a vos y a tu equipo.'],['Mantenimiento y mejoras','Tu plan mensual mantiene todo funcionando y suma mejoras priorizadas cada mes.']];
 const rows=steps.map(([title,text],i)=>`<tr><td aria-hidden="true" style="width:40px;padding:20px 0;border-top:1px solid ${t.line};vertical-align:top"><img src="${e(asset(c,`glyph-${[5,4,3,1,0][i]}-light.png`))}" alt="" width="22" height="22" style="display:block;border:0;width:22px;height:22px" /></td><td style="padding:20px 0;border-top:1px solid ${t.line};vertical-align:top">${label(`Paso ${String(i+1).padStart(2,'0')}`,t,{mb:4})+p(e(title),t,{size:18,lh:24,mb:6,style:'font-weight:500'})+p(e(text),t,{size:15,lh:24,color:t.muted,mb:0})}</td></tr>`).join('');
 const links=[b.portalUrl&&{label:'Ver cómo es tu portal',url:b.portalUrl},b.productsUrl&&{label:'Ver más productos de Eclipse',url:b.productsUrl}].filter(Boolean);
 const html=mark(c,n,total,'Cómo seguimos',t)+heading('Después del sí,\n*todo* a la vista.',t,{size:52,mb:20})+p('No te mandamos un archivo y desaparecemos. Así trabajamos desde el primer día:',t,{size:17,lh:28,color:t.muted,mb:28})+table(rows,'',`border-bottom:1px solid ${t.line}`)+spacer(36)+ticks(label('Eclipse',t,{color:t.accent})+`<p class="serif" style="margin:0 0 10px;font-family:${FONT.serif};font-size:28px;line-height:32px;color:${t.fg}">Una consultora de inteligencia artificial para negocios de todos los rubros.</p>`+p(`Salud, comercio, gastronomía, fitness, inmobiliarias y educación. ${e(d.name)} es uno de nuestros productos; hay más, y cada uno se adapta a tu negocio.`,t,{size:15,lh:24,color:t.muted,mb:22})+links.map(x=>button(x.label,x.url,{...t,bg:'__ECLIPSE_PAPER__'},{arrow:'↗'})).join('')+(c.mode==='send'?'':p('El portal del enlace es una vista de demostración con datos ficticios.',t,{size:12,lh:19,color:t.muted,mb:0,style:'padding-top:6px'})),t,{pad:28,bg:'__ECLIPSE_PAPER__'});
 return section(html,t,'padding-top:24px');
}

// Dawn: the sun is out, the next step is the reader's.
export function closing(c,n,total,{primary=true}={}){
 const t=THEME.dawn,b=c.brand;
 const sign=b.sender.confirmed?`${e(b.sender.name)} · Eclipse<br><span style="color:${t.muted}">${e(b.sender.email)}</span>`:`Eclipse <span style="color:${t.muted}">· remitente pendiente de confirmar</span>`;
 const html=mark(c,n,total,'Próximo paso',t)+heading('El próximo paso\nes *tuyo*.',t,{size:56,mb:22})+p('Respondé este correo o escribinos. En una llamada corta vemos qué querés resolver primero y te mandamos alcance, precio y plazos por escrito, antes de cualquier seña.',t,{size:17,lh:28,color:t.muted,mb:32})+button('Hablemos de tu proyecto',b.contactUrl,t,{primary})+spacer(40)+table(`<tr><td width="36" style="width:36px;padding-top:16px;border-top:1px solid ${t.line};vertical-align:top"><img src="${e(asset(c,'mark-light.png'))}" alt="" width="24" height="24" style="display:block;border:0;width:24px;height:24px" /></td><td style="padding-top:16px;border-top:1px solid ${t.line};font-family:${FONT.sans};font-size:15px;line-height:24px;color:${t.fg}">${sign}</td></tr>`);
 return section(html,t,'padding-bottom:8px')+bleed(image(asset(c,'art-dawn.jpg'),'',640,280,{bg:t.bg}),t.bg);
}

export function footer(c){
 const t=THEME.soft;
 return section(p('ECLIPSE',t,{size:12,lh:18,mb:8,style:'letter-spacing:4px;font-weight:500'})+p('Consultora de inteligencia artificial para negocios. Desarrollo, IA y automatización para los que no pueden esperar.',t,{size:14,lh:22,color:t.muted,mb:14})+p(`<a href="${e(c.brand.siteUrl)}" target="_blank" style="color:${t.fg};text-decoration:underline">Conocé Eclipse</a>&nbsp;↗`,t,{size:14,lh:22,mb:24})+p('Los negocios que ves en las demos son ficticios. Si preferís no recibir más propuestas, respondé «No recibir más».',t,{size:12,lh:19,color:t.muted,mb:0,style:`padding-top:18px;border-top:1px solid ${t.rule}`}),t,'padding-top:36px;padding-bottom:40px');
}

// Short first contact: the proposal in three readings, then the full version.
export function brief(c,n,total){
 const {product:d,offer:o,calc}=c,t=THEME.dawn,essential=calc.plans.find(x=>x.id==='essential');
 const full=c.mode==='send'?d.presentationUrl:(c.previewFullFile||`${d.id}-${c.prospect.id}-full.html`);
 const rows=ledger(`La demo<br><span style="font-size:14px;line-height:22px;color:${t.muted}">${e(d.name)}, con datos ficticios</span>`,d.customer.url?`<a href="${e(d.customer.url)}" target="_blank" style="color:${t.accent};text-decoration:none">ABRIR ↗</a>`:'—',t,{size:17})+ledger(`${o.type==='pack'?'Pack lanzamiento':'Adaptación de producto'}<br><span style="font-size:14px;line-height:22px;color:${t.muted}">${calc.included.includes('growth')?'Incluye asesoría inicial de growth y retención':e(d.includes[0]||'')}</span>`,`desde ${money(calc.base)}`,t,{size:17})+ledger(`Plan mensual<br><span style="font-size:14px;line-height:22px;color:${t.muted}">${o.promotion.enabled?`Esencial gratis ${o.promotion.months} meses; los demás, más baratos`:'Uno solo, sin cargo por canal'}</span>`,`desde ${money(essential.monthly)}/mes`,t,{size:17,last:true});
 const html=mark(c,n,total,'En corto',t)+heading('La propuesta,\nen tres líneas.',t,{size:48,mb:28})+table(rows,'',`border-top:1px solid ${t.fg}`)+spacer(32)+button('Ver la propuesta completa',full,t,{primary:true})+p('Alcance, precio, plan mensual y condiciones, en una sola página.',t,{size:14,lh:22,color:t.muted,mb:0,style:'padding-top:8px'});
 return section(html,t,'padding-top:24px');
}
