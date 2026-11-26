# Module de transcription — facultatif

Transcrit les dictées enregistrées dans les modules (macro placenta 1.2 et suivants) quand
le hub les ingère. Sans ce module, le hub ingère le JSON et garde le son dans l'archive ;
dès que le module est posé, la prochaine ingestion rattrape les dictées en attente.

## Poser le module

Dézipper `Monolithe_Transcription_Windows.zip` **à côté du dossier `app/` du hub**, pour avoir :

```
<dossier du hub>/
  app/             le hub (serveur.bat, ingest.bat…)
  transcription/   ce module
    transcrire.py
    python/        un second Python 3.12 portable, avec faster-whisper
    modele/        Whisper large-v3-turbo (CTranslate2), lu sans réseau
```

Rien à lancer : le hub appelle `transcription\python\python.exe transcrire.py` lui-même, en un
lot par ingestion. Les textes apparaissent dans l'onglet **Transcriptions** du dossier, rangés
par onglet d'enregistrement. `python app/ingest.py --transcrire` traite les dictées en attente
sans rien ingérer.

## Paquet Omni — seconde écoute, facultative

Sur un poste qui a de la mémoire (≈ 22 Go libres, donc 32 Go de RAM en pratique), Qwen3-Omni
30B-A3B écoute chaque clip une seconde fois ; les passages où Whisper et Omni divergent sont
marqués ⟨whisper / omni⟩. Omni entend mieux le jargon, Whisper invente moins : la divergence
dit où relire.

1. Dézipper `Monolithe_Transcription_Omni_Windows.zip` **par-dessus** `transcription/` : il
   ajoute `omni/` (llama-server de llama.cpp, version figée) et `installer_omni.py`.
2. Une fois, avec réseau : `transcription\python\python.exe transcription\installer_omni.py`
   (≈ 20 Go, dépôt public ggml-org/Qwen3-Omni-30B-A3B-Instruct-GGUF), ou recopier les deux
   `.gguf` à la main dans `transcription/omni/modele/`.
3. `transcription\python\python.exe transcription\transcrire.py --omni` dit si Omni servira
   sur ce poste, et sinon pourquoi.

Sans le paquet, ou si la mémoire manque, ou si Omni ne démarre pas : Whisper seul, sans rien
demander. Omni est lancé pour le lot puis arrêté ; compter de une à quelques fois la durée du
clip sur un poste de bureau, plus le chargement (une à deux minutes).

## Ce qu'il fait, ce qu'il ne fait pas

- Whisper large-v3-turbo, en français, sur le processeur (int8) : quelques secondes par clip
  sur un poste récent, davantage sur un petit poste. Aucun son ni texte ne quitte le poste.
- Transcription brute, sans relecture ni correction : à relire avant de reprendre un texte.
- Une dictée transcrite ne l'est plus jamais (même après `--rejouer`).

## Le refaire

`outils/paquet_transcription.sh` (Linux) refait le zip : Python *python-build-standalone*
(licence PSF), roues Windows de faster-whisper et de ses dépendances, modèle
`mobiuslabsgmbh/faster-whisper-large-v3-turbo` (licence MIT, poids d'OpenAI Whisper).
`outils/paquet_omni.sh` refait le paquet Omni (llama.cpp b12250, CPU, Windows x64).
`python/`, `modele/` et `omni/` sont hors dépôt.
