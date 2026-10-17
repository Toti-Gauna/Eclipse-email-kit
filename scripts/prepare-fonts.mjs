import fs from 'node:fs/promises';
const fonts={
'big-shoulders':'@fontsource-variable/big-shoulders-display/files/big-shoulders-display-latin-wght-normal.woff2',
archivo:'@fontsource-variable/archivo/files/archivo-latin-wght-normal.woff2',
fraunces:'@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2',
manrope:'@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2',
newsreader:'@fontsource/newsreader/files/newsreader-latin-400-normal.woff2',
'source-sans':'@fontsource/source-sans-3/files/source-sans-3-latin-400-normal.woff2'};
await fs.mkdir('assets/fonts/licenses',{recursive:true});
for(const [name,file] of Object.entries(fonts)){await fs.copyFile('node_modules/'+file,`assets/fonts/${name}.woff2`);const pkg=file.split('/').slice(0,2).join('/');await fs.copyFile(`node_modules/${pkg}/LICENSE`,`assets/fonts/licenses/${name}.txt`)}
