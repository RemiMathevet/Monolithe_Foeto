@echo off
rem SPDX-License-Identifier: AGPL-3.0-or-later | Hub Light
rem Double-clic ici : lance le serveur du hub (hub\app\serveur.bat) et ouvre
rem la page de gestion. Arguments facultatifs : port, puis delai en secondes
rem avant l ouverture du navigateur (4 par defaut).
call "%~dp0hub\app\serveur.bat" %*
