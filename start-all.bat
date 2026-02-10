@echo off
cd /d "%~dp0"
echo Starting Backend + Frontend...
call npm run dev:all
