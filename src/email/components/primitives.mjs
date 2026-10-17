// Building blocks of the Eclipse email: tables, inline styles and the instrument language of
// the web (mono section marks, serif display, hairlines, ledgers, registration ticks).
// Colors are token slots (__ECLIPSE_X__) resolved at build time by src/theme.mjs.
export const e=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const money=n=>`USD ${n}`;
export const FONT={serif:"'Instrument Serif',Georgia,'Times New Roman',serif",sans:"'Geist',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif",mono:"'Geist Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,'Liberation Mono',monospace"};
// One palette per section theme, like .theme-dark / .theme-light on the site.
const dark={fg:'__ECLIPSE_DAWN__',muted:'__ECLIPSE_MIST__',accent:'__ECLIPSE_CORONA__',line:'__ECLIPSE_HAIRDARK__',rule:'__ECLIPSE_RULEDARK__',glyph:'dark'};
const light={fg:'__ECLIPSE_INK__',muted:'__ECLIPSE_MUTED__',accent:'__ECLIPSE_DEEP__',line:'__ECLIPSE_HAIRLIGHT__',rule:'__ECLIPSE_RULELIGHT__',glyph:'light'};
export const THEME={void:{...dark,bg:'__ECLIPSE_VOID__'},night:{...dark,bg:'__ECLIPSE_NIGHT__'},dawn:{...light,bg:'__ECLIPSE_DAWN__'},soft:{...light,bg:'__ECLIPSE_SOFT__'},paper:{...light,bg:'__ECLIPSE_PAPER__'}};

export const table=(content,extra='',style='')=>`<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" ${extra} style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;${style}">${content}</table>`;
export const row=(content,style='',extra='')=>`<tr><td ${extra} style="${style}">${content}</td></tr>`;
export const spacer=h=>`<div aria-hidden="true" style="height:${h}px;line-height:${h}px;font-size:1px">&nbsp;</div>`;
export const section=(html,t,style='')=>row(html,`padding:56px 48px;background-color:${t.bg};color:${t.fg};${style}`,'class="pad"');
export const bleed=(html,bg)=>row(html,`padding:0;background-color:${bg};font-size:0;line-height:0`);

// Text. *word* in display copy becomes the one italic amber keyword of the section.
const rich=(s,accent)=>e(s).replace(/\*([^*\n]+)\*/g,`<em style="font-style:italic;font-weight:400;color:${accent}">$1</em>`).replace(/\n/g,'<br>');
export const p=(s,t,{size=16,lh=26,color=t.fg,mb=16,style=''}={})=>`<p style="margin:0 0 ${mb}px;font-family:${FONT.sans};font-size:${size}px;line-height:${lh}px;color:${color};${style}">${s}</p>`;
export const label=(s,t,{color=t.muted,mb=12,style=''}={})=>`<p class="mono" style="margin:0 0 ${mb}px;font-family:${FONT.mono};font-size:11px;line-height:16px;letter-spacing:1.3px;text-transform:uppercase;color:${color};${style}">${e(s)}</p>`;
export const heading=(s,t,{level=2,size=48,mb=22,cls=level===1?'h1':'h2'}={})=>`<h${level} class="serif ${cls}" style="margin:0 0 ${mb}px;font-family:${FONT.serif};font-size:${size}px;line-height:${Math.round(size*1.04)}px;font-weight:400;letter-spacing:${(size*-0.02).toFixed(1)}px;color:${t.fg};overflow-wrap:break-word">${rich(s,t.accent)}</h${level}>`;
export const badge=(s,bg='__ECLIPSE_CORONA__',fg='__ECLIPSE_VOID__')=>`<span class="mono" style="display:inline-block;padding:3px 8px;border-radius:10px;background-color:${bg};color:${fg};font-family:${FONT.mono};font-size:10px;line-height:14px;font-weight:600;letter-spacing:1.4px;text-transform:uppercase;white-space:nowrap">${e(s)}</span>`;

export const asset=(c,file)=>c.mode==='send'?`${c.brand.assetBaseUrl.replace(/\/$/,'')}/${file}`:`../../../assets/${file}`;
export const image=(src,alt,w,h,{bg='__ECLIPSE_NIGHT__',color='__ECLIPSE_MIST__',style=''}={})=>`<img src="${e(src)}" alt="${e(alt)}" width="${w}" height="${h}" style="display:block;border:0;outline:none;width:100%;max-width:${w}px;height:auto;background-color:${bg};color:${color};font-family:${FONT.sans};font-size:13px;line-height:20px;${style}" />`;

// Section mark: «02 ──── ◐ LA DEMO». The glyph's phase walks from totality (first section)
// to the full sun (last), as the page index does on the web.
export function mark(c,n,total,text,t){
 const k=Math.round((total-n)/Math.max(1,total-1)*6);
 return table(`<tr><td class="mono" style="width:22px;font-family:${FONT.mono};font-size:11px;line-height:16px;color:${t.fg};white-space:nowrap">${String(n).padStart(2,'0')}</td><td aria-hidden="true" style="width:40px;padding:0 12px"><div style="height:1px;line-height:1px;font-size:1px;background-color:${t.rule}">&nbsp;</div></td><td aria-hidden="true" style="width:14px;padding-right:10px"><img src="${e(asset(c,`glyph-${k}-${t.glyph}.png`))}" alt="" width="14" height="14" style="display:block;border:0;width:14px;height:14px" /></td><td class="mono" style="font-family:${FONT.mono};font-size:11px;line-height:16px;letter-spacing:1.3px;text-transform:uppercase;color:${t.muted}">${e(text)}</td></tr>`,'','width:auto;margin:0 0 28px');
}

// Pill buttons: amber = THE action of the viewport; ghost = secondary. Without a URL the
// preview shows where the action will go (send mode never gets there: gates block it).
export function button(text,url,t,{primary=false,arrow='→'}={}){
 if(!url)return table(`<tr><td style="padding:14px 24px;border:1px dashed ${t.rule};border-radius:28px;font-family:${FONT.sans};font-size:15px;line-height:20px;color:${t.muted};text-align:center">${e(text)} <span class="mono" style="font-family:${FONT.mono};font-size:10px;letter-spacing:1.3px">· PENDIENTE</span></td></tr>`,'class="btn"','width:auto;border-collapse:separate;margin:0 0 8px');
 const bg=primary?'__ECLIPSE_CORONA__':t.bg,fg=primary?'__ECLIPSE_VOID__':t.fg,border=primary?'__ECLIPSE_CORONA__':t.rule;
 return table(`<tr><td align="center" bgcolor="${bg}" style="border:1px solid ${border};border-radius:28px;mso-padding-alt:15px 28px"><a href="${e(url)}" target="_blank" style="display:block;padding:15px 28px;border-radius:28px;background-color:${bg};color:${fg};font-family:${FONT.sans};font-size:15px;line-height:20px;font-weight:600;text-decoration:none;text-align:center;mso-padding-alt:0"><!--[if mso]><i style="mso-font-width:150%;mso-text-raise:22pt" hidden>&emsp;</i><![endif]--><span style="mso-text-raise:11pt">${e(text)}&nbsp;&nbsp;${arrow}</span><!--[if mso]><i style="mso-font-width:150%" hidden>&emsp;&#8203;</i><![endif]--></a></td></tr>`,'class="btn"','width:auto;border-collapse:separate;margin:0 0 8px');
}

// Ledger line: name on the left, a reading on the right, a dotted rule under both.
export const ledger=(left,right,t,{sub='',size=16,last=false}={})=>`<tr><td style="padding:14px 16px 14px 0;border-bottom:1px ${last?'solid':'dotted'} ${t.rule};font-family:${FONT.sans};font-size:${size}px;line-height:24px;color:${t.fg};vertical-align:top">${left}${sub?`<br><span style="font-size:13px;line-height:20px;color:${t.muted}">${sub}</span>`:''}</td><td class="mono" align="right" style="padding:14px 0;border-bottom:1px ${last?'solid':'dotted'} ${t.rule};font-family:${FONT.mono};font-size:${size}px;line-height:24px;color:${t.fg};white-space:nowrap;vertical-align:top;text-align:right">${right}</td></tr>`;

// Link row of an index list: the whole line opens the destination.
export const linkRow=(text,url,t,{tag='ABRIR ↗',first=false}={})=>`<tr><td style="padding:17px 0;${first?`border-top:1px solid ${t.rule};`:''}border-bottom:1px solid ${t.rule}"><a href="${e(url)}" target="_blank" style="display:block;font-family:${FONT.sans};font-size:16px;line-height:22px;color:${t.fg};text-decoration:none"><span class="mono" aria-hidden="true" style="float:right;padding-left:12px;font-family:${FONT.mono};font-size:11px;line-height:22px;letter-spacing:1.3px;color:${t.accent}">${e(tag)}</span>${e(text)}</a></td></tr>`;

// A frame with registration marks on its four corners (the .ticks of the web).
export function ticks(inner,t,{pad=0,bg=''}={}){
 const corner=(v,h)=>`<td aria-hidden="true" width="10" height="10" style="width:10px;height:10px;border-${v}:1px solid ${t.rule};border-${h}:1px solid ${t.rule};font-size:1px;line-height:1px">&nbsp;</td>`;
 const gap='<td aria-hidden="true" style="font-size:1px;line-height:1px">&nbsp;</td>';
 return table(`<tr>${corner('top','left')}${gap}${corner('top','right')}</tr><tr><td aria-hidden="true" style="font-size:1px;line-height:1px">&nbsp;</td><td class="${pad?'tpad':''}" style="padding:${pad}px;${bg?`background-color:${bg};`:''}">${inner}</td><td aria-hidden="true" style="font-size:1px;line-height:1px">&nbsp;</td></tr><tr>${corner('bottom','left')}${gap}${corner('bottom','right')}</tr>`);
}

// A demo screen as a plate in a technical document: «FIG. 01 — VISTA DEL CLIENTE · DEMO».
export function figure(c,screen,n,caption,t){
 const head=table(`<tr><td class="mono" style="font-family:${FONT.mono};font-size:11px;line-height:16px;letter-spacing:1.3px;color:${t.muted};text-transform:uppercase">Fig. ${String(n).padStart(2,'0')} — ${e(caption)}</td><td align="right" style="white-space:nowrap">${badge('Demo')}</td></tr>`,'','margin:0 0 12px');
 return head+ticks(image(asset(c,screen.file),screen.alt,540,375,{bg:t.bg}),t)+p(e(screen.caption),t,{size:14,lh:22,color:t.muted,mb:0,style:'padding:14px 10px 0'});
}
