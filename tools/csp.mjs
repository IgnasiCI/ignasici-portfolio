/**
 * Cierra la Content-Security-Policy después de compilar.
 *
 * En el HTML queda un bloque <script> en línea: los datos estructurados
 * (JSON-LD). Los navegadores lo someten a `script-src` igual que a cualquier
 * otro script, así que sin una excepción habría que abrir la política entera
 * con 'unsafe-inline'. En vez de eso, aquí se calcula el hash exacto de cada
 * bloque en línea y se escribe en dist/_headers.
 *
 * Resultado: script-src queda en 'self' + los hashes concretos de esta
 * versión. Si alguien inyectase un script, el navegador lo bloquearía.
 */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join, extname } from 'node:path';

const DIST = 'dist';
const MARCA = "'sha256-REEMPLAZAR'";

async function* htmls(dir) {
  for (const entrada of await readdir(dir, { withFileTypes: true })) {
    const ruta = join(dir, entrada.name);
    if (entrada.isDirectory()) yield* htmls(ruta);
    else if (extname(entrada.name) === '.html') yield ruta;
  }
}

const hashes = new Set();
const enLinea = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;

for await (const archivo of htmls(DIST)) {
  const html = await readFile(archivo, 'utf8');
  for (const [, atributos, cuerpo] of html.matchAll(enLinea)) {
    if (/\bsrc=/i.test(atributos)) continue; // los externos ya los cubre 'self'
    hashes.add(`'sha256-${createHash('sha256').update(cuerpo).digest('base64')}'`);
  }
}

const ruta = join(DIST, '_headers');
const cabeceras = await readFile(ruta, 'utf8');

if (!cabeceras.includes(MARCA)) {
  throw new Error(`No encuentro ${MARCA} en ${ruta}. ¿Se ha editado public/_headers?`);
}

await writeFile(ruta, cabeceras.replace(MARCA, [...hashes].join(' ')));
console.log(`CSP: ${hashes.size} script(s) en línea autorizados por hash.`);
