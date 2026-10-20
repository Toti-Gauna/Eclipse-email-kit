import {e} from './email/components/primitives.mjs';

// The page the email's poster opens: email clients can't play video, so the trailer plays here
// (static, no scripts or trackers; published with the gallery as previews/trailer-<id>.html).
// Responsive: it fills a phone and sits centered on a desktop.
export function trailerPage(c){
 // «#t=0.1» makes browsers (iOS Safari included) paint the first frame instead of a black box.
 const d=c.product,t=d.trailer,video=`../assets/trailers/${t.file}`;
 const type=t.file.endsWith('.webm')?'video/webm':'video/mp4';
 const demo=d.customer.url?`<a class="btn primary" href="${e(d.customer.url)}" target="_blank" rel="noopener">Probá la demo de ${e(d.name)} ↗</a>`:'';
 const talk=c.brand.contactUrl?`<a class="btn" href="${e(c.brand.contactUrl)}" target="_blank" rel="noopener">Hablemos de tu proyecto</a>`:'';
 return `<!doctype html><html lang="es-AR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>${e(d.name)}, en ${e(t.durationSeconds)} segundos · Eclipse</title><style>@font-face{font-family:'Instrument Serif';src:url('../assets/fonts/instrument.woff2') format('woff2')}@font-face{font-family:'Instrument Serif';font-style:italic;src:url('../assets/fonts/instrument-italic.woff2') format('woff2')}@font-face{font-family:Geist;src:url('../assets/fonts/geist.woff2') format('woff2');font-weight:100 900}@font-face{font-family:'Geist Mono';src:url('../assets/fonts/geist-mono.woff2') format('woff2');font-weight:100 900}
:root{--void:#05050a;--night:#0c0c14;--corona:#f5b942;--dawn:#f4efe6;--mist:#9a97a6;--rule:#34333b}
*{box-sizing:border-box}body{margin:0;min-height:100dvh;background:var(--void);color:var(--dawn);font:16px/1.6 Geist,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased}
main{max-width:1120px;margin:0 auto;padding:32px 16px 72px}@media(min-width:768px){main{padding:48px 32px 96px}}
.top{display:flex;justify-content:space-between;align-items:center;gap:16px;font:500 13px/1 Geist,sans-serif;letter-spacing:4px}.top a{color:var(--dawn);text-decoration:none}.top span{font:11px/1.4 'Geist Mono',ui-monospace,Menlo,monospace;letter-spacing:1.3px;color:var(--mist);text-transform:uppercase}
.mark{display:flex;align-items:center;gap:12px;margin:48px 0 20px;font:11px/1 'Geist Mono',ui-monospace,Menlo,monospace;letter-spacing:1.3px;color:var(--mist);text-transform:uppercase}.mark i{width:40px;height:1px;background:var(--rule)}
h1{margin:0 0 28px;font:400 clamp(40px,7vw,80px)/1 'Instrument Serif',Georgia,serif;letter-spacing:-.02em}h1 em{color:var(--corona)}
.frame{position:relative;border:1px solid var(--rule);border-radius:20px;overflow:hidden;background:#000;box-shadow:0 30px 80px -30px rgba(245,185,66,.25)}video{display:block;width:100%;max-height:78dvh;background:#000}
.meta{margin:16px 0 0;font:11px/1.5 'Geist Mono',ui-monospace,Menlo,monospace;letter-spacing:1.3px;color:var(--mist);text-transform:uppercase}
.actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:32px}.btn{display:inline-block;padding:14px 24px;border:1px solid var(--rule);border-radius:28px;color:var(--dawn);font-weight:600;font-size:15px;text-decoration:none}.btn.primary{background:var(--corona);border-color:var(--corona);color:var(--void)}a:focus-visible,video:focus-visible{outline:2px solid var(--corona);outline-offset:3px}
.note{margin-top:40px;max-width:640px;color:var(--mist);font-size:13px}</style></head><body><main><div class="top"><a href="${e(c.brand.siteUrl)}" target="_blank" rel="noopener">ECLIPSE</a><span>Trailer · ${e(d.name)}</span></div><p class="mark">Trailer <i></i> ${e(t.durationSeconds)} s · con sonido</p><h1>${e(d.name)}, en<br><em>${e(t.durationSeconds)} segundos</em>.</h1><div class="frame"><video controls playsinline preload="metadata"><source src="${e(video)}#t=0.1" type="${type}"><a href="${e(video)}">Descargar el trailer</a></video></div><p class="meta">Motion graphics · música · celular y compu. Tocá play para activar el sonido.</p><div class="actions">${demo}${talk}</div><p class="note">${e(d.demoNote)}</p></main></body></html>\n`;
}
