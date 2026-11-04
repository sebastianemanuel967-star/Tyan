@echo off
title Servidor Sebastian Mena Podcast
echo Iniciando servidor local en http://localhost:8080...
powershell -ExecutionPolicy Bypass -File "%~dp0server.ps1" -Port 8080
pause
