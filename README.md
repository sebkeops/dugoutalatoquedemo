# Du Goût à la Toque — Simulation commerciale

Simulation de vente (démonstration cliquable) pour un restaurant + traiteur.
Le livrable présente l'expérience client (front-end) **et** des mockups de
back-office, organisés par formules tarifaires **F1 / F2 / F3**.

> ⚠️ Ce n'est **pas** un produit final : pas de base de données, pas d'auth, pas
> d'e-mails réels. Tout est mocké et clairement présenté comme une démonstration.

## Stack

- Vite + React + TypeScript (strict)
- Tailwind CSS
- react-router-dom
- État local React uniquement — aucun backend

## Démarrer

```bash
npm install
npm run dev      # serveur de développement (http://localhost:5173)
```

Autres scripts :

```bash
npm run build    # build statique de production -> dist/
npm run preview  # prévisualise le build de production
npm run lint     # vérification TypeScript (tsc --noEmit)
```

## Arborescence

```
src/
  theme/        tokens couleurs/typo (source unique : palette.js) + config Tailwind étendue
  components/   composants UI réutilisables
  layout/       shell de l'app (header, footer, conteneur mobile-first)
  pages/        une page par écran du parcours client
  mockups/      écrans back-office haute-fidélité
  data/         données fictives typées
  tiers/        logique des formules (types + mode présentation)
  assets/       images placeholder
sources/        assets réels du client (logo, photos) — servis tels quels
```

## Theming

Toutes les couleurs de marque sont centralisées dans
[`src/theme/palette.js`](src/theme/palette.js) — **source unique** consommée à la
fois par Tailwind (`tailwind.config.js`) et par le code (`src/theme/tokens.ts`).
Rebrander = modifier ce seul fichier.

## Déploiement

Build statique (`npm run build`) déployable sur Vercel / Netlify / GitHub Pages.

_Procédure détaillée à compléter en phase 5._
