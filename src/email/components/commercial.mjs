import {e,p,label,heading,badge,table,row,section,bleed,spacer,mark,button,ledger,linkRow,ticks,asset,image,money,FONT,THEME} from './primitives.mjs';

// A price as an instrument reading: small unit, big mono figure.
const readout=(n,t,unit='USD')=>`<p class="mono" style="margin:0;font-family:${FONT.mono};color:${t.fg};line-height:1"><span style="font-size:15px;line-height:20px;letter-spacing:1px;vertical-align:top">${unit}</span>&nbsp;<span class="readout" style="font-size:72px;line-height:76px;letter-spacing:-3px">${n}</span></p>`;
const dash=(s,t)=>`<tr><td class="mono" aria-hidden="true" style="width:26px;padding:0 0 10px;font-family:${FONT.mono};font-size:15px;line-height:24px;color:${t.accent};vertical-align:top">—</td><td style="padding:0 0 10px;font-family:${FONT.sans};font-size:16px;line-height:24px;color:${t.fg};vertical-align:top">${s}</td></tr>`;

// What it costs and how it is paid.
export function offer(c,n,total){
 const {product:d,prices:v,offer:o,calc}=c,t=THEME.dawn,card=THEME.paper,pack=o.type==='pack';
 const includes=pack?[`Adaptación de ${e(d.name)}: marca, contenido y configuración`,'Landing premium adicional, si tu producto no la trae','Asesoría de growth y marca + asesoría de gestión económica',`${o.promotion.months} meses de plan mensual bonificados (el equivalente a Esencial)`]:d.includes.map(e);
 let inner=`<p class="mono" style="margin:0 0 14px;font-family:${FONT.mono};font-size:11px;line-height:22px;letter-spacing:1.3px;color:${card.accent}">${pack?'A2':'A1'}&nbsp;&nbsp;<span style="color:${card.muted}">OFERTA</span>${pack?`&nbsp;&nbsp; ${badge('Para salir con todo')}`:''}</p>`;
 inner+=heading(pack?'Pack lanzamiento':'Adaptación de producto',card,{level:3,size:36,mb:10,cls:'h3'})+p(pack?`Para salir con ${e(d.name)}, landing y un plan claro desde el primer día.`:`${e(d.name)}, con tu marca, tu contenido y tu configuración.`,card,{size:15,lh:24,color:card.muted,mb:28});
 inner+=label('Desde · implementación',card,{mb:10})+readout(calc.base,card)+spacer(30);
 inner+=label('Qué incluye',card,{mb:14})+table(includes.map(s=>dash(s,card)).join(''))+(pack?'':p(e(d.apart),card,{size:13,lh:21,color:card.muted,mb:0,style:'padding:4px 0 0 26px'}));
 if(pack&&!c.brand.economicAdvisor.confirmed)inner+=p('BORRADOR · La gestión económica requiere responsable confirmado.',card,{size:13,lh:21,color:'#8c291d',mb:0,style:'padding:4px 0 0 26px'});
 inner+=spacer(26)+label('Cómo se paga',card,{mb:0})+table(ledger(`Anticipo ${v.depositRatio*100} %`,money(calc.base*v.depositRatio),card,{sub:'Para empezar el proyecto'})+ledger(`Saldo ${100-v.depositRatio*100} %`,money(calc.base*(1-v.depositRatio)),card,{sub:'A la entrega aprobada',last:true}))+spacer(30);
 inner+=button('Hablemos de tu proyecto',c.brand.contactUrl,card,{primary:true});
 const html=mark(c,n,total,'Precio',t)+heading('Cuánto cuesta\ny cómo se paga.',t,{size:52,mb:20})+p('Precios en dólares, sin letra chica. El número final te lo confirmamos por escrito, con el alcance acordado.',t,{size:17,lh:28,color:t.muted,mb:40})+ticks(inner,t,{pad:30,bg:card.bg})+p('El proyecto empieza con el anticipo. Antes, definimos juntos alcance, entregables y factibilidad: el precio corresponde a adaptar un producto existente.',t,{size:14,lh:22,color:t.muted,mb:0,style:'padding:20px 10px 0'});
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
 let html=mark(c,n,total,'Plan mensual',t)+heading('Un plan mensual.\nUno solo.',t,{size:52,mb:20})+p('Mantenimiento, alojamiento y lo que tu producto necesita para seguir andando. Elegís el nivel según lo que construimos; no se paga uno por canal.',t,{size:17,lh:28,color:t.muted,mb:36});
 if(promo)html+=table(row(label('Condición de esta campaña',t,{color:t.accent,mb:8})+`<p class="serif" style="margin:0 0 8px;font-family:${FONT.serif};font-size:28px;line-height:32px;color:${t.fg}">${m} meses de Esencial, bonificados.</p>`+p(`Desde la publicación, bonificamos el equivalente a Esencial. Si elegís otro plan, pagás solo la diferencia; desde el mes ${m+1}, el precio normal.`,t,{size:14,lh:22,color:t.muted,mb:0}),`padding:22px 24px;background-color:__ECLIPSE_FLARE__;border-left:2px solid __ECLIPSE_CORONA__`))+spacer(32);
 html+=table(`<tr>${th('Plan')}${promo?th(`Meses 1–${m}`,'right','hide-m')+th(`Desde mes ${m+1}`,'right','hide-m'):th('Por mes','right','hide-m')}</tr>${rows}`);
 html+=p('Los planes son alternativas: elegís uno, no se suman.',t,{size:14,lh:22,color:t.muted,mb:0,style:'padding-top:18px'});
 return section(html,t,'padding-top:24px');
}

// Optional pieces, priced once, never twice. An offer with none (the pack) skips the section.
export const extraIds=o=>[...o.selectedExtras.map(id=>({id,selected:true})),...o.recommendedExtras.filter(id=>!o.selectedExtras.includes(id)).map(id=>({id,selected:false}))];
export function extras(c,n,total){
 const {offer:o,prices:v,calc}=c,t=THEME.dawn;
 const ids=extraIds(o);
 let html=mark(c,n,total,'Complementos',t)+heading('Para ir\nmás lejos.',t,{size:52,mb:20})+p(e(c.product.extraContext),t,{size:17,lh:28,color:t.muted,mb:28});
 if(ids.length)html+=table(ids.map(({id,selected},i)=>ledger(`${e(v.extras[id].name)}<br><span style="font-size:14px;line-height:22px;color:${t.muted}">${e(v.extras[id].scope)}</span><br><span class="mono" style="font-family:${FONT.mono};font-size:11px;line-height:24px;letter-spacing:1.3px;color:${selected?t.accent:t.muted}">${selected?'SELECCIONADO · PAGO ÚNICO':'OPCIONAL · NO INCLUIDO'}</span>`,`+ ${money(v.extras[id].price)}`,t,{size:17,last:i===ids.length-1})).join(''),'',`border-top:1px solid ${t.fg}`);
 if(calc.economic&&!c.brand.economicAdvisor.confirmed)html+=p('BORRADOR · Asesoría económica pendiente de responsable y capacidad. Esta oferta no se puede exportar para envío.',t,{size:13,lh:21,color:'#8c291d',mb:0,style:'padding:14px 16px;margin-top:20px;border:1px solid #d9b2a9'});
 if(o.selectedExtras.length)html+=spacer(20)+table(ledger(`<strong>Implementación con complementos</strong>`,money(calc.total),t)+ledger(`Anticipo ${v.depositRatio*100} % · saldo a la entrega`,`${money(calc.deposit)} · ${money(calc.balance)}`,t,{last:true}));
 return section(html,t,'padding-top:24px');
}

// Conditions in plain sight, before any deposit.
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
 const html=mark(c,n,total,'Condiciones',t)+heading('Condiciones,\na la vista.',t,{size:44,mb:28})+table(items.map((s,i)=>`<tr><td class="mono" style="width:30px;padding:14px 0;border-top:1px solid ${t.rule};font-family:${FONT.mono};font-size:11px;line-height:22px;color:${t.accent};vertical-align:top">${'abcdefg'[i]}.</td><td style="padding:14px 0;border-top:1px solid ${t.rule};font-family:${FONT.sans};font-size:15px;line-height:22px;color:${t.fg};vertical-align:top">${e(s)}</td></tr>`).join(''),'',`border-bottom:1px solid ${t.rule}`)+p(`<a href="${e(url)}" target="_blank" style="color:${t.fg};text-decoration:underline">Leé las condiciones completas antes del anticipo</a>&nbsp;→`,t,{size:15,lh:22,mb:0,style:'padding-top:22px'});
 return section(html,t,'padding-top:48px;padding-bottom:56px');
}

// Dawn: the sun is out, the next step is the reader's.
export function closing(c,n,total,{primary=true}={}){
 const t=THEME.dawn,b=c.brand;
 const sign=b.sender.confirmed?`${e(b.sender.name)} · Eclipse<br><span style="color:${t.muted}">${e(b.sender.email)}</span>`:`Eclipse <span style="color:${t.muted}">· remitente pendiente de confirmar</span>`;
 const html=mark(c,n,total,'Próximo paso',t)+heading('El próximo paso\nes *tuyo*.',t,{size:56,mb:22})+p('Contanos qué querés resolver primero. Te respondemos con alcance, precio y plazos por escrito, antes de cualquier anticipo.',t,{size:17,lh:28,color:t.muted,mb:32})+button('Hablemos de tu proyecto',b.contactUrl,t,{primary})+spacer(40)+table(`<tr><td width="36" style="width:36px;padding-top:16px;border-top:1px solid ${t.line};vertical-align:top"><img src="${e(asset(c,'mark-light.png'))}" alt="" width="24" height="24" style="display:block;border:0;width:24px;height:24px" /></td><td style="padding-top:16px;border-top:1px solid ${t.line};font-family:${FONT.sans};font-size:15px;line-height:24px;color:${t.fg}">${sign}</td></tr>`);
 return section(html,t,'padding-bottom:8px')+bleed(image(asset(c,'art-dawn.jpg'),'',640,280,{bg:t.bg}),t.bg);
}

export function footer(c){
 const t=THEME.soft;
 return section(p('ECLIPSE',t,{size:12,lh:18,mb:8,style:'letter-spacing:4px;font-weight:500'})+p('Desarrollo, IA y automatización para negocios que no pueden esperar.',t,{size:14,lh:22,color:t.muted,mb:14})+p(`<a href="${e(c.brand.siteUrl)}" target="_blank" style="color:${t.fg};text-decoration:underline">Conocé Eclipse</a>&nbsp;↗`,t,{size:14,lh:22,mb:24})+p('Los negocios que ves en las demos son ficticios. Si preferís no recibir más propuestas, respondé «No recibir más».',t,{size:12,lh:19,color:t.muted,mb:0,style:`padding-top:18px;border-top:1px solid ${t.rule}`}),t,'padding-top:36px;padding-bottom:40px');
}

// Short first contact: the proposal in three readings, then the full version.
export function brief(c,n,total){
 const {product:d,offer:o,calc}=c,t=THEME.dawn,essential=calc.plans.find(x=>x.id==='essential');
 const full=c.mode==='send'?d.presentationUrl:(c.previewFullFile||`${d.id}-${c.prospect.id}-full.html`);
 const rows=ledger(`La demo<br><span style="font-size:14px;line-height:22px;color:${t.muted}">${e(d.name)}, con datos ficticios</span>`,d.customer.url?`<a href="${e(d.customer.url)}" target="_blank" style="color:${t.accent};text-decoration:none">ABRIR ↗</a>`:'—',t,{size:17})+ledger(`${o.type==='pack'?'Pack lanzamiento':'Adaptación de producto'}<br><span style="font-size:14px;line-height:22px;color:${t.muted}">${e(d.includes[0]||'')}</span>`,`desde ${money(calc.base)}`,t,{size:17})+ledger(`Plan mensual<br><span style="font-size:14px;line-height:22px;color:${t.muted}">${o.promotion.enabled?`${o.promotion.months} meses de Esencial bonificados`:'Uno solo, sin cargo por canal'}</span>`,`desde ${money(essential.monthly)}/mes`,t,{size:17,last:true});
 const html=mark(c,n,total,'En corto',t)+heading('La propuesta,\nen tres líneas.',t,{size:48,mb:28})+table(rows,'',`border-top:1px solid ${t.fg}`)+spacer(32)+button('Ver la propuesta completa',full,t,{primary:true})+p('Alcance, precio, plan mensual y condiciones, en una sola página.',t,{size:14,lh:22,color:t.muted,mb:0,style:'padding-top:8px'});
 return section(html,t,'padding-top:24px');
}
