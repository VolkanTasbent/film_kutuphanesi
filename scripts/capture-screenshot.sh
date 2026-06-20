#!/bin/bash
# Gerçek uygulama ekran görüntüsü almak için:
# 1) npm run preview
# 2) Başka bir terminalde: bash scripts/capture-screenshot.sh

URL="http://127.0.0.1:4173/"
OUTPUT="screenshots/ana-ekran.png"

if [ -x "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" ]; then
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
    --headless=new \
    --disable-gpu \
    --window-size=1440,1200 \
    --screenshot="$OUTPUT" \
    "$URL"
  echo "Ekran görüntüsü kaydedildi: $OUTPUT"
else
  echo "Chrome bulunamadı. Uygulamayı tarayıcıda açıp ekran görüntüsü alın."
fi
