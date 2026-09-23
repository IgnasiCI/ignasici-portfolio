/**
 * Genera la imagen que se ve al compartir el enlace (LinkedIn, WhatsApp,
 * Slack) y el icono de iOS.
 *
 * No forma parte de `npm run build`: los PNG están versionados y solo hay que
 * regenerarlos si cambia el titular. Así el despliegue no depende de esto ni
 * de tener un navegador instalado.
 *
 * Se dibuja en Chromium y no con SVG a secas porque hace falta la Geist de
 * verdad: un SVG renderizado en un servidor sin esa fuente sale con otra, y la
 * imagen que más gente ve de esta web acabaría en Arial.
 *
 * Uso: npm run og
 */
import { chromium } from 'playwright';
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';

const INK = '#12110f';
const PAPER = '#f1f0ec';
const MUTED = '#837f77';
const ACCENT = '#e4322b';

/* La fuente viaja dentro del HTML en base64: así el render no depende de
   ningún servidor levantado ni de rutas relativas. */
const geist = (await readFile('public/fonts/geist-latin.woff2')).toString('base64');

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face {
  font-family: 'Geist';
  src: url(data:font/woff2;base64,${geist}) format('woff2');
  font-weight: 100 900;
}
* { margin: 0; box-sizing: border-box; }
body {
  width: 1200px; height: 630px;
  background: ${INK};
  font-family: 'Geist', sans-serif;
  padding: 80px;
  display: flex; flex-direction: column; justify-content: space-between;
  position: relative;
}
.rotulo {
  font-size: 19px; letter-spacing: 3.2px; text-transform: uppercase;
  color: ${MUTED};
}
h1 {
  font-size: 84px; line-height: 1.05; letter-spacing: -3.4px;
  font-weight: 500; color: ${PAPER};
}
.acento { color: ${ACCENT}; }
.barra { position: absolute; left: 0; bottom: 0; width: 100%; height: 4px; background: ${ACCENT}; }
</style></head><body>
  <p class="rotulo">Ignasi Capella — Desarrollador front-end</p>
  <h1>Diseño la interfaz<br>y después la construyo<span class="acento">.</span></h1>
  <p class="rotulo" style="color:${PAPER}">ignasici.com</p>
  <div class="barra"></div>
</body></html>`;

const navegador = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
});
const pagina = await navegador.newPage({ viewport: { width: 1200, height: 630 } });
await pagina.setContent(html, { waitUntil: 'load' });
await pagina.evaluate(() => document.fonts.ready);
await writeFile('public/og.png', await pagina.screenshot());
await navegador.close();

/* El icono de iOS sale del mismo favicon, para que no haya dos marcas. */
await sharp(await readFile('public/favicon.svg'))
  .resize(180, 180)
  .png()
  .toFile('public/apple-touch-icon.png');

console.log('og.png y apple-touch-icon.png regenerados.');
