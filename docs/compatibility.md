# Matriz de compatibilidad

| Entorno | Comprobado | Revisado por compatibilidad | Pendiente |
| --- | --- | --- | --- |
| Chromium 141 (Linux, Playwright) | Rediseño 17/10: galería, seis emails, 320/390/1440, imágenes y fuentes bloqueadas, solo inline, modo oscuro, teclado, descargas | — | Chrome de usuario final |
| Firefox 142 (Linux, Playwright) | Versión anterior del diseño | — | No instalado en el entorno del rediseño: repetir `npm run qa` y `qa:extra` con Firefox. Sus capturas viejas se retiraron |
| Edge real | — | Estructura web estándar | No instalado; Chromium no prueba Edge real |
| Gmail web/iOS/Android | — | Tablas fluidas, inline, preheader oculto, media query simple, sin JS/video | Render en clientes reales |
| Outlook.com / nuevo Outlook | — | Tablas, colores explícitos, CTAs de tabla | Render en clientes reales |
| Outlook clásico Windows | — | Tabla condicional 640 px, 96 dpi, fuentes de sistema y mso-padding en botones | Motor Word real, DPI y modo oscuro |

Rediseño visual (17/10/2026), lo que cambia para los clientes:

- Tipografía: Instrument Serif (titulares), Geist (texto) y Geist Mono (marcas, precios) por `@font-face` como mejora. Sin webfonts (Gmail, Outlook): Georgia, Helvetica/Segoe UI y Menlo/Consolas. Outlook clásico recibe Georgia/Arial/Consolas por clases `serif` y `mono` dentro de un bloque condicional `mso`. Los precios grandes usan mono porque las cifras antiguas de Georgia no sirven como lectura.
- Arte: tres JPEG capturados de la web (hero, amanecer, sol) con fondo sólido del color de su sección detrás; con imágenes bloqueadas queda el alt y el fondo. Glifos y logo en PNG transparente; nunca SVG.
- Tabla de planes: en escritorio, tres columnas; en teléfonos, una media query oculta las columnas y muestra los mismos importes bajo cada plan. Sin soporte de media queries (Gmail con cuentas no Google), la tabla se comprime sin desbordar a 320 px.
- Modo oscuro: el diseño ya va de noche a amanecer con colores explícitos; `color-scheme: light dark` evita la inversión automática en Apple Mail. Gmail/Outlook pueden oscurecer las secciones claras.
- Peso: 84–91 kB las completas Original (con 10–15 capturas y pesos; Volta, con regalos, es la mayor; la Mejorada de Volta ~27 kB) y ~21 kB las breves; las pilas de fuentes son cortas a propósito porque se repiten en cada estilo inline, por debajo del recorte de Gmail (102 kB).

HTML final de una columna; ancho máximo 640 px. No depende de flex/grid, variables CSS, webfonts, JavaScript, formularios, iframe ni video. La galería contiene un iframe separado, que nunca se exporta. Botones basados en tablas con padding de Outlook y color sólido: no requieren VML; bordes redondeados pueden pasar a rectangulares en Outlook clásico. Los degradados usan siempre color de fondo sólido y texto claro. PNG para el logo, JPEG para capturas, medidas explícitas y alt; el contenido decisivo es texto.

Las pruebas con fuentes bloqueadas usan los fallbacks declarados de cada producto; no usan otra fuente artificial. La prueba inline-only elimina todos los bloques style, a 320 px y con títulos largos, para verificar que la estructura base sigue legible. Es una aproximación restrictiva en navegador, no emulación exacta de Word.

Modo oscuro: emulación `prefers-color-scheme:dark` en ambos navegadores y revisión de contraste de superficies explícitas. No simula inversión forzada de Gmail/Outlook. Se preservan fondos sólidos y logo legible, pero no se promete controlar todos los clientes.

Referencias técnicas consultadas el 17/10/2026:

- https://developers.google.com/workspace/gmail/design/css — usar CSS compatible y media queries como mejora; las propiedades no admitidas pueden ignorarse.
- https://www.caniemail.com/features/html-video/ — soporte fragmentado; este kit no incorpora video.
- https://www.caniemail.com/features/css-linear-gradient/ — degradado como mejora, fondo sólido de respaldo.
- https://www.caniemail.com/features/css-at-font-face/ — fuentes remotas como mejora progresiva, fallbacks de sistema.

Medición de bytes HTML (sin imágenes externas): `docs/qa/validation.json`. Máximo de las variantes iniciales tras el rediseño: 83.520 bytes, por debajo de 96.000 (límite del build, antes 90.000) y de 102 kB (recorte de Gmail). La longitud del correo completo responde al alcance solicitado; existe una versión breve para primer contacto. Esto no demuestra una mayor conversión: futuras comparaciones deben medir respuesta/reuniones por variante y período, sin trackers por defecto.
