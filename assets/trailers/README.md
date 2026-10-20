# Trailers

Acá viven los videos de trailer (`<producto>.mp4`) y sus pósters (`<producto>-poster.jpg`).
No los copies a mano: `npm run trailer` los procesa, genera el póster y deja el producto listo.

```bash
# Un archivo de video (mp4, mov, webm, mkv…): lo deja en H.264/AAC con inicio rápido y saca el póster
npm run trailer -- --product volta --video ~/Descargas/volta-trailer.mp4

# Cuadro del póster en otro segundo, o con una imagen propia
npm run trailer -- --product volta --video trailer.mp4 --at 12
npm run trailer -- --product volta --video trailer.mp4 --poster mi-portada.jpg

# Video ya publicado (YouTube, Vimeo, Drive…): se enlaza tal cual; el póster es obligatorio
npm run trailer -- --product volta --url https://youtu.be/XXXX --poster portada.jpg --seconds 60

# Después de mirarlo y aprobarlo: habilita el envío (sin esto el trailer queda solo en el preview)
npm run trailer -- --product volta --verified

# Solo Volta: la campaña Mejorada exige además una revisión comercial. Confirmá que el video no muestra
# precios, cuotas, USD ni condiciones ajenas a la campaña y corré:
npm run trailer -- --product volta --commercial-ok
```

El correo muestra el póster con un botón de play que abre `previews/trailer-<producto>.html`, una página con el
reproductor (el correo no puede reproducir video). Esa página se publica con la galería. GitHub no acepta archivos de
más de 100 MB: si el video pesa más, usá `--compress`.
