// Campaign-only composition. The original components and USD offer stay unchanged.
import {e,p,label,heading,table,row,section,bleed,spacer,mark,button,ticks,figure,asset,image,FONT,THEME} from './primitives.mjs';
import {trailerReady,trailerHref,trailerPoster} from './content.mjs';
export const ars=n=>`ARS ${new Intl.NumberFormat('es-AR',{maximumFractionDigits:0}).format(n)}`;
export const copy={
 slogan:'Eclipse. Potenciamos tus ventas y hacemos que tus clientes vuelvan.',
 hero:'Tu negocio, distinto del resto.',
 subhero:'Presentá mejor tus productos, facilitá la compra y dales a tus clientes motivos para volver.',
 solution:'En Eclipse combinamos una tienda adaptada a tu negocio con asesoría inicial de marketing digital y herramientas de fidelización.',
 training:'También revisamos qué tareas repetitivas conviene automatizar, como algunos seguimientos por WhatsApp, y capacitamos a vos y a tu equipo para aprovechar el sistema y usar inteligencia artificial: preparar mensajes, presentar mejor los productos y agilizar tareas del día a día.',
 limit:'La propuesta incluye una instancia inicial de asesoría y capacitación, con alcance acordado por escrito. Evaluar automatizaciones no implica que su desarrollo esté incluido. Nuevas integraciones, gestión continua de campañas, contenido periódico y ampliaciones se cotizan aparte.',
 whatsapp:'Definimos qué mensaje tendría sentido enviar, cuándo y a clientes que acepten recibirlo. La integración y su operación se evalúan antes de cotizar; no incluye por defecto chatbot, WhatsApp API ni mensajes ilimitados.',
 maintenance:'Mantenimiento del alcance implementado y ajustes menores acordados. No incluye desarrollo ilimitado, nuevas integraciones ni gestión permanente de marketing.',
 start:'El inicio del período bonificado y el alcance preciso del mantenimiento quedan establecidos en la propuesta antes de contratar.',
 thirdParty:'Dominio, servicios de terceros, mensajería y consumos aplicables se detallan por separado según la solución; no se agregan cargos sin acordarlos.',
 scope:'Una marca/sede, hasta 25 productos aportados, variantes y mecánicas estándar acordadas. Cobro online, backend, pedidos guardados, automatizaciones y administración conectada se cotizan aparte. Premios y operación de campañas también.',
 advice:'Te ofrecemos una primera asesoría gratuita de 15 minutos. Revisamos cómo trabajan hoy, te llevás una recomendación inicial y te mostramos qué podría servirle de Volta a tu negocio.',
 adviceRoi:'También podemos estimar, con tus números, cuántas ventas adicionales necesitarías para recuperar la inversión.',
 cta:'Quiero mi asesoría gratuita',support:'15 minutos · sin obligación de contratar.',
 includes:['Tienda adaptada a tu marca y al alcance acordado.','Asesoría inicial de marketing digital y una recomendación de fidelización.','Evaluación de tareas repetitivas que convenga automatizar.','Capacitación inicial para el dueño y su equipo sobre el sistema y usos cotidianos de IA.','Evaluación de recuperación de inversión con los números del negocio.','Dos meses iniciales de mantenimiento bonificados.']
};
export const priceLines=o=>[
 `Precio de referencia del paquete: ${ars(o.reference)}.`,
 `Precio al contado: ${ars(o.cash)}.`,
 `${(1-o.cash/o.reference)*100}% de descuento respecto del precio de referencia.`,
 `Dos meses iniciales de mantenimiento bonificados. Desde el tercer mes: ${ars(o.maintenance.monthly)} mensuales.`,
 `Podemos evaluar hasta cuatro cuotas con recargo. Antes de contratar, dejamos por escrito el valor de cada cuota, el total financiado, los vencimientos y los costos adicionales.`
];
const paragraphs=(items,t)=>items.map(s=>p(e(s),t,{color:t.muted,size:15})).join('');
const block=(c,n,total,title,body,t=THEME.dawn)=>row(label(String(n).padStart(2,'0')+' /',t)+heading(title,t,{level:title===copy.hero?1:2,size:30,cls:"v-title"})+body,`padding:26px 32px;background-color:${t.bg};border-bottom:1px solid ${t.line}`,'class="pad"');
const action=(text,url,t,primary=false)=>url?`<p style="margin:14px 0"><a href="${e(url)}" style="display:inline-block;padding:14px 20px;border:1px solid ${primary?'#b47d14':t.muted};border-radius:8px;background-color:${primary?'#f6bb43':t.bg};color:${primary?'#17120a':t.fg};font-family:${FONT.sans};font-size:14px;line-height:20px;font-weight:700;text-decoration:none">${e(text)}</a></p>`:'';
export function masthead(c){const t=THEME.void;return row(p(`<img src="${e(asset(c,'mark-dark.png'))}" alt="" width="24" height="24"> ECLIPSE`,t,{size:16})+p(e(copy.slogan),t,{size:13}),`padding:24px 32px;background-color:${t.bg}`,'class="pad"')}
export function hero(c,n,total){const t=THEME.void,q=c.prospect;
 const researched=q.reviewed&&!q.fictional&&q.publicFact&&q.sourceUrl&&q.sourceDate&&q.opportunity;
 const opening=researched?`Vi ${q.publicFact.replace(/^Vi\s+/i,'').replace(/[.\s]+$/,'')} y quería mostrarles una idea para ${q.opportunity.replace(/[.\s]+$/,'')}.`:'Te comparto una idea para tu tienda de suplementos. Borrador sectorial, sin investigación del negocio.';
 return bleed(image(asset(c,'art-hero.jpg'),'La corona de un eclipse',640,440,{bg:t.bg}),t.bg)+block(c,n,total,copy.hero,p(`Hola, equipo de ${e(q.businessName)}:`,t,{size:15})+p('Soy Ignacio, de Eclipse, Mar del Plata. '+e(opening),t,{size:15})+p(e(copy.subhero),t,{size:17}),t);
}
export function trailer(c,n,total){const t=THEME.void,x=c.product.trailer;
 return block(c,n,total,'Conocé Volta en acción.',`<a href="${e(trailerHref(c))}">${image(trailerPoster(c)||asset(c,'poster-volta-cliente-inicio.jpg'),'Reproducir el tráiler de Volta',544,306,{bg:t.bg})}</a>`+action('▷ Ver el tráiler',trailerHref(c),t,true)+(!c.offer.resources.trailerCommercialVerified?p('Tráiler de referencia · condiciones comerciales en revisión.',t,{size:12,color:t.muted}):''),t);
}
// More screens of the same view, two by two (they stack on phones).
const thumbs=(c,list,t)=>{if(!list.length)return '';const cell=(x,side)=>`<td class="col2" width="50%" valign="top" style="width:50%;padding:0 ${side==='l'?8:0}px 20px ${side==='l'?0:8}px">${x?image(asset(c,x.file),x.alt,264,184,{bg:t.bg,cls:'fig2',style:'width:100%;max-width:100%'})+p(e(x.caption),t,{size:12,lh:18,color:t.muted,mb:0,style:'padding-top:8px'}):''}</td>`;const rows=[];for(let i=0;i<list.length;i+=2)rows.push(`<tr>${cell(list[i],'l')}${cell(list[i+1],'r')}</tr>`);return spacer(12)+table(rows.join(''))};
export function solution(c,n,total){const t=THEME.night,d=c.product;
 let body=table(`<tr><td style="padding:14px;background:#1c1d25;border-left:3px solid #f6bb43">${p('Tienda adaptada a tu marca',t,{size:16})+p('Marketing y fidelización · capacitación en el sistema e IA · evaluación de automatizaciones y recuperación de inversión.',t,{size:14})}</td></tr>`)+spacer(20);
 const chapterBody=(ch,k)=>{
  const list=ch.screens.map(f=>d.screens.find(x=>x.file===f)),[lead,...more]=list,links=ch.links.filter(x=>x.url&&(c.mode!=='send'||x.verified));
  const all=c.mode==='send'?d.giftsPageUrl:'../../../previews/regalos-volta.html',gl=ch.gifts?d.gifts.filter(g=>g.url&&g.verified):[];
  return label(`${String(k+1).padStart(2,'0')} · ${ch.tag}`,t,{mb:6})+heading(ch.title,t,{level:3,size:25,cls:'v-title'})+p(e(ch.text),t,{size:14,color:t.muted})+(ch.bullets.length?`<ul style="margin:0 0 14px;padding:0 0 0 18px;color:${t.fg};font-size:14px;line-height:22px">${ch.bullets.map(b=>`<li>${e(b)}</li>`).join('')}</ul>`:'')+image(asset(c,lead.file),lead.alt,544,340,{bg:t.bg})+p(e(lead.caption),t,{size:12,lh:18,color:t.muted,mb:0,style:'padding-top:8px'})+thumbs(c,more,t)+(gl.length?p(gl.slice(0,d.featuredGifts).map(g=>`<a href="${e(g.url)}" style="color:${t.fg}">${e(g.label)}</a>`).join(' · '),t,{size:14})+action(`Ver todos los regalos de ${d.name}`,all,t):'')+links.map(x=>action(x.label,x.url,t)).join('')+(ch.note?p(e(ch.note),t,{size:12,color:t.muted}):'');
 };
 body+=d.chapters.map(chapterBody).join('');
 body+=heading('Costos y márgenes.',t,{level:3,size:25,cls:'v-title'})+image(asset(c,'volta-costs.jpg'),'Demostración de costos y margen por producto con datos ficticios',544,340,{bg:t.bg})+action('Ver costos y margen',d.admin.url+'costos/',t)+p('Demo con datos ficticios, sin pagos ni pedidos reales; panel abierto. Margen de producto sin impuestos ni comisiones.',t,{size:12,color:t.muted});
 return block(c,n,total,'Así se ve tu próxima tienda.',body,t);
}
export function offer(c,n,total){const t=THEME.dawn;return block(c,n,total,'Cuánto cuesta y cómo se paga.',p(`Referencia: <s>${ars(c.offer.reference)}</s> · 50% de descuento aplicado.`,t,{size:14})+label('TOTAL FINAL AL CONTADO · PAGO ÚNICO',t)+heading(ars(c.offer.cash),t,{level:3,size:44,cls:'v-price'})+p('Precio al contado final. El descuento ya está aplicado.',t,{size:14})+p('Hasta 4 cuotas con recargo: a evaluar y cotizar por escrito.',t,{size:14}));}
export function roi(c,n,total){const t=THEME.dawn;return block(c,n,total,'¿Qué tendría que generar?',p('Ejemplo hipotético: ARS 375.000 ÷ ARS 15.000 de contribución por pedido = 25 pedidos adicionales. Se suman mantenimiento y otros costos. No es un pronóstico ni garantía.',t,{size:14}));}
export function extras(c,n,total){return block(c,n,total,'Para ir más lejos.',p('Integraciones, automatizaciones y gestión continua: a cotizar según alcance y factibilidad. WhatsApp API y mensajes ilimitados no incluidos.',THEME.dawn,{size:14}));}
export function plans(c,n,total){return block(c,n,total,'Mantenimiento',p('Meses 1–2 bonificados. Desde el mes 3: ARS 50.000/mes. Ajustes menores acordados; inicio por escrito. Servicios de terceros aparte, previo acuerdo.',THEME.dawn,{size:14}));}
export function process(c,n,total){return block(c,n,total,'Cómo seguimos',p('Asesoría → propuesta y pago acordados → adaptación y revisión → capacitación → mantenimiento.',THEME.dawn,{size:14})+action('Explorar el portal demo',c.brand.portalUrl,THEME.dawn));}
export function conditions(c,n,total){return block(c,n,total,'El alcance, claro.',p('Una marca/sede y hasta 25 productos aportados. Desarrollo, pagos y administración conectada se cotizan aparte. Alcance y capacitación por escrito.',THEME.soft,{size:13})+action('Leer condiciones completas',c.mode==='send'?c.offer.conditions.url:`../../../previews/${c.conditionsFile}`,THEME.soft),THEME.soft);}
export function closing(c,n,total){const t=THEME.dawn;return block(c,n,total,'Contáctanos',p('Revisemos tu negocio y una mejora concreta en una asesoría gratuita.',t,{size:16})+action(copy.cta,c.brand.contactUrl,t,true)+action('Ver Eclipse',c.brand.siteUrl,t)+p(copy.support,t,{size:13})+`<!--CONTACT_START-->`+p(bContact(c),t,{size:13})+`<!--CONTACT_END-->`+p('Ignacio · Eclipse · Mar del Plata',t,{size:14}));}
export function brief(c,n,total){const t=THEME.dawn;return block(c,n,total,'Explorá Volta',action('Ver propuesta completa',c.mode==='send'?c.product.presentationUrl:c.previewFullFile,t)+action('Explorar la tienda',c.product.customer.url,t)+action('Explorar el panel',c.product.admin.url,t)+action('Ver todos los regalos de Volta',c.mode==='send'?c.product.giftsPageUrl:'../../../previews/regalos-volta.html',t)+action('Leer condiciones completas',c.mode==='send'?c.offer.conditions.url:`../../../previews/${c.conditionsFile}`,t));}

function bContact(c){return c.brand.sender.confirmed?e(c.brand.sender.email):'Contacto pendiente · completá tu email y teléfono en la galería.'}
export function footer(c){return row(p('Si preferís no recibir más propuestas, respondé «No recibir más».',THEME.soft,{size:12}),`padding:20px 32px;background-color:${THEME.soft.bg}`,'class="pad"')}
