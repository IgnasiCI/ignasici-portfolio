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
    principal: 'Principal',
    cv: 'CV',
    idioma: 'Idioma',
  },

  hero: {
    propuesta:
      'Diseño la interfaz y después la construyo. Dos webs publicadas que puedes abrir y medir.',
    verProyectos: 'Ver proyectos',
    descargarCV: 'Descargar CV',
    contacto: 'Contacto',
    rotuloRegion: 'Presentación',
    stackVisible: 'Lo que uso',
  },

  metodo: {
    titulo: 'Cómo trabajo',
    entradilla:
      'Cuatro afirmaciones y, al lado de cada una, el número que la sostiene. Sin número no habría fila.',
    evidencia: 'Medido',
  },

  stack: {
    titulo: 'Stack',
    entradilla:
      'Agrupado por para qué sirve cada cosa. Todo lo de esta lista está en un proyecto que se puede abrir: lo que no, no está.',
  },

  sobreMi: {
    titulo: 'Sobre mí',
  },

  contacto: {
    titulo: 'Contacto',
    entradilla: 'Escríbeme y te contesto.',
    nombre: 'Nombre',
    email: 'Correo',
    mensaje: 'Mensaje',
    enviar: 'Enviar',
    enviando: 'Enviando…',
    obligatorio: 'obligatorio',
    errorRed: 'No se ha podido enviar. Escríbeme a',
    /* Sin `accept-charset` ni sorpresas: el campo trampa tiene que tener
       nombre de campo real para que un robot lo rellene. */
    trampa: 'No rellenes este campo',
  },

  cv: {
    formacion: 'Formación',
    experiencia: 'Experiencia',
    idiomas: 'Idiomas',
    ubicacion: 'Ubicación',
    titulo: 'CV',
    descargar: 'Descargar en PDF',
    actualidad: 'Actualidad',
    imprimir: 'Imprimir',
  },

  gracias: {
    titulo: 'Mensaje enviado',
    texto: 'Te contesto en cuanto lo lea. Si tienes prisa, el teléfono está abajo.',
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
    titular: 'Si encaja, escríbeme',
    correo: 'Correo',
    telefono: 'Teléfono',
    hechaCon: 'Hecha con Astro, sin dependencias en el navegador.',
  },
} as const;

/**
 * El tipo del diccionario.
 *
 * `typeof es` a secas no sirve: con `as const`, cada texto es su propio tipo
 * literal, así que el tipo exigiría que el diccionario inglés dijera
 * «Castellano» y «Proyectos» en castellano. Tenía 60 errores de tipos por eso.
 *
 * Este tipo recorre la estructura y deja cada texto en `string`, quedándose
 * solo con lo que de verdad hay que garantizar: que estén todas las claves y
 * que estén anidadas igual. Si se añade una clave aquí y se olvida en `en.ts`,
 * `astro check` falla y no hay forma de publicar media traducción.
 */
type Textos<T> = {
  [K in keyof T]: T[K] extends string ? string : Textos<T[K]>;
};

export type Diccionario = Textos<typeof es>;
