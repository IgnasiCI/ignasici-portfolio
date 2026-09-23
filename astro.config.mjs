// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ignasici.com',
  // Todo el CSS viaja dentro del HTML: una petición menos antes de pintar.
  // Con ~15 KB de estilos compensa; a partir de ~30 KB dejaría de compensar.
  build: { inlineStylesheets: 'always' },
  compressHTML: true,
  // Sin barra final: ignasici.com/proyectos/velalia, no .../velalia/
  trailingSlash: 'never',
  // Los idiomas los lleva src/i18n a mano, no el enrutador de Astro: las rutas
  // están traducidas (/en/projects, no /en/proyectos) y eso Astro no lo hace
  // solo. Ver src/i18n/index.ts.
});
