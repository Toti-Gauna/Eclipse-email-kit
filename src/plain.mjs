import {convert} from 'html-to-text';
export function plainText(html,product){
 const readable=html.replace(/<div style="display:none!important[\s\S]*?<\/div>/,'').replace(/<td class="[^"]*\bhide-m\b[^"]*"[^>]*>[\s\S]*?<\/td>/g,'').replace(/<\/td>/g,'<br></td>');
 const text=convert(readable,{wordwrap:86,selectors:[{selector:'img',format:'skip'},{selector:'[aria-hidden=true]',format:'skip'},{selector:'h1',options:{uppercase:false}},{selector:'h2',options:{uppercase:false}},{selector:'h3',options:{uppercase:false}},{selector:'a',options:{hideLinkHrefIfSameAsText:true}}]});
 return `Asunto: ${product.subject}\nPreheader: ${product.preheader}\n\n`+text.replace(/[ \t]+\n/g,'\n').replace(/\n{3,}/g,'\n\n').trim();
}
