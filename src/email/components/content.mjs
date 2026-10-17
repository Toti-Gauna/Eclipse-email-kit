import {e,p,label,heading,badge,table,row,section,bleed,spacer,mark,button,linkRow,ticks,figure,asset,image,FONT,THEME} from './primitives.mjs';

export function masthead(c,kind='Propuesta'){
 const t=THEME.void;
 return row(table(`<tr><td width="34" style="width:34px"><img src="${e(asset(c,'mark-dark.png'))}" alt="" width="24" height="24" style="display:block;border:0;width:24px;height:24px" /></td><td style="font-family:${FONT.sans};font-size:13px;line-height:20px;font-weight:500;letter-spacing:4px;color:${t.fg}">ECLIPSE</td><td class="mono" align="right" style="font-family:${FONT.mono};font-size:11px;line-height:16px;letter-spacing:1.3px;text-transform:uppercase;color:${t.muted}">${e(kind)} · ${e(c.product.name)}</td></tr>`),`padding:28px 48px 0;background-color:${t.bg}`,'class="pad"');
}

// 01 · Totality: the eclipse of the web, the promise and ONE action (try the demo).
export function hero(c,n,total){
 const {product:d,prospect:q}=c,t=THEME.void;
 const intro=q.reviewed?`Vimos ${q.publicFact}. ${d.intro}`:d.intro;
 const art=bleed(image(asset(c,'art-hero.jpg'),'Eclipse total: la luna cubre el sol y deja ver la corona, dentro del dial de Eclipse.',640,440,{bg:t.bg,style:'text-align:center'}),t.bg);
 let html=mark(c,n,total,d.eyebrow,t)+heading(d.headline,t,{level:1,size:60,mb:28})+p(`Hola, equipo de ${e(q.businessName)}.`,t,{size:18,lh:28,mb:12})+p(e(intro),t,{size:17,lh:28,color:'__ECLIPSE_DIM__',mb:32});
 html+=button(`Probá la demo de ${d.name}`,d.customer.url,t,{primary:true,arrow:'↗'})+label('Datos ficticios · sin registro',t,{mb:0,style:'padding-top:10px'});
 if(q.fictional)html+=p(`${badge('Muestra','__ECLIPSE_ASH__','__ECLIPSE_MIST__')}&nbsp; Ejemplo ficticio · apertura sectorial, sin investigación del negocio.`,t,{size:12,lh:20,color:t.muted,mb:0,style:'padding-top:28px'});
 return art+section(html,t,'padding-top:8px;padding-bottom:64px');
}

// Optional trailer: a still placeholder in preview; omitted from send output until verified.
function trailer(c,t){
 const x=c.product.trailer;if(!x.enabled)return '';
 const ready=x.state==='ready'&&x.verified&&x.posterUrl&&x.trailerUrl;
 if(!ready){if(c.mode==='send')return '';
  return ticks(table(row(`<p class="mono" style="margin:0 0 18px;font-family:${FONT.mono};font-size:11px;line-height:16px;letter-spacing:1.3px;color:${t.muted}">TRAILER · ${e(x.durationSeconds)} S</p><p aria-hidden="true" style="margin:0 0 14px;font-family:${FONT.sans};font-size:30px;line-height:30px;color:__ECLIPSE_CORONA__">▷</p>`+p('Trailer pendiente de incorporar',t,{size:15,lh:22,mb:6})+p('Ver cómo funciona · enlace disponible al incorporar el trailer.',t,{size:12,lh:18,color:t.muted,mb:0}),'padding:40px 24px;text-align:center;background-color:__ECLIPSE_ASH__')),t)+spacer(40);
 }
 return `<a href="${e(x.trailerUrl)}" target="_blank" style="text-decoration:none">${image(x.posterUrl,`Ver cómo funciona ${c.product.name} · ${x.durationSeconds} segundos`,544,306,{bg:t.bg})}</a>`+spacer(16)+button('▶ Ver cómo funciona',x.trailerUrl,t)+spacer(32);
}

// 02 · The demo, read like an instrument: the product, its plates, what it solves, the route.
export function demo(c,n,total){
 const d=c.product,t=THEME.night;
 const specimen=table(`<tr><td style="padding:18px 0;border-top:1px solid ${t.rule};border-bottom:1px solid ${t.rule}"><span style="display:inline-block;width:10px;height:10px;border-radius:5px;background-color:${d.accent};vertical-align:middle"></span>&nbsp;&nbsp;<span class="brand" style="font-family:'${e(d.headingFont)}',${e(d.headingFallback)};font-size:28px;line-height:32px;font-weight:${d.headingWeight};color:${t.fg};vertical-align:middle">${e(d.name)}</span></td><td class="mono" align="right" style="padding:18px 0;border-top:1px solid ${t.rule};border-bottom:1px solid ${t.rule};font-family:${FONT.mono};font-size:11px;line-height:16px;letter-spacing:1.3px;text-transform:uppercase;color:${t.muted}">${e(d.sector)}</td></tr>`,'','margin:0 0 20px');
 let html=mark(c,n,total,'La demo',t)+heading('Mirá un negocio\ncomo el tuyo *funcionando*.',t,{size:46,mb:32})+specimen+p(`${e(d.name)} es un producto que ya funciona. Probalo con datos ficticios: es la base que adaptamos a tu marca.`,t,{color:'__ECLIPSE_DIM__',mb:40});
 html+=trailer(c,t);
 const [first,...rest]=d.screens;
 if(first)html+=figure(c,first,1,'Vista del cliente',t)+spacer(44);
 html+=label('Qué resuelve',t,{mb:4})+table(d.benefits.map((x,i)=>`<tr><td class="mono" style="width:44px;padding:20px 0;border-top:1px solid ${t.line};font-family:${FONT.mono};font-size:12px;line-height:24px;color:${t.accent};vertical-align:top">${String(i+1).padStart(2,'0')}</td><td style="padding:20px 0;border-top:1px solid ${t.line};vertical-align:top">${p(e(x.title),t,{size:18,lh:24,mb:6,style:'font-weight:500'})+p(e(x.text),t,{size:15,lh:24,color:t.muted,mb:0})}</td></tr>`).join(''))+spacer(36);
 rest.forEach((s,i)=>{html+=figure(c,s,i+2,'Vista del equipo',t)+spacer(44)});
 html+=label('El recorrido',t,{mb:16})+table(d.journey.map((x,i)=>`<tr><td aria-hidden="true" style="width:36px;padding:0 0 18px;vertical-align:top"><img src="${e(asset(c,`glyph-${[4,2,0][i]}-dark.png`))}" alt="" width="22" height="22" style="display:block;border:0;width:22px;height:22px" /></td><td style="padding:1px 0 18px;vertical-align:top"><span class="mono" style="font-family:${FONT.mono};font-size:11px;line-height:20px;letter-spacing:1.3px;color:${t.muted}">PASO ${i+1}&nbsp;&nbsp;</span><span style="font-family:${FONT.sans};font-size:16px;line-height:20px;color:${t.fg}">${e(x)}</span></td></tr>`).join(''))+spacer(20);
 const links=[d.customer,d.admin].filter(x=>x.url);
 html+=label('Abrir la demo',t,{mb:0})+(links.length?table(links.map((x,i)=>linkRow(x.label,x.url,t,{first:i===0})).join('')):p('Enlaces de la demo pendientes de verificar.',t,{size:14,color:t.muted,style:'padding-top:12px'}))+p(`${badge('Demo')}&nbsp; ${e(d.demoNote)}`,t,{size:13,lh:21,color:t.muted,mb:0,style:'padding-top:18px'});
 return section(html+gifts(c,t),t,`padding-top:24px;padding-bottom:72px;background-image:linear-gradient(180deg,__ECLIPSE_VOID__ 0,__ECLIPSE_NIGHT__ 220px)`);
}

function gifts(c,t){
 const list=c.product.gifts.filter(x=>x.verified&&x.url&&x.evidence);if(!list.length)return '';
 return spacer(56)+ticks(label('Experiencias de regalo',t,{color:t.accent})+heading('Un regalo también\nes un recorrido.',t,{level:3,size:32,mb:14,cls:'h3'})+p('Abrí estas experiencias de regalo de la demo: son ejemplos ficticios, sin compra ni beneficio real.',t,{size:15,lh:24,color:t.muted,mb:20})+table(list.map((x,i)=>linkRow(x.label,x.url,t,{first:i===0})).join(''))+p('La herramienta se adapta al alcance; premios, costos y operación de campañas se acuerdan aparte.',t,{size:13,lh:21,color:t.muted,mb:0,style:'padding-top:16px'}),t,{pad:28,bg:'__ECLIPSE_ASH__'});
}

// Night → dawn: the sunrise of the web, between the demo and the numbers.
export const sunrise=c=>bleed(image(asset(c,'art-sunrise.jpg'),'',640,176,{bg:'__ECLIPSE_NIGHT__'}),'__ECLIPSE_NIGHT__');
