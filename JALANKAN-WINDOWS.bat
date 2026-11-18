@echo off
cd /d "%~dp0"
if exist .next rmdir /s /q .next
if not exist node_modules call npm install
start "" http://localhost:3000/game/menyusun-gapura-paduraksa
call npm run dev
