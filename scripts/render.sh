#!/usr/bin/env bash
# Rendert das Hero-Video als MP4 (H.264) und WebM (VP9) plus Poster-Bild nach out/.
set -euo pipefail
cd "$(dirname "$0")/.."

OUT=out
mkdir -p "$OUT"

# Optional: eigenes Chromium verwenden, z. B. BROWSER=/pfad/zu/chrome-headless-shell
BROWSER_ARGS=()
if [[ -n "${BROWSER:-}" ]]; then
  BROWSER_ARGS=(--browser-executable="$BROWSER")
fi

# Master in hoher Qualität, daraus werden die Web-Varianten encodiert
npx remotion render src/index.ts HeroLoop "$OUT/master.mp4" --codec=h264 --crf=12 --muted "${BROWSER_ARGS[@]}"
npx remotion still src/index.ts HeroPoster "$OUT/dmoove-hero-poster.png" --frame=0 "${BROWSER_ARGS[@]}"

ffmpeg -y -loglevel error -i "$OUT/master.mp4" -an \
  -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p -profile:v high -movflags +faststart \
  "$OUT/dmoove-hero.mp4"

ffmpeg -y -loglevel error -i "$OUT/master.mp4" -an \
  -c:v libvpx-vp9 -b:v 0 -crf 36 -row-mt 1 -deadline good -cpu-used 2 \
  "$OUT/dmoove-hero.webm"

ffmpeg -y -loglevel error -i "$OUT/dmoove-hero-poster.png" -q:v 3 "$OUT/dmoove-hero-poster.jpg"

rm -f "$OUT/master.mp4" "$OUT/dmoove-hero-poster.png"
ls -lh "$OUT"
