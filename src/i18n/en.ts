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
    principal: 'Main',
    cv: 'CV',
    idioma: 'Language',
  },

  hero: {
    propuesta:
      'I design the interface and then I build it. Two published sites you can open and measure.',
    verProyectos: 'See projects',
    descargarCV: 'Download CV',
    contacto: 'Contact',
    rotuloRegion: 'Introduction',
    stackVisible: 'What I use',
  },

  metodo: {
    titulo: 'How I work',
    entradilla:
      'Four claims and, next to each one, the number that holds it up. Without a number there would be no row.',
    evidencia: 'Measured',
  },

  stack: {
    titulo: 'Stack',
    entradilla:
      'Grouped by what each thing is for. Everything on this list is in a project you can open: what is not, is not on it.',
  },

  sobreMi: {
    titulo: 'About',
  },

  contacto: {
    titulo: 'Contact',
    entradilla: 'Write to me and I will reply.',
    nombre: 'Name',
    email: 'Email',
    mensaje: 'Message',
    enviar: 'Send',
    enviando: 'Sending…',
    obligatorio: 'required',
    errorRed: 'It could not be sent. Write to me at',
    trampa: 'Do not fill in this field',
  },

  cv: {
    formacion: 'Education',
    experiencia: 'Experience',
    idiomas: 'Languages',
    ubicacion: 'Location',
    titulo: 'CV',
    descargar: 'Download as PDF',
    actualidad: 'Present',
    imprimir: 'Print',
  },

  gracias: {
    titulo: 'Message sent',
    texto: 'I will reply as soon as I read it. If you are in a hurry, my phone number is below.',
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
    titular: 'If it fits, write to me',
    correo: 'Email',
    telefono: 'Phone',
    hechaCon: 'Built with Astro, with no dependencies in the browser.',
  },
};
