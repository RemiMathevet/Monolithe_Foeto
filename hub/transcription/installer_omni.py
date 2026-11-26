# SPDX-License-Identifier: AGPL-3.0-or-later
"""Télécharge le modèle du paquet Omni dans omni/modele/ (une fois, ~20 Go, réseau nécessaire) :
    transcription\\python\\python.exe transcription\\installer_omni.py
Qwen3-Omni 30B-A3B Instruct, quantifié Q4_K_M, et son encodeur audio (mmproj), depuis le dépôt
public ggml-org/Qwen3-Omni-30B-A3B-Instruct-GGUF (licence Apache-2.0). Sans réseau : recopier
ces deux fichiers à la main dans omni/modele/.
"""
from pathlib import Path

from huggingface_hub import hf_hub_download   # installé avec faster-whisper

DEPOT = "ggml-org/Qwen3-Omni-30B-A3B-Instruct-GGUF"
FICHIERS = ["Qwen3-Omni-30B-A3B-Instruct-Q4_K_M.gguf", "mmproj-Qwen3-Omni-30B-A3B-Instruct-Q8_0.gguf"]
DEST = Path(__file__).resolve().parent / "omni" / "modele"

if __name__ == "__main__":
    DEST.mkdir(parents=True, exist_ok=True)
    for f in FICHIERS:
        print(f"· {f}", flush=True)
        hf_hub_download(DEPOT, f, local_dir=DEST)
    print(f"modèle Omni prêt dans {DEST}")
