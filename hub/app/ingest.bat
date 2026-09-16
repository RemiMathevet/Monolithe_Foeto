@echo off
rem SPDX-License-Identifier: CC-BY-NC-SA-4.0 | Hub Light
rem Lance ingest.py avec le premier python trouve : un python portable pose
rem a cote (python\python.exe ou WPy64-*\python-*\python.exe), sinon celui du PATH.
setlocal
cd /d "%~dp0"

set PY=
if exist "%~dp0python\python.exe" set PY="%~dp0python\python.exe"
if not defined PY for /d %%D in ("%~dp0WPy*") do (
  for /d %%P in ("%%D\python-*") do if exist "%%P\python.exe" set PY="%%P\python.exe"
)
if not defined PY (
  where python >nul 2>&1 && set PY=python
)
if not defined PY (
  echo Aucun interpreteur Python trouve.
  echo Poser un python portable dans "%~dp0python\" ou l'ajouter au PATH.
  pause
  exit /b 2
)

rem Ce dossier (app\) contient tout le code et, s'il est la, le python
rem portable. Les donnees vivent un cran au-dessus, dans le dossier parent.
%PY% "%~dp0ingest.py" --base "%~dp0.." %*
set CODE=%ERRORLEVEL%
echo.
if not "%CODE%"=="0" echo Termine avec des rejets ^(code %CODE%^) - voir le dossier rejets\.
pause
exit /b %CODE%
