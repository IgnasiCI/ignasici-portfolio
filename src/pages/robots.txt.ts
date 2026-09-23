import type { APIRoute } from 'astro';
import { site } from '../data/site';

/* Endpoint y no archivo fijo: así la dirección del sitemap sale del mismo
   sitio que la canónica y no puede quedarse desfasada. */
export const GET: APIRoute = () => {
  const cuerpo = `User-agent: *
Allow: /

Sitemap: ${new URL('/sitemap.xml', site.url).href}
`;
  return new Response(cuerpo, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
