/**
 * Identidad, contacto y disponibilidad.
 *
 * Todo lo que se repite por la web vive aquí y solo aquí. El hero, el pie, los
 * datos estructurados y el CV leen de este archivo, así que un cambio de
 * teléfono o de disponibilidad se hace una vez y sale en los cuatro sitios.
 */

/** Un texto en los dos idiomas. Se escribe cientos de veces, por eso el nombre corto. */
export type T = { es: string; en: string };

export const site = {
  nombre: 'Ignasi Capella',

  /* El título es el mismo en los dos idiomas a propósito: una recruiter busca
     encajar un puesto que se llama exactamente así. El diferenciador —que
     además diseño— se lleva la línea de debajo, que es donde sí se lee. */
  rol: { es: 'Desarrollador front-end', en: 'Front-end developer' } satisfies T,

  url: 'https://ignasici.com',
  dominio: 'ignasici.com',

  email: 'hola@ignasici.com',
  /** Formato internacional, sin espacios: es lo que espera un enlace `tel:`. */
  telefono: '+34615192501',
  telefonoVisible: '615 19 25 01',

  linkedin: 'https://www.linkedin.com/in/ignasi-capella-iba%C3%B1ez-a4132b137',
  github: 'https://github.com/IgnasiCI',

  /* La ciudad no está en el texto del hero por gusto: es de las cinco cosas
     que una recruiter busca en los primeros segundos, y también lo que usa
     Google para decidir a quién enseñarte. */
  ubicacion: { ciudad: 'Tarragona', region: 'Cataluña', pais: 'España', paisEN: 'Spain' },

  disponibilidad: {
    es: 'Disponible ahora · Remoto o híbrido · Presencial en Tarragona',
    en: 'Available now · Remote or hybrid · On-site in Tarragona, Spain',
  } satisfies T,
} as const;

/**
 * El stack que la web afirma.
 *
 * Regla dura del proyecto: aquí solo entra lo que se puede abrir y comprobar
 * en un proyecto publicado. Si algo no está en un proyecto, no está en esta
 * lista — en una entrevista técnica eso se nota en tres preguntas.
 *
 * `donde` no se enseña en pantalla en esta versión, pero obliga a justificar
 * cada línea al escribirla, que es justo el punto.
 *
 * `hero: true` marca las nueve que salen arriba del todo. Las diecisiete
 * enteras en el hero ya no se escanean, se leen — y el hero es para escanear.
 * Las demás siguen aquí y salen en la sección de stack, más abajo, que es
 * donde mira quien ya ha decidido seguir leyendo.
 *
 * Va con tipo explícito y sin `as const`: con `as const` cada entrada era su
 * propio tipo literal, TypeScript veía una unión de tuplas distintas en vez de
 * una lista, y recorrerlas con flatMap no compilaba.
 */
export type ItemStack = {
  nombre: string;
  /**
   * En qué proyecto se demuestra. Si no se puede rellenar, no entra.
   *
   * Y se enseña. Estaba escrito y escondido, y la sección era una nube de
   * palabras: «Astro» a secas no dice nada que no diga cualquier otro
   * portfolio. «Astro — Velàlia, 13 páginas en 3 idiomas» sí.
   */
  donde: T;
  /** Si sale también en el hero. */
  hero?: boolean;
};

export type GrupoStack = { grupo: T; items: ItemStack[] };

export const stack: GrupoStack[] = [
  {
    grupo: { es: 'Construir la interfaz', en: 'Building the interface' },
    items: [
      { nombre: 'Astro', donde: { es: 'Velàlia (13 páginas), esta web', en: 'Velàlia (13 pages), this site' }, hero: true },
      { nombre: 'TypeScript', donde: { es: 'Velàlia, esta web — astro check en verde', en: 'Velàlia, this site — astro check clean' }, hero: true },
      { nombre: 'JavaScript', donde: { es: 'DoesItLast, sin framework ni empaquetador', en: 'DoesItLast, no framework, no bundler' }, hero: true },
      { nombre: 'HTML semántico', donde: { es: 'Landmarks y encabezados, comprobados con axe', en: 'Landmarks and headings, checked with axe' }, hero: true },
      { nombre: 'CSS moderno', donde: { es: 'Tokens, clamp(), :has(), color-mix()', en: 'Tokens, clamp(), :has(), color-mix()' }, hero: true },
    ],
  },
  {
    grupo: { es: 'Que sirva a todo el mundo', en: 'Making it work for everyone' },
    items: [
      { nombre: 'WCAG 2.2 AA', donde: { es: 'Velàlia: 0 fallos en 6 páginas × 5 entornos', en: 'Velàlia: 0 failures across 6 pages × 5 environments' }, hero: true },
      { nombre: 'Core Web Vitals', donde: { es: 'LCP 1,2 s · CLS 0 · TBT 0 ms', en: 'LCP 1.2 s · CLS 0 · TBT 0 ms' }, hero: true },
      { nombre: 'Internacionalización', donde: { es: 'Rutas traducidas y hreflang recíproco en 3 idiomas', en: 'Translated routes and reciprocal hreflang in 3 languages' }, hero: true },
      { nombre: 'PWA y sin conexión', donde: { es: 'DoesItLast: service worker, instalable', en: 'DoesItLast: service worker, installable' } },
      { nombre: 'Sin JavaScript', donde: { es: 'Las dos webs se leen y se navegan enteras', en: 'Both sites read and navigate in full' } },
    ],
  },
  {
    grupo: { es: 'Que se encuentre', en: 'Making it findable' },
    items: [
      { nombre: 'SEO técnico', donde: { es: 'DoesItLast: 369 URLs estáticas e indexables', en: 'DoesItLast: 369 static, indexable URLs' }, hero: true },
      { nombre: 'Datos estructurados', donde: { es: 'schema.org: Person, Restaurant, Menu', en: 'schema.org: Person, Restaurant, Menu' } },
      { nombre: 'AVIF, WebP y srcset', donde: { es: 'Una talla por pantalla, generadas al compilar', en: 'One size per screen, generated at build time' } },
    ],
  },
  {
    grupo: { es: 'Comprobar que es verdad', en: 'Proving it' },
    items: [
      { nombre: 'Playwright', donde: { es: 'Velàlia: 6 suites — idiomas, tema, reserva, sin JS', en: 'Velàlia: 6 suites — languages, theme, booking, no-JS' } },
      { nombre: 'axe-core', donde: { es: 'En cada auditoría, no al final del proyecto', en: 'On every audit, not at the end of the project' } },
      { nombre: 'Lighthouse', donde: { es: '100 en las cinco categorías, móvil y escritorio', en: '100 across all five categories, mobile and desktop' } },
      { nombre: 'Validación al compilar', donde: { es: 'Velàlia: un alérgeno mal escrito rompe el build', en: 'Velàlia: a misspelled allergen breaks the build' } },
    ],
  },
  {
    grupo: { es: 'Publicar', en: 'Shipping' },
    items: [
      { nombre: 'Cloudflare Pages', donde: { es: 'Velàlia, esta web', en: 'Velàlia, this site' } },
      { nombre: 'Cloudflare Functions', donde: { es: 'El formulario de esta página, con Resend', en: 'The form on this page, with Resend' } },
      { nombre: 'Git', donde: { es: 'Seis repositorios', en: 'Six repositories' } },
    ],
  },
];

/**
 * Lo que no está en la lista de arriba.
 *
 * Decisión discutida y tomada: se cuenta. No habla de falta de experiencia
 * —habla de un plan—, mete la palabra «React» en la página para el filtro de
 * quien busca, y a quien lee el código le enseña que distingo entre saber algo
 * y haberlo entregado. Se borra el día que haya un proyecto en React.
 */
export const enCamino = {
  titulo: { es: 'Lo que no está en esta lista', en: "What's not on that list" },
  texto: {
    es: 'React y Node: los estoy aprendiendo y no aparecen arriba porque todavía no tengo nada publicado con ellos. El próximo proyecto del portfolio será en React.',
    en: "React and Node: I'm learning them, and they're not on the list above because I have nothing published with them yet. The next project in this portfolio will be in React.",
  },
} as const;

/** A dónde envía el formulario: una función propia, sin terceros. Ver functions/api/contacto.js */
export const formEndpoint = '/api/contacto';
