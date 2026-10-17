# Checkpoint · kit v1.0.0 · 17/10/2026

Implementación completa del kit local: fuentes versionables, datos de marca/productos/ofertas/prospectos, compilador determinista, HTML + texto plano, galería estática, condiciones y evidencia QA. No se publicaron ni enviaron piezas; no se modificó ningún repo remoto ni producto. No se inspeccionó kinetic-studio.

Decisiones:

- Mantener identidad Eclipse inspeccionada, con fuentes y acentos de cada producto.
- Tablas e inline explícitos en un compilador pequeño; sin framework para galería.
- Usar capturas de las demos publicadas, no presentar desarrollo del repo como capacidad publicada.
- Base desde USD 500; campaña de tres meses equivalentes a Esencial según instrucción actual. Tarifario aprobado del 16/10 prevalece sobre histórico.
- Trailer opcional: pendiente estático en preview; omitido en salida de envío salvo ambas URLs verificadas. Integración posterior solo por datos.
- Regalos verificados de Volta son ejemplos ficticios de experiencia. Sin premios ni campañas reales incluidos.
- Pack/asesoría económica bloqueados hasta confirmar responsable y capacidad.

Pendientes externos que no impiden revisar el kit: remitente/contacto real, URLs de assets/condiciones para envío, presentación pública para la breve, clientes reales Gmail/Outlook/Edge y eventual trailer. No se fabricaron contactos ni servicios.

La galería sigue disponible con `npm run dev`, puerto 4173. Las referencias originales están fuera del kit en `/workspace/references`; no son necesarias para recompilar. Las fuentes necesarias y assets optimizados están dentro del kit.

Para retomar: leer README, sources, compatibility y preflight; revisar JSON de validación. Los scripts de inspección live son auxiliares de evidencia y requieren conectividad; build/validate/test no dependen de ellos. No se midieron horas humanas ni costos de agentes/terceros, por lo que no se atribuyen cifras de ahorro o rentabilidad.

Registro consolidado guardado y verificado en Eclipse Agency: https://app.notion.com/p/3fc7be175d34816ba704d8f4a7a306d0

## Despliegue GitHub Pages autorizado

Ignacio solicitó publicar la galería con GitHub Actions desde `main`. Se agregó el workflow de build/validación/deploy y un empaquetado explícito de `_site/`. Las configuraciones y las copias originales de Notion quedan fuera del sitio; las propuestas personalizadas tampoco se publican. La galería continúa mostrando borradores y no envía correos.

URL esperada: https://toti-gauna.github.io/Eclipse-email-kit/

## Rediseño visual y de copy · 17/10/2026

Ignacio pidió plantillas más premium y alineadas a la web. Se rehicieron cabecera, hero, demo, precio, plan mensual, complementos, condiciones, cierre y pie con el sistema de Eclipse-Web (tokens, Instrument Serif/Geist/Geist Mono, glifos de fase, marcas de registro, libros con filetes) y arte capturado de la propia web. La identidad de cada producto queda en su ficha (nombre con su tipografía y color) y en las capturas; el resto es Eclipse. Copy reescrito por producto (`includes`, `apart`, titulares con `*palabra*`); se retiraron campos sin uso (`improvement`, `scope`, `gamification`, `surface`, fuentes de texto por producto). Las secciones se numeran solas y una oferta sin complementos (pack) no muestra esa sección. Sin cambios en precios, reglas de oferta, gates ni procedencia.

## Estructura comercial del email · 17/10/2026

Ignacio fijó el orden del email completo: brief corto («Vimos…» solo con hecho investigado y fuente; si no, apertura sectorial), trailer de 60 s en motion graphics con música para celular y compu (basado en kinetic-studio; el kit no lo produce), solución con asesorías de growth marketing, retención y finanzas y botones a la vista del cliente y del dueño o profesional, regalos en botones si es ecommerce, precio USD 500 con seña del 50 % y mantenimiento Esencial bonificado, piezas extra recomendadas con precio y el plan mensual. El trailer se ve en preview con un póster de muestra y en envío solo cuando `trailerUrl` y `posterUrl` están verificados. Piezas extra: las dos asesorías (USD 250, cada una USD 150) y landing, más los canales de cada producto a precio de complemento de la web (WhatsApp USD 100, chatbot IA y voz USD 250). Como la propuesta base ahora recomienda la asesoría económica, exportar para envío exige `economicAdvisor` confirmado en `data/brand.json`; mientras tanto la web y el email la muestran «sujeta a validación».

