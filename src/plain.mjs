import {convert} from 'html-to-text';
export function plainText(html,product){
 const readable=html.replace(/<div style="display:none!important[\s\S]*?<\/div>/,'').replace(/<\/td>/g,'<br></td>');
 return `Asunto: ${product.subject}\nPreheader: ${product.preheader}\n\n`+convert(readable,{wordwrap:86,selectors:[{selector:'img',format:'skip'},{selector:'h1',options:{uppercase:false}},{selector:'h2',options:{uppercase:false}}]});
}
