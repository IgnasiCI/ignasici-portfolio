/**
 * Genera public/cv-ignasi-capella.pdf desde la página /cv.
 *
 * El PDF no se maqueta aparte: sale de la misma página, que a su vez lee de
 * `src/data/cv.ts`. Así no hay dos versiones del CV que puedan descuadrarse,
 * que es lo que pasa siempre cuando el PDF se edita a mano.
 *
 * No forma parte de `npm run build`: el PDF está versionado y solo hay que
 * regenerarlo cuando cambian los datos. Así el despliegue no depende de tener
 * un navegador instalado.
 *
 * Uso:  npm run build && npm run preview   (en otra terminal)
 *       npm run cv
 */
import { chromium } from 'playwright-core';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';

const CHROME = process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const PUERTO = 4399;
const SALIDA = 'public/cv-ignasi-capella.pdf';

const TIPOS = {
  '.html': 'text/html; charset=utf-8', '.woff2': 'font/woff2',
  '.png': 'image/png', '.webp': 'image/webp', '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
};
const servidor = createServer(async (req, res) => {
  let ruta = join('dist', decodeURIComponent(req.url.split('?')[0]));
  try {
    if ((await stat(ruta)).isDirectory()) ruta = join(ruta, 'index.html');
  } catch {
    if (!extname(ruta)) ruta += '.html';
  }
  try {
    const cuerpo = await readFile(ruta);
    res.writeHead(200, { 'content-type': TIPOS[extname(ruta)] || 'application/octet-stream' });
    res.end(cuerpo);
  } catch {
    res.writeHead(404);
    res.end('404');
  }
});
await new Promise((r) => servidor.listen(PUERTO, r));

const navegador = await chromium.launch({ executablePath: CHROME });
const pagina = await navegador.newPage();
await pagina.goto(`http://localhost:${PUERTO}/cv`, { waitUntil: 'networkidle' });
await pagina.evaluate(() => document.fonts.ready);

await pagina.pdf({
  path: SALIDA,
  format: 'A4',
  // Los márgenes los pone el PDF, no la web: en pantalla el aire lo da el
  // propio navegador y en papel hay que reservarlo.
  margin: { top: '16mm', right: '16mm', bottom: '16mm', left: '16mm' },
  // Sin esto Chromium ignora los colores de fondo y el CV sale en blanco y
  // negro: las reglas y el acento desaparecerían.
  printBackground: true,
});

await navegador.close();
servidor.close();
console.log(`${SALIDA} generado.`);
