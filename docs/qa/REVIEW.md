# Revisión de entrega

## Rediseño visual · 17/10/2026

Plantillas rehechas con la dirección de arte de la web: eclipse del hero con su dial, marcas de sección `01 ── ◐ ETIQUETA` con el glifo de fase avanzando hacia el sol, titulares en Instrument Serif con una sola palabra destacada, precio como lectura mono, libro de anticipo/saldo con filetes punteados, marcas de registro en tarjetas y figuras, amanecer entre la demo y los números y el sol al cierre. Copy reescrito en rioplatense, corto y concreto; precios, condiciones y advertencias de demo sin cambios de fondo.

- Pruebas de sistema: 8 (se agregó titular con una palabra destacada, enlace de la breve a la completa y peso < 80 kB).
- QA de navegador: Chromium 320/390/1440, imágenes y fuentes bloqueadas, solo inline, nombres largos, modo oscuro CSS, galería; sin desbordes. Firefox no estaba instalado en este entorno: queda pendiente repetirlo.
- Axe WCAG 2 A/AA: 0 incidencias en los tres emails completos y en la galería.
- Salida de envío simulada con datos completos de prueba: sin textos de borrador y todos los recursos HTTPS.
- Build determinista: `determinism.json` (34 archivos, dos builds idénticos).

Lo que sigue sin probarse: Gmail, Outlook y Apple Mail reales.

## Revisión anterior (diseño v1)

## Comprobaciones realizadas

- Seis piezas iniciales compiladas: tres completas y tres breves. Además, base Eclipse, rubro cafetería de TableFlow y pack de lanzamiento en borrador.
- Siete pruebas de sistema: aritmética y promoción, exclusiones de extras/pack, trailer opcional, escape de contenido y URLs, personalización, tokens compartidos y capacidad de superar gates con datos completos de prueba.
- 26 registros de QA en Chromium/Firefox: anchos 320, 390 y 1440, imágenes activas y bloqueadas, fuentes cargadas y fallbacks; sin overflow horizontal. Cambio de producto, estado recordado, formato breve, controles de tamaño, Escape y correspondencia de enlaces de descarga.
- Pruebas adicionales en ambos navegadores: títulos/nombres largos, estructura solo inline, modo oscuro CSS, galería táctil 390, foco atrapado en panel, restauración de foco, descarga idéntica al archivo y controles ocultables.
- Build determinista comprobado por SHA-256 en 34 archivos de salida/manifiesto: `determinism.json`.
- Exportación de envío probada con ejemplos incompletos: rechazo esperado, sin escribir salida ready. Faltantes reales en `validation.json`.
- Referencias de Gmail/Caniemail consultadas; patrones de Outlook revisados. Sin clientes reales de email ni Edge real: pendientes, no declarados como comprobados.

Análisis automático Axe WCAG 2 A/AA: **0 incidencias detectadas** en los tres emails completos y en el panel de galería. Complementa la revisión manual; no acredita accesibilidad universal.

## Revisión visual y correcciones

Se inspeccionaron las capturas originales de Eclipse, Volta, TableFlow y DentalOS, y renders finales de la galería, selector y correos. Se preservó la separación de noche/amanecer de Eclipse, con titulares vivos y capturas del producto como evidencia. Se ajustó el acento de las etiquetas sobre fondo oscuro para no usar un verde de bajo contraste. Los productos se identifican con su acento en la cabecera.

Se detectaron modales de bienvenida en las primeras capturas de Volta y DentalOS; se repitieron después de cerrarlos. Se corrigió el foco del panel para evitar que Tab saliera del diálogo. Los nombres largos y fallback no empujan el ancho a 320 px. Los párrafos y CTAs siguen visibles con imágenes bloqueadas; sus alternativas son texto, no un email rasterizado.

Los renders completos son largos porque incluyen la propuesta íntegra solicitada. La breve es una pieza adicional, no reemplaza la completa. Las capturas se guardan completas para inspeccionar todos los módulos; las de galería/selector muestran su contexto web.

## Evidencia

- `browser-results.json`: comprobaciones de navegador (Chromium en el rediseño; Firefox marcado como no disponible).
- `extra-results.json`: casos extremos y controles.
- `accessibility.json`: análisis automático WCAG A/AA (complementario, no certificación).
- `validation.json`: estructura y bloqueos de salida.
- `screenshots/`: renders originales PNG por navegador/producto/ancho/caso.
- `docs/sources/live/`: evidencia publicada utilizada para copy y assets.

No se midió conversión ni rendimiento comercial. No se produjeron assets audiovisuales, escenas, guiones ni reproductores. El placeholder del trailer es HTML estático.
