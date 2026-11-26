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

## Ce qu'il fait, ce qu'il ne fait pas

- Whisper large-v3-turbo, en français, sur le processeur (int8) : quelques secondes par clip
  sur un poste récent, davantage sur un petit poste. Aucun son ni texte ne quitte le poste.
- Transcription brute, sans relecture ni correction : à relire avant de reprendre un texte.
- Une dictée transcrite ne l'est plus jamais (même après `--rejouer`).

## Le refaire

`outils/paquet_transcription.sh` (Linux) refait le zip : Python *python-build-standalone*
(licence PSF), roues Windows de faster-whisper et de ses dépendances, modèle
`mobiuslabsgmbh/faster-whisper-large-v3-turbo` (licence MIT, poids d'OpenAI Whisper).
`python/` et `modele/` sont hors dépôt.
