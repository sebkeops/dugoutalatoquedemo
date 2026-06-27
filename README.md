# Du Goût à la Toque — Simulation commerciale

Simulation de vente (démonstration cliquable) pour un restaurant + traiteur.
Le livrable présente l'expérience client (front-end) **et** des mockups de
back-office, organisés par formules tarifaires **F1 / F2 / F3**.

> ⚠️ Ce n'est **pas** un produit final : pas de base de données, pas d'auth, pas
> d'e-mails réels. Tout est mocké et clairement présenté comme une démonstration.

## Stack

- Vite + React + TypeScript (strict)
- Tailwind CSS
- react-router-dom (`createBrowserRouter`)
- État local React uniquement — aucun backend

## Démarrer

```bash
npm install
npm run dev      # serveur de développement (http://localhost:5173)
```

Autres scripts :

```bash
npm run build    # build statique de production -> dist/
npm run preview  # prévisualise le build de production (fallback SPA inclus)
npm run lint     # vérification TypeScript (tsc --noEmit)
```

## Démo en ligne

- **URL de démo : _PLACEHOLDER_URL_DEMO_** (à renseigner après le 1er déploiement).
- **Mode présentation** (outil de vente — barre F1/F2/F3 en bas d'écran) :
  - URL « propre » à envoyer au client : figée sur la formule **F2** (recommandée),
    **sans** barre. Le client clique seul, sans distraction.
  - Pour **présenter en direct** : ajouter `?demo=1` à l'URL → la barre apparaît et
    permet de basculer F1/F2/F3. Un lien discret « Activer le mode présentation »
    est aussi présent dans le pied de page.
  - Forcer une formule au chargement : `?tier=1`, `?tier=2` ou `?tier=3`
    (ex. `?demo=1&tier=3` pour démarrer en présentation sur la formule Complète).
- Un bandeau d'intro rappelle qu'il s'agit d'une simulation ; il est **fermable**
  (mémorisé localement).

## Déploiement (statique)

Le routing utilise `createBrowserRouter` : il faut un **fallback SPA** côté
hébergeur (toutes les routes → `index.html`) pour que les liens profonds et le
rafraîchissement fonctionnent. La `base` Vite est `'/'` (hébergement à la racine).

### Option recommandée — Vercel (la plus simple)

Zéro configuration de build (Vite est détecté). Le fallback SPA est fourni par
[`vercel.json`](vercel.json).

```bash
npm i -g vercel      # une fois
vercel               # déploiement de préversion
vercel --prod        # déploiement de production
```

Ou via l'interface Vercel : « New Project » → importer le dépôt Git → Deploy.
Chaque push sur la branche de production redéclenche un déploiement.

### Alternative — Netlify

Config fournie par [`netlify.toml`](netlify.toml) (build `npm run build`, publish
`dist`, redirect SPA). Via l'interface : « Add new site » → importer le dépôt →
Deploy. Ou en CLI : `netlify deploy --prod`.

### Alternative — GitHub Pages (sous-chemin, sans serveur)

Pages n'a pas de réécriture serveur. Deux ajustements nécessaires :

1. Mettre la base au sous-chemin du repo dans [`vite.config.ts`](vite.config.ts) :
   `base: '/<nom-du-repo>/'`.
2. Gérer le fallback : copier `dist/index.html` en `dist/404.html` après le build
   (hack Pages), **ou** basculer sur un `HashRouter`.

> Pour une URL propre à envoyer au client, **Vercel/Netlify** restent le choix le
> plus simple (fallback SPA natif, pas de bidouille de base path).

### Relancer un déploiement

- **Vercel/Netlify reliés au Git** : pousser sur la branche de production
  (re-déploiement automatique), ou relancer depuis le tableau de bord
  (« Redeploy »), ou en CLI `vercel --prod` / `netlify deploy --prod`.

## Personnaliser

### Thème (couleurs / typo)

Toutes les couleurs de marque sont centralisées dans
[`src/theme/palette.js`](src/theme/palette.js) — **source unique** consommée à la
fois par Tailwind (`tailwind.config.js`) et par le code (`src/theme/tokens.ts`).
Rebrander = modifier ce seul fichier.

### Contenus (données fictives)

Tout le contenu éditorial est typé dans [`src/data/`](src/data/) :

| Fichier | Contenu |
| --- | --- |
| `univers.ts` | Univers traiteur (mariage, entreprise, + placeholders) |
| `evenements.ts` | 4 événements à emporter (Noël, Nouvel An, St-Valentin, Fête des mères) |
| `soirees.ts` | Soirée à thème du mois |
| `site.ts` | Coordonnées, horaires, avis Google |
| `messages.ts` / `commandes.ts` / `diffusion.ts` | Données des mockups back-office |
| `formules.ts` | Tableau comparatif des formules (page /formules) |

### Images

Pipeline d'optimisation en amont (hors runtime) :
[`scripts/optimize-assets.mjs`](scripts/optimize-assets.mjs) lit `sources/`
(lecture seule) et produit `src/assets/photos/`. Les données ne référencent que
des **noms de fichiers** ; [`src/data/images.ts`](src/data/images.ts) les résout.
Une image absente affiche un fallback « Visuel à venir ».

```bash
node scripts/optimize-assets.mjs   # régénère src/assets/photos depuis sources/
```

## Arborescence

```
src/
  theme/        tokens couleurs/typo (source unique : palette.js)
  components/   composants UI réutilisables
  layout/       shell (header, footer, mode présentation partageable)
  pages/        écrans du parcours client
  mockups/      écrans back-office haute-fidélité (F2/F3)
  data/         données fictives typées
  tiers/        logique des formules (types + contexte mode présentation)
  assets/       images optimisées (générées depuis sources/)
sources/        assets réels du client (logo, photos) — lecture seule
public/assets/  logo (favicon)
```

## Reste à fournir / à confirmer par le client

Éléments encore en placeholder dans la démo (voir aussi la section « placeholders »
en fin de mission) :

- **Photos du restaurant** : salle, assiettes du midi, terrasse
  (`restaurant-salle.jpg`, `restaurant-assiette.jpg`, `restaurant-terrasse.jpg`).
- **Visuel de la soirée du mois** (`soiree-du-mois.jpg`) + thème/date réels.
- **Univers « Repas pro & séminaire »** : photos d'ambiance (présenté pour l'instant
  via une affiche menu terracotta reconstituée).
- **Univers « Cocktail & buffet »** et **« Plateaux-repas & apéritifs »** :
  contenus (intitulés) et photos — actuellement `PLACEHOLDER_`.
- **E-mail réel** de contact (`PLACEHOLDER_EMAIL@dugoutalatoque.fr` dans `site.ts`).
- **Dates précises** des 4 événements à emporter (périodes indicatives aujourd'hui).
- **Coordonnées / horaires / avis** Google : à confirmer avant mise en ligne.
```
