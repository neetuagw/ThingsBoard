@echo off

REM Set Thingsboard host to "demo.thingsboard.io" or "localhost"
set THINGSBOARD_HOST=demo.thingsboard.io

REM Replace YOUR_ACCESS_TOKEN with one from Device credentials window.
set ACCESS_TOKEN=AuPYbprHG5F5wIhMnJ06

REM Read timeseries data as an object without timestamp (server-side timestamp will be used)
set /p TELEMETRY=<telemetry-data.json

REM publish attributes and telemetry data via mqtt client
node publish.js