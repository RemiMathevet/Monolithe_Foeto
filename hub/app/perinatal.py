# SPDX-License-Identifier: AGPL-3.0-or-later
"""Comptages périnataux des statistiques du hub.

Un dossier est rangé d'après l'issue (module administratif), le terme, la
masse (biométrie clinique), les dates de naissance et de décès, et la présence
des modules. « Avec autopsie » = un module autopsie est arrivé pour le dossier ;
« sans » = examen externe seul (examen clinique, sans autopsie).

  · fœtus et nouveau-nés de moins de 28 j : toute issue fœtale, plus les nés
    vivants décédés à J28 au plus ;
  · nés vivants viables (≥ 22 SA ou ≥ 500 g) décédés à J28 au plus, puis
    décédés de J0 à J4 inclus, et de J5 (J4 révolu) à J28 ;
  · MFIU avec corps analysable : MFIU dont le corps a été examiné (examen
    clinique ou autopsie), pas le placenta seul.

L'âge au décès est date du décès − date de naissance, en jours (J0 = jour de
la naissance) ; il n'est calculé que si les deux dates sont connues au jour
près. Un né vivant sans âge calculable est compté à part, jamais deviné.
"""
import datetime as dt

NES_VIVANTS = {"MNN", "NAISSANCE_VIVANTE"}
LIGNES = [
    ("foetus_nn28", "Fœtus et nouveau-nés de moins de 28 jours de vie"),
    ("nv_viables", "Nés vivants viables (≥ 22 SA ou ≥ 500 g) décédés à J28 au plus"),
    ("nv_j0_j4", "  dont décédés de J0 à J4 inclus"),
    ("nv_j5_j28", "  dont décédés de J5 (J4 révolu) à J28"),
    ("nv_age_inconnu", "  dont âge au décès inconnu (dates manquantes)"),
    ("mfiu_corps", "MFIU avec corps analysable"),
]


def age_jours(naissance, deces):
    try:
        return (dt.date.fromisoformat(deces) - dt.date.fromisoformat(naissance)).days
    except (TypeError, ValueError):
        return None


def classer(d):
    """Les lignes où compte un dossier. d : type_issue, terme_sa, masse,
    date_naissance, date_deces (ISO au jour ou None), modules (ensemble)."""
    issue, mods = d.get("type_issue"), d.get("modules") or set()
    out = set()
    if issue in NES_VIVANTS:
        age = age_jours(d.get("date_naissance"), d.get("date_deces"))
        if age is not None and not 0 <= age <= 28:
            return out                                   # au-delà de J28 : hors champ
        out.add("foetus_nn28")
        viable = (d.get("terme_sa") or 0) >= 22 or (d.get("masse") or 0) >= 500
        if viable:
            out.add("nv_viables")
            out.add("nv_age_inconnu" if age is None else "nv_j0_j4" if age <= 4 else "nv_j5_j28")
    elif issue:
        out.add("foetus_nn28")
        if issue == "MFIU" and mods & {"examen_clinique", "autopsie"}:
            out.add("mfiu_corps")
    return out


def compter(dossiers):
    """[{cle, label, avec, sans, total}] ; avec = module autopsie présent."""
    n = {k: {"avec": 0, "sans": 0} for k, _ in LIGNES}
    for d in dossiers:
        cote = "avec" if "autopsie" in (d.get("modules") or set()) else "sans"
        for k in classer(d):
            n[k][cote] += 1
    return [{"cle": k, "label": l, **n[k], "total": n[k]["avec"] + n[k]["sans"]} for k, l in LIGNES]


if __name__ == "__main__":
    A = {"autopsie", "examen_clinique"}
    c = lambda **k: classer(k)
    assert c(type_issue="IMG", modules=A) == {"foetus_nn28"}
    assert c(type_issue="MFIU", modules={"examen_clinique"}) == {"foetus_nn28", "mfiu_corps"}
    assert c(type_issue="MFIU", modules={"macro_placenta"}) == {"foetus_nn28"}
    nv = dict(type_issue="MNN", terme_sa=30, date_naissance="2026-01-01")
    assert c(**nv, date_deces="2026-01-05") == {"foetus_nn28", "nv_viables", "nv_j0_j4"}      # J4
    assert c(**nv, date_deces="2026-01-06") == {"foetus_nn28", "nv_viables", "nv_j5_j28"}     # J5
    assert c(**nv, date_deces="2026-01-29") == {"foetus_nn28", "nv_viables", "nv_j5_j28"}     # J28
    assert c(**nv, date_deces="2026-01-30") == set()                                           # J29
    assert c(type_issue="MNN", terme_sa=20, masse=520) >= {"nv_viables", "nv_age_inconnu"}
    assert "nv_viables" not in c(type_issue="MNN", terme_sa=20, masse=400)
    t = compter([dict(nv, date_deces="2026-01-02", modules=A), dict(type_issue="IMG", modules={"examen_clinique"})])
    assert t[0]["avec"] == 1 and t[0]["sans"] == 1 and t[2]["total"] == 1
    print("perinatal : ok")
