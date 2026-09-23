#!/usr/bin/env bash
# Regenera los subsets de fuente que sirve la web.
#
# Por qué: los archivos "latin" completos de Geist pesan 29 KB (sans) y 23 KB
# (mono). Esta web solo escribe en castellano, así que recortamos la fuente a
# los caracteres que realmente usamos. El ahorro es de ~60 %.
#
# Requisitos:  npm i --no-save @fontsource-variable/geist @fontsource-variable/geist-mono
#              python3 -m pip install fonttools brotli
# Uso:         bash tools/subset-fonts.sh
#
# Si algún día añades un carácter que no esté en TEXT (por ejemplo, otro
# idioma), ese carácter se vería con la tipografía del sistema. Añádelo abajo
# y vuelve a ejecutar este script.
set -euo pipefail
cd "$(dirname "$0")/.."

TEXT='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 .,:;!?¡¿()[]{}«»""''"'"'"'-–—_/\|@#$%&*+=<>^~`áéíóúüñçÁÉÍÓÚÜÑÇàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛ·…€$£°©®™→←↑↓✓'

subset () {
  local src="$1" out="$2"
  python3 -m fontTools.subset "$src" \
    --text="$TEXT" \
    --layout-features='kern,liga,calt,tnum,ccmp,locl,mark,mkmk' \
    --flavor=woff2 \
    --no-hinting \
    --desubroutinize \
    --output-file="$out"
}

subset node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2 \
       public/fonts/geist-latin.woff2
# La mono solo se usa en micro-etiquetas en MAYÚSCULAS y en números, así que
# su subset es mucho más pequeño que el de la sans.
TEXT='ABCDEFGHIJKLMNOPQRSTUVWXYZÁÉÍÓÚÜÑÇ0123456789 .,:;()%/+–—·'
subset node_modules/@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2 \
       public/fonts/geist-mono-latin.woff2

ls -l public/fonts/*.woff2
