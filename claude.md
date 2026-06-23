# Projet : Simulation commerciale — Du Goût à la Toque (DGT) — restaurant + traiteur

## But du projet
Construire une SIMULATION DE VENTE (pas un site de production) pour convaincre un
client restaurateur/traiteur de signer. Livrable = une app web cliquable qui
présente l'expérience client (front-end) ET des mockups du back-office, le tout
organisé par formules tarifaires (F1/F2/F3).

Ce n'est PAS un produit final : pas de vraie base de données, pas de vraie auth,
pas d'e-mails réellement envoyés. Tout est mocké et clairement présenté comme une
démonstration. Privilégier le rendu visuel et la fluidité de navigation.

## Le client
- "Du Goût à la Toque" (logo : monogramme DGT dans un anneau façon tache de café) :
  restaurant (midi) + traiteur, gérée par 2 personnes.
- Restaurant = identité première. Traiteur = priorité commerciale en ligne.
- Enjeu fort : ne JAMAIS laisser penser que le restaurant est devenu un traiteur.
- Mobile-first impératif (la majorité des visiteurs viennent sur mobile).
- Pas de prix affichés côté traiteur (tarifs mariage ≠ pro). Devis sur demande.
- 4 événements à emporter fixes : Noël, Nouvel An, Saint-Valentin, Fête des mères.
- ~600 contacts mailing, envoyés péniblement 20 par 20 aujourd'hui.

## Les 3 formules (système de "tiers")
- F1 Vitrine essentielle : vitrine + univers + soirée du mois + mailing inscription
  + contact tel/mail. Autonomie minimale.
- F2 Intermédiaire (recommandée) : F1 + formulaire + back-office modération
  + outil mailing + autonomie contenu courant.
- F3 Complète : F2 + commande en ligne événements (créneaux 1/4h, statuts,
  impression) + autonomie totale.

Chaque fonctionnalité/section porte un `minTier` (1, 2 ou 3). Un "mode présentation"
permet de sélectionner une formule et de visualiser ce qui est inclus / désactivé.

## Stack technique
- Vite + React + TypeScript + Tailwind CSS.
- react-router-dom pour la navigation multi-pages.
- État local React uniquement (useState/useContext). Aucun backend.
- Données fictives centralisées dans `src/data/` (TypeScript typé).
- Build statique déployable (Vercel / Netlify / GitHub Pages).

## Conventions
- Mobile-first systématique ; tester en largeur ~375px avant desktop.
- Theming via variables CSS + config Tailwind : couleurs/typo centralisées dans
  `src/theme/`. Identité confirmée (extraite du logo, ambiance artisanale chaleureuse) :
    - brun primaire   #7C5840  (boutons, liens, accents)
    - brun foncé      #5C3E2E  (titres, survols, état actif — le "DGT" du logo)
    - caramel clair   #A78975  (secondaire, bordures, étiquettes)
    - fond crème      #F4EDE7  (fond de page)
    - surface/cartes  #EAE0D8  (cartes, blocs, champs)
    - texte courant   #3A2C23  (corps de texte)
    - texte sur boutons bruns = crème #F4EDE7.
- Textes non fournis = placeholders identifiables (`PLACEHOLDER_...`). Le nom commercial
  ("Du Goût à la Toque"), la palette et les assets de `sources/` sont en revanche réels.
- Mockups back-office : bandeau discret "Aperçu — démonstration" sur ces écrans.
- Accessibilité raisonnable (contrastes, labels de formulaire, focus visibles).
- Commits atomiques et messages clairs ; ne jamais pousser sans validation humaine.

## Ce qu'il NE faut PAS faire
- Pas de vraie auth, pas de vraie base de données, pas d'envoi d'e-mail réel.
- Pas d'affichage de prix côté traiteur.
- Pas de dépendances lourdes inutiles (rester léger pour un déploiement rapide).
- Ne pas inventer de textes définitifs non fournis : utiliser les placeholders `PLACEHOLDER_...`.
  (Le nom, les couleurs et les photos de `sources/` sont confirmés, eux.)