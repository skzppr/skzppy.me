@echo off
title Start HTTP and HTTPS Servers

:: Navigate to the project directory
cd /d %~dp0

:: Start the HTTP server on port 8080
start cmd /k "http-server -p 8080"

:: Start the HTTPS server on port 8443
start cmd /k "http-server -p 8443 -S -C cert.pem -K key.pem"

echo Servers are starting...
pause
