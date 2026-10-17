export function calculateOffer(o,p){
 if(o.priceVersion!==p.version)throw Error('Versión de precios incompatible');
 const selected=o.selectedExtras, recommended=o.recommendedExtras;
 for(const ids of [selected,recommended]){
  if(new Set(ids).size!==ids.length)throw Error('Extra duplicado');
  if(ids.includes('both')&&ids.some(x=>['growth','economics'].includes(x)))throw Error('Ambas asesorías reemplaza las individuales');
  if(ids.includes('growth')&&ids.includes('economics'))throw Error('Elegí ambas asesorías para evitar cobrar dos individuales');
  if((o.landingIncluded||o.type==='pack')&&ids.includes('landing'))throw Error('Landing ya incluida');
  if(o.type==='pack'&&ids.some(x=>['growth','economics','both'].includes(x)))throw Error('Asesorías ya incluidas en pack');
 }
 // What the offer already includes is never charged again, alone or inside «both».
 for(const ids of [selected,recommended])if(o.includedExtras.some(x=>ids.includes(x)||(ids.includes('both')&&['growth','economics'].includes(x))))throw Error('Extra ya incluido en la oferta');
 if(o.type==='pack'&&o.includedExtras.length)throw Error('El pack ya incluye sus asesorías');
 const base=o.type==='pack'?p.pack:p.adaptation;
 const total=base+selected.reduce((s,k)=>s+p.extras[k].price,0);
 const credit=o.promotion.enabled?p.plans.find(x=>x.id===o.promotion.creditPlan).monthly:0;
 return {base,total,deposit:total*p.depositRatio,balance:total*(1-p.depositRatio),plans:p.plans.map(x=>({...x,promo:Math.max(0,x.monthly-credit)})),economic:o.type==='pack'||[...selected,...recommended,...o.includedExtras].some(x=>['economics','both'].includes(x)),included:o.includedExtras};
}
export function readiness({brand:b,product:p,prospect:q,offer:o,prices},format='full'){
 const calc=calculateOffer(o,prices),errors=[];
 if(q.fictional)errors.push('Prospecto ficticio');
 if(!b.siteUrl)errors.push('Enlace Eclipse pendiente');
 if(!b.sender.confirmed||!b.sender.name||!/^\S+@\S+\.\S+$/.test(b.sender.email)||/example|ejemplo/i.test(b.sender.email))errors.push('Remitente real sin confirmar');
 if(!b.contactUrl||/example|0000000/.test(b.contactUrl))errors.push('Contacto real pendiente');
 if(!b.conditionsUrl||!b.conditionsVerified)errors.push('Condiciones accesibles por HTTPS pendientes');
 if(!b.assetBaseUrl)errors.push('Assets HTTPS pendientes de publicación autorizada');
 for(const k of ['customer','admin'])if(!p[k].url||!p[k].verified||!p[k].evidence)errors.push(`Enlace esencial ${k} sin verificar`);
 if(format==='short'&&(!p.presentationUrl||!p.presentationVerified))errors.push('Presentación completa HTTPS pendiente');
 if(calc.economic&&(!b.economicAdvisor.confirmed||!b.economicAdvisor.responsible||!b.economicAdvisor.scope))errors.push('Asesoría económica sin responsable/capacidad confirmados');
 if(p.id==='eclipse')errors.push('Base genérica pendiente de contenido y evidencia');
 return errors;
}
