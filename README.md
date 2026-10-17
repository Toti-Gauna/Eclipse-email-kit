# Eclipse Email Kit

Kit comercial local con la identidad visual de la web de Eclipse (dirección de arte «Efemérides»: eclipse del hero, marcas de sección en mono, serif display, libros de precios y amanecer al cierre), tres productos y datos reutilizables. Incluye HTML de email con estilos críticos inline, texto plano, galería estática, capturas y condiciones. Estado: **borradores revisados, no listos para envío** por falta de remitente/contacto real y URLs autorizadas de assets/condiciones. Los ejemplos de prospectos son ficticios.

## Galería publicada y despliegue

GitHub Pages: https://toti-gauna.github.io/Eclipse-email-kit/

El workflow `.github/workflows/pages.yml` compila, prueba y despliega en cada push a `main`, y también admite ejecución manual. Pages utiliza GitHub Actions como origen. `npm run build && npm run build:pages` prepara `_site/` con la galería, los assets y los seis ejemplos públicos iniciales. La raíz redirige a `previews/`, conservando los parámetros del selector.

El artefacto no incluye configuraciones, prospectos, fuentes originales de Notion ni propuestas personalizadas. Los archivos originales de `docs/sources/` se conservan solo localmente; la procedencia versionable está en `docs/sources.md`. Publicar la galería no habilita el envío de los borradores.

## Abrir y compilar

Node 24 o posterior y npm. Desde `/workspace/eclipse-email-kit`:

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

`npm run build` regenera las seis piezas iniciales y el manifiesto de galería. Cada producto tiene `full` y `short`; la breve enlaza al HTML completo en preview. Las variantes adicionales se generan por CLI. La compilación local no publica ni envía correos; el deploy de la galería se realiza mediante el workflow de Pages. No hay analytics ni trackers.

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

La salida aparece en `dist/emails/ready/` **solo si pasa los gates**: datos, prospecto no ficticio, remitente, contacto, demos, condiciones, assets, oferta, placeholders, URLs HTTPS y acceso HTTP a cada recurso. Usa el proxy del entorno cuando existe. Ese directorio se ignora en git. No se envía nada. La falta de trailer no bloquea esta salida. Si el pack o una asesoría económica están seleccionados/recomendados, requiere responsable, alcance y capacidad confirmados en `economicAdvisor`.

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

Al recibir miniatura y destino válidos, completá ambas URLs HTTPS, verificá los recursos y cambiá `state` a `ready` y `verified` a `true`. Recompilá. Aparece la miniatura enlazada y el CTA “Ver cómo funciona”. Si falta alguno, el preview muestra un placeholder estático y el email de envío omite el módulo completo. `enabled: false` lo elimina también del preview. No hay reproductor, video, guion, audio ni producción audiovisual en el kit.

## Organización

- `src/email/components/`: primitivas del lenguaje visual (marca de sección con glifo de fase, titulares serif, libro de precios, marcas de registro, figuras), en el orden del email completo: 01 brief, 02 trailer, 03 solución (producto, figuras, qué resuelve, recorrido, asesorías de growth, retención y finanzas, vista del cliente y del dueño, regalos en botones), 04 precio (seña 50 % y mantenimiento bonificado), 05 piezas extra con precios, 06 mantenimiento, 07 condiciones, 08 próximo paso y pie.
- `src/email/templates/eclipse.mjs`: recorrido noche → amanecer, numeración de secciones y versión breve.
- `src/schema.mjs`, `src/offers.mjs`: validación y reglas comerciales.
- `data/`: identidad, productos, precios, ofertas y prospectos.
- `assets/`: arte capturado de la web (`art-hero.jpg`, `art-sunrise.jpg`, `art-dawn.jpg`, con `scripts/capture-art.mjs`), glifos de fase y logo en PNG (`scripts/render-glyphs.mjs`), pósters de muestra del trailer (`scripts/render-posters.mjs`), capturas JPEG de las demos y fuentes con licencias (Instrument Serif, Geist y Geist Mono de Eclipse-Web; fuente de marca de cada producto).
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
