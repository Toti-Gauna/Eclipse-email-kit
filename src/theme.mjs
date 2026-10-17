// Semantic slots are resolved at build time. Emails never contain CSS variables.
export function resolveTokens(html,tokens){return html.replace(/__ECLIPSE_([A-Z]+)__/g,(_,key)=>{const value=tokens[key.toLowerCase()];if(value===undefined)throw Error('Token desconocido: '+key);return String(value)})}
