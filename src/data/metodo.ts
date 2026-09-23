import type { T } from './site';

/**
 * CÓMO TRABAJO
 *
 * Cuatro afirmaciones, cada una con su prueba medida. La estructura es
 * deliberada: `afirmacion` es lo que digo y `evidencia` es el número que lo
 * sostiene. Si una fila no tiene número, no entra — es la regla de toda la
 * web aplicada también aquí.
 *
 * Los números salen de `npm run auditar` en esta web y de compilar los
 * repositorios de los proyectos. No están copiados de ningún README.
 */
export const metodo = [
  {
    titulo: { es: 'Accesibilidad', en: 'Accessibility' } satisfies T,
    afirmacion: {
      es: 'No es una casilla que se marca al final. axe-core pasa por todas las páginas en cuatro entornos —móvil y escritorio, con movimiento normal y reducido—, y las páginas salen del sitemap compilado, así que se audita lo que se publica y no una lista que alguien se acuerde de actualizar.',
      en: 'axe-core over every page in four environments: mobile and desktop, normal and reduced motion. The list comes from the compiled sitemap, so what gets audited is what gets published.',
    } satisfies T,
    evidencia: {
      es: 'Velàlia: 0 incumplimientos en 6 páginas × 5 entornos. Esta web: 0 en 7 × 4.',
      en: 'Velàlia: 0 violations across 6 pages × 5 environments. This site: 0 across 7 × 4.',
    } satisfies T,
  },
  {
    titulo: { es: 'Rendimiento', en: 'Performance' } satisfies T,
    afirmacion: {
      es: 'El presupuesto se decide antes de escribir, no se optimiza después. Sin framework en el navegador y sin librería de animación: lo que no se manda no hay que optimizarlo.',
      en: 'The budget is decided before writing, not optimised afterwards. No framework in the browser and no animation library: what you never send, you never have to optimise.',
    } satisfies T,
    evidencia: {
      es: 'Esta web: 6 peticiones y 59 KB sin comprimir, LCP 1,3 s en móvil, CLS 0. Velàlia: 53 KB sin una imagen.',
      en: 'This site: 6 requests and 59 KB uncompressed, 1.3 s LCP on mobile, 0 CLS. Velàlia: 53 KB with no images at all.',
    } satisfies T,
  },
  {
    titulo: { es: 'Internacionalización', en: 'Internationalisation' } satisfies T,
    afirmacion: {
      es: 'Rutas traducidas, no prefijadas: /en/projects/velalia, no /en/proyectos/velalia. De una sola tabla salen el selector, las hreflang recíprocas y el sitemap.',
      en: 'Translated routes, not prefixed: /en/projects/velalia, not /en/proyectos/velalia. One table feeds the switcher, the reciprocal hreflang tags and the sitemap.',
    } satisfies T,
    evidencia: {
      es: 'Velàlia en tres idiomas con 13 páginas. DoesItLast en dos, con 166 fichas en cada uno.',
      en: 'Velàlia in three languages across 13 pages. DoesItLast in two, with 166 entries in each.',
    } satisfies T,
  },
  {
    titulo: { es: 'SEO técnico', en: 'Technical SEO' } satisfies T,
    afirmacion: {
      es: 'Una página estática e indexable por cada cosa que alguien puede buscar, con su canónica y sus datos estructurados. Quien busca una pregunta concreta tiene que aterrizar en la respuesta, no en un buscador vacío.',
      en: 'One static, indexable page for every thing somebody might search for, each with its canonical URL and structured data. A specific question has to land on the answer, not on an empty search box.',
    } satisfies T,
    evidencia: {
      es: 'DoesItLast: 369 URLs en el sitemap, una por alimento y por idioma.',
      en: 'DoesItLast: 369 URLs in the sitemap, one per food and per language.',
    } satisfies T,
  },
] as const;

/**
 * SOBRE MÍ
 *
 * Lo único que se afirma aquí y se puede comprobar: el grado, la fecha y el
 * puesto. El resto es cómo lo cuento, y es lo que hay que revisar antes de
 * publicar — sobre todo el segundo párrafo, que dice por qué me pasé a
 * construir. Eso no lo sabe nadie más que Ignasi.
 */
export const sobreMi = {
  parrafos: {
    es: [
      'Vengo del diseño multimedia —Grado en la UOC, 2025— y dejé de querer entregar un diseño para que lo construyera otro. Entre el archivo y el navegador siempre se pierde lo mismo: el foco que no se ve, el texto que salta al cargar la fuente, el filtro que deja de funcionar cuando no llega un archivo. Eso no se arregla en una revisión; se evita decidiéndolo mientras se construye.',
      'Desde 2021 trabajo en remoto para Mitek Systems verificando documentos de identidad. No es desarrollo, pero son cuatro años mirando despacio algo que casi está bien hasta dar con lo que falla.',
    ],
    en: [
      'I come from multimedia design — BSc at the UOC, 2025 — and I stopped wanting to hand a design over for someone else to build. The same thing always gets lost between the file and the browser: the focus ring nobody sees, the text that jumps when the font loads, the filter that breaks when one file fails to arrive. That is not fixed in review; it is avoided by deciding it while building.',
      'Since 2021 I have worked remotely for Mitek Systems verifying identity documents. It is not development, but it is four years of looking slowly at something that is almost right until you find what is wrong.',
    ],
  },
} as const;
