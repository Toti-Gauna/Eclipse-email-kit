import fs from 'node:fs/promises';import {productSchema,prospectSchema,offerSchema,brandSchema,validatePrices} from './schema.mjs';import {calculateOffer} from './offers.mjs';
export const read=async p=>JSON.parse(await fs.readFile(p,'utf8'));
export async function load(product='volta',prospect=`${product}-example`,offer,vertical,version='improved'){
 for(const s of [product,prospect,offer,vertical].filter(Boolean))if(!/^[a-z0-9-]+$/.test(s))throw Error('Identificador inválido');
 const brand=brandSchema.parse(await read('data/brand.json')),q=prospectSchema.parse(await read(`data/prospects/${prospect}.json`));let d=productSchema.parse(await read(`data/products/${product}.json`));
 if(vertical){if(!d.verticals?.[vertical])throw Error('Rubro no configurado');d=productSchema.parse({...d,...d.verticals[vertical]})}
 const offerId=offer||(product==='volta'&&version!=='original'?'volta-2026-10-19':q.offerId);
 const o=offerSchema.parse(await read(`data/offers/${offerId}.json`));
 if(o.type==='campaign'&&product!==o.productId)throw Error('Campaña exclusiva de Volta');
 const prices=o.type==='campaign'?{...o,version:o.priceVersion}:validatePrices(await read('data/offers/prices.v2026-10-16.json'));
 if(o.type==='campaign'){
  d={...d,subject:`${q.businessName}: una idea para potenciar tu tienda de suplementos`,preheader:'Conocé Volta y evaluemos una mejora concreta en una asesoría gratuita de 15 minutos.',trailer:o.resources.trailer,
   customer:{...d.customer,verified:o.resources.customerVerified,evidence:o.resources.evidence},admin:{...d.admin,verified:o.resources.adminVerified,evidence:o.resources.evidence},gifts:d.gifts.map(g=>({...g,verified:o.resources.giftsVerified,evidence:o.resources.evidence}))};
  if(!brand.contactUrl&&brand.sender.confirmed&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(brand.sender.email))brand.contactUrl=`mailto:${brand.sender.email}?subject=${encodeURIComponent('Asesoría gratuita · Volta')}`;
 }

 return {version:product==='volta'?(o.type==='campaign'?'improved':'original'):'original',conditionsFile:o.id==='base-campaign'?'conditions.html':`conditions-${o.id}.html`,brand,product:d,prospect:q,offer:o,prices,calc:calculateOffer(o,prices),mode:'preview'};
}
