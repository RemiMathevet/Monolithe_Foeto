#!/usr/bin/env python3
# SPDX-License-Identifier: AGPL-3.0-or-later
"""Rend les gabarits de CR de Lumi sur le dossier d'exemple du Monolithe et liste,
gabarit par gabarit, les variables qu'aucun des deux contextes ne fournit.

    python3 hub/outils/verifier_lumi.py [DOSSIER_GABARITS_LUMI]

Défaut : ~/Bureau/FoetoPath_Luminarium_V2/Foeto/templates/cr. Base jetable dans
/tmp, remplie avec hub/exemples et les saisies de
verifier_cr.py (macro placenta, micro, grilles). Code de retour 1 si un gabarit plante au rendu.
"""
import sys, tempfile, shutil, subprocess, sqlite3
from pathlib import Path
from jinja2 import Undefined, FileSystemLoader
from jinja2.utils import missing
from jinja2.sandbox import SandboxedEnvironment

APP = Path(__file__).resolve().parent.parent / "app"
sys.path.insert(0, str(APP))
import cr, biometrie, ingest                                   # noqa: E402

LUMI = Path(sys.argv[1]) if len(sys.argv) > 1 else \
    Path.home() / "Bureau/FoetoPath_Luminarium_V2/Foeto/templates/cr"

manquants = set()


class Trace(Undefined):
    """Undefined qui note chaque nom absent au lieu de planter : on veut la liste
    complète. Variable absente → « nom » ; clé absente d'un objet → « objet.clé »
    quand l'objet est lui-même absent, « [clé] » sinon."""
    def __init__(self, hint=None, obj=missing, name=None, exc=None):
        super().__init__(hint, obj, name) if exc is None else super().__init__(hint, obj, name, exc)
        if name:
            manquants.add(name if obj is missing else f"[{name}]")
    def __getattr__(self, n):
        if n.startswith("__"):
            raise AttributeError(n)
        return Trace(name=f"{self._undefined_name}.{n}")
    __str__ = lambda self: ""
    __iter__ = lambda self: iter(())
    __bool__ = lambda self: False
    __len__ = lambda self: 0
    __call__ = lambda self, *a, **k: Trace(name=f"{self._undefined_name}()")


base = Path(tempfile.mkdtemp(prefix="verif-lumi-"))
(base / "arrivee").mkdir()
for f in (APP.parent / "exemples").glob("26P0123_*.json"):
    shutil.copy(f, base / "arrivee")
subprocess.run([sys.executable, str(APP / "ingest.py"), "--base", str(base)], check=True, capture_output=True)
cx = sqlite3.connect(base / "hub.sqlite")
cx.row_factory = sqlite3.Row
# + macro placenta, micro et grilles de verifier_cr (même dossier fictif)
sys.path.insert(0, str(Path(__file__).parent))
import json, verifier_cr                                      # noqa: E402
for d in verifier_cr.SAISIES:
    ingest.ingerer(cx, base, json.dumps(d).encode("utf-8"), f"{d['dossier']}_{d['module']}.json", provenance="poste")
ctx = cr.contexte(cx, "26P0123", biometrie.References(APP.parent / "references"), ingest.ORDRE_MODULES)

env = SandboxedEnvironment(loader=FileSystemLoader(str(LUMI)), undefined=Trace,
                           trim_blocks=False, lstrip_blocks=False)          # réglages de Lumi
env.filters.update(cr.environnement().filters)
env.globals.update(cr.environnement().globals)
plantes = 0
for g in sorted(LUMI.glob("*.jinja2")):
    manquants.clear()
    try:
        env.get_template(g.name).render(**ctx)
        etat = "ok"
    except Exception as e:                                        # noqa: BLE001
        etat = f"PLANTE : {type(e).__name__}: {e}"
        plantes += 1
    m = sorted(x for x in manquants if x and not x.startswith("["))
    cles = sorted(x for x in manquants if x and x.startswith("["))
    print(f"{g.name:26} {etat}" + (f"\n    variables absentes ({len(m)}) : " + ", ".join(m) if m else "")
          + (f"\n    clés absentes ({len(cles)}) : " + ", ".join(cles) if cles else ""))
shutil.rmtree(base)
sys.exit(1 if plantes else 0)
