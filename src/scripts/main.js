/**
 * Todo el JavaScript de esta web.
 *
 * Hace una sola cosa: marcar los bloques que ya han entrado en pantalla para
 * que el CSS los revele. Sin librería —GSAP son unos 50 KB para esto mismo— y
 * sin tocar estilos desde aquí: el JavaScript pone un atributo y el CSS decide
 * qué significa.
 *
 * Si este archivo no llega, no pasa nada: el estado inicial oculto vive dentro
 * de `@media (scripting: enabled)`, así que sin JavaScript nunca se aplica y
 * la web se lee entera. Es el fallo clásico de las apariciones —contenido que
 * se queda invisible para siempre— y se evita en la consulta de medios, no
 * aquí.
 */
const bloques = document.querySelectorAll('[data-revelar]');

/* Con movimiento reducido no hay nada que observar: el CSS ya deja los
   bloques visibles, así que ni se crea el observador. */
if (bloques.length && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observador = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue;
        entrada.target.dataset.visible = '';
        // Una vez visto, se deja de vigilar: no tiene que volver a esconderse.
        observador.unobserve(entrada.target);
      }
    },
    // Un margen negativo abajo: el bloque aparece cuando ya ha entrado un poco,
    // no en cuanto asoma un píxel por el borde.
    { rootMargin: '0px 0px -12% 0px' }
  );

  for (const bloque of bloques) observador.observe(bloque);
}

/* ------------------------------------------------------------------------
   EL FORMULARIO DE CONTACTO

   Sin este archivo el formulario funciona igual: envía por POST normal y la
   función responde con una redirección a /gracias. Lo que añade el
   JavaScript es no salir de la página, y la medida del tiempo de relleno.
   ------------------------------------------------------------------------ */
const formulario = document.querySelector('[data-formulario]');

if (formulario) {
  const aviso = formulario.querySelector('[data-aviso]');
  const boton = formulario.querySelector('button[type="submit"]');
  const textoBoton = boton.textContent;

  /* Cuánto tarda en rellenarse, medido aquí y no comparando con la hora del
     servidor: así un reloj desajustado no rompe nada. La función lo usa para
     descartar envíos de menos de tres segundos —ninguna persona escribe tan
     rápido— y para nada más. */
  const abierto = Date.now();

  formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const datos = new FormData(formulario);
    datos.set('tiempo', String((Date.now() - abierto) / 1000));

    boton.disabled = true;
    boton.textContent = formulario.dataset.enviando;
    aviso.textContent = '';

    try {
      const respuesta = await fetch(formulario.action, {
        method: 'POST',
        // Este encabezado es lo que le dice a la función que responda en JSON
        // en vez de con una redirección.
        headers: { accept: 'application/json' },
        body: datos,
      });
      const cuerpo = await respuesta.json();

      if (cuerpo.ok) {
        window.location.href = formulario.querySelector('[name="destino"]').value;
        return;
      }
      aviso.textContent = cuerpo.error;
    } catch {
      // Error de red: se da la salida que siempre funciona, que es el correo.
      aviso.textContent = formulario.dataset.errorRed;
    }

    boton.disabled = false;
    boton.textContent = textoBoton;
  });
}
