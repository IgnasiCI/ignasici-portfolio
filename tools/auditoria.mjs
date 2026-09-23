/**
 * Auditoría de la web ya compilada.
 *
 * Comprueba las cuatro cosas que esta web afirma de sí misma:
 *   1. Accesibilidad real (axe-core) en TODAS las páginas y en los dos idiomas.
 *   2. Que la web se lee entera sin JavaScript.
 *   3. Que `prefers-reduced-motion` apaga el movimiento, no lo acorta.
 *   4. Lighthouse en móvil y escritorio, y el peso real de la primera carga.
 *
 * Estas herramientas NO son dependencias de la web: pesan más que la web. Se
 * instalan para auditar y se pueden borrar después:
 *
 *   npm install --no-save playwright-core axe-core lighthouse chrome-launcher
 *   npm run build && npm run auditar
 */
import { chromium } from 'playwright-core';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';

const CHROME = process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const PUERTO = 4321;
const BASE = `http://localhost:${PUERTO}`;

/* Las páginas salen del sitemap ya compilado, no de una lista escrita a mano.
   Así se audita exactamente lo que se publica: si una página se queda fuera
   del sitemap por error, aquí se nota; y si se añade un proyecto, se audita
   solo. Una lista a mano se queda corta justo el día que más falta hace. */
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
const PAGINAS = [
  ...new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname)),
  /* Las que van con noindex no están en el sitemap, pero existen y alguien
     las va a usar: el CV es justo la página que abre quien está valorando la
     candidatura. Se auditan igual. */
  '/cv',
  '/en/cv',
  '/gracias',
  '/en/thanks',
  '/404.html',
];
/* Cuántos proyectos hay publicados, para las comprobaciones sin JavaScript. */
const NUM_PROYECTOS = PAGINAS.filter((r) => r.startsWith('/proyectos/')).length;

const TIPOS = {
  '.html': 'text/html; charset=utf-8', '.woff2': 'font/woff2',
  '.png': 'image/png', '.webp': 'image/webp', '.avif': 'image/avif',
  '.svg': 'image/svg+xml', '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8', '.json': 'application/json',
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
const axe = await readFile('node_modules/axe-core/axe.min.js', 'utf8');
let problemas = 0;

/* 1. Accesibilidad -------------------------------------------------------
   Cada página en cuatro entornos: móvil y escritorio, y cada uno con el
   movimiento normal y reducido. Un fallo de contraste puede salir solo en un
   ancho, y un foco perdido solo con las animaciones apagadas.               */
console.log('\n── Accesibilidad (axe-core) ──');
const ENTORNOS = [
  { nombre: 'móvil', viewport: { width: 390, height: 844 }, reducedMotion: 'no-preference' },
  { nombre: 'móvil+rm', viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' },
  { nombre: 'escritorio', viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' },
  { nombre: 'escritorio+rm', viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' },
];
let comprobaciones = 0;
for (const ruta of PAGINAS) {
  let fallos = 0;
  for (const entorno of ENTORNOS) {
    const ctx = await navegador.newContext(entorno);
    const pagina = await ctx.newPage();
    await pagina.goto(BASE + ruta, { waitUntil: 'networkidle' });
    await pagina.addScriptTag({ content: axe });
    const { violations } = await pagina.evaluate(() =>
      window.axe.run(document, { resultTypes: ['violations'] })
    );
    fallos += violations.length;
    for (const v of violations) console.log(`      [${entorno.nombre}] [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length})`);
    comprobaciones++;
    await ctx.close();
  }
  problemas += fallos;
  console.log(`  ${ruta.padEnd(28)} ${fallos === 0 ? '✓' : '✗ ' + fallos}`);
}
console.log(`  ${PAGINAS.length} páginas × ${ENTORNOS.length} entornos = ${comprobaciones} comprobaciones`);

/* 2. Sin JavaScript -------------------------------------------------------
   No basta con que la página "cargue": se comprueba que sigue estando lo que
   hace falta para usarla — los enlaces a los proyectos, el correo y el
   selector de idioma. Es la diferencia entre servir HTML y funcionar.       */
console.log('\n── Sin JavaScript ──');
{
  const ctx = await navegador.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const pagina = await ctx.newPage();
  await pagina.goto(BASE + '/', { waitUntil: 'load' });
  const enlacesProyecto = await pagina.locator('.proyecto__nombre a').count();
  const nav = await pagina.locator('[data-nav] .nav__boton').isVisible();
  const correo = await pagina.locator('a[href^="mailto:"]').first().isVisible();
  const idioma = await pagina.locator('.idiomas').isVisible();
  const imagenes = await pagina.locator('.proyecto__medio img').count();
  const ok = enlacesProyecto === NUM_PROYECTOS && correo && idioma && nav && imagenes === NUM_PROYECTOS;
  if (!ok) problemas++;
  console.log(`  ${ok ? '✓' : '✗'} ${enlacesProyecto} proyectos · ${imagenes} imágenes · correo ${correo ? 'sí' : 'no'} · idioma ${idioma ? 'sí' : 'no'} · barra ${nav ? 'sí' : 'no'}`);
  await ctx.close();
}

/* 3. Movimiento reducido --------------------------------------------------
   Que la duración de las transiciones sea ~0 de verdad, no solo más corta. */
console.log('\n── prefers-reduced-motion ──');
{
  const ctx = await navegador.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } });
  const pagina = await ctx.newPage();
  await pagina.goto(BASE + '/', { waitUntil: 'networkidle' });
  const resultado = await pagina.evaluate(() => {
    const largas = [...document.querySelectorAll('*')].filter((e) => {
      const s = getComputedStyle(e);
      const dur = (v) => Math.max(0, ...v.split(',').map((x) => parseFloat(x) || 0));
      return dur(s.transitionDuration) > 0.05 || dur(s.animationDuration) > 0.05;
    }).length;
    return { largas, scroll: getComputedStyle(document.documentElement).scrollBehavior };
  });
  const ok = resultado.largas === 0 && resultado.scroll === 'auto';
  if (!ok) problemas++;
  console.log(`  ${ok ? '✓ movimiento apagado y scroll instantáneo' : `✗ ${resultado.largas} elementos con animación · scroll ${resultado.scroll}`}`);
  await ctx.close();
}

/* 4. Peso de la primera carga -------------------------------------------- */
console.log('\n── Primera carga (portada, caché vacía) ──');
{
  const ctx = await navegador.newContext({ viewport: { width: 390, height: 844 } });
  const pagina = await ctx.newPage();
  const recursos = [];
  pagina.on('response', async (r) => {
    try { recursos.push([r.url().replace(BASE, ''), (await r.body()).length]); } catch {}
  });
  await pagina.goto(BASE + '/', { waitUntil: 'networkidle' });
  await pagina.waitForTimeout(500);
  const total = recursos.reduce((a, [, n]) => a + n, 0);
  console.log(`  ${recursos.length} peticiones · ${(total / 1024).toFixed(1)} KB sin comprimir`);
  for (const [u, n] of recursos) console.log(`    ${(n / 1024).toFixed(1).padStart(7)} KB  ${u}`);
  const terceros = recursos.filter(([u]) => u.startsWith('http')).length;
  if (terceros) { problemas++; console.log(`  ✗ ${terceros} peticiones a terceros`); }
  else console.log('  ✓ 0 peticiones a terceros');
  await ctx.close();
}
await navegador.close();

/* 5. Lighthouse ----------------------------------------------------------- */
const chrome = await chromeLauncher.launch({
  chromePath: CHROME,
  chromeFlags: ['--headless=new', '--no-sandbox', '--disable-dev-shm-usage'],
});
console.log('\n── Lighthouse ──');
for (const formato of ['mobile', 'desktop']) {
  const { lhr } = await lighthouse(BASE + '/', {
    port: chrome.port, output: 'json', formFactor: formato,
    screenEmulation: formato === 'desktop'
      ? { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1, disabled: false }
      : undefined,
    throttling: formato === 'desktop'
      ? { rttMs: 40, throughputKbps: 10240, cpuSlowdownMultiplier: 1 }
      : undefined,
  });
  const notas = Object.values(lhr.categories).map((c) => `${c.title} ${Math.round(c.score * 100)}`);
  console.log(`  ${formato.padEnd(9)} ${notas.join(' · ')}`);
  for (const k of ['largest-contentful-paint', 'cumulative-layout-shift', 'total-blocking-time'])
    console.log(`      ${k}: ${lhr.audits[k].displayValue}`);
  for (const c of Object.values(lhr.categories)) {
    if (c.score < 1) {
      problemas++;
      for (const a of c.auditRefs.map((r) => lhr.audits[r.id]))
        if (a && a.score !== null && a.score < 1 && a.scoreDisplayMode !== 'informative')
          console.log(`      ✗ [${c.title}] ${a.id}: ${a.title}`);
    }
  }
}
await chrome.kill();
servidor.close();

console.log(problemas === 0 ? '\n✓ Todo en verde.\n' : `\n✗ ${problemas} cosa(s) que revisar.\n`);
process.exit(problemas === 0 ? 0 : 1);
