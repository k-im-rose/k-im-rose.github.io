#!/bin/sh
# Rebuild the Profile page PDF (assets/files/resume.pdf) from the page's print styles.
# Usage: sh _scripts/resume-pdf.sh [page-url]
#   default page-url: the live Profile page. After changing about.md, push and wait for
#   GitHub Pages to deploy, then run this, and commit the new PDF.
set -e
URL="${1:-https://k-im-rose.github.io/about/}"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUT="$(cd "$(dirname "$0")/.." && pwd)/assets/files/resume.pdf"
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --virtual-time-budget=8000 --print-to-pdf="$OUT" "$URL"
echo "Saved: $OUT"
