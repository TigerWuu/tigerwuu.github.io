#!/usr/bin/env bash
# Build the Quartz notes site from notes-src/content into ./notes
# Usage: bash notes-src/build.sh   (run from the repository root)
set -euo pipefail

REPO="$(cd "$(dirname "$0")/.." && pwd)"
QUARTZ_COMMIT=d25a6eabf96751ffca56f8a8139272def7a65041   # Quartz v4.5.2 the overlay was tested with
WORK="${RUNNER_TEMP:-/tmp}/quartz"

if [ ! -d "$WORK/.git" ]; then
  git init -q "$WORK"
  git -C "$WORK" fetch -q --depth 1 https://github.com/jackyzha0/quartz "$QUARTZ_COMMIT"
  git -C "$WORK" checkout -q FETCH_HEAD
fi
cd "$WORK"
[ -d node_modules ] || npm ci --no-audit --no-fund

# our look: main-site nav bar, ocean banner, colours, embed support for notes.html
cp "$REPO/notes-src/quartz/quartz.config.ts" "$REPO/notes-src/quartz/quartz.layout.ts" .
cp "$REPO/notes-src/quartz/components/"*.tsx quartz/components/
cp "$REPO/notes-src/quartz/styles/custom.scss" quartz/styles/
cp "$REPO/notes-src/quartz/static/"* quartz/static/
grep -q SiteNav quartz/components/index.ts || cat >> quartz/components/index.ts <<'TS'
export { default as SiteNav } from "./SiteNav"
export { default as Masthead } from "./Masthead"
TS

rm -rf content && cp -r "$REPO/notes-src/content" content
rm -rf "$REPO/notes"
npx quartz build --output "$REPO/notes"
