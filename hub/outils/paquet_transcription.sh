#!/usr/bin/env bash
# SPDX-License-Identifier: AGPL-3.0-or-later
# Fabrique Monolithe_Transcription_Windows.zip : hub/transcription/ + un Python 3.12 portable
# pour Windows 64 bits où faster-whisper est installé + le modèle Whisper large-v3-turbo.
#   outils/paquet_transcription.sh [dossier de sortie]      (depuis hub/ ; Linux, réseau)
set -euo pipefail
PBS=20260924; PY=3.12.14                       # même Python que le hub (app/python)
MODELE=mobiuslabsgmbh/faster-whisper-large-v3-turbo
HUB=$(cd "$(dirname "$0")/.." && pwd)
SORTIE=$(realpath "${1:-$HUB/..}")
PIP=${PIP:-python3 -m pip}
T=$(mktemp -d); trap 'rm -rf "$T"' EXIT
M="$T/transcription"; mkdir -p "$M"
cp "$HUB/transcription/transcrire.py" "$HUB/transcription/LISEZMOI.md" "$M/"

echo "· Python $PY Windows (python-build-standalone $PBS)"
curl -fsSL "https://github.com/astral-sh/python-build-standalone/releases/download/$PBS/cpython-$PY+$PBS-x86_64-pc-windows-msvc-install_only.tar.gz" \
  | tar -xz -C "$M"                              # → transcription/python/python.exe
find "$M/python" -name "*.pdb" -delete

echo "· faster-whisper et ses dépendances, roues win_amd64"
$PIP install --quiet --target "$M/python/Lib/site-packages" --platform win_amd64 \
  --python-version 3.12 --implementation cp --only-binary=:all: faster-whisper

echo "· modèle $MODELE"
python3 - "$MODELE" "$M/modele" <<'EOF'
import shutil, sys
from huggingface_hub import snapshot_download
src = snapshot_download(sys.argv[1])
shutil.copytree(src, sys.argv[2], symlinks=False, ignore=shutil.ignore_patterns(".*"))
EOF
test -f "$M/modele/model.bin" && test -f "$M/python/python.exe"

rm -f "$SORTIE/Monolithe_Transcription_Windows.zip"
(cd "$T" && zip -qr "$SORTIE/Monolithe_Transcription_Windows.zip" transcription)
ls -l "$SORTIE/Monolithe_Transcription_Windows.zip"
