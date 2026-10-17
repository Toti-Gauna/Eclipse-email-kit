import {e,p,label,heading,badge,table,row,section,bleed,spacer,mark,button,ticks,figure,asset,image,FONT,THEME} from './primitives.mjs';

export function masthead(c,kind='Propuesta'){
 const t=THEME.void;
 return row(table(`<tr><td width="34" style="width:34px"><img src="${e(asset(c,'mark-dark.png'))}" alt="" width="24" height="24" style="display:block;border:0;width:24px;height:24px" /></td><td style="font-family:${FONT.sans};font-size:13px;line-height:20px;font-weight:500;letter-spacing:4px;color:${t.fg}">ECLIPSE</td><td class="mono" align="right" style="font-family:${FONT.mono};font-size:11px;line-height:16px;letter-spacing:1.3px;text-transform:uppercase;color:${t.muted}">${e(kind)} · ${e(c.product.name)}</td></tr>`),`padding:28px 48px 0;background-color:${t.bg}`,'class="pad"');
}

// 01 · Brief: the eclipse of the web and two lines. «Vimos…» only with a researched, sourced fact.
export function hero(c,n,total){
 const {product:d,prospect:q}=c,t=THEME.void;
 const brief=q.reviewed?`Vimos ${q.publicFact}. ${d.brief}`:d.brief;
 const art=bleed(image(asset(c,'art-hero.jpg'),'Eclipse total: la luna cubre el sol y deja ver la corona, dentro del dial de Eclipse.',640,440,{bg:t.bg}),t.bg);
 let html=mark(c,n,total,d.eyebrow,t)+heading(d.headline,t,{level:1,size:60,mb:28})+p(`Hola, equipo de ${e(q.businessName)}.`,t,{size:18,lh:28,mb:12})+p(e(brief),t,{size:18,lh:29,color:'__ECLIPSE_DIM__',mb:0});
 if(q.fictional)html+=p(`${badge('Muestra','__ECLIPSE_ASH__','__ECLIPSE_MIST__')}&nbsp; Ejemplo ficticio · apertura sectorial, sin investigación del negocio.`,t,{size:12,lh:20,color:t.muted,mb:0,style:'padding-top:28px'});
 return art+section(html,t,'padding-top:8px;padding-bottom:64px');
}

// The trailer slot exists in preview (static poster while pending) and in send output only
// once both URLs are verified: no dead play buttons.
export function trailerReady(c){const x=c.product.trailer;return x.enabled&&x.state==='ready'&&x.verified&&!!x.posterUrl&&!!x.trailerUrl}
export const trailerShown=c=>c.product.trailer.enabled&&(trailerReady(c)||c.mode!=='send');

// 02 · The trailer: 60 s of motion graphics that walk through every part of the business.
export function trailer(c,n,total){
 const d=c.product,x=d.trailer,t=THEME.void,ready=trailerReady(c);
 const head=table(`<tr><td class="mono" style="font-family:${FONT.mono};font-size:11px;line-height:16px;letter-spacing:1.3px;color:${t.muted}">TRAILER · ${e(x.durationSeconds)} S</td><td class="mono" align="right" style="font-family:${FONT.mono};font-size:11px;line-height:16px;letter-spacing:1.3px;color:${t.accent}">MOTION GRAPHICS · CON MÚSICA</td></tr>`,'','margin:0 0 12px');
 const screen=d.screens[0];
 let frame;
 if(ready)frame=`<a href="${e(x.trailerUrl)}" target="_blank" style="text-decoration:none">${image(x.posterUrl,`Ver cómo funciona ${d.name} · ${x.durationSeconds} segundos`,544,306,{bg:t.bg})}</a>`;
 else if(screen)frame=image(asset(c,`poster-${screen.file}`),`Póster de muestra del trailer de ${d.name}`,544,306,{bg:t.bg});
 else frame=table(row(`<p aria-hidden="true" style="margin:0;font-family:${FONT.sans};font-size:34px;line-height:34px;color:__ECLIPSE_CORONA__">▷</p>`,'padding:110px 24px;text-align:center;background-color:__ECLIPSE_ASH__'));
 let html=mark(c,n,total,'El trailer',t)+heading(`${d.name}, en *${x.durationSeconds} segundos*.`,t,{size:46,mb:20})+p(`Sesenta segundos de motion graphics, con música, que recorren todo ${e(d.name)}: lo que vive tu cliente, lo que ve tu equipo y cómo se conecta cada parte. Pensado para el celular y para la compu.`,t,{size:17,lh:28,color:'__ECLIPSE_DIM__',mb:36})+head+ticks(frame,t);
 html+=ready?spacer(24)+button('▶ Ver cómo funciona',x.trailerUrl,t,{primary:true,arrow:''}):p('Trailer pendiente de incorporar · el póster es una vista previa estática.',t,{size:13,lh:20,color:t.muted,mb:4,style:'padding:14px 10px 0'})+p('Ver cómo funciona · enlace disponible al incorporar el trailer.',t,{size:12,lh:18,color:t.muted,mb:0,style:'padding:0 10px'});
 return section(html,t,'padding-top:8px;padding-bottom:72px');
}

// Pill buttons, one under the other: they keep their size on any screen.
const buttons=(list,t,primaryFirst)=>list.map((x,i)=>button(x.label,x.url,t,{primary:primaryFirst&&i===0,arrow:'↗'})).join('');

// 03 · The solution: the product, what it solves, the advice around it and both views to try.
export function solution(c,n,total){
 const d=c.product,t=THEME.night;
 const specimen=table(`<tr><td style="padding:18px 0;border-top:1px solid ${t.rule};border-bottom:1px solid ${t.rule}"><span style="display:inline-block;width:10px;height:10px;border-radius:5px;background-color:${d.accent};vertical-align:middle"></span>&nbsp;&nbsp;<span class="brand" style="font-family:'${e(d.headingFont)}',${e(d.headingFallback)};font-size:28px;line-height:32px;font-weight:${d.headingWeight};color:${t.fg};vertical-align:middle">${e(d.name)}</span></td><td class="mono" align="right" style="padding:18px 0;border-top:1px solid ${t.rule};border-bottom:1px solid ${t.rule};font-family:${FONT.mono};font-size:11px;line-height:16px;letter-spacing:1.3px;text-transform:uppercase;color:${t.muted}">${e(d.sector)}</td></tr>`,'','margin:0 0 20px');
 const index=items=>table(items.map((x,i)=>`<tr><td class="mono" style="width:44px;padding:20px 0;border-top:1px solid ${t.line};font-family:${FONT.mono};font-size:12px;line-height:24px;color:${t.accent};vertical-align:top">${String(i+1).padStart(2,'0')}</td><td style="padding:20px 0;border-top:1px solid ${t.line};vertical-align:top">${p(e(x.title),t,{size:18,lh:24,mb:6,style:'font-weight:500'})+(x.tag?label(x.tag,t,{color:t.accent,mb:6}):'')+p(e(x.text),t,{size:15,lh:24,color:t.muted,mb:0})}</td></tr>`).join(''));
 let html=mark(c,n,total,'La solución',t)+heading('Un producto que ya funciona,\ncon *tu* marca.',t,{size:46,mb:32})+specimen+p(e(d.intro),t,{color:'__ECLIPSE_DIM__',mb:40});
 const [first,...rest]=d.screens;
 if(first)html+=figure(c,first,1,d.customer.label,t)+spacer(44);
 html+=label('Qué resuelve',t,{mb:4})+index(d.benefits)+spacer(36);
 rest.forEach((s,i)=>{html+=figure(c,s,i+2,d.admin.label,t)+spacer(44)});
 html+=label('El recorrido',t,{mb:16})+table(d.journey.map((x,i)=>`<tr><td aria-hidden="true" style="width:36px;padding:0 0 18px;vertical-align:top"><img src="${e(asset(c,`glyph-${[4,2,0][i]}-dark.png`))}" alt="" width="22" height="22" style="display:block;border:0;width:22px;height:22px" /></td><td style="padding:1px 0 18px;vertical-align:top"><span class="mono" style="font-family:${FONT.mono};font-size:11px;line-height:20px;letter-spacing:1.3px;color:${t.muted}">PASO ${i+1}&nbsp;&nbsp;</span><span style="font-family:${FONT.sans};font-size:16px;line-height:20px;color:${t.fg}">${e(x)}</span></td></tr>`).join(''))+spacer(44);
 // Eclipse's advice around the software. What the offer includes says so; the rest points to its
 // price. Finance carries the web's availability note until data/brand.json confirms who gives it.
 const inc=c.calc.included,pack=c.offer.type==='pack',v=c.prices;
 const tag=(id,extra='')=>pack||inc.includes(id)?`Incluida en tu propuesta${extra}`:`Pieza extra · USD ${v.extras[id].price}${extra}`;
 const finance=c.brand.economicAdvisor.confirmed?'':' · sujeta a validación';
 html+=ticks(label('Además del software',t,{color:t.accent})+heading('No te dejamos\nsolo con la herramienta.',t,{level:3,size:34,mb:10,cls:'h3'})+p('Una herramienta rinde cuando hay una estrategia detrás. Por eso la propuesta viene con asesoría.',t,{size:15,lh:24,color:t.muted,mb:8})+index([{title:'Growth marketing',tag:tag('growth'),text:'Ordenamos tu propuesta y tus mensajes, y definimos la primera acción para conseguir clientes, con una métrica para medirla.'},{title:'Retención de clientes',tag:tag('growth'),text:`Diseñamos cómo usar la gamificación de ${d.name}, que ya viene incluida, para que tus clientes vuelvan más seguido.`},{title:'Finanzas',tag:tag('economics',finance),text:'Costos, márgenes y escenarios con tus datos, para decidir con números. Sin asesoramiento contable, tributario ni de inversiones.'}]),t,{pad:28,bg:'__ECLIPSE_ASH__'})+spacer(48);
 const views=[d.customer,d.admin].filter(x=>x.url);
 html+=label('Probalo vos',t,{mb:16})+(views.length?buttons(views,t,true):p('Enlaces de la demo pendientes de verificar.',t,{size:14,color:t.muted}))+label('Datos ficticios · sin registro',t,{mb:0,style:'padding-top:8px'})+p(`${badge('Demo')}&nbsp; ${e(d.demoNote)}`,t,{size:13,lh:21,color:t.muted,mb:0,style:'padding-top:18px'});
 return section(html+gifts(c,t),t,`padding-top:24px;padding-bottom:72px;background-image:linear-gradient(180deg,__ECLIPSE_VOID__ 0,__ECLIPSE_NIGHT__ 220px)`);
}

// Ecommerce demos carry gift experiences: the featured ones as pill buttons that wrap like the
// web's chips, and one button to the screen with all of them (previews/regalos-<id>.html).
const chip=(x,t)=>`<a href="${e(x.url)}" target="_blank" style="display:inline-block;margin:0 6px 10px 0;padding:11px 18px;border:1px solid ${t.rule};border-radius:22px;font-family:${FONT.sans};font-size:14px;line-height:20px;font-weight:500;color:${t.fg};text-decoration:none;white-space:nowrap">${e(x.label)}&nbsp;&nbsp;<span style="color:${t.accent}">↗</span></a>`;
function gifts(c,t){
 const d=c.product,list=d.gifts.filter(x=>x.verified&&x.url&&x.evidence);if(!list.length)return '';
 const all=c.mode==='send'?d.giftsPageUrl:`../../../previews/regalos-${d.id}.html`;
 const box={...t,bg:'__ECLIPSE_ASH__'};
 return spacer(56)+ticks(label(`Regalos de la demo · ${list.length}`,t,{color:t.accent})+heading('Un regalo también\nes una experiencia.',t,{level:3,size:32,mb:14,cls:'h3'})+p(`En ${e(d.name)}, regalar se abre como un evento: por ocasión, con sabor a elección o como gift card. Probá algunos:`,t,{size:15,lh:24,color:t.muted,mb:20})+`<p style="margin:0 0 14px;line-height:20px">${list.slice(0,d.featuredGifts).map(x=>chip(x,box)).join('')}</p>`+(all?button(`Ver todos los regalos de ${d.name}`,all,box,{primary:true}):'')+p('Personas y regalos ficticios, sin compra ni beneficio real. Premios, costos y operación de campañas se acuerdan aparte.',t,{size:13,lh:21,color:t.muted,mb:0,style:'padding-top:14px'}),t,{pad:28,bg:'__ECLIPSE_ASH__'});
}

// Night → white: one long seamless fade with the first light behind it, between the product
// and the numbers (scripts/render-transition.mjs). Its edges equal the flat colors around it.
export const sunrise=c=>bleed(image(asset(c,'art-transition.jpg'),'',640,320,{bg:'__ECLIPSE_NIGHT__'}),'__ECLIPSE_NIGHT__');
