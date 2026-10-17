# Matriz de compatibilidad

| Entorno | Comprobado | Revisado por compatibilidad | Pendiente |
| --- | --- | --- | --- |
| Chromium 141 (Linux, Playwright) | Galería, seis emails, 320/390/1440, imágenes, fuentes, teclado, descargas | — | Chrome de usuario final |
| Firefox 142 (Linux, Playwright) | Renders, galería, mismo conjunto de tamaños y controles | — | Firefox en otros sistemas |
| Edge real | — | Estructura web estándar | No instalado; Chromium no prueba Edge real |
| Gmail web/iOS/Android | — | Tablas fluidas, inline, preheader oculto, media query simple, sin JS/video | Render en clientes reales |
| Outlook.com / nuevo Outlook | — | Tablas, colores explícitos, CTAs de tabla | Render en clientes reales |
| Outlook clásico Windows | — | Tabla condicional 640 px, 96 dpi, fuentes de sistema y mso-padding en botones | Motor Word real, DPI y modo oscuro |

HTML final de una columna; ancho máximo 640 px. No depende de flex/grid, variables CSS, webfonts, JavaScript, formularios, iframe ni video. La galería contiene un iframe separado, que nunca se exporta. Botones basados en tablas con padding de Outlook y color sólido: no requieren VML; bordes redondeados pueden pasar a rectangulares en Outlook clásico. Los degradados usan siempre color de fondo sólido y texto claro. PNG para el logo, JPEG para capturas, medidas explícitas y alt; el contenido decisivo es texto.

Las pruebas con fuentes bloqueadas usan los fallbacks declarados de cada producto; no usan otra fuente artificial. La prueba inline-only elimina todos los bloques style, a 320 px y con títulos largos, para verificar que la estructura base sigue legible. Es una aproximación restrictiva en navegador, no emulación exacta de Word.

Modo oscuro: emulación `prefers-color-scheme:dark` en ambos navegadores y revisión de contraste de superficies explícitas. No simula inversión forzada de Gmail/Outlook. Se preservan fondos sólidos y logo legible, pero no se promete controlar todos los clientes.

Referencias técnicas consultadas el 17/10/2026:

- https://developers.google.com/workspace/gmail/design/css — usar CSS compatible y media queries como mejora; las propiedades no admitidas pueden ignorarse.
- https://www.caniemail.com/features/html-video/ — soporte fragmentado; este kit no incorpora video.
- https://www.caniemail.com/features/css-linear-gradient/ — degradado como mejora, fondo sólido de respaldo.
- https://www.caniemail.com/features/css-at-font-face/ — fuentes remotas como mejora progresiva, fallbacks de sistema.

Medición de bytes HTML (sin imágenes externas): `docs/qa/validation.json`. Máximo de las variantes iniciales: 27.468 bytes, muy por debajo de 90.000. La longitud del correo completo responde al alcance solicitado; existe una versión breve para primer contacto. Esto no demuestra una mayor conversión: futuras comparaciones deben medir respuesta/reuniones por variante y período, sin trackers por defecto.
