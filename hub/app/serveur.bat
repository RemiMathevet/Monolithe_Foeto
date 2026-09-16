@echo off
rem SPDX-License-Identifier: CC-BY-NC-SA-4.0 | Hub Light
rem Demarre le serveur local du hub et ouvre la page de gestion.
rem Cherche le premier python trouve : un python portable pose a cote
rem (python\python.exe ou WPy64-*\python-*\python.exe), sinon celui du PATH.
setlocal
cd /d "%~dp0"

set PORT=5005
if not "%~1"=="" set PORT=%~1

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

%PY% -c "import flask" 2>nul
if errorlevel 1 (
  rem Reseau bloque par defaut : on installe d'abord depuis les roues ^(.whl^)
  rem livrees dans python\wheels\, et on n'essaie le reseau qu'en dernier.
  echo Flask est absent. Installation depuis python\wheels\ ^(sans reseau^)...
  %PY% -m pip install --no-index --find-links "%~dp0python\wheels" flask pillow
  if errorlevel 1 (
    echo Pas de roues utilisables ici. Essai par le reseau...
    %PY% -m pip install flask pillow
    if errorlevel 1 (
      echo.
      echo Installation impossible ^(reseau bloque et pas de roues^).
      echo Utiliser le dossier app\ complet, avec son python\ fourni.
      echo Sans Flask, l'ingestion en ligne de commande marche toujours : ingest.bat
      pause
      exit /b 3
    )
  )
)

rem Le navigateur s'ouvre depuis une fenetre a part, apres un delai : le
rem serveur a le temps de migrer la base et d'ecouter avant que la page
rem ne le demande (sinon « connexion refusee » au premier lancement).
set DELAI=4
if not "%~2"=="" set DELAI=%~2
start "" /b cmd /c "timeout /t %DELAI% /nobreak >nul & start http://127.0.0.1:%PORT%/"
rem Ce dossier (app\) contient tout le code et, s'il est la, le python
rem portable. Les donnees vivent un cran au-dessus, dans le dossier parent.
%PY% "%~dp0serveur.py" --port %PORT% --base "%~dp0.."
pause
