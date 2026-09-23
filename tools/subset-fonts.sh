#!/usr/bin/env bash
# Regenera los subconjuntos de tipografía que sirve la web.
#
# Tres voces con tres trabajos, y ninguna de más:
#   Fraunces   — los titulares. Serif de contraste alto, con su cursiva.
#   Geist      — el texto y la interfaz.
#   Geist Mono — los datos y las micro-etiquetas.
#
# Por qué una serif de display: sin ella todo el sitio es una sola geométrica
# a distintos tamaños, y eso es exactamente el aspecto que tiene cualquier web
# montada con la librería de componentes de turno. El contraste entre una
# serif de display y una geométrica de texto es lo que separa una página
# compuesta de una página por defecto.
#
# Requisitos:  npm i --no-save @fontsource-variable/geist @fontsource-variable/geist-mono @fontsource-variable/fraunces
#              python3 -m pip install fonttools brotli
# Uso:         bash tools/subset-fonts.sh
set -euo pipefail
cd "$(dirname "$0")/.."

# Castellano e inglés comparten alfabeto, así que la web bilingüe no pesa ni un
# byte más que la monolingüe. Si algún día entra otro idioma, se añaden aquí
# sus caracteres y se vuelve a ejecutar.
TEXTO='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 .,:;!?¡¿()[]{}«»""''"'"'"'’“”‘-–—_/\|@#$%&*+=<>^~`áéíóúüñçÁÉÍÓÚÜÑÇàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛ·…€$£°©®™→←↑↓✓×'

recortar () {
  local origen="$1" destino="$2" ejes="${3:-}"
  local entrada="$origen"
  if [ -n "$ejes" ]; then
    # Limitar el eje variable al rango que usa el diseño: los pesos que nadie
    # va a ver no tienen por qué viajar.
    python3 -m fontTools.varLib.instancer "$origen" $ejes -o /tmp/eje.ttf
    entrada=/tmp/eje.ttf
  fi
  python3 -m fontTools.subset "$entrada" \
    --text="$TEXTO" \
    --layout-features='kern,liga,calt,tnum,ccmp,locl,mark,mkmk' \
    --flavor=woff2 --no-hinting --desubroutinize \
    --output-file="$destino"
  rm -f /tmp/eje.ttf
}

F=node_modules/@fontsource-variable
recortar "$F/geist/files/geist-latin-wght-normal.woff2" public/fonts/geist-latin.woff2

# La mono solo aparece en micro-etiquetas y en cifras, así que su subconjunto
# es mucho más pequeño.
TEXTO='ABCDEFGHIJKLMNOPQRSTUVWXYZÁÉÍÓÚÜÑÇ0123456789 .,:;()%/+–—·×'
recortar "$F/geist-mono/files/geist-mono-latin-wght-normal.woff2" public/fonts/geist-mono-latin.woff2

# Fraunces solo pinta titulares: se recorta al rango de pesos del diseño.
TEXTO='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 .,:;!?¡¿()«»''"'"'"'’“”-–—/&áéíóúüñçÁÉÍÓÚÜÑÇàèòÀÈÒ·…'
# Solo la redonda. La cursiva de Fraunces son 24,5 KB más, y se usaría para
# una palabra del titular: duplicar el peso de las tipografías por un detalle
# es justo el trueque que esta web dice no hacer.
recortar "$F/fraunces/files/fraunces-latin-wght-normal.woff2" public/fonts/fraunces.woff2 'wght=400:700'

ls -l public/fonts/*.woff2
