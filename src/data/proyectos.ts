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
 * la web publicada. Cal Fumet está así hasta que se despliegue: enlazar a un
 * proyecto que no se puede abrir rompe justo lo que esta web promete.
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
  /** Tres hechos duros para la portada. Ni uno más: son para escanear. */
  hechos: TL;
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
      es: 'La web de un restaurante de este nivel falla casi siempre por lo mismo: la carta es un PDF que no se lee en el móvil, los alérgenos no están escritos, la reserva la lleva un widget de otra empresa que tarda en aparecer y trae cookies, y todo está en un solo idioma en una costa donde media mesa no habla castellano.',
      en: 'The website of a restaurant at this level almost always fails the same way: the menu is a PDF that is unreadable on a phone, the allergens are not spelled out, booking is handled by someone else’s widget that loads late and brings cookies, and it is all in one language on a coast where half the table does not speak Spanish.',
    },
    hechos: {
      es: [
        'Portada: 53 KB en 4 peticiones, sin un solo byte de imagen',
        '0 incumplimientos de axe-core en 6 páginas × 5 entornos',
        'Castellano, catalán e inglés, con las rutas traducidas',
      ],
      en: [
        'Home page: 53 KB over 4 requests, without a single byte of image',
        'Zero axe-core violations across 6 pages × 5 environments',
        'Spanish, Catalan and English, with translated routes',
      ],
    },
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
      {
        etiqueta: { es: 'Terceros · cookies', en: 'Third parties · cookies' },
        valor: { es: '0 · 0', en: '0 · 0' },
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
      es: 'Saber si algo que lleva días en la nevera aún se puede comer termina en foros que se contradicen. La información fiable es pública —FDA y USDA— pero vive en documentos que nadie abre con la nevera delante.',
      en: 'Working out whether something that has been in the fridge for days is still edible ends up in forums that contradict each other. The reliable information is public — FDA and USDA — but it lives in documents nobody opens with the fridge door open.',
    },
    hechos: {
      es: [
        '166 alimentos en inglés y castellano, 369 URLs en el sitemap',
        'Buscador que perdona erratas, acentos, plurales y sinónimos',
        'Funciona sin conexión y se instala como aplicación',
      ],
      en: [
        '166 foods in English and Spanish, 369 URLs in the sitemap',
        'Search that forgives typos, accents, plurals and synonyms',
        'Works offline and installs as an app',
      ],
    },
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
        etiqueta: { es: 'Cuentas · cookies · terceros', en: 'Accounts · cookies · third parties' },
        valor: { es: 'Ninguno', en: 'None' },
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

  // ─── CAL FUMET — escrito y listo, esperando despliegue ─────────────────
  {
    slug: 'cal-fumet',
    nombre: 'Cal Fumet',
    etiqueta: 'concepto',
    subtitulo: {
      es: 'Taberna de mercado · Una sola página',
      en: 'Market tavern · A single page',
    },
    resumen: {
      es: 'El contrapunto de Velàlia. Allí el visitante está en el sofá decidiendo una cena de 165 €; aquí está en la calle, con prisa y mala cobertura, eligiendo dónde cenar en los próximos treinta minutos. La misma industria y dos webs que no se parecen en nada, porque el escenario de uso manda por encima del estilo.',
      en: 'Velàlia’s counterpoint. There the visitor is on the sofa deciding on a €165 dinner; here they are out on the street, in a hurry and on a bad signal, choosing where to eat in the next thirty minutes. The same industry and two sites with nothing in common, because the context of use outranks the style.',
    },
    hechos: {
      es: [
        '43 KB en 3 peticiones, y funciona sin cobertura desde la segunda visita',
        'Filtros de alérgenos con cero JavaScript: radios y :has()',
        'Plano dibujado de 2 KB en lugar de un iframe de Google de ~900 KB',
      ],
      en: [
        '43 KB over 3 requests, and it works with no signal from the second visit',
        'Allergen filters with zero JavaScript: radio buttons and :has()',
        'A 2 KB hand-drawn map instead of a ~900 KB Google iframe',
      ],
    },
    decision: {
      es: [
        'Una sola página, no cinco. Cada navegación es una petición que puede fallar y un momento en el que se puede ir; con una sola página, todo lo que necesita ya está descargado antes de que lo busque. /carta existe igualmente como dirección propia y lleva al ancla, para poder pegarla en WhatsApp: se conserva la ventaja de tener URL sin pagar el coste de tener página.',
        'Los filtros de alérgenos no usan JavaScript. Son botones de radio y :has(), y las secciones que se quedan vacías desaparecen solas. Alguien con celiaquía es exactamente la persona a la que no le puedes fallar por un archivo que no llegó.',
        'El mapa está dibujado, no incrustado: un SVG de 2 KB con las dos calles, el metro, la línea de puntos de los tres minutos andando y el marcador; debajo, botones que abren Google Maps o Apple Maps. Un mapa incrustado pesa cerca de un megabyte, mete cookies de terceros —y con ellas la obligación de banner— y nadie navega dentro de un iframe: en cuanto hay que ir, se abre la app del móvil.',
        'El horario va arriba, antes que el nombre del chef, porque es la segunda pregunta de cualquiera que esté en la calle. Y cuando falta menos de tres cuartos de hora para cerrar, el mensaje cambia a «cierra en 25 min».',
      ],
      en: [
        'One page, not five. Every navigation is a request that can fail and a moment in which they can leave; with a single page, everything they need is already downloaded before they go looking for it. /carta still exists as an address of its own and jumps to the anchor, so it can be pasted into WhatsApp: the benefit of having a URL without paying the cost of having a page.',
        'The allergen filters use no JavaScript. They are radio buttons and :has(), and sections left empty disappear by themselves. Someone with coeliac disease is exactly the person you cannot fail because a file did not arrive.',
        'The map is drawn, not embedded: a 2 KB SVG with the two streets, the metro, the dotted line of the three-minute walk and the marker; underneath, buttons that open Google Maps or Apple Maps. An embedded map weighs close to a megabyte, brings third-party cookies — and with them a consent banner — and nobody navigates inside an iframe: the moment you actually have to go, you open the maps app.',
        'The opening hours go at the top, ahead of the chef’s name, because that is the second question of anyone standing in the street. And when there is less than three quarters of an hour left, the message changes to “closes in 25 min”.',
      ],
    },
    resultado: {
      es: [
        'Una página con la carta entera dentro: 29 platos validados al compilar y declarados también en schema.org con su precio.',
        'Las fotografías están generadas con sharp a partir de la paleta real de cada plato, porque no hubo sesión de fotos: la web lo dice y el briefing de cada hueco se puede abrir desde la propia página. Cuando lleguen fotos de verdad se dejan con el mismo nombre y ya está.',
      ],
      en: [
        'One page with the entire menu inside it: 29 dishes validated at build time and also declared in schema.org with their price.',
        'The photographs are generated with sharp from each dish’s real palette, because there was no photo shoot: the site says so, and the brief for each slot can be opened from the page itself. When real photographs arrive, they are dropped in under the same names and that is that.',
      ],
    },
    medido: [
      {
        etiqueta: { es: 'Primera pantalla', en: 'First screen' },
        valor: { es: '43 KB en 3 peticiones', en: '43 KB over 3 requests' },
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
          es: '0 incumplimientos en móvil y escritorio, claro y oscuro',
          en: '0 violations on mobile and desktop, light and dark',
        },
      },
      {
        etiqueta: { es: 'JavaScript', en: 'JavaScript' },
        valor: {
          es: '8,7 KB en línea · 0 archivos .js que descargar',
          en: '8.7 KB inline · 0 .js files to download',
        },
      },
    ],
    stack: ['Astro', 'TypeScript', 'Content Collections', 'sharp', 'PWA', 'Datos estructurados'],
    /* Sin enlace todavía: por eso está en borrador. Esta web promete que todo
       se puede abrir y medir; un proyecto sin web que abrir rompe la promesa. */
    enlace: '',
    repositorio: '',
    imagenAlt: { es: '', en: '' },
    borrador: true,
  },
];

/** En desarrollo se ve todo; publicada, solo lo que se puede abrir. */
export const proyectosVisibles = import.meta.env.DEV
  ? proyectos
  : proyectos.filter((p) => !p.borrador);
