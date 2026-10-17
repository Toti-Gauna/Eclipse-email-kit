# Fuentes e identidad · 17/10/2026

## Inventario

El workspace estaba vacío de repositorios. Se localizaron repositorios accesibles mediante GitHub y se clonaron para lectura en `/workspace/references`. No se inspeccionó kinetic-studio. No se modificaron productos. Se clonó el repositorio **existente y vacío** `https://github.com/Toti-Gauna/Eclipse-email-kit` a `/workspace/eclipse-email-kit`; no se creó ni modificó un remoto.

Se leyeron `Eclipse-Web/AGENTS.md`, `Eclipse-Web/CLAUDE.md`, `Volta/AGENTS.md` y los README de productos. DentalOS/Tableflow no tenían AGENTS.md. Las restricciones de desarrollo de aquellos repos no requirieron cambios: aquí solo se leyó código y se capturaron sus webs.

| Fuente | Revisión inspeccionada | Archivos relevantes |
| --- | --- | --- |
| [Eclipse-Web](https://github.com/Toti-Gauna/Eclipse-Web) | e335533923260e8756574ffa9590a1e47ff66a9d | app/globals.css, app/fonts, components/layout/MiniEclipse.tsx, components/hero/hero.css, lib/env.ts |
| [Volta](https://github.com/Toti-Gauna/supplements-ecommerce) | 810c5ecf8acb848c73a9e507cc2d6b5a7aa36637 | app/globals.css, src/config/brand.ts, src/config/brands/volta.ts, src/demo/fixtures/gifts.ts, src/features/gifts/GiftView.tsx |
| [Tableflow](https://github.com/Toti-Gauna/Tableflow) | 2ee3dda89ac535ccf380c4790a668ed6bf9dbaf1 | README.md, src/styles.css, docs/tableflow/screens y design-system.md |
| [DentalOS](https://github.com/Toti-Gauna/DentalOS) | 359c5ed4474bea664edf981e14a02897fce906db | README.md, src/styles/app.css, docs/evidence |

## Decisiones visuales extraídas

Eclipse: void #05050a, night #0c0c14, ash #1a1a24, corona #f5b942, flare #ffe8b0, dawn #f4efe6, ink #111114. Geist + Instrument Serif. Composición editorial, contraste noche/amanecer, bordes finos, tarjetas de 20–28 px y CTA redondos. Logo circular con destello tomado de `.mini-eclipse svg` en la web, capturado a densidad 3x en PNG. El email conserva el nombre como texto vivo. Fondos toman el ámbar del halo radial actual y lo simplifican a un degradado de dos tonos con fondo sólido oscuro.

Volta: paleta BOX actual (lima #c8ff2e, carbono), Big Shoulders Display + Archivo. La configuración del producto marca su paleta como provisional: es la identidad actual inspeccionada, no una nueva marca inventada. Se conservan columnas de texto simples en email, sin copiar la compleja estructura web.

TableFlow: Fraunces + Manrope, papel #f7f3ea y verde #355443, tomando el recorrido publicado Mesa Clara. El repo tiene propuestas más recientes por rubro: no se atribuyeron todas esas propuestas al sitio publicado. Cafetería se configura como variante de datos con captura real de Ritual Café.

DentalOS: Newsreader + Source Sans 3, papel #f6f1e8 y verde #1e5c55. La fuente editorial se usa para títulos comerciales, y Source Sans para lectura. Los fallbacks Georgia/Arial o Arial Narrow/Impact mantienen la jerarquía sin rasterizar títulos, párrafos o precios.

## Verificación publicada y capturas

- https://toti-gauna.github.io/Eclipse-Web/es/
- https://toti-gauna.github.io/supplements-ecommerce/
- https://toti-gauna.github.io/supplements-ecommerce/admin-demo/
- https://toti-gauna.github.io/Tableflow/#/mesa-clara
- https://toti-gauna.github.io/Tableflow/#/admin/reservas
- https://toti-gauna.github.io/Tableflow/#/ritual-cafe
- https://toti-gauna.github.io/DentalOS/#/
- https://toti-gauna.github.io/DentalOS/#/admin

Se inspeccionaron DOM, texto y capturas con Chromium. En Volta se cerró la invitación al quiz; en DentalOS se cerró el selector inicial de demo. Son acciones de navegación local; no se crearon pedidos ni se enviaron mensajes. Evidencias originales y capturas limpias: `docs/sources/live/`; versiones JPEG 1120 px en `assets/`, de 61 a 84 kB aproximadamente. Los captions identifican funciones demostrativas. No se usaron capturas de desarrollos no publicados como evidencia del sitio publicado.

Regalos Volta verificados por código real de fixture y destino publicado:

- https://toti-gauna.github.io/supplements-ecommerce/regalo/?c=REGALO-VE1M-AR7X
- https://toti-gauna.github.io/supplements-ecommerce/regalo/?c=REGALO-NAV1-DADP

Ambos mostraron la apertura con destinatarios ficticios. Se presentan como experiencias de demo, no regalos disponibles para el prospecto. TableFlow/DentalOS no tienen módulo de regalos en sus emails.

## Fuentes comerciales

- Tarifario: https://app.notion.com/p/3e87be175d3481808c20e6e0ff20ebbb
- Manual: https://app.notion.com/p/3fb7be175d3481758b6bfe32ad4d54ad
- Copias consultadas: `docs/sources/tarifario.txt` y `manual.txt`.

Prevalece la sección superior aprobada el 16/10/2026. La instrucción de esta tarea extiende a la adaptación base tres meses equivalentes a Esencial, y autoriza ejecución directa del kit. No se aplicaron instrucciones históricas de generar trailers ni de esperar otras demos. No se modificaron el tarifario ni contratos previos.

## Limitaciones concretas

La web publicada y `lib/env.ts` muestran `hola@eclipse.example` y un WhatsApp con ceros: no son un contacto comercial usable. No se copiaron al CTA. Faltan remitente/contacto reales, URLs HTTPS autorizadas de los assets y condiciones, y presentación pública para versión breve. No hay capacidad confirmada de asesoría económica. Por eso los ejemplos y pack quedan en borrador y los gates de envío lo bloquean.

No se accedió a sesiones reales de Gmail, Outlook o Edge. No se enviaron emails de prueba ni se contrataron servicios de testing. El trailer no existe en este kit y no es un bloqueo.
