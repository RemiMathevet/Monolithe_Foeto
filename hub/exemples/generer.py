#!/usr/bin/env python3
# SPDX-License-Identifier: CC-BY-NC-SA-4.0 | Hub Light | Monolithe_Foeto
"""
Refabrique les JSON d'exemple en pilotant les modules HTML eux-memes.

Les fixtures ne sont pas ecrites a la main : on ouvre chaque document dans un
navigateur sans interface, on remplit tous ses champs, on ajoute deux cliches
la ou le module en prend, et on appelle son propre collecter() / paquet().
Ce que produit ce script est donc exactement ce que produit le module — c'est
la seule facon d'avoir des fixtures qui restent vraies quand un formulaire
change. A relancer apres chaque diffusion de module.

    pip install playwright pillow
    playwright install chromium
    python generer.py

Ecrit ses fichiers a cote de lui. Numero fictif 26P0123 uniquement.
"""
import json
import pathlib
from playwright.sync_api import sync_playwright

ICI = pathlib.Path(__file__).resolve().parent
DEPOT = ICI.parent.parent                      # .../Monolithe_Foeto
JPG = ICI / "_cliche_de_controle.jpg"

DOSSIER = "26P0123"
OPERATEUR = "R. Mathevet"

CIBLES = [
    ("admin/administratif.html",      "async () => collecter()",   False),
    ("Macro/examen_clinique.html",    "async () => await paquet()", True),
    ("Macro/biometrie_clinique.html", "async () => collecter()",   False),
    ("Macro/autopsie.html",           "async () => await paquet()", True),
    ("Macro/neuropath.html",          "async () => await paquet()", True),
    ("Radio/radio.html",              "async () => collecter()",   False),
]

# ── Un cliche de controle, damier, sans rien de reel dessus ──────────────────
if not JPG.exists():
    from PIL import Image
    im = Image.new("RGB", (1400, 1000), (140, 120, 118))
    for x in range(0, 1400, 40):
        for y in range(0, 1000, 40):
            if (x // 40 + y // 40) % 2 == 0:
                im.paste((190, 176, 170), (x, y, x + 40, y + 40))
    im.save(JPG, "JPEG", quality=88)

# ── Remplissage generique : on respecte les min/max et les placeholders ──────
REMPLIR = r"""
() => {
  const skip = new Set(["dossier","operateur"]);
  const ev = (el, t) => el.dispatchEvent(new Event(t, {bubbles:true}));
  let n = 0;
  document.querySelectorAll("input,select,textarea").forEach(el => {
    if (skip.has(el.id) || el.type === "file" || el.disabled) return;
    if (el.tagName === "SELECT") {
      if (el.options.length > 1) { el.selectedIndex = 1; ev(el,"change"); ev(el,"input"); n++; }
      return;
    }
    if (el.type === "checkbox") { el.checked = true; ev(el,"change"); n++; return; }
    if (el.type === "date") { el.value = "2026-03-14"; ev(el,"input"); ev(el,"change"); n++; return; }
    if (el.type === "number") {
      const mn = el.min !== "" ? parseFloat(el.min) : null;
      const mx = el.max !== "" ? parseFloat(el.max) : null;
      let v = 30;
      if (mn !== null && mx !== null) v = Math.round((mn + mx) / 2);
      else if (mn !== null) v = mn + 1;
      else if (mx !== null) v = Math.max(0, mx - 1);
      el.value = String(v); ev(el,"input"); ev(el,"change"); n++; return;
    }
    if (el.tagName === "TEXTAREA") { el.value = "Constatation de controle."; ev(el,"input"); ev(el,"change"); n++; return; }
    const ph = el.placeholder || "";
    let v = "controle";
    if (/AAAA/.test(ph))            v = "14/03/2026";
    else if (/^1\/n$/.test(ph))     v = "1/250";
    else if (el.inputMode === "numeric" || el.inputMode === "decimal") v = ph && /^\d+$/.test(ph) ? ph : "24";
    else if (/ipp|ins|rpps/i.test(el.id)) v = "12345678901";
    el.value = v; ev(el,"input"); ev(el,"change"); n++;
  });
  return n;
}
"""

PUCES = r"""
() => {
  let n = 0;
  /* examen clinique : poser un etat normal / anormal sur les items */
  document.querySelectorAll(".item[data-item]").forEach((it, i) => {
    const tog = it.querySelector(".tog");
    if (!tog) return;
    if (i % 3 === 0) { tog.children[0].click(); n++; }
    else if (i % 3 === 1) {
      tog.children[1].click(); n++;
      const c = it.querySelectorAll(".chip, .puce, [data-chip]");
      if (c.length) { c[0].click(); n++; }
      const tx = it.querySelector("textarea");
      if (tx) { tx.value = "Precisions de controle."; tx.dispatchEvent(new Event("input",{bubbles:true})); }
    }
  });
  /* les autres modules : quelques puces au hasard des groupes */
  Array.from(document.querySelectorAll("button, .chip, .puce, [role=button]")).forEach(b => {
    const t = (b.className || "") + " " + (b.dataset ? JSON.stringify(b.dataset) : "");
    if (/chip|puce|etat|anomalie|mat/i.test(t) && n < 24 && !b.id) { b.click(); n++; }
  });
  return n;
}
"""


def remplir_et_exporter(page, url, appel, avec_photo):
    page.goto(url)
    page.wait_for_timeout(300)
    page.fill("#dossier", DOSSIER);   page.dispatch_event("#dossier", "input")
    page.fill("#operateur", OPERATEUR); page.dispatch_event("#operateur", "input")
    page.wait_for_timeout(400)
    champs = page.evaluate(REMPLIR)
    puces = page.evaluate(PUCES)
    page.wait_for_timeout(300)
    if avec_photo:
        cles = page.evaluate(
            "() => { try { const L = (typeof ETAPES!=='undefined'?ETAPES:ETAGES);"
            " const o=[]; L.forEach(e => (e.photos||[]).forEach(p => o.push(p.k)));"
            " return o.slice(0,2); } catch(e){ return []; } }")
        for k in cles:
            page.evaluate("k => { slotCible = k; }", k)
            page.set_input_files("#pick", str(JPG))
            page.wait_for_timeout(1200)
    page.wait_for_timeout(300)
    return page.evaluate(appel), champs, puces


def main():
    with sync_playwright() as p:
        nav = p.chromium.launch()
        for rel, appel, photo in CIBLES:
            src = DEPOT / rel
            if not src.exists():
                print(f"!! introuvable : {src}")
                continue
            page = nav.new_page()
            erreurs = []
            page.on("pageerror", lambda e: erreurs.append(str(e)))
            try:
                d, champs, puces = remplir_et_exporter(page, src.as_uri(), appel, photo)
            except Exception as e:
                print(f"!! {rel} : {e}")
                page.close()
                continue
            nom = f"{d['dossier']}_{d['module']}.json"
            (ICI / nom).write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding="utf-8")
            ko = (ICI / nom).stat().st_size / 1024
            print(f"{nom:42s} {ko:8.1f} Ko  champs={champs:3d} puces={puces:2d} "
                  f"cliches={len(d.get('photos') or [])}  schema={d['schema_version']} "
                  f"v={d['module_version']}" + (f"  ERREURS={erreurs[:1]}" if erreurs else ""))
            page.close()
        nav.close()


if __name__ == "__main__":
    main()
