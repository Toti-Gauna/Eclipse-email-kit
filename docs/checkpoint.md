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

Ajuste posterior: a la mitad del email (entre la solución y el precio) el fondo pasa de la noche a un blanco cálido (`day` #fbf9f6, tarjetas en blanco) con un degradé largo y continuo generado por `scripts/render-transition.mjs`, sin línea de horizonte; reemplaza a la franja de amanecer capturada. Los bordes del sol de cierre se funden con el mismo blanco.

## Oferta, regalos y continuidad · 17/10/2026

Indicaciones de Ignacio: los USD 500 de la adaptación incluyen una asesoría inicial de growth marketing y retención de clientes (`includedExtras: ["growth"]` en `base-campaign.json`; ya no se recomienda «ambas asesorías», solo gestión económica, para no cobrar growth dos veces). El descuento en los demás planes por pagar la adaptación es la bonificación existente (el valor de Esencial, USD 30/mes, descontado de cualquier plan durante 3 meses): se muestra plan por plan en la tarjeta del precio y en el mantenimiento; no se inventó un monto nuevo. Volta muestra 6 de sus 16 regalos de muestra (fixture `gifts.ts` del repo supplements-ecommerce @ 653c05a; solo 2 se abrieron en vivo, el resto no se pudo abrir porque el proxy bloquea GitHub Pages) y un botón a la pantalla con todos (`previews/regalos-volta.html`). Nueva sección «Cómo seguimos»: llamada y alcance, seña con cuenta y portal de cliente, construcción con avances en el portal, entrega y mantenimiento, con botones al portal de la web (hoy en modo demostración) y a más productos de Eclipse. Wording general revisado.



## 20/10/2026 · actualización local de campaña Volta

Base local limpia en main, HEAD 419be26ef5eb78c5fb890a0f9896536b34a8a45e. Implementada oferta exclusiva ARS, Original/Mejorada, businessName editable en memoria, condiciones independientes y gates de recursos/compatibilidad. Volta solo leído, HEAD 0ae34ddeef588ff866762b0b96ad1995595b638b, working tree limpio. No hubo commit, push, deploy, publicación ni mensajes. El video existente se conectó sin reeditar; su contenido comercial incompatible bloquea la exportación. Informe: [CAMPAIGN-2026-10-20.md](qa/CAMPAIGN-2026-10-20.md).

## 20/10/2026 · autorización posterior de publicación

Ignacio pidió subir a main mediante PR y desplegar GitHub Pages. Se reutiliza el workflow existente; el artefacto público contiene ocho borradores ficticios y la galería, sin prospectos privados. Los gates de exportación y el bloqueo comercial del video siguen vigentes. El informe de entrega local anterior describe el estado antes de esta autorización.
