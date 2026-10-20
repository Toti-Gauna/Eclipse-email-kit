// A typed slot compiled only from prospect.businessName, never a word/DOM replacement.
// No input is persisted, sent to a server, or inserted into a URL.
export const NAME_SLOT='ECLIPSE_BUSINESS_NAME_SLOT_7F24';
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function personalizeDraft(payload,businessName,baseUrl,contacts={}){
 const name=businessName.trim()||'Ejemplo ficticio · completá Nombre del negocio';
 const fill=(parts,value)=>parts.join(value);
 const base=new URL(baseUrl);if(!['http:','https:'].includes(base.protocol))throw Error('Base de preview inválida');
 let html=fill(payload.html,escape(name)).replace('<head>',`<head><base href="${escape(base.href)}">`);
 const email=(contacts.email||'').trim(),phone=(contacts.phone||'').trim();
 const validEmail=/^[A-Za-z0-9._+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/.test(email)&&email.length<=254;
 const validPhone=/^\+[1-9][0-9 ()-]{6,24}$/.test(phone)&&phone.replace(/\D/g,'').length>=7&&phone.replace(/\D/g,'').length<=15;
 const links=[];const lines=[];
 const style='display:inline-block;margin:8px 8px 8px 0;padding:14px 20px;background:#f6bb43;color:#17120a;border:1px solid #b47d14;border-radius:8px;font:700 14px Arial,sans-serif;text-decoration:none';
 if(validEmail){const href='mailto:'+email+'?subject='+encodeURIComponent('Quiero mi asesoría gratuita');links.push(`<a href="${escape(href)}" style="${style}">Quiero mi asesoría gratuita</a><p style="font:14px Arial,sans-serif">${escape(email)}</p>`);lines.push('Quiero mi asesoría gratuita: '+href);}
 if(validPhone){const href='tel:'+phone.replace(/[^+0-9]/g,'');links.push(`<a href="${escape(href)}" style="${style}">Llamanos: ${escape(phone)}</a>`);lines.push('Llamanos: '+phone+' ('+href+')');}
 const pending='Contacto pendiente · completá tu email y teléfono en la galería.';
 html=html.replace(/<!--CONTACT_START-->[\s\S]*?<!--CONTACT_END-->/,()=>links.join('')||`<p>${pending}</p>`);
 const contactText=lines.join('\n')||pending;
 return {contactErrors:[email&&!validEmail?'Revisá el email: usá una dirección válida, sin espacios ni parámetros.':'',phone&&!validPhone?'Usá teléfono internacional con + y entre 7 y 15 dígitos.':''].filter(Boolean),html,text:fill(payload.text,name).replace(pending,()=>contactText),subject:fill(payload.subject,name),preheader:fill(payload.preheader,name)};
}
