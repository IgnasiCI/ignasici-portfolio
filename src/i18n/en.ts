import type { Diccionario } from './es';

/* El tipo obliga a tener todas las claves de `es`. Si falta una, no compila. */
export const en: Diccionario = {
  meta: {
    etiqueta: 'EN',
    nombre: 'English',
    locale: 'en_GB',
    htmlLang: 'en',
    titulo: 'Ignasi Capella · Front-end developer',
    descripcion:
      'Front-end developer in Tarragona, Spain. I design the interface and then I build it: Astro, TypeScript and CSS, in published sites you can measure.',
  },

  saltar: 'Skip to content',

  nav: {
    proyectos: 'Projects',
    stack: 'Stack',
    sobreMi: 'About',
    contacto: 'Contact',
    volver: 'Back to the home page',
    idioma: 'Language',
  },

  hero: {
    propuesta:
      'I design the interface and then I build it. Two published sites in Astro and JavaScript, and both are open to inspection and measurement right now.',
    verProyectos: 'See projects',
    descargarCV: 'Download CV',
    contacto: 'Contact',
    stackVisible: 'What I use',
  },

  proyectos: {
    titulo: 'Projects',
    entradilla: 'Two published sites. Both can be opened, measured and audited.',
    etiquetas: { concepto: 'Concept', propio: 'Own product' },
    verFicha: 'Read the case',
    abrir: 'Open',
    verCodigo: 'View code',
    laDecision: 'The decision',
    elResultado: 'The outcome',
    loMedido: 'Measured',
    elStack: 'Built with',
    nuevaPestana: '(opens in a new tab)',
  },

  error404: {
    titulo: 'This page does not exist',
    texto: 'The link is broken, or the page has moved.',
    volver: 'Go to the home page',
  },

  pie: {
    correo: 'Email',
    telefono: 'Phone',
    hechaCon: 'Built with Astro. No cookies, no analytics, no third-party requests.',
  },
};
