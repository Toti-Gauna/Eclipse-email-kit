// The middle of the email: one long, seamless fade from the night of the demo to the white of
// the numbers, with the first light rising behind it. Computed pixel by pixel (with a hair of
// dither so JPEG never bands) and edge-to-edge equal to the flat colors above and below.
import sharp from 'sharp';
const W=1280,H=640;
const hex=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
const stops=[[0,'#0c0c14'],[0.18,'#110f19'],[0.36,'#221a25'],[0.5,'#4a3434'],[0.62,'#9a7458'],[0.72,'#d9bc95'],[0.82,'#f3e7d3'],[0.92,'#faf5ec'],[1,'#fbf9f6']].map(([o,c])=>[o,hex(c)]);
const smooth=x=>x*x*(3-2*x);
function sky(y){const t=y/(H-1);let i=0;while(i<stops.length-2&&t>stops[i+1][0])i++;const [a,ca]=stops[i],[b,cb]=stops[i+1],k=Math.min(1,Math.max(0,(t-a)/(b-a)));return ca.map((v,j)=>v+(cb[j]-v)*k)}
const glow=[255,232,176];let seed=7;const rand=()=>(seed=(seed*1103515245+12345)%2147483648)/2147483648;
const px=new Uint8ClampedArray(W*H*3);
for(let y=0;y<H;y++){const base=sky(y);for(let x=0;x<W;x++){const dx=(x-W/2)/(W*0.62),dy=(y-H*0.64)/(H*0.26),r=Math.sqrt(dx*dx+dy*dy),g=r<1?0.5*smooth(1-r)**1.6:0;for(let j=0;j<3;j++)px[(y*W+x)*3+j]=base[j]+(glow[j]-base[j])*g}}
// Linear between stops, then a wide blur: no plateaus or kinks at the stops.
const soft=await sharp(px,{raw:{width:W,height:H,channels:3}}).blur(24).raw().toBuffer();
for(let i=0;i<soft.length;i++)soft[i]=Math.max(0,Math.min(255,Math.round(soft[i]+rand()-0.5)));
await sharp(soft,{raw:{width:W,height:H,channels:3}}).jpeg({quality:90,mozjpeg:true,chromaSubsampling:'4:4:4'}).toFile('assets/art-transition.jpg');
console.log('assets/art-transition.jpg');
