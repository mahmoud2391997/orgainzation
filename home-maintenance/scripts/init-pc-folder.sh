#!/usr/bin/env bash
# Copy this app into a new folder and initialize its own git repo.
# Usage: bash scripts/init-pc-folder.sh ~/baytfix-home-maintenance
set -euo pipefail

DEST="${1:-}"
if [[ -z "$DEST" ]]; then
  echo "Usage: $0 /path/to/baytfix-home-maintenance"
  echo "Example: $0 \$HOME/baytfix-home-maintenance"
  exit 1
fi

SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
mkdir -p "$DEST"
DEST="$(cd "$DEST" && pwd)"

if [[ "$DEST" == "$SRC" ]]; then
  echo "Destination cannot be the source folder: $SRC"
  exit 1
fi

echo "Copying BaytFix from $SRC -> $DEST"
tar -C "$SRC" \
  --exclude=node_modules \
  --exclude=.next \
  --exclude=.git \
  --exclude='*.tsbuildinfo' \
  --exclude='.env' \
  --exclude='.env.local' \
  --exclude='.env.production' \
  --exclude='.env.staging' \
  -cf - . | tar -C "$DEST" -xf -

cd "$DEST"
if [[ -d .git ]]; then
  echo "Existing git repo at $DEST — files copied, git left as-is."
  exit 0
fi

git init -b main
git add .
if git config user.email >/dev/null && git config user.name >/dev/null; then
  git commit -m "Initial commit: BaytFix home electrical and plumbing ordering"
else
  git -c user.email="baytfix@local" -c user.name="BaytFix" commit \
    -m "Initial commit: BaytFix home electrical and plumbing ordering"
fi

echo
echo "Standalone repo ready: $DEST"
echo "Next:"
echo "  git remote add origin https://github.com/YOUR_USER/baytfix-home-maintenance.git"
echo "  git push -u origin main"
