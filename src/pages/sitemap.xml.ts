import type { APIRoute } from 'astro';
import { site } from '../data/site';
import { proyectosVisibles } from '../data/proyectos';
import { IDIOMAS, ruta, rutaProyecto } from '../i18n';

/**
 * El sitemap sale de la misma tabla de rutas que el menú y las hreflang, así
 * que una página nueva aparece aquí sola.
 *
 * Cada URL declara sus alternativas con xhtml:link. Sin eso, Google ve dos
 * páginas parecidas y decide él cuál indexa; con eso, sabe que son la misma
 * página en dos idiomas y enseña la que toca según quién busca.
 */
export const GET: APIRoute = () => {
  const hoy = new Date().toISOString().split('T')[0];

  type Entrada = { rutas: Record<string, string>; prioridad: string };

  const entradas: Entrada[] = [
    {
      rutas: Object.fromEntries(IDIOMAS.map((i) => [i, ruta(i, 'portada')])),
      prioridad: '1.0',
    },
    ...proyectosVisibles.map((p) => ({
      rutas: Object.fromEntries(IDIOMAS.map((i) => [i, rutaProyecto(i, p.slug)])),
      prioridad: '0.8',
    })),
  ];

  const urls = entradas
    .flatMap((e) =>
      IDIOMAS.map((idioma) => {
        const alternativas = IDIOMAS.map(
          (otro) =>
            `    <xhtml:link rel="alternate" hreflang="${otro}" href="${new URL(e.rutas[otro], site.url).href}"/>`
        ).join('\n');
        return `  <url>
    <loc>${new URL(e.rutas[idioma], site.url).href}</loc>
${alternativas}
    <lastmod>${hoy}</lastmod>
    <priority>${e.prioridad}</priority>
  </url>`;
      })
    )
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
  );
};
