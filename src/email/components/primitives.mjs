export const e=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const money=n=>`USD ${n}`;
export const table=(content,extra='')=>`<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" ${extra} style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt">${content}</table>`;
export const row=(content,style='',extra='')=>`<tr><td ${extra} style="${style}">${content}</td></tr>`;
export const p=(s,style='')=>`<p style="margin:0 0 16px;font-size:16px;line-height:26px;${style}">${s}</p>`;
export const kicker=(s,c='__ECLIPSE_MUTED__')=>p(e(s),`font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:18px;font-weight:bold;letter-spacing:2px;color:${c}`);
export const h=(s,ctx,level=2)=>`<h${level} class="${level===1?'title':'section-title'}" style="margin:0 0 20px;font-family:${e(ctx.heading)};font-size:${level===1?'44':'30'}px;line-height:${level===1?'1.12':'1.2'};font-weight:${ctx.product.headingWeight};letter-spacing:-0.6px;overflow-wrap:break-word">${e(s).replace(/\n/g,'<br>')}</h${level}>`;
export function button(label,url,{primary=false,accent='__ECLIPSE_CORONA__',ink='__ECLIPSE_INK__'}={}){
 const bg=primary?accent:'__ECLIPSE_DAWN__', fg=primary?ink:'__ECLIPSE_INK__';
 if(!url)return p(`<span style="display:block;padding:14px 18px;border:1px solid #a8a193;border-radius:24px;color:__ECLIPSE_MUTED__;background:#ebe4d8;font-size:14px;text-align:center">${e(label)} · pendiente</span>`);
 return `<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 12px;width:100%;border-collapse:separate"><tr><td align="center" bgcolor="${bg}" style="border:1px solid ${primary?bg:'#bcb5a8'};border-radius:28px;mso-padding-alt:14px 18px"><a href="${e(url)}" style="display:block;padding:14px 18px;color:${fg};background-color:${bg};border-radius:28px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;line-height:22px;text-decoration:none;text-align:center;mso-padding-alt:0"><!--[if mso]><i style="mso-font-width:100%;mso-text-raise:21pt" hidden>&emsp;</i><![endif]--><span style="mso-text-raise:10pt">${e(label)}</span><!--[if mso]><i style="mso-font-width:100%" hidden>&emsp;&#8203;</i><![endif]--></a></td></tr></table>`;
}
export const section=(html,bg='__ECLIPSE_DAWN__',style='')=>row(html,`padding:32px 40px;background-color:${bg};${style}`,'class="pad"');
export const asset=(ctx,file)=>ctx.mode==='send'?`${ctx.brand.assetBaseUrl.replace(/\/$/,'')}/${file}`:`../../../assets/${file}`;
export const image=(src,alt,w=560,height=389)=>`<img src="${e(src)}" alt="${e(alt)}" width="${w}" height="${height}" style="display:block;border:0;width:100%;max-width:${w}px;height:auto;color:__ECLIPSE_MUTED__;font-family:Arial,sans-serif;font-size:14px;line-height:22px;background-color:#e7e1d6" />`;
