@echo off
title EzStays MIS - keep this window open
cd /d "%~dp0"

echo.
echo   EzStays MIS is starting...
echo   Your browser will open in a few seconds at http://localhost:3000
echo.
echo   KEEP THIS WINDOW OPEN while you use the app.
echo   Close this window when you are done - that stops the app.
echo.

rem Open the browser once the server has had time to start.
start "" cmd /c "timeout /t 10 >nul & start http://localhost:3000"

call npm run dev

echo.
echo   The app has stopped. If you saw an error above about port 3000 or the
echo   database being in use, another copy is already running - close it first.
pause
