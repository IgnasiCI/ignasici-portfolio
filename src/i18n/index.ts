/**
 * Los dos idiomas y sus rutas.
 *
 * Las direcciones están traducidas, no solo prefijadas: en inglés la ficha de
 * un proyecto vive en /en/projects/velalia, no en /en/proyectos/velalia.
 * Cuesta una tabla y es la diferencia entre una web traducida y una web en dos
 * idiomas — también para Google, que indexa la ruta, no solo el texto.
 *
 * De esta tabla salen a la vez el selector de idioma, las etiquetas hreflang y
 * el sitemap. Si se añade una página, se añade aquí una vez y aparece en los
 * tres sitios. (El planteamiento es el mismo que uso en Velàlia, con tres.)
 */
import { es } from './es';
import { en } from './en';
import type { Diccionario } from './es';

export type Idioma = 'es' | 'en';
export type Pagina = 'portada' | 'cv' | 'gracias';

export const IDIOMAS: Idioma[] = ['es', 'en'];
export const IDIOMA_POR_DEFECTO: Idioma = 'es';

const DICCIONARIOS: Record<Idioma, Diccionario> = { es, en };

/** El diccionario del idioma. Se llama `t` porque se escribe cientos de veces. */
export const t = (idioma: Idioma): Diccionario => DICCIONARIOS[idioma];

/** El idioma «otro»: con dos, el selector es un interruptor, no un menú. */
export const otroIdioma = (idioma: Idioma): Idioma => (idioma === 'es' ? 'en' : 'es');

const RUTAS: Record<Pagina, Record<Idioma, string>> = {
  portada: { es: '/', en: '/en' },
  cv: { es: '/cv', en: '/en/cv' },
  gracias: { es: '/gracias', en: '/en/thanks' },
};

/** El prefijo de las fichas de proyecto en cada idioma. */
const BASE_PROYECTO: Record<Idioma, string> = {
  es: '/proyectos',
  en: '/en/projects',
};

export const ruta = (idioma: Idioma, pagina: Pagina): string => RUTAS[pagina][idioma];

export const rutaProyecto = (idioma: Idioma, slug: string): string =>
  `${BASE_PROYECTO[idioma]}/${slug}`;

/** Las dos direcciones de la misma página, para hreflang y el selector. */
export const traducciones = (pagina: Pagina) =>
  IDIOMAS.map((idioma) => ({ idioma, ruta: RUTAS[pagina][idioma] }));

export const traduccionesProyecto = (slug: string) =>
  IDIOMAS.map((idioma) => ({ idioma, ruta: rutaProyecto(idioma, slug) }));

/** Un ancla dentro de la portada del idioma. Evita concatenar rutas a mano. */
export const ancla = (idioma: Idioma, id: string): string => {
  const base = RUTAS.portada[idioma];
  return `${base === '/' ? '' : base}#${id}`;
};

export type { Diccionario };
