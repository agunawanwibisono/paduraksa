#!/bin/bash
cd "$(dirname "$0")"
rm -rf .next
[ -d node_modules ] || npm install
(sleep 6; open "http://localhost:3000/game/menyusun-gapura-paduraksa" 2>/dev/null || xdg-open "http://localhost:3000/game/menyusun-gapura-paduraksa" 2>/dev/null) &
npm run dev
