#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC_DIR="$ROOT_DIR/_new_images"
DST_DIR="$ROOT_DIR/public/images"

if [[ ! -d "$SRC_DIR" ]]; then
  echo "Missing $SRC_DIR"
  echo "Create it and place the new images there. See docs/image-replacement.md."
  exit 1
fi

if [[ ! -d "$DST_DIR" ]]; then
  echo "Missing $DST_DIR"
  exit 1
fi

need_png=(
  service-software.png
  service-ai.png
  service-cloud.png
  service-consulting.png
  service-quality.png
  service-transformation.png
  technology-generative-ai.png
  technology-cloud-native.png
  technology-data-platforms.png
  technology-web-applications.png
  technology-automation.png
  technology-cyber-resilience.png
  solution-healthcare.png
  solution-finance.png
  solution-retail.png
  solution-energy.png
)

need_jpg=(
  project-arcway.jpg
  project-clinical.jpg
  project-lumen.jpg
)

missing=0
for f in "${need_png[@]}"; do
  [[ -f "$SRC_DIR/$f" ]] || { echo "Missing: $SRC_DIR/$f"; missing=1; }
done
for f in "${need_jpg[@]}"; do
  [[ -f "$SRC_DIR/$f" ]] || { echo "Missing: $SRC_DIR/$f"; missing=1; }
done
if [[ "$missing" -eq 1 ]]; then
  echo
  echo "Add the missing files then re-run:"
  echo "  bash scripts/replace-images.sh"
  exit 1
fi

command -v ffmpeg >/dev/null 2>&1 || { echo "ffmpeg is required for png->jpg conversion."; exit 1; }

echo "Copying PNG assets..."
for f in "${need_png[@]}"; do
  cp -f "$SRC_DIR/$f" "$DST_DIR/$f"
done

echo "Copying project JPG assets..."
for f in "${need_jpg[@]}"; do
  cp -f "$SRC_DIR/$f" "$DST_DIR/$f"
done

echo "Generating matching JPGs for existing PNG pairs..."
for png in "${need_png[@]}"; do
  base="${png%.png}"
  target="$DST_DIR/$base.jpg"
  if [[ -f "$DST_DIR/$base.jpg" ]]; then
    ffmpeg -hide_banner -loglevel error -y -i "$DST_DIR/$png" -q:v 2 "$target"
  fi
done

echo "Done. Review changes with:"
echo "  git status"
echo "  git diff --stat"

