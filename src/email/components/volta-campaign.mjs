// Campaign-only composition. The original components and USD offer stay unchanged.
import {e,p,label,heading,table,row,section,bleed,spacer,mark,button,ticks,figure,asset,image,FONT,THEME} from './primitives.mjs';
import {trailerReady} from './content.mjs';
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
const paragraphs=(items,t)=>items.map(s=>p(e(s),t,{color:t.muted})).join('');
const block=(c,n,total,title,body,t=THEME.dawn,options={})=>section(mark(c,n,total,title,t)+heading(title,t,{size:44,...options})+body,t);
export function masthead(c){const t=THEME.void;return row(table(`<tr><td class="campaign-brand" style="width:140px;vertical-align:top;font-family:${FONT.sans};font-size:13px;line-height:26px;letter-spacing:3px;color:${t.fg}"><img src="${e(asset(c,'mark-dark.png'))}" alt="" width="24" height="24" style="vertical-align:middle"> ECLIPSE</td><td class="campaign-slogan" style="font-family:${FONT.sans};font-size:15px;line-height:23px;color:${t.fg}">${e(copy.slogan)}</td></tr>`),`padding:28px 48px;background-color:${t.bg}`,'class="pad"')}
export function hero(c,n,total){const t=THEME.void,q=c.prospect;
 const researched=q.reviewed&&!q.fictional&&q.publicFact&&q.sourceUrl&&q.sourceDate&&q.opportunity;
 const observation=q.publicFact.replace(/^Vi\s+/i,'').replace(/[.\s]+$/,'');
 const opening=researched?`Soy Ignacio, de Eclipse, de acá de Mar del Plata. Vi ${observation} y quería mostrarles una idea para ${q.opportunity.replace(/[.\s]+$/,'')}.`:'Soy Ignacio, de Eclipse, de acá de Mar del Plata. Quería mostrarles una idea para presentar una tienda de suplementos y facilitar la compra. Esta es una propuesta sectorial; todavía no investigamos tu negocio.';
 return bleed(image(asset(c,'art-hero.jpg'),'Eclipse total: la luna cubre el sol y deja ver la corona.',640,440,{bg:t.bg}),t.bg)+block(c,n,total,copy.hero,paragraphs([copy.subhero],t)+p(`Hola, equipo de ${e(q.businessName)}:`,t,{size:18})+p(e(opening),t)+(!researched?p('BORRADOR · apertura sectorial sin investigación verificada. El nombre es un dato de preview; no acredita un destinatario real.',t,{size:12,color:t.muted}):''),t,{level:1,size:60});
}
export function trailer(c,n,total){const t=THEME.void,x=c.product.trailer,ready=trailerReady(c);
 const poster=x.posterUrl||asset(c,'poster-volta.jpg');
 const frame=image(poster,'▶ Reproducir el tráiler existente de Volta',544,306,{bg:t.bg});
 return block(c,n,total,'Conocé Volta en acción.',p('Mirá un recorrido de la experiencia antes de explorar la demo.',t)+ticks(x.trailerUrl?`<a href="${e(x.trailerUrl)}" target="_blank">${frame}</a>`:frame,t)+spacer(20)+button('▶ Ver el tráiler',x.trailerUrl,t,{arrow:''})+p(ready?'Duración del archivo: 75,47 segundos.':'BORRADOR · tráiler pendiente de verificación; exportación completa bloqueada.',t,{size:12,color:t.muted})+(!c.offer.resources.trailerCommercialVerified?p('BORRADOR · recurso pendiente de compatibilidad comercial. '+e(c.offer.resources.trailerCommercialNote),t,{size:13,color:t.muted}):''),t);
}
export function solution(c,n,total){const t=THEME.night,d=c.product;
 let body=paragraphs([copy.solution,copy.training,copy.limit],t)+label('Qué incluye',t)+paragraphs(copy.includes,t)+p(e(copy.scope),t,{size:13,color:t.muted});
 const specs=[['La experiencia de tus clientes.','Explorá el catálogo, elegí presentaciones y reuní productos con Armá tu Stack antes de consultar.','Abrir la experiencia del cliente','customer'],['La vista del dueño y su equipo.','Explorá pedidos y preparación con datos de muestra. El panel es una demostración: la operación conectada se define según el alcance contratado.','Abrir el panel de demostración','admin']];
 specs.forEach(([title,caption,link,key],i)=>{body+=spacer(32)+heading(title,t,{level:3,size:32,cls:'h3'})+(d.screens[i]?figure(c,{...d.screens[i],caption},i+1,title,t):p('BORRADOR · captura obligatoria pendiente.',t))+spacer(20)+button(link,d[key].url,t,{arrow:'↗'})});
 body+=p('Datos ficticios · sin pagos ni pedidos reales · panel abierto sin login.',t,{size:13,color:t.muted});
 body+=spacer(32)+heading('Un regalo también puede ser una experiencia.',t,{level:3,size:32,cls:'h3'})+p('Probá los ejemplos de regalos de Volta: distintas formas de presentar un obsequio y dejar que la persona explore su experiencia.',t);
 body+=d.gifts.slice(0,d.featuredGifts).map(g=>button(g.label,g.url,t,{arrow:'↗'})).join('');
 body+=button('Ver todos los regalos de Volta',c.mode==='send'?d.giftsPageUrl:'../../../previews/regalos-volta.html',t,{arrow:'↗'})+p('Ejemplos ficticios, sin compras ni beneficios reales. Qué mecánicas se adaptan, los premios y la operación se acuerdan por escrito.',t,{size:13,color:t.muted});
 if(!c.offer.resources.giftsVerified||!c.offer.resources.giftsPageVerified)body+=p('BORRADOR · revisión de regalos pendiente; se conserva el módulo para revisión.',t,{size:13,color:t.muted});
 return block(c,n,total,'La solución',body,t);
}
export function offer(c,n,total){const t=THEME.dawn,lines=priceLines(c.offer);return block(c,n,total,'Cuánto cuesta y cómo se paga.',p(e(lines[0]),t)+ticks(heading(ars(c.offer.cash),t,{level:3,size:42,cls:'h3'})+p(e(lines[1]),t)+paragraphs(lines.slice(2),t),t,{pad:20,bg:THEME.paper.bg}));}
export function roi(c,n,total){const t=THEME.dawn;return block(c,n,total,'¿Qué tendría que generar para recuperar la inversión?',paragraphs([
 'Lo estimamos con tus números: cuánto te deja cada pedido después de pagar la mercadería y los costos de venderlo, y cuántos pedidos adicionales harían falta para cubrir la implementación y los costos del período.',
 `Ejemplo hipotético: si cada pedido adicional deja ARS 15.000, una implementación de ${ars(c.offer.cash)} equivale a ${c.offer.cash/15000} pedidos adicionales para cubrir su costo inicial. El mantenimiento y otros costos se suman según el período.`,
 'Es un umbral de referencia, no un pronóstico ni una garantía de recuperación.',
 'La contribución descuenta descuentos, comisiones y costos variables; los pedidos son adicionales respecto de la base habitual. Desde el mes 3 se suma mantenimiento y los demás costos del período. Si se financia, se usa el total financiado acordado. Una contribución nula o negativa no permite cubrir la inversión; estimar tiempo requiere un supuesto explícito de pedidos adicionales por mes.'
 ],t));}
export function extras(c,n,total){const t=THEME.dawn;return block(c,n,total,'Para ir más lejos.',paragraphs(['Las ampliaciones se cotizan según alcance y factibilidad. Antes de contratar, te indicamos qué ya está incluido y qué trabajo sería adicional.',copy.whatsapp,'Landing adicional, chatbot IA, integraciones y módulos operativos: a evaluar, no instalados ni incluidos por defecto.'],t)+label('A cotizar según alcance y factibilidad',t));}
export function plans(c,n,total){const t=THEME.dawn,o=c.offer;return block(c,n,total,'Mantenimiento',paragraphs([copy.maintenance,`Meses 1–${o.maintenance.freeMonths}: bonificados. Desde el mes ${o.maintenance.freeMonths+1}: ${ars(o.maintenance.monthly)} por mes.`,copy.start,o.maintenance.start?`Inicio acordado: ${o.maintenance.start}`:'Inicio a acordar por escrito.',copy.thirdParty],t));}
export function process(c,n,total){const t=THEME.dawn;return block(c,n,total,'Cómo seguimos',paragraphs(['Asesoría inicial → propuesta escrita con alcance y condiciones → modalidad de pago acordada → adaptación y revisión → capacitación → mantenimiento.','El portal accesible es una demostración con datos ficticios. La cuenta y el seguimiento productivos se definen en la propuesta.'],t)+button('Ver cómo es tu portal',c.brand.portalUrl,t)+button('Ver más productos de Eclipse',c.brand.productsUrl,t));}
export function conditions(c,n,total){const t=THEME.soft,url=c.mode==='send'?c.offer.conditions.url:`../../../previews/${c.conditionsFile}`;return block(c,n,total,'Condiciones, a la vista.',paragraphs([copy.scope,copy.limit,copy.thirdParty,'La propuesta escrita define implementación, capacitación, mantenimiento, inicio de bonificación y modalidad de pago antes de contratar. No se garantiza recuperación ni ventas.'],t)+button('Leer condiciones de esta campaña',url,t),t);}
export function closing(c,n,total){const t=THEME.dawn,b=c.brand;return block(c,n,total,'Tu primera asesoría gratuita',paragraphs([copy.advice,copy.adviceRoi],t)+button(copy.cta,b.contactUrl,t,{primary:true,arrow:''})+p(copy.support,t,{size:14})+spacer(28)+p('Ignacio · Eclipse<br>Mar del Plata',t)+p(b.sender.confirmed?e(b.sender.email):'BORRADOR · contacto y remitente pendientes de confirmar.',t,{size:13,color:t.muted}))+bleed(image(asset(c,'art-dawn.jpg'),'',640,280,{bg:t.bg}),t.bg);}
export function brief(c,n,total){const t=THEME.dawn;return block(c,n,total,'La propuesta, en breve.',paragraphs([copy.solution,...priceLines(c.offer),copy.start,copy.limit],t)+button('Ver la propuesta completa',c.mode==='send'?c.product.presentationUrl:(c.previewFullFile||`${c.product.id}-${c.prospect.id}-full.html`),t)+button('Leer condiciones de esta campaña',c.mode==='send'?c.offer.conditions.url:`../../../previews/${c.conditionsFile}`,t)+button('Abrir la experiencia del cliente',c.product.customer.url,t)+button('Abrir el panel de demostración',c.product.admin.url,t)+button('Ver todos los regalos de Volta',c.mode==='send'?c.product.giftsPageUrl:'../../../previews/regalos-volta.html',t));}
