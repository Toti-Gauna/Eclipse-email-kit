import fs from 'node:fs/promises';import {productSchema,prospectSchema,offerSchema,brandSchema,validatePrices} from './schema.mjs';import {calculateOffer} from './offers.mjs';
export const read=async p=>JSON.parse(await fs.readFile(p,'utf8'));
export async function load(product='volta',prospect=`${product}-example`,offer,vertical){
 for(const s of [product,prospect,offer,vertical].filter(Boolean))if(!/^[a-z0-9-]+$/.test(s))throw Error('Identificador inválido');
 const brand=brandSchema.parse(await read('data/brand.json')),q=prospectSchema.parse(await read(`data/prospects/${prospect}.json`));let d=productSchema.parse(await read(`data/products/${product}.json`));
 if(vertical){if(!d.verticals?.[vertical])throw Error('Rubro no configurado');d=productSchema.parse({...d,...d.verticals[vertical]})}
 const o=offerSchema.parse(await read(`data/offers/${offer||q.offerId}.json`));const prices=validatePrices(await read('data/offers/prices.v2026-10-16.json'));
 return {brand,product:d,prospect:q,offer:o,prices,calc:calculateOffer(o,prices),mode:'preview'};
}
