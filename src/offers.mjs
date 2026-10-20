export function calculateOffer(o,p){
 if(o.priceVersion!==p.version)throw Error('Versión de precios incompatible');
 if(o.type==='campaign'){
  if(o.currency!=='ARS'||p.currency!=='ARS'||o.productId!=='volta'||o.selectedExtras.length)throw Error('Campaña/moneda/extras incompatibles');
  return {currency:'ARS',base:o.cash,total:o.cash,reference:o.reference,discountPercent:(1-o.cash/o.reference)*100,deposit:null,balance:null,financedTotal:null,installments:null,extrasTotal:null,plans:[],maintenance:o.maintenance,economic:false,included:o.includedExtras};
 }
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
export function readiness({brand:b,product:p,prospect:q,offer:o,prices,version},format='full'){
 const calc=calculateOffer(o,prices),errors=[];
 if(!q.businessName.trim()||/\{\{|\}\}|<[^>]*>/.test(q.businessName))errors.push('Nombre del negocio vacío o inválido');
 if(q.fictional)errors.push('Prospecto ficticio');
 if(!b.siteUrl)errors.push('Enlace Eclipse pendiente');
 if(!b.sender.confirmed||!b.sender.name||!/^\S+@\S+\.\S+$/.test(b.sender.email)||/example|ejemplo/i.test(b.sender.email))errors.push('Remitente real sin confirmar');
 if(!b.contactUrl||/example|0000000/.test(b.contactUrl))errors.push('Contacto real pendiente');
 if(o.type==='campaign'?(!o.conditions.url||!o.conditions.verified):(!b.conditionsUrl||!b.conditionsVerified))errors.push('Condiciones accesibles por HTTPS pendientes');
 if(!b.assetBaseUrl)errors.push('Assets HTTPS pendientes de publicación autorizada');
 for(const k of ['customer','admin'])if(!p[k].url||!p[k].verified||!p[k].evidence)errors.push(`Enlace esencial ${k} sin verificar`);
 if(format==='short'&&(!p.presentationUrl||!p.presentationVerified))errors.push('Presentación completa HTTPS pendiente');
 if(calc.economic&&(!b.economicAdvisor.confirmed||!b.economicAdvisor.responsible||!b.economicAdvisor.scope))errors.push('Asesoría económica sin responsable/capacidad confirmados');
 if(p.id==='eclipse')errors.push('Base genérica pendiente de contenido y evidencia');
 if(p.id==='volta'&&o.type!=='campaign')errors.push('Original: referencia anterior, no habilitada para la campaña Volta vigente');
 if(o.type==='campaign'){
  if(!q.reviewed||!q.publicFact||!q.sourceUrl||!q.sourceDate||!q.opportunity)errors.push('Investigación verificada pendiente: observación, fuente/fecha y oportunidad');
  if(/\{\{|\}\}/.test([q.businessName,q.publicFact,q.opportunity,o.maintenance.start].join(' ')))errors.push('Campos pendientes sin resolver');
  if(!o.resources.trailerCommercialVerified)errors.push('Tráiler existente con condiciones comerciales incompatibles: '+o.resources.trailerCommercialNote);
  const t=p.trailer;
  if(format==='full'&&!(t.enabled&&t.state==='ready'&&t.verified&&t.trailerUrl&&t.posterUrl))errors.push('Tráiler obligatorio de campaña sin verificar');
  if(p.screens.length<2)errors.push('Capturas cliente/admin obligatorias');
  if(p.gifts.length!==16||p.gifts.some(g=>!g.url||!g.verified||!g.evidence)||!o.resources.giftsPageVerified)errors.push('Regalos y página completa sin verificar');
 }
 return errors;
}
