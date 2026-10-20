# Eclipse Email Kit

## Pesos, pantallas y trailer · 20/10/2026

- **Precios en pesos.** Todas las propuestas «Original» (Volta, TableFlow, DentalOS, Eclipse) muestran primero el importe en pesos y debajo el dólar, que sigue siendo la moneda del contrato. La referencia sale de la versión Mejorada de Volta: ARS 750.000 ÷ USD 500 = **1 USD = ARS 1.500** (`data/offers/fx.json`, con su derivación; `src/fx.mjs` valida que coincida con la oferta y falla si no). Para cambiar la cotización editá `ARS` y `derivedFrom` en ese archivo y recompilá. La Mejorada ya estaba en pesos y no cambió. La página de condiciones aclara que el contrato es en dólares y que los pesos son referencia.
- **Contado y financiación (Original).** El precio se lee como en la Mejorada: pesos al contado con el **50 % de descuento** aplicado sobre la referencia tachada (ARS 750.000 → ARS 375.000; USD 500 → USD 250), y en dos pagos rige la referencia con seña del 50 %. Financiación: **hasta 4 cuotas con recargo, a evaluar y cotizar por escrito**; no hay importes de cuota, tasa ni total financiado (igual que en la Mejorada). Los valores salen de `cashDiscountPct` y `financing` en `data/offers/prices.v2026-10-16.json` y se validan en `src/schema.mjs`. Los planes mensuales y las piezas extra no cambian.
- **Botón «Ver Eclipse».** Aparece al final de Original y de Mejorada y abre `siteUrl` de `data/brand.json`.
- **Pantallas de ambas vistas.** Cada producto trae 5 capturas de la vista cliente y 5 del panel del dueño (`screens[].view`: `customer` | `admin`; TableFlow Café, 5 + 5 propias). La primera de cada vista va grande y el resto en grilla de dos; en Mejorada de Volta, una grande y cuatro miniaturas por vista. Se regeneran con `npm run capture:demos` (acepta `--only` y la URL de cada demo, para correrlo contra una copia local si las demos publicadas no están accesibles). Una oferta de campaña no se puede exportar sin al menos una captura de cada vista.
- **Subir el trailer.** `npm run trailer -- --product volta --video ruta/al/video.mp4` convierte a H.264/AAC con arranque rápido, extrae el póster (o usá `--poster`/`--at`), copia a `assets/trailers/` y genera la página `previews/trailer-<producto>.html`, que es la que abre el botón del correo. Para un video ya publicado: `--url https://… --poster imagen.jpg`. Más de 100 MB: agregá `--compress`. El video queda **sin verificar** (solo preview) hasta que lo mires y corras `--verified`; en Volta además hace falta `--commercial-ok` (que no muestre precios, cuotas ni condiciones ajenas a la campaña). Detalle en `assets/trailers/README.md`.
- **Peso.** El límite del build subió de 90.000 a 96.000 bytes por las diez capturas y los pesos; la completa Original de Volta pesa ~90 kB y Gmail recorta recién a los 102 kB.

## Revisión visual y contactos · 20/10/2026

La tab Mejorada concentra la propuesta en unas 410 palabras (lectura estimada de 2 minutos), con condiciones detalladas enlazadas, captura real adicional de costos/margen y precio final al contado destacado. Original y otras ofertas conservan sus compilados.

En la galería, **Tu email de contacto** y **Tu teléfono** personalizan los botones de Mejorada. El teléfono usa formato internacional con `+` y abre una llamada (`tel:`); el email abre una consulta (`mailto:`). Los datos se mantienen solo en memoria, sobreviven a cambios de tab/formato y se incluyen en HTML/texto copiados o descargados. No se guardan, no se publican y no confirman al remitente. Los campos vacíos o inválidos no generan enlaces. El MP4 existente se puede abrir/descargar y su enlace se puede copiar desde “Archivo del tráiler”; sigue bloqueado comercialmente.

## Campaña Volta · actualización local 19–20/10/2026

La galería separa **Original** (referencia anterior, no exportable para esta campaña) y **Mejorada**, con el selector de productos y Completa/Breve independientes. “Nombre del negocio” personaliza `businessName` en memoria: no lo guarda ni lo agrega a URLs. HTML/texto copiados y descargados son exactamente los del preview; siguen siendo borradores ficticios.

`data/offers/volta-2026-10-19.json` es la oferta efectiva predeterminada solo para Volta: ARS 750.000 de referencia, ARS 375.000 contado, 50% de descuento, meses 1–2 bonificados y ARS 50.000/mes desde mes 3. Inicio a acordar por escrito; hasta cuatro cuotas con recargo **a evaluar**, sin importes calculados. TableFlow, DentalOS, Eclipse genérico y la referencia Original conservan sus condiciones USD. La política siguiente sobre tráiler opcional corresponde a esas versiones anteriores, no a la campaña actual.

**Estado: revisable localmente, no listo para envío.** Tráiler, cliente, admin, 16 regalos y página completa comprobados. El MP4 existente dura 75,466667 s y reproduce condiciones incompatibles (WhatsApp incluido, cuotas, USD, mantenimiento ARS 45.000): se conserva con advertencia y bloqueo comercial. No se creó ni reeditó video. Remitente/contacto, investigación real, assets/condiciones HTTPS autorizadas siguen pendientes. La breve también requiere presentación completa pública verificada.

La campaña tiene condiciones propias: `previews/conditions-volta-2026-10-19.html`. No usa la página USD compartida. La falta de inicio contractual o de tasas de financiación no impide por sí sola un primer contacto honesto; no habilita contratación ni una cotización financiada.

```bash
cd /workspace/Eclipse-email-kit
npm run build
npm run dev
# http://127.0.0.1:4173/previews/?model=volta&version=improved
npm run generate -- --product volta --format full
npm run generate -- --product volta --format short
npm run generate -- --product volta --version original
node scripts/qa-campaign.mjs
```

Evidencia y pendientes: [entrega de campaña](docs/qa/CAMPAIGN-2026-10-20.md). La implementación se preparó localmente. El 20/10/2026 Ignacio autorizó después abrir PR, integrar en main y publicar la galería en GitHub Pages. La publicación no habilita el envío ni resuelve los pendientes comerciales; Volta no se modifica.


Kit comercial local con la identidad visual de la web de Eclipse (dirección de arte «Efemérides»: eclipse del hero, marcas de sección en mono, serif display, libros de precios y amanecer al cierre), tres productos y datos reutilizables. Incluye HTML de email con estilos críticos inline, texto plano, galería estática, capturas y condiciones. Estado: **borradores revisados, no listos para envío** por falta de remitente/contacto real y URLs autorizadas de assets/condiciones. Los ejemplos de prospectos son ficticios.

## Galería publicada y despliegue

GitHub Pages: https://toti-gauna.github.io/Eclipse-email-kit/

El workflow `.github/workflows/pages.yml` compila, prueba y despliega en cada push a `main`, y también admite ejecución manual. Pages utiliza GitHub Actions como origen. `npm run build && npm run build:pages` prepara `_site/` con la galería, los assets y los seis ejemplos públicos iniciales. La raíz redirige a `previews/`, conservando los parámetros del selector.

El artefacto no incluye configuraciones, prospectos, fuentes originales de Notion ni propuestas personalizadas. Los archivos originales de `docs/sources/` se conservan solo localmente; la procedencia versionable está en `docs/sources.md`. Publicar la galería no habilita el envío de los borradores.

## Abrir y compilar

Node 24 o posterior y npm. Desde la raíz real del repositorio (`/workspace/Eclipse-email-kit` en esta ejecución):

```bash
npm ci
npm run build
npm run dev
```

Abrí **http://127.0.0.1:4173/previews/**. La galería necesita HTTP local para cargar el manifiesto; no abrirla con `file://`. Los HTML individuales sí pueden abrirse directamente. `PORT=4180 npm run dev` permite otro puerto. Solo sirve previews, assets y exports, no datos de prospectos ni fuentes privadas.

```bash
npm run generate -- --product volta --prospect volta-example
npm run generate -- --product dentalos --prospect dentalos-example --format short
npm run generate -- --product tableflow --prospect tableflow-example --vertical cafe
npm run generate -- --product eclipse
npm run generate -- --product volta --offer launch-pack-draft --format full
npm run validate
npm test
```

`npm run build` regenera ocho piezas: Original/Mejorada de Volta y las dos de cada otra demo y el manifiesto de galería. Cada producto tiene `full` y `short`; la breve enlaza al HTML completo en preview. Las variantes adicionales se generan por CLI. La compilación local no publica ni envía correos; el deploy de la galería se realiza mediante el workflow de Pages. No hay analytics ni trackers.

## Preparar un prospecto

1. Copiá un ejemplo de `data/prospects/` a `private-mi-prospecto.json`; cambiá `id`, nombre, notas y oferta. Los archivos `private-*` están ignorados por git.
2. `fictional: false` solo para un negocio real. Si no lo investigaste, mantené `reviewed: false`: se usa una apertura sectorial honesta. Para `reviewed: true`, completá `publicFact` como fragmento (por ejemplo, “que publicaron su carta de temporada”), `sourceUrl` HTTPS y notas. El compilador escapa el texto; no admite HTML arbitrario.
3. Elegí el contenido y enlaces en `data/products/<producto>.json`; cargá los enlaces públicos verificados de la demo y su evidencia. Las vistas no equivalen a autenticación. En `headline`, `*palabra*` marca la única palabra destacada (itálica ámbar) y `\n` el corte de línea; `brief` es la apertura corta (con un hecho investigado se antepone «Vimos…»), `includes` lista lo que trae la adaptación, `apart` lo que se cotiza aparte y `recommends` los canales (WhatsApp, chatbot, voz) que se recomiendan como piezas extra.
4. Definí la oferta en `data/offers/`. No edites precios en las plantillas: `prices.v2026-10-16.json` centraliza importes, pagos, cupos y procedencia. `base-campaign.json` contiene la extensión de la bonificación pedida por Ignacio. Podés cambiar el plan, los meses o desactivar `promotion.enabled` por oferta.
5. Generá el borrador y revisá asunto, preheader, alcance, extras y capturas. Cambiar configuración requiere recompilar; no editar `dist/` a mano.

## Salida para envío

Antes de habilitarla, completá en `data/brand.json` el remitente confirmado, contacto real, `assetBaseUrl` HTTPS y `conditionsUrl` pública verificada. Publicar esos assets/condiciones requiere una tarea autorizada posterior: este kit no lo hace. Para la versión breve, configurá `presentationUrl` y `presentationVerified` en el producto; debe apuntar a la presentación completa, sin datos personales en la URL.

```bash
npm run generate -- --product volta --prospect private-mi-prospecto --mode send --format full
```

La salida aparece en `dist/emails/ready/` **solo si pasa los gates**: datos, prospecto no ficticio, remitente, contacto, demos, condiciones, assets, oferta, placeholders, URLs HTTPS y acceso HTTP a cada recurso. Usa el proxy del entorno cuando existe. Ese directorio se ignora en git. No se envía nada. La falta de trailer no bloquea las demos anteriores; el full de la campaña Volta exige recursos verificados y compatibilidad comercial. Si el pack o una asesoría económica están seleccionados/recomendados, requiere responsable, alcance y capacidad confirmados en `economicAdvisor`.

Una URL que devuelve 200 no demuestra una función productiva: `verified` y `evidence` documentan la revisión humana del destino. Revalidá antes de cada lote. El comando no confirma permisos del proveedor de email, SPF/DKIM ni consentimiento de destinatarios; tampoco inventa una dirección postal o un sistema de baja. El cierre ofrece responder “No recibir más” para gestión manual.

## Trailer futuro: solo conectar recursos

En cada producto existe:

```json
{
  "enabled": true,
  "state": "pending",
  "trailerUrl": "",
  "posterUrl": "",
  "durationSeconds": 60,
  "verified": false
}
```

Al recibir miniatura y destino válidos, completá ambas URLs HTTPS, verificá los recursos y cambiá `state` a `ready` y `verified` a `true`. Recompilá. Aparece la miniatura enlazada y el CTA “Ver cómo funciona”. Si falta alguno, el preview muestra un placeholder estático y el email de envío omite el módulo completo. `enabled: false` lo elimina también del preview. El kit no produce el video: lo cargás con `npm run trailer` (ver «Pesos, pantallas y trailer»). El correo nunca incrusta el video, solo el póster enlazado a una página reproductora.

## Organización

- `src/email/components/`: primitivas del lenguaje visual (marca de sección con glifo de fase, titulares serif, libro de precios, marcas de registro, figuras), en el orden del email completo: 01 brief, 02 trailer, 03 solución (producto, figuras, qué resuelve, recorrido, asesorías de growth, retención y finanzas, vista del cliente y del dueño, regalos en botones), 04 precio (seña 50 % y mantenimiento bonificado), 05 piezas extra con precios, 06 mantenimiento, 07 cómo seguimos (cuenta, portal y más productos de Eclipse), 08 condiciones, 09 próximo paso y pie. Los productos con regalos generan además `previews/regalos-<id>.html`, la pantalla «Ver todos los regalos», que se publica con la galería; en envío el botón usa `giftsPageUrl`.
- `src/email/templates/eclipse.mjs`: recorrido noche → amanecer, numeración de secciones y versión breve.
- `src/schema.mjs`, `src/offers.mjs`: validación y reglas comerciales.
- `data/`: identidad, productos, precios, ofertas y prospectos.
- `assets/`: arte capturado de la web (`art-hero.jpg`, `art-dawn.jpg`, con `scripts/capture-art.mjs`), el degradé de noche a blanco de la mitad del email (`art-transition.jpg`, `scripts/render-transition.mjs`), glifos de fase y logo en PNG (`scripts/render-glyphs.mjs`), pósters de muestra del trailer (`scripts/render-posters.mjs`), capturas JPEG de las demos y fuentes con licencias (Instrument Serif, Geist y Geist Mono de Eclipse-Web; fuente de marca de cada producto).
- `previews/`: galería sin framework, controles accesibles y condiciones.
- `dist/emails/drafts/`: HTML, texto plano y metadatos por pieza.
- `docs/sources/`: tarifario/manual consultados y evidencia web.
- `docs/qa/`: resultados JSON, matriz y capturas.

El arte se regenera solo si cambia la web: `node scripts/capture-art.mjs` (web publicada) o `node scripts/capture-art.mjs --url http://localhost:3200/es/` (Eclipse-Web en `next dev`), `node scripts/render-glyphs.mjs` para glifos y logo, y `node scripts/render-posters.mjs` si cambian las capturas. Ambos escriben en `assets/` y no forman parte del build.

Se eligió un compilador pequeño en JavaScript con tablas e inline explícito, Zod para datos y html-to-text. Evita la transformación opaca de otra DSL para una composición de una columna. Los tokens compartidos de `data/brand.json` se resuelven a valores concretos mediante `src/theme.mjs`; no quedan variables CSS en el email. Lockfile, datos fijos y ausencia de timestamps en el build permiten compilación determinista. Los informes de inspección y QA se generan por separado.

## Galería y QA

La botonera inferior derecha cambia producto y versión, recuerda el producto en localStorage y permite copiar, abrir o descargar el archivo compilado exacto. Comparte un estado sin datos personales: `?model=dentalos&format=short&width=390`. `clean=1` oculta la interfaz para captura. El botón de restauración aparece al enfocarlo con teclado o pasar el puntero. El iframe y el JS están únicamente en la galería.

```bash
npx playwright install chromium firefox
npm run dev                 # otra terminal
npm run qa
npm run qa:extra
npm run qa:a11y
```

Las capturas son evidencia de navegador, **no pruebas en Gmail/Outlook**. Leé `docs/compatibility.md` y `docs/qa/REVIEW.md`. Para nuevos productos copiá `data/products/eclipse.json`, agregá contenido, tokens, fuentes, enlaces y evidencia; la plantilla se reutiliza. Para incluirlos en la botonera, agregá su entrada al build y sus controles al pequeño shell de galería.

## Continuidad

Se trabajó sobre el repositorio Eclipse-email-kit que ya existía. La galería se publica en GitHub Pages desde `main` por autorización posterior de Ignacio. Los repositorios de producto no se modifican. Fuentes y limitaciones: `docs/sources.md`. Checklist: `docs/preflight.md`. Registro de decisiones: `docs/checkpoint.md`.
