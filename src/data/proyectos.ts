import type { ImageMetadata } from 'astro';
import velalia from '../assets/velalia.png';
import doesitlast from '../assets/doesitlast.png';
import type { T } from './site';

/**
 * LOS PROYECTOS
 *
 * Cada ficha sale de aquí: el bloque de la portada, la página propia del
 * proyecto, el sitemap y los datos estructurados. Un solo sitio, cuatro
 * salidas, y no se pueden descuadrar.
 *
 * REGLA: todo dato que se escriba aquí tiene que poder comprobarse abriendo la
 * web del proyecto. Las cifras de `medido` están sacadas compilando cada
 * proyecto, no copiadas de su README.
 *
 * BORRADOR: con `borrador: true` el proyecto se ve en `npm run dev` pero no en
 * la web publicada. Sirve para tener una ficha escrita antes de que el
 * proyecto esté desplegado: enlazar a algo que no se puede abrir rompe justo
 * lo que esta web promete.
 *
 * REPOSITORIO: los repos están privados por ahora. Mientras `repositorio` esté
 * vacío no sale el botón «Ver código». Un enlace a un repo privado es peor que
 * no tener enlace: quien pincha se encuentra un 404.
 */

/** Listas paralelas en los dos idiomas. */
export type TL = { es: string[]; en: string[] };

export type Proyecto = {
  /** La URL de su ficha: /proyectos/velalia y /en/projects/velalia. */
  slug: string;
  nombre: string;
  /** Una palabra, sin explicaciones ni disculpas. */
  etiqueta: 'concepto' | 'propio';
  /** Sustituye a la etiqueta cuando hay algo mejor que decir. Ej: «En producción». */
  estado?: T;
  /** La línea bajo el nombre: qué es y en cuántos idiomas. */
  subtitulo: T;
  /** El párrafo del bloque de la portada: el problema, nunca el código. */
  resumen: T;
  /**
   * Tres cifras para la portada. Cifra grande y etiqueta pequeña, no bullets:
   * el ojo agarra un número antes que una frase, y estas tres son justo lo que
   * hace falta para decidir si merece la pena seguir leyendo.
   */
  cifras: { valor: string; etiqueta: T }[];
  /** La ficha: por qué está hecho así. Es lo que separa un portfolio de una galería. */
  decision: TL;
  /** La ficha: qué se puede hacer con ello. */
  resultado: TL;
  /** La tabla de evidencias. Cada fila, algo que alguien puede volver a medir. */
  medido: { etiqueta: T; valor: T }[];
  /** Una advertencia honesta, si la hay. Ej: por qué el SEO de Velàlia marca 69. */
  nota?: T;
  /** Nombres de tecnología. No se traducen: «Astro» es «Astro» en los dos idiomas. */
  stack: string[];
  enlace?: string;
  /** Vacío mientras el repositorio sea privado. */
  repositorio: string;
  imagen?: ImageMetadata;
  imagenAlt: T;
  borrador: boolean;
};

export const proyectos: Proyecto[] = [
  // ─── VELÀLIA ──────────────────────────────────────────────────────────
  {
    slug: 'velalia',
    nombre: 'Velàlia',
    etiqueta: 'concepto',
    subtitulo: {
      es: 'Restaurante de alta cocina · Tres idiomas',
      en: 'Fine-dining restaurant · Three languages',
    },
    resumen: {
      es: 'Carta en PDF ilegible en el móvil, alérgenos sin escribir, reserva delegada en el widget de otra empresa y un solo idioma. Los cuatro fallos de siempre, resueltos de otra manera.',
      en: 'A menu as an unreadable PDF, allergens never spelled out, booking handed to someone else’s widget, and one language. The same four failures as always, solved differently.',
    },
    cifras: [
      {
        valor: '53 KB',
        etiqueta: {
          es: 'la portada, en 4 peticiones y sin una sola imagen',
          en: 'the home page, over 4 requests and without a single image',
        },
      },
      {
        valor: '0',
        etiqueta: {
          es: 'incumplimientos de axe-core en 6 páginas × 5 entornos',
          en: 'axe-core violations across 6 pages × 5 environments',
        },
      },
      {
        valor: '3',
        etiqueta: {
          es: 'idiomas con las rutas traducidas, no prefijadas',
          en: 'languages with translated routes, not just prefixed ones',
        },
      },
    ],
    decision: {
      es: [
        'Que la identidad ordene el contenido en lugar de decorarlo. Los dos menús degustación no se llaman «corto» y «largo»: se llaman Garbí y Mestral, los dos vientos del lugar. La rosa de cada tarjeta apunta a los grados reales de ese viento, y el campo de aire de cada sección sopla en esa misma dirección. Los grados salen de un solo archivo, así que la aguja y el nombre no se pueden descuadrar.',
        'De ahí sale también el movimiento. Nada aparece «hacia arriba», como en cualquier web con scroll: todo entra de lado y ligeramente girado, empujado. Los titulares no se desvanecen, se despliegan de izquierda a derecha, como una vela que se larga.',
        'La carta va escrita como texto, con los alérgenos por su nombre y no en iconos: un icono de alérgeno es un idioma que casi nadie habla y que depende de saber que ese dibujo es una espiga. Y la reserva es propia: sin widget, sin cookies y sin banner.',
      ],
      en: [
        'Let the identity organise the content instead of decorating it. The two tasting menus are not called “short” and “long”: they are called Garbí and Mestral, the two local winds. The compass rose on each card points at that wind’s real bearing, and the field of air in each section blows the same way. The bearings all come from one file, so the needle and the name cannot drift apart.',
        'The motion comes from there too. Nothing appears “upwards”, the way it does on every scrolling site: everything enters from the side, slightly rotated, pushed. Headlines do not fade in — they unfurl left to right, like a sail being let out.',
        'The menu is written as text, with allergens spelled out rather than drawn as icons: an allergen icon is a language almost nobody speaks, and it depends on knowing that the drawing is an ear of wheat. And the booking form is ours: no widget, no cookies, no consent banner.',
      ],
    },
    resultado: {
      es: [
        'Trece páginas en tres idiomas con las rutas traducidas: en inglés la carta vive en /en/the-menus, no en /en/la-carta. Cuesta una tabla y es la diferencia entre una web traducida y una web en tres idiomas.',
        'Veintiún pasos de menú con su fotografía y sus alérgenos en los tres idiomas. Modo claro y oscuro. Y la carta no se puede publicar con un alérgeno mal escrito: el esquema falla al compilar y la web no sale.',
      ],
      en: [
        'Thirteen pages in three languages with translated routes: in English the menu lives at /en/the-menus, not /en/la-carta. It costs one lookup table, and it is the difference between a translated site and a site in three languages.',
        'Twenty-one menu courses with their photograph and their allergens in all three languages. Light and dark mode. And the menu cannot be published with a misspelled allergen: the schema fails at build time and the site does not ship.',
      ],
    },
    medido: [
      {
        etiqueta: { es: 'Portada', en: 'Home page' },
        valor: {
          es: '53 KB en 4 peticiones, sin un byte de imagen',
          en: '53 KB over 4 requests, no image bytes',
        },
      },
      {
        etiqueta: { es: 'Lighthouse móvil', en: 'Lighthouse mobile' },
        valor: {
          es: '100 rendimiento · 100 accesibilidad · 100 buenas prácticas',
          en: '100 performance · 100 accessibility · 100 best practices',
        },
      },
      { etiqueta: { es: 'LCP · CLS', en: 'LCP · CLS' }, valor: { es: '1,4 s · 0', en: '1.4 s · 0' } },
      {
        etiqueta: { es: 'axe-core', en: 'axe-core' },
        valor: {
          es: '0 incumplimientos en 6 páginas × 5 entornos',
          en: '0 violations across 6 pages × 5 environments',
        },
      },
      {
        etiqueta: { es: 'Sin JavaScript', en: 'Without JavaScript' },
        valor: {
          es: 'Funciona, y hay una prueba automática que lo comprueba',
          en: 'Works, and an automated test checks that it does',
        },
      },
    ],
    nota: {
      es: 'Va con noindex a propósito: Velàlia no existe y no tiene por qué salir en las búsquedas de la Costa Daurada junto a restaurantes que sí. Es también por lo que su SEO marca 69 y no 100.',
      en: 'It ships with noindex on purpose: Velàlia does not exist and has no business appearing in local searches next to restaurants that do. That is also why its SEO score reads 69 rather than 100.',
    },
    stack: ['Astro', 'TypeScript', 'Content Collections', 'i18n', 'axe-core', 'Playwright', 'Lighthouse'],
    enlace: 'https://velalia.pages.dev',
    repositorio: '',
    imagen: velalia,
    imagenAlt: {
      es: 'Portada de Velàlia en modo oscuro: el nombre en tipografía romana sobre un campo de viento dibujado en azul noche, con los botones de reservar mesa y ver los menús, y una rosa de los vientos en la esquina.',
      en: 'Velàlia’s home page in dark mode: the name set in a roman typeface over a field of wind drawn in night blue, with the buttons to book a table and see the menus, and a compass rose in the corner.',
    },
    borrador: false,
  },

  // ─── DOESITLAST ───────────────────────────────────────────────────────
  {
    slug: 'doesitlast',
    nombre: 'DoesItLast',
    etiqueta: 'propio',
    estado: { es: 'En producción', en: 'In production' },
    subtitulo: {
      es: 'Guía de conservación de alimentos · Inglés y castellano',
      en: 'Food storage guide · English and Spanish',
    },
    resumen: {
      es: 'Los datos de conservación de la FDA y el USDA son públicos, pero viven en documentos que nadie abre con la nevera delante. Una página indexable por alimento y un buscador que perdona cómo se escribe.',
      en: 'FDA and USDA storage data is public, but it lives in documents nobody opens with the fridge door open. One indexable page per food, and a search that forgives how you type.',
    },
    cifras: [
      {
        valor: '166',
        etiqueta: {
          es: 'alimentos publicados en inglés y castellano',
          en: 'foods published in English and Spanish',
        },
      },
      {
        valor: '369',
        etiqueta: {
          es: 'URLs estáticas e indexables en el sitemap',
          en: 'static, indexable URLs in the sitemap',
        },
      },
      {
        valor: '0',
        etiqueta: {
          es: 'dependencias, frameworks y pasos de empaquetado',
          en: 'dependencies, frameworks and bundling steps',
        },
      },
    ],
    decision: {
      es: [
        'Una respuesta por consulta y ninguna pantalla intermedia. Y una página propia por alimento, porque lo que la gente escribe en Google es «cuánto dura el pollo crudo», no «guía de conservación»: quien busca eso tiene que aterrizar en la respuesta, no en un buscador vacío.',
        'El buscador perdona. «gambas», «chiken» y «jamon» llegan al mismo sitio: hay una tabla de sinónimos por alimento y el emparejado ignora acentos, plurales y erratas. Alguien con la nevera abierta y una mano ocupada no escribe bien, y eso no puede acabar en «sin resultados».',
        'Sin cuentas y sin cookies. El inventario de nevera vive en el navegador de cada persona, así que no hay nada que registrar ni nada que pedir antes de responder.',
      ],
      en: [
        'One answer per question and no screen in between. And a page of its own per food, because what people type into Google is “how long does raw chicken last”, not “food storage guide”: they have to land on the answer, not on an empty search box.',
        'The search forgives. “gambas”, “chiken” and “jamon” all reach the same place: there is a synonym table per food, and matching ignores accents, plurals and typos. Someone with the fridge open and one hand busy does not type carefully, and that cannot end in “no results”.',
        'No accounts and no cookies. The fridge inventory lives in each person’s own browser, so there is nothing to register and nothing to ask for before answering.',
      ],
    },
    resultado: {
      es: [
        '166 alimentos publicados en los dos idiomas y 369 URLs en el sitemap, cada una estática e indexable.',
        'Inventario de nevera con avisos de caducidad y exportación a .ics, para que el recordatorio lo dé el calendario de la persona y no una notificación más. Funciona sin conexión desde la segunda visita y se instala como aplicación.',
      ],
      en: [
        '166 foods published in both languages and 369 URLs in the sitemap, every one of them static and indexable.',
        'A fridge inventory with expiry warnings and .ics export, so the reminder comes from the person’s own calendar instead of one more notification. It works offline from the second visit and installs as an app.',
      ],
    },
    medido: [
      {
        etiqueta: { es: 'Alimentos publicados', en: 'Foods published' },
        valor: { es: '166, en inglés y castellano', en: '166, in English and Spanish' },
      },
      {
        etiqueta: { es: 'URLs en el sitemap', en: 'URLs in the sitemap' },
        valor: { es: '369, estáticas e indexables', en: '369, static and indexable' },
      },
      {
        etiqueta: { es: 'En el navegador', en: 'In the browser' },
        valor: {
          es: 'JavaScript sin framework, sin empaquetador y sin dependencias',
          en: 'JavaScript with no framework, no bundler and no dependencies',
        },
      },
      {
        etiqueta: { es: 'Sin conexión', en: 'Offline' },
        valor: {
          es: 'Funciona desde la segunda visita, instalable',
          en: 'Works from the second visit, installable',
        },
      },
    ],
    stack: ['JavaScript', 'HTML', 'CSS', 'PWA', 'i18n', 'SEO técnico', 'Datos estructurados'],
    enlace: 'https://doesitlast.com',
    repositorio: '',
    imagen: doesitlast,
    imagenAlt: {
      es: 'Portada de DoesItLast: el titular «No lo tires todavía», el buscador de alimentos y la rejilla de los más consultados.',
      en: 'DoesItLast’s home page: the headline “Don’t throw it out yet”, the food search box and the grid of the most-looked-up foods.',
    },
    borrador: false,
  },

];

/** En desarrollo se ve todo; publicada, solo lo que se puede abrir. */
export const proyectosVisibles = import.meta.env.DEV
  ? proyectos
  : proyectos.filter((p) => !p.borrador);
