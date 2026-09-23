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
  /** En qué proyecto se demuestra. Si no se puede rellenar, no entra. */
  donde: string;
  /** Si sale también en el hero. */
  hero?: boolean;
};

export type GrupoStack = { grupo: T; items: ItemStack[] };

export const stack: GrupoStack[] = [
  {
    grupo: { es: 'Construir la interfaz', en: 'Building the interface' },
    items: [
      { nombre: 'Astro', donde: 'Velàlia, esta web', hero: true },
      { nombre: 'TypeScript', donde: 'Velàlia, esta web', hero: true },
      { nombre: 'JavaScript', donde: 'DoesItLast, Velàlia', hero: true },
      { nombre: 'HTML semántico', donde: 'Los dos', hero: true },
      { nombre: 'CSS moderno', donde: 'Los dos', hero: true },
    ],
  },
  {
    grupo: { es: 'Que sirva a todo el mundo', en: 'Making it work for everyone' },
    items: [
      { nombre: 'Accesibilidad WCAG 2.2 AA', donde: 'Velàlia: 0 incumplimientos en 6 páginas × 5 entornos', hero: true },
      { nombre: 'Rendimiento y Core Web Vitals', donde: 'Velàlia: Lighthouse 100, LCP 1,4 s', hero: true },
      { nombre: 'Internacionalización', donde: 'Velàlia en 3 idiomas, DoesItLast en 2', hero: true },
      { nombre: 'PWA y sin conexión', donde: 'DoesItLast' },
    ],
  },
  {
    grupo: { es: 'Que se encuentre', en: 'Making it findable' },
    items: [
      { nombre: 'SEO técnico', donde: 'DoesItLast: 369 URLs indexables', hero: true },
      { nombre: 'Datos estructurados', donde: 'Los dos' },
      { nombre: 'AVIF, WebP y srcset', donde: 'Velàlia, esta web' },
    ],
  },
  {
    grupo: { es: 'Comprobar que es verdad', en: 'Proving it' },
    items: [
      { nombre: 'Playwright', donde: 'Velàlia: 6 suites de pruebas' },
      { nombre: 'axe-core', donde: 'Velàlia, esta web' },
      { nombre: 'Lighthouse', donde: 'Velàlia, esta web' },
    ],
  },
  {
    grupo: { es: 'Publicar', en: 'Shipping' },
    items: [
      { nombre: 'Cloudflare Pages', donde: 'Velàlia, esta web' },
      { nombre: 'Cloudflare Functions', donde: 'El formulario de esta web' },
      { nombre: 'Git', donde: 'Todo' },
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
