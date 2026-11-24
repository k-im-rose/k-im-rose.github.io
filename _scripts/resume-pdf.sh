#!/bin/sh
# 메인 홈페이지(index.html)를 그대로 인쇄해서 다운로드용 PDF(assets/files/resume.pdf)를 만든다.
# 이력서 내용은 _includes/cv-body.html 한 곳에서만 고치고, 그다음 이 스크립트를 실행하면 된다.
# 배포(푸시)를 기다릴 필요 없이 내 컴퓨터에서 사이트를 새로 빌드해 그 결과를 인쇄한다.
#
# 사용법: sh _scripts/resume-pdf.sh
#   (Jekyll과 Google Chrome이 필요하다. 인쇄용 디자인은 assets/css/cv.css 맨 아래 @media print 블록)
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/assets/files/resume.pdf"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
TMP="$(mktemp -d)"
PORT="${PORT:-4173}"

if command -v jekyll >/dev/null 2>&1; then JEKYLL="jekyll"
elif command -v bundle >/dev/null 2>&1 && [ -f "$ROOT/Gemfile" ]; then JEKYLL="bundle exec jekyll"
else JEKYLL="ruby $(gem contents jekyll 2>/dev/null | grep 'exe/jekyll$' | head -1)"; fi

cd "$ROOT"
$JEKYLL build -d "$TMP/site" >/dev/null
rm -rf "$ROOT/.sass-cache"

# PDF 안의 링크가 localhost 주소가 되지 않도록, 인쇄용 사본의 사이트 내부 링크(<a href="/...">)만 실제 주소로 바꾼다.
SITE_URL="$(awk '/^url:/{print $2}' "$ROOT/_config.yml")"
SITE_URL="${SITE_URL%/}"
perl -pi -e "s#(<a\\b[^>]*?href=\")/#\$1$SITE_URL/#g" "$TMP/site/index.html"

python3 -m http.server "$PORT" --directory "$TMP/site" >/dev/null 2>&1 &
SERVER=$!
sleep 1
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --virtual-time-budget=8000 --print-to-pdf="$OUT" "http://localhost:$PORT/" >/dev/null 2>&1
kill "$SERVER" 2>/dev/null || true
rm -rf "$TMP"
echo "Saved: $OUT"
