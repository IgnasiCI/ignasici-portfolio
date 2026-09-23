# ignasici.com

Portfolio de empleo de Ignasi Capella. Estática, bilingüe (castellano e
inglés), sin cookies y sin ninguna petición a terceros.

**Estado actual — medido, no prometido.** Sale de `npm run auditar`:

| | Móvil | Escritorio |
|---|---|---|
| Lighthouse (5 categorías) | 100 · 100 · 100 · 100 · 100 | 100 · 100 · 100 · 100 · 100 |
| LCP | 1,2 s | 0,3 s |
| CLS | 0 | 0 |
| Bloqueo del hilo principal | 0 ms | 0 ms |

Primera carga: **5 peticiones, 71,6 KB sin comprimir**. Incumplimientos de
accesibilidad detectados por axe-core: **0**, sobre 11 páginas × 4 entornos.

---

## Arrancar

Necesitas [Node.js](https://nodejs.org) 20 o superior.

```bash
npm install      # solo la primera vez
npm run dev      # abre http://localhost:4321
```

`npm run build` genera la web en `dist/`. `npm run preview` la muestra ya
compilada, que es como se verá publicada.

---

## Dónde está cada cosa

```
src/
  data/site.ts        identidad, contacto, disponibilidad y el stack
  data/cv.ts          formación, experiencia e idiomas
  data/proyectos.ts   los proyectos: texto, cifras y capturas
  data/metodo.ts      «Cómo trabajo» y «Sobre mí»
  i18n/               los dos idiomas y la tabla de rutas traducidas
  vistas/             portada y ficha de proyecto, una sola vez para es y en
  pages/              solo eligen el idioma y llaman a la vista
  styles/global.css   el sistema visual entero
  scripts/main.js     ~1,3 KB: las apariciones y el formulario
functions/
  api/contacto.js     el receptor del formulario, en Cloudflare
tools/
  auditoria.mjs       axe-core + sin JS + movimiento reducido + Lighthouse
  csp.mjs             calcula el hash de los scripts en línea al compilar
  og.mjs              regenera og.png y apple-touch-icon.png
  cv.mjs              genera el PDF del CV desde la página /cv
  subset-fonts.sh     recorta las tipografías
```

**La regla del proyecto:** todo lo que la web afirma tiene que poder
comprobarse abriendo un proyecto publicado. Las cifras de `proyectos.ts` están
sacadas compilando cada proyecto, no copiadas de su README.

---

## Lo que vas a querer cambiar

### Un dato tuyo → `src/data/site.ts`

Teléfono, correo, disponibilidad, LinkedIn, GitHub. Cambian en el hero, en el
pie, en los datos estructurados y en el CV a la vez.

### El stack → `src/data/site.ts`, `stack`

Cada tecnología lleva un campo `donde`: en qué proyecto se demuestra. **Si no
puedes rellenarlo, no la añadas.** En una entrevista técnica se nota en tres
preguntas.

`hero: true` marca las nueve que salen arriba del todo. El resto salen en la
sección de stack.

### Un proyecto → `src/data/proyectos.ts`

Copia un bloque y rellénalo en los dos idiomas. La imagen va en `src/assets/`
e importada arriba: Astro genera solo las versiones AVIF y WebP y los tamaños
de cada pantalla.

Con `borrador: true` el proyecto se ve con `npm run dev` pero **no** en la web
publicada, y tampoco genera su página ni entra en el sitemap.

### El enlace al código

Los repositorios están privados. Mientras `repositorio` esté vacío, el botón
**«Ver código ↗»** no aparece. El día que los hagas públicos, rellenas el campo
y sale solo, sin tocar maquetación.

### El CV

Los datos están en `src/data/cv.ts` y de ahí salen la página `/cv` y el PDF.
Cuando cambies algo:

```bash
npm run build && npm run preview   # en otra terminal
npm run cv                          # regenera public/cv-ignasi-capella.pdf
```

El PDF no se edita a mano nunca. Si se edita, deja de ser el mismo CV que la
web y ya no hay forma de saber cuál es el bueno.

### El formulario de contacto

Envía a `functions/api/contacto.js`, una función que Cloudflare ejecuta junto
a la web. **No funciona con `npm run dev`**: solo corre una vez publicado. En
local dará error de red, que es lo esperado.

En Cloudflare, **Settings → Environment variables**:

| Variable | Valor |
|---|---|
| `RESEND_API_KEY` | la clave de [resend.com](https://resend.com) |
| `CONTACTO_DESTINO` | el correo donde quieres recibir los avisos |
| `CONTACTO_REMITENTE` | `onboarding@resend.dev` hasta verificar el dominio |

Sin JavaScript el formulario envía igual y la función responde con una
redirección a `/gracias` o a `/en/thanks`, según el idioma.

### Cal Fumet

Está escrito entero y en borrador, esperando a estar desplegado. Cuando lo
publiques: pones su dirección en `enlace`, haces la captura, y cambias
`borrador` a `false`.

---

## Comprobar que sigue siendo verdad

```bash
npm install --no-save playwright-core axe-core lighthouse chrome-launcher
npm run build
npm run auditar
```

Comprueba cuatro cosas: accesibilidad con axe-core en todas las páginas y en
cuatro entornos, que la web se lee sin JavaScript, que
`prefers-reduced-motion` apaga el movimiento —no lo acorta— y las
puntuaciones de Lighthouse.

Las páginas las saca del `sitemap.xml` compilado más las que van con
`noindex`, así que audita exactamente lo que se publica. Si añades un
proyecto, se audita solo.

Ninguna de esas herramientas es dependencia de la web: pesan más que la web.
Se instalan para auditar y se pueden borrar después.

Para regenerar la imagen de compartir (solo si cambia el titular):

```bash
npm install --no-save playwright sharp
npm run og
```

Para volver a recortar las tipografías (solo si añades caracteres de otro
idioma):

```bash
npm install --no-save @fontsource-variable/geist @fontsource-variable/geist-mono
python3 -m pip install fonttools brotli
bash tools/subset-fonts.sh
```

---

## Publicar en Cloudflare Pages

1. **Workers & Pages → Create → Pages → Connect to Git**, y elige este repositorio.
2. Framework preset **Astro**, build command `npm run build`, output `dist`.
3. **Save and Deploy.** A partir de ahí, cada `git push` publica sola.

### El dominio — el orden importa

Un dominio solo puede estar en un proyecto de Cloudflare Pages a la vez.

1. **Quitar** `ignasici.com` y `www.ignasici.com` del proyecto del portfolio comercial.
2. **Añadirlos** aquí, en **Custom domains**.
3. En el repositorio `IgnasiCI/portfolio`, fusionar la rama `claude/traspaso-dominio`
   y definir su `SITE_URL` en Cloudflare.

⚠️ **El paso 3 no es opcional, y va después del 2.** El portfolio comercial
declara `https://ignasici.com` como su dirección canónica: si no se cambia, su
canónica, su sitemap y su imagen de compartir seguirán apuntando a un dominio
que ya no es suyo y Google acabará mezclando las dos webs. Y si se cambia
antes de tiempo, se desindexa el dominio bueno.

---

## Antes de publicar

- [ ] La foto en el hero
- [ ] Desplegar Cal Fumet y sacarlo de borrador
- [ ] El formulario de contacto (bloque siguiente) y sus variables de Resend
- [ ] `npm run auditar` en verde
