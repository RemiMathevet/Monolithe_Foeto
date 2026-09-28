#!/usr/bin/env node
// SPDX-License-Identifier: AGPL-3.0-or-later
// Harnais du Foekinator : fait tourner le VRAI moteur (Engine, extrait à chaque lancement
// de hub/app/web/akinator.js — pas de copie) sur la matrice d'un paquet data_hub, et
// vérifie une liste de cas « comme s'ils venaient des toggles de l'appli ».
//
//   node hub/outils/foekinator_cas.js PAQUET_OU_JSON [CAS.json]
//     PAQUET_OU_JSON : data_hub_vN.zip (akinator.json y est lu) ou akinator.json
//     CAS.json       : défaut hub/outils/foekinator_cas.json
//
// Un cas : { "nom", "present": [ids HPO/FOETO], "absent": [...],
//            "attendu": "ORPHA:…"      → doit être 1er
//            "pas_en_tete": "ORPHA:…"  → ne doit PAS être 1er }
// Sortie : le top 5 de chaque cas ; code de retour 1 si un cas échoue.
//
// ⚠ Ces cas vérifient que le moteur et la matrice font ce que les fiches disent — ce
// n'est pas un benchmark : tirer des cas de la matrice qu'on interroge est circulaire
// (TODO PREFECT 74a5b0d61dc9 : validation croisée Orphanet, puis vrais CR).
"use strict";
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ICI = __dirname;
const src = fs.readFileSync(path.join(ICI, "..", "app", "web", "akinator.js"), "utf8");
const debut = src.indexOf("const Engine = (function() {");
const fin = src.indexOf("})();", src.indexOf("return { load, posteriors"));
if (debut < 0 || fin < 0) { console.error("moteur introuvable dans akinator.js"); process.exit(2); }
const Engine = new Function(src.slice(debut, fin + 5) + "\nreturn Engine;")();

const entree = process.argv[2];
if (!entree) { console.error("usage : node foekinator_cas.js PAQUET_OU_JSON [CAS.json]"); process.exit(2); }
const brut = entree.endsWith(".zip")
  ? execFileSync("unzip", ["-p", entree, "akinator.json"], { maxBuffer: 1 << 28 }).toString("utf8")
  : fs.readFileSync(entree, "utf8");
const info = Engine.load(JSON.parse(brut));
const cas = JSON.parse(fs.readFileSync(process.argv[3] || path.join(ICI, "foekinator_cas.json"), "utf8"));
console.log("matrice : %d maladies, %d signes", info.n_diseases, Engine.count().hpo);

let echecs = 0;
for (const c of cas) {
  const inconnus = c.present.concat(c.absent || []).filter(x => Engine.hpoName(x) === x);
  const r = Engine.posteriors(c.present, c.absent || [], true).slice(0, 5);
  const tete = r[0] ? r[0].id : null;
  const ok = (!c.attendu || tete === c.attendu) && (!c.pas_en_tete || tete !== c.pas_en_tete) && !inconnus.length;
  if (!ok) echecs++;
  console.log("\n%s %s", ok ? "✓" : "✗", c.nom);
  if (inconnus.length) console.log("   signes inconnus de la matrice : " + inconnus.join(" "));
  r.forEach((d, k) => console.log("   %d. %s %%  %s [%s]", k + 1, (d.probability * 100).toFixed(1).padStart(5), d.name, d.id));
}
console.log("\n%d/%d cas conformes", cas.length - echecs, cas.length);
process.exit(echecs ? 1 : 0);
