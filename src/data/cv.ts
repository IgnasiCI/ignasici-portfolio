/**
 * El CV.
 *
 * Vive aquí y no en un PDF suelto por un motivo concreto: un PDF que se edita
 * a mano se descuadra de la web en dos cambios. De este archivo salen la
 * página /cv y el PDF que genera `npm run cv`, así que no pueden decir cosas
 * distintas.
 *
 * Regla del proyecto: aquí no se escribe nada que no sea verdad y comprobable.
 */
import type { T } from './site';

export const formacion = [
  {
    titulo: { es: 'Grado en Multimedia', en: 'BSc in Multimedia' } satisfies T,
    centro: 'Universitat Oberta de Catalunya (UOC)',
    fin: { es: 'Febrero de 2025', en: 'February 2025' } satisfies T,
  },
] as const;

export const experiencia = [
  {
    puesto: {
      es: 'Revisor manual de documentación',
      en: 'Manual document reviewer',
    } satisfies T,
    empresa: 'Mitek Systems',
    modalidad: { es: 'Remoto', en: 'Remote' } satisfies T,
    desde: '2021-12-14',
    hasta: null, // null = sigue en activo
    descripcion: {
      es: 'Verificación manual de documentos oficiales: validar la autenticidad de documentos de identidad, extraer sus datos y detectar indicios de fraude, cumpliendo la normativa y los estándares de seguridad del cliente.',
      en: 'Manual verification of official documents: validating the authenticity of identity documents, extracting their data and flagging signs of fraud, under the client’s compliance and security standards.',
    } satisfies T,
    /* Por qué está en un portfolio de front-end: cuatro años mirando documentos
       para encontrar el detalle que no cuadra es exactamente la atención que
       pide revisar una interfaz. No lo digo en la web con estas palabras —
       sonaría a excusa—, pero es la respuesta si lo preguntan en la entrevista. */
  },
] as const;

export const idiomas = [
  {
    idioma: { es: 'Castellano', en: 'Spanish' } satisfies T,
    nivel: { es: 'Nativo', en: 'Native' } satisfies T,
  },
  {
    idioma: { es: 'Catalán', en: 'Catalan' } satisfies T,
    nivel: { es: 'Nativo', en: 'Native' } satisfies T,
  },
  {
    /* B2 es lo acreditado y es lo que se dice. La prueba va en la misma línea:
       DoesItLast está escrito y publicado en inglés, y se puede abrir. Es la
       lógica de toda la web — cada afirmación con algo que se pueda comprobar. */
    idioma: { es: 'Inglés', en: 'English' } satisfies T,
    nivel: { es: 'B2 acreditado', en: 'B2 certified' } satisfies T,
    nota: {
      es: 'DoesItLast está escrito y publicado en inglés.',
      en: 'DoesItLast is written and published in English.',
    } satisfies T,
  },
  {
    idioma: { es: 'Alemán', en: 'German' } satisfies T,
    nivel: { es: 'A2', en: 'A2' } satisfies T,
  },
] as const;
