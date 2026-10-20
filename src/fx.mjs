// Pesos as a reference for the USD offers. The dollar of reference comes from the improved
// (Mejorada) version: its package reference price, ARS 750.000, over the USD 500 adaptation is
// ARS 1.500 per dollar (data/offers/fx.json). Amounts come out whole, so nothing is rounded.
// `c.fx` is plain data (it must survive structuredClone); the helpers take it as an argument.
const nf=new Intl.NumberFormat('es-AR');
export const makeFx=fx=>({rate:fx.ARS,rateLabel:`1 USD = ARS ${nf.format(fx.ARS)}`,source:fx.source});
export const arsOf=(fx,usd)=>Math.round(usd*fx.rate);
export const pesosNum=(fx,usd)=>nf.format(arsOf(fx,usd));
export const pesos=(fx,usd)=>`ARS ${pesosNum(fx,usd)}`;
export const validateFx=f=>{if(f.base!=='USD'||!Number.isFinite(f.ARS)||f.ARS<=0||!f.derivedFrom||f.derivedFrom.arsReference/f.derivedFrom.usd!==f.ARS||!f.source)throw Error('Dólar de referencia inválido: debe salir del precio de referencia de la versión Mejorada');return f};
