#!/usr/bin/env bash
# SPDX-License-Identifier: AGPL-3.0-or-later
# Fabrique Monolithe_Transcription_Omni_Windows.zip, à dézipper par-dessus transcription/ :
# omni/ (llama-server de llama.cpp, CPU, Windows x64, version figée) + transcrire.py et
# installer_omni.py à jour. Le modèle (~20 Go) n'y est pas : installer_omni.py le télécharge.
#   outils/paquet_omni.sh [dossier de sortie]      (depuis hub/ ; Linux, réseau, gh)
set -euo pipefail
LLAMA=b12250                                   # 2026-11-10 ; seconde écoute vérifiée avec sa version Linux
HUB=$(cd "$(dirname "$0")/.." && pwd)
SORTIE=$(realpath "${1:-$HUB/..}")
T=$(mktemp -d); trap 'rm -rf "$T"' EXIT
M="$T/transcription"; mkdir -p "$M/omni/modele"
cp "$HUB/transcription/transcrire.py" "$HUB/transcription/installer_omni.py" "$HUB/transcription/LISEZMOI.md" "$M/"
gh release download "$LLAMA" -R ggml-org/llama.cpp -p "llama-$LLAMA-bin-win-cpu-x64.zip" -D "$T"
unzip -q "$T/llama-$LLAMA-bin-win-cpu-x64.zip" -d "$T/llama"
EXE=$(find "$T/llama" -name llama-server.exe | head -1)
test -n "$EXE"
cp "$(dirname "$EXE")"/*.dll "$EXE" "$M/omni/"
find "$T/llama" -maxdepth 2 -iname "LICENSE*" -exec cp {} "$M/omni/" \;
echo "Déposer ici les deux .gguf (installer_omni.py le fait)." > "$M/omni/modele/LISEZMOI.txt"
rm -f "$SORTIE/Monolithe_Transcription_Omni_Windows.zip"
(cd "$T" && zip -qr "$SORTIE/Monolithe_Transcription_Omni_Windows.zip" transcription)
ls -l "$SORTIE/Monolithe_Transcription_Omni_Windows.zip"
