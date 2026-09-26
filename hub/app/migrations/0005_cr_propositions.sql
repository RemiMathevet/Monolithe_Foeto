-- Compte rendu : format de sortie et propositions écartées à la validation.
-- « texte » pour tout ce qui a été produit avant ; les gabarits qui portent
-- {# format: html #} enregistrent « html ». `ecartees` est une liste JSON des
-- identifiants de propositions refusées, reprise au brouillon suivant.
ALTER TABLE comptes_rendus ADD COLUMN format TEXT NOT NULL DEFAULT 'texte';
ALTER TABLE comptes_rendus ADD COLUMN ecartees TEXT;
