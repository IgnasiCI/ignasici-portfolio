/**
 * El diccionario de referencia. `en.ts` se tipa contra este, así que si se
 * añade una clave aquí y se olvida allí, el build falla. No hay forma de
 * publicar la web con media traducción.
 */
export const es = {
  meta: {
    etiqueta: 'ES',
    nombre: 'Castellano',
    locale: 'es_ES',
    htmlLang: 'es',
    titulo: 'Ignasi Capella · Desarrollador front-end',
    /* 150-155 caracteres: lo que Google enseña entero. Dice el rol, el stack y
       la prueba, que es lo que una recruiter busca en los primeros segundos. */
    descripcion:
      'Desarrollador front-end en Tarragona. Diseño la interfaz y después la construyo: Astro, TypeScript y CSS en webs publicadas que se pueden medir.',
  },

  saltar: 'Saltar al contenido',

  nav: {
    proyectos: 'Proyectos',
    stack: 'Stack',
    sobreMi: 'Sobre mí',
    contacto: 'Contacto',
    volver: 'Volver a la portada',
    idioma: 'Idioma',
  },

  hero: {
    propuesta:
      'Diseño la interfaz y después la construyo. Dos webs publicadas en Astro y JavaScript, y las dos se pueden abrir y medir ahora mismo.',
    verProyectos: 'Ver proyectos',
    descargarCV: 'Descargar CV',
    contacto: 'Contacto',
    stackVisible: 'Lo que uso',
  },

  proyectos: {
    titulo: 'Proyectos',
    entradilla: 'Dos webs publicadas. Las dos se pueden abrir, medir y auditar.',
    etiquetas: { concepto: 'Concepto', propio: 'Proyecto propio' },
    verFicha: 'Ver la ficha',
    abrir: 'Abrir',
    verCodigo: 'Ver código',
    // Títulos de la página de cada proyecto.
    laDecision: 'La decisión',
    elResultado: 'El resultado',
    loMedido: 'Lo medido',
    elStack: 'Con qué está hecho',
    nuevaPestana: '(se abre en una pestaña nueva)',
  },

  error404: {
    titulo: 'Esta página no existe',
    texto: 'El enlace está roto o la página ha cambiado de sitio.',
    volver: 'Ir a la portada',
  },

  pie: {
    correo: 'Correo',
    telefono: 'Teléfono',
    hechaCon: 'Hecha con Astro. Sin cookies, sin analítica y sin peticiones a terceros.',
  },
} as const;

export type Diccionario = typeof es;
