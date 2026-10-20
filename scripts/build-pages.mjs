import fs from 'node:fs/promises';
import path from 'node:path';

const output = '_site';
const manifest = JSON.parse(await fs.readFile('previews/manifest.json', 'utf8'));
const products = new Set(['volta', 'tableflow', 'dentalos']);
if (manifest.length !== 8 || manifest.some(item => !products.has(item.id) || !['full', 'short'].includes(item.format))) {
  throw new Error('Pages requiere los ocho ejemplos públicos iniciales. Ejecutá npm run build.');
}
await fs.rm(output, {recursive: true, force: true});
await fs.mkdir(path.join(output, 'previews'), {recursive: true});
await fs.mkdir(path.join(output, 'dist/emails/drafts'), {recursive: true});
for (const file of ['index.html', 'gallery.css', 'gallery.js', 'personalize.js', 'conditions-volta-2026-10-19.html', 'conditions.html', 'regalos-volta.html', 'manifest.json']) {
  await fs.copyFile(`previews/${file}`, `${output}/previews/${file}`);
}
await fs.cp('assets', `${output}/assets`, {recursive: true});
for (const item of manifest) {
  for (const extension of ['html', 'text', 'preview']) {
    const source = item[extension].replace(/^\.\.\//, '');
    const expected = `dist/emails/drafts/${item.id}-${item.id}-example-${item.format}${item.id==='volta'&&item.version==='original'?'-original':''}.${extension === 'html' ? 'html' : extension==='preview'?'preview.json':'txt'}`;
    if (source !== expected) throw new Error(`No se publica una propuesta personalizada: ${source}`);
    await fs.copyFile(source, path.join(output, source));
  }
}
await fs.writeFile(`${output}/.nojekyll`, '');
await fs.writeFile(`${output}/index.html`, '<!doctype html><html lang="es-AR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0;url=previews/"><title>Eclipse · Modelos de email</title><script>location.replace("previews/"+location.search+location.hash)</script><a href="previews/">Abrir modelos de email de Eclipse</a></html>\n');
console.log('Pages preparado en _site/: galería, assets y ocho borradores públicos.');
