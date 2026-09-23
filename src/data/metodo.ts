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
      en: 'Not a box ticked at the end. axe-core runs over every page in four environments — mobile and desktop, with normal and reduced motion — and the page list comes from the compiled sitemap, so what gets audited is what gets published, not a list someone has to remember to update.',
    } satisfies T,
    evidencia: {
      es: 'Velàlia: 0 incumplimientos en 6 páginas × 5 entornos. Esta web: 0 en 7 × 4.',
      en: 'Velàlia: 0 violations across 6 pages × 5 environments. This site: 0 across 7 × 4.',
    } satisfies T,
  },
  {
    titulo: { es: 'Rendimiento', en: 'Performance' } satisfies T,
    afirmacion: {
      es: 'El presupuesto se decide antes de escribir, no se optimiza después. Sin framework en el navegador, sin librería de animación y sin una sola petición a un tercero. Lo que no se manda no hay que optimizarlo.',
      en: 'The budget is decided before writing, not optimised afterwards. No framework in the browser, no animation library, and not a single third-party request. What you never send, you never have to optimise.',
    } satisfies T,
    evidencia: {
      es: 'Esta web: 6 peticiones y 59 KB sin comprimir, LCP 1,3 s en móvil, CLS 0. Velàlia: 53 KB sin una imagen.',
      en: 'This site: 6 requests and 59 KB uncompressed, 1.3 s LCP on mobile, 0 CLS. Velàlia: 53 KB with no images at all.',
    } satisfies T,
  },
  {
    titulo: { es: 'Internacionalización', en: 'Internationalisation' } satisfies T,
    afirmacion: {
      es: 'Rutas traducidas, no prefijadas: en inglés esta ficha vive en /en/projects/velalia, no en /en/proyectos/velalia. De una sola tabla salen el selector de idioma, las hreflang recíprocas y el sitemap, así que no pueden descuadrarse entre ellos.',
      en: 'Translated routes, not prefixed ones: in English this case lives at /en/projects/velalia, not /en/proyectos/velalia. One lookup table feeds the language switcher, the reciprocal hreflang tags and the sitemap, so they cannot drift apart.',
    } satisfies T,
    evidencia: {
      es: 'Velàlia en tres idiomas con 13 páginas. DoesItLast en dos, con 166 fichas en cada uno.',
      en: 'Velàlia in three languages across 13 pages. DoesItLast in two, with 166 entries in each.',
    } satisfies T,
  },
  {
    titulo: { es: 'SEO técnico', en: 'Technical SEO' } satisfies T,
    afirmacion: {
      es: 'Una página estática e indexable por cada cosa que alguien puede buscar, con su canónica, sus datos estructurados y su entrada en el sitemap. Lo que la gente escribe en un buscador es una pregunta concreta, y tiene que aterrizar en la respuesta, no en un buscador vacío.',
      en: 'One static, indexable page for every thing somebody might search for, each with its canonical URL, its structured data and its sitemap entry. What people type into a search box is a specific question, and it has to land on the answer, not on an empty search box.',
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
      'Vengo del diseño multimedia. Grado en Multimedia por la UOC, terminado en febrero de 2025.',
      'Por el camino dejé de querer entregar un diseño para que lo construyera otro. Entre un archivo de diseño y el navegador siempre se pierde lo mismo —el detalle—, y el detalle es el trabajo: el foco que no se ve, el texto que salta al cargar la fuente, el filtro que deja de funcionar cuando no llega un archivo. Esas cosas no se arreglan en una revisión; se evitan decidiéndolas mientras se construye.',
      'Desde diciembre de 2021 trabajo en remoto para Mitek Systems verificando documentos de identidad: comprobar que un documento es auténtico, extraer sus datos y encontrar lo que no cuadra. No es desarrollo. Pero son cuatro años mirando despacio algo que casi está bien hasta dar con lo que falla, que es exactamente lo que se hace revisando una interfaz.',
    ],
    en: [
      'I come from multimedia design. BSc in Multimedia from the UOC, finished in February 2025.',
      'Along the way I stopped wanting to hand a design over for someone else to build. The same thing always gets lost between a design file and the browser — the detail — and the detail is the work: the focus ring nobody sees, the text that jumps when the font loads, the filter that stops working when one file fails to arrive. Those are not fixed in review; they are avoided by deciding them while building.',
      'Since December 2021 I have worked remotely for Mitek Systems verifying identity documents: checking that a document is genuine, extracting its data and spotting what does not add up. It is not development. But it is four years of looking slowly at something that is almost right until you find what is wrong, which is exactly what reviewing an interface is.',
    ],
  },
} as const;
