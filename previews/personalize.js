// A typed slot compiled only from prospect.businessName, never a word/DOM replacement.
// No input is persisted, sent to a server, or inserted into a URL.
export const NAME_SLOT='ECLIPSE_BUSINESS_NAME_SLOT_7F24';
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function personalizeDraft(payload,businessName,baseUrl){
 const name=businessName.trim()||'Ejemplo ficticio · completá Nombre del negocio';
 const fill=(parts,value)=>parts.join(value);
 const base=new URL(baseUrl);if(!['http:','https:'].includes(base.protocol))throw Error('Base de preview inválida');
 const html=fill(payload.html,escape(name)).replace('<head>',`<head><base href="${escape(base.href)}">`);
 return {html,text:fill(payload.text,name),subject:fill(payload.subject,name),preheader:fill(payload.preheader,name)};
}
