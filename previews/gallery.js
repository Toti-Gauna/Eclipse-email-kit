import {personalizeDraft} from './personalize.js';
const $=id=>document.getElementById(id);
const manifest=await fetch('manifest.json').then(r=>r.json()),params=new URLSearchParams(location.search);
const allowed=[...new Set(manifest.map(m=>m.id))],saved=k=>{try{return localStorage.getItem(k)}catch{return null}},save=(k,v)=>{try{localStorage.setItem(k,v)}catch{}};
let selected=params.get('model')||saved('eclipse-email-model')||'volta';if(!allowed.includes(selected))selected='volta';
let version=params.get('version')==='original'?'original':'improved',format=params.get('format')==='short'?'short':'full',width=['320','390'].includes(params.get('width'))?params.get('width'):'desktop';
let current,html='',plain='',revision=0,blobs=[];
$('business-name').value=manifest.find(m=>m.id===selected)?.businessName||'';
function urlState(){const u=new URL(location.href);u.search='';u.searchParams.set('model',selected);if(selected==='volta')u.searchParams.set('version',version);if(format==='short')u.searchParams.set('format',format);if(width!=='desktop')u.searchParams.set('width',width);if(document.body.classList.contains('clean'))u.searchParams.set('clean','1');history.replaceState(null,'',u)}
function close(){$('models').close();$('toggle').focus()}
$('toggle').onclick=()=>$('models').showModal();$('close').onclick=close;$('models').addEventListener('close',()=>{if(document.activeElement===document.body||$('models').contains(document.activeElement))$('toggle').focus()});
$('models').addEventListener('click',e=>{if(e.target===$('models')){const r=$('models').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close()}});
for(const btn of document.querySelectorAll('[data-product]'))btn.onclick=()=>{selected=btn.dataset.product;save('eclipse-email-model',selected);update()};
$('length').onchange=()=>{format=$('length').value;update()};
for(const id of ['business-name','contact-email','contact-phone'])$(id).addEventListener('input',()=>update());
const tabs=[...document.querySelectorAll('[data-version]')];
for(const tab of tabs){tab.onclick=()=>{version=tab.dataset.version;update()};tab.onkeydown=e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const i=e.key==='Home'?0:e.key==='End'?tabs.length-1:(tabs.indexOf(tab)+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;tabs[i].focus();tabs[i].click()}}
for(const btn of document.querySelectorAll('[data-width]'))btn.onclick=()=>{width=btn.dataset.width;size();urlState()};
function size(){$('canvas').style.maxWidth=width==='desktop'?'640px':width+'px';$('view-label').textContent=width==='desktop'?'ESCRITORIO · 640 PX':`MÓVIL · ${width} PX`;document.querySelectorAll('[data-width]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.width===width)));resize()}
function resize(){const doc=$('email').contentDocument;if(doc){$('email').style.height='1px';$('email').style.height=doc.documentElement.scrollHeight+'px'}}
$('email').addEventListener('load',()=>{resize();const doc=$('email').contentDocument;if(!doc)return;doc.fonts.ready.then(resize);doc.querySelectorAll('img').forEach(img=>img.addEventListener('load',resize));doc.addEventListener('click',e=>{const a=e.target.closest('a');if(a){e.preventDefault();window.open(a.href,'_blank','noopener')}})});new ResizeObserver(resize).observe($('canvas'));
function busy(on){for(const id of ['copy','copy-text'])$(id).disabled=on;for(const id of ['open','download-html','download-text']){if(on)$(id).removeAttribute('href');$(id).setAttribute('aria-disabled',String(on))}}
const cache=new Map();async function payload(url){if(!cache.has(url))cache.set(url,fetch(url).then(r=>{if(!r.ok)throw Error('No se pudo cargar el borrador');return r.json()}));return cache.get(url)}
async function update(){const n=++revision;busy(true);const item=manifest.find(m=>m.id===selected&&m.format===format&&(m.version||'original')===(selected==='volta'?version:'original'));if(!item)return;
 try{
 const data=await payload(item.preview);if(n!==revision)return;
 const output=personalizeDraft(data,$('business-name').value,new URL(item.html,location.href).href,{email:$('contact-email').value,phone:$('contact-phone').value});
 $('contact-status').textContent=output.contactErrors.join(' ');
 html=output.html;plain=output.text;current=item;
 const old=blobs;blobs=[URL.createObjectURL(new Blob([html],{type:'text/html;charset=utf-8'})),URL.createObjectURL(new Blob([plain],{type:'text/plain;charset=utf-8'}))];
 $('email').src=blobs[0];$('email').dataset.selection=`${selected}-${format}-${item.version}`;
 old.forEach(url=>URL.revokeObjectURL(url));
 $('product-name').textContent=item.label;$('subject').textContent=output.subject;$('preheader').textContent=output.preheader;$('format-label').textContent=format==='full'?'Propuesta completa':'Primer contacto breve';$('size').textContent=(new TextEncoder().encode(html).length/1024).toFixed(1)+' KB';
 $('state').textContent='Borrador · no enviar';$('download-label').textContent='Descargar borrador · no listo para envío';
 const errors=[...item.errors,'Editar el nombre no verifica al negocio ni habilita envío.'];if(!$('business-name').value.trim())errors.unshift('Ingresá el nombre del negocio para revisar la personalización.');
 $('errors').replaceChildren(...errors.map(s=>{const li=document.createElement('li');li.textContent=s;return li}));
 $('open').href=blobs[0];$('download-html').href=blobs[0];$('download-text').href=blobs[1];$('conditions-link').href=item.conditions;
 const stem=`${selected}-${item.version}-${format}-borrador`;$('download-html').download=stem+'.html';$('download-text').download=stem+'.txt';$('length').value=format;
 $('version-tabs').hidden=selected!=='volta';$('email-panel').setAttribute('aria-labelledby',selected==='volta'?`tab-${version}`:'product-name');
 $('version-note').textContent=selected==='volta'?(version==='original'?'Original · referencia anterior/borrador. Conserva condiciones históricas; no habilitada para esta campaña.':'Mejorada · campaña Volta 19/10/2026. Borrador para revisión comercial.'):'Oferta propia del producto · la campaña Volta no se aplica.';
 tabs.forEach(t=>{const active=t.dataset.version===version;t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1});
 document.querySelectorAll('[data-product]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.product===selected)));busy(false);$('copy').textContent='Copiar HTML';size();urlState();
 }catch(error){if(n===revision)$('status').textContent=error.message}
}
async function copy(text,kind){try{await navigator.clipboard.writeText(text);$('status').textContent=`${kind} del borrador visible copiado.`}catch{$('status').textContent='No se pudo copiar. Usá la descarga.'}}
$('copy').onclick=()=>copy(html,'HTML');$('copy-text').onclick=()=>copy(plain,'Texto');
function clean(on){if($('models').open)$('models').close();document.body.classList.toggle('clean',on);$('restore').hidden=!on;urlState();resize()}
$('clean').onclick=()=>clean(true);$('restore').onclick=()=>clean(false);if(params.get('clean')==='1')clean(true);await update();
$('models').addEventListener('keydown',e=>{if(e.key!=='Tab')return;const items=[...$('models').querySelectorAll('button,a[href],select')].filter(x=>!x.disabled&&x.getClientRects().length);const first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}});

$('copy-trailer').onclick=()=>copy('https://toti-gauna.github.io/supplements-ecommerce/trailer/t1-email.mp4','Enlace del tráiler');
