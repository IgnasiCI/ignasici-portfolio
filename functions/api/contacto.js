/**
 * RECEPTOR DEL FORMULARIO DE CONTACTO
 *
 * Esto no es parte de la web: es una función que Cloudflare ejecuta en su
 * servidor cuando alguien envía el formulario. La web sigue siendo estática.
 *
 * POR QUÉ UNA FUNCIÓN PROPIA Y NO UN SERVICIO EXTERNO
 * - Los datos de quien te escribe no pasan por terceros.
 * - El formulario envía a tu propio dominio, así que la política de seguridad
 *   de la web puede seguir prohibiendo envíos a cualquier otro sitio.
 * - Y es, además, la prueba de la fila «Cloudflare Functions» del stack: si la
 *   web afirma que sé montar esto, lo honesto es que el formulario que estás
 *   leyendo sea justo eso.
 *
 * QUÉ HAY QUE CONFIGURAR EN CLOUDFLARE (Settings → Environment variables)
 *   RESEND_API_KEY      la clave de tu cuenta en resend.com
 *   CONTACTO_DESTINO    el correo donde quieres recibir los avisos
 *   CONTACTO_REMITENTE  desde qué dirección se envían
 *
 * Mientras no verifiques ignasici.com en Resend, deja CONTACTO_REMITENTE con
 * el valor de pruebas `onboarding@resend.dev`: solo puede enviarte a ti, que
 * es justo lo que hace falta aquí.
 *
 * OJO: esto no funciona con `npm run dev`. Solo corre una vez publicado en
 * Cloudflare. En local, el formulario dará error de red; es lo esperado.
 */

const LIMITES = { nombre: 100, email: 150, mensaje: 3000 };

/** Recorta y limpia lo que llega del formulario. Nunca confíes en el navegador. */
function limpiar(valor, maximo) {
  return String(valor ?? '').trim().slice(0, maximo);
}

function esEmail(valor) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor);
}

/**
 * Responde en JSON si quien llama es el JavaScript de la web, y con una
 * redirección normal si el formulario se ha enviado sin JavaScript. Así el
 * formulario funciona en los dos casos.
 */
function responder(request, estado, cuerpo, gracias = '/gracias') {
  const quiereJson = (request.headers.get('accept') || '').includes('application/json');

  if (quiereJson) {
    return new Response(JSON.stringify(cuerpo), {
      status: estado,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  }

  /* Sin JavaScript se responde con una redirección normal, al «gracias» del
     idioma desde el que se ha enviado: quien escribe en inglés no tiene por
     qué acabar en una página en castellano.

     `gracias` viene de un campo oculto del formulario, así que llega del
     navegador y no es de fiar. Solo se acepta si es una de las dos rutas que
     existen: si no, un enlace preparado podría redirigir a otro dominio desde
     tu propia web. */
  const RUTAS_GRACIAS = ['/gracias', '/en/thanks'];
  const seguro = RUTAS_GRACIAS.includes(gracias) ? gracias : '/gracias';
  const destino = estado === 200 ? seguro : '/?error=contacto#contacto';
  return Response.redirect(new URL(destino, request.url), 303);
}

/* Alfabetos que no usa ninguno de los idiomas con los que se trabaja aquí:
   griego, cirílico, armenio, hebreo, árabe, georgiano, chino, japonés y
   coreano. Encontrarlos NO descarta el mensaje, solo suma sospecha: un
   comercio con dueño ruso o chino es un cliente perfectamente posible, y
   perder uno cuesta mil veces más que borrar todo el spam de un año. */
const OTROS_ALFABETOS =
  /[\u0370-\u03FF\u0400-\u04FF\u0530-\u058F\u0590-\u05FF\u0600-\u06FF\u10A0-\u10FF\u3040-\u30FF\u4E00-\u9FFF\uAC00-\uD7AF]/;

/**
 * Puntúa lo sospechoso que parece un envío. NUNCA rechaza: lo que hace es
 * marcar el asunto del correo para poder filtrarlo de un vistazo.
 *
 * La razón de marcar en vez de descartar es simple: un filtro que descarta
 * falla en silencio. La persona ve «mensaje enviado» y a ti no te llega nada,
 * y nunca te enteras de lo que has perdido.
 */
function sospecha({ nombre, mensaje, tiempo }) {
  const motivos = [];

  if (tiempo === null) motivos.push('sin marca de tiempo');
  if (OTROS_ALFABETOS.test(mensaje)) motivos.push('otro alfabeto');
  if (/https?:\/\/|www\./i.test(mensaje)) motivos.push('lleva enlaces');
  if (mensaje.length < 25) motivos.push('mensaje muy corto');
  // «RobertEnect»: una sola palabra con una mayúscula dentro. Patrón típico
  // de los generadores de nombres de estas campañas.
  if (/^[A-Z][a-z]+[A-Z][a-z]+$/.test(nombre)) motivos.push('nombre generado');

  return motivos;
}

export async function onRequestPost({ request, env }) {
  let datos;
  try {
    datos = await request.formData();
  } catch {
    return responder(request, 400, { ok: false, error: 'Envío no válido.' });
  }

  /* A qué «gracias» volver si se ha enviado sin JavaScript. Se valida dentro
     de `responder`: lo que llega del navegador no es de fiar. */
  const gracias = limpiar(datos.get('destino'), 20);

  // La trampa para robots. Una persona nunca ve este campo, así que si viene
  // relleno es automático. Se responde «ok» a propósito: si devolviéramos un
  // error, el robot sabría que le hemos pillado y volvería a intentarlo.
  if (limpiar(datos.get('empresa'), 50)) {
    return responder(request, 200, { ok: true }, gracias);
  }

  const nombre = limpiar(datos.get('nombre'), LIMITES.nombre);
  const email = limpiar(datos.get('email'), LIMITES.email);
  const mensaje = limpiar(datos.get('mensaje'), LIMITES.mensaje);

  /* Segundos que ha tardado en rellenarse, medidos en el navegador. Si el
     valor no llega —alguien con JavaScript desactivado, o un robot que envía
     directamente al servidor— no se rechaza nada: solo suma sospecha. */
  const bruto = Number(datos.get('tiempo'));
  const tiempo = Number.isFinite(bruto) && bruto > 0 ? bruto : null;

  // Lo único que sí descarta: rellenar tres campos en menos de tres
  // segundos. Ninguna persona escribe tan rápido. Se responde «ok» para que
  // el robot no sepa que le hemos pillado.
  if (tiempo !== null && tiempo < 3) {
    return responder(request, 200, { ok: true }, gracias);
  }

  if (!nombre || !mensaje || !esEmail(email)) {
    return responder(request, 400, {
      ok: false,
      error: 'Revisa los campos: faltan datos o el correo no es válido.',
    }, gracias);
  }

  if (!env.RESEND_API_KEY || !env.CONTACTO_DESTINO) {
    return responder(request, 500, {
      ok: false,
      error: 'El formulario no está configurado. Escríbeme a hola@ignasici.com.',
    }, gracias);
  }

  // Se marca, no se descarta. Con dos señales o más el asunto lleva «[?]»
  // delante, que es todo lo que hace falta para filtrarlo en el correo.
  const motivos = sospecha({ nombre, mensaje, tiempo });
  const marca = motivos.length >= 2 ? '[?] ' : '';

  const envio = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from: env.CONTACTO_REMITENTE || 'onboarding@resend.dev',
      to: [env.CONTACTO_DESTINO],
      // Así puedes responder directamente desde el correo que te llega.
      reply_to: email,
      subject: `${marca}ignasici.com — ${nombre}`,
      text: [
        `Nombre:  ${nombre}`,
        `Email:   ${email}`,
        ...(motivos.length ? ['', `Posible spam: ${motivos.join(', ')}.`] : []),
        '',
        mensaje,
      ].join('\n'),
    }),
  });

  if (!envio.ok) {
    return responder(request, 502, {
      ok: false,
      error: 'No he podido enviar el mensaje. Escríbeme a hola@ignasici.com.',
    }, gracias);
  }

  return responder(request, 200, { ok: true }, gracias);
}
