# CLAUDE.md

Ce fichier fournit des instructions à Claude Code (claude.ai/code) pour travailler sur ce dépôt.

## Commandes

```bash
yarn dev        # Démarrer le serveur de développement sur http://localhost:3000
yarn build      # Build de production
yarn start      # Démarrer le serveur de production
yarn lint       # Lancer ESLint
```

Gestionnaire de paquets : **Yarn 4** (utiliser `yarn`, pas `npm` ni `pnpm`).

## Stack

- **Next.js 16** avec App Router (dossier `app/`)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS v4** (via `@tailwindcss/postcss`)
- **Mantine V8** pour l'UI — limiter au maximum l'utilisation de balises HTML brutes (`div`, `p`, `span`, etc.). Utiliser en priorité les composants Mantine : `Box`, `Stack`, `Group`, `Container`, `Paper`, `Text`, `Title`, etc.
- **@tabler/icons-react** pour les icônes — c'est la bibliothèque officielle de l'écosystème Mantine, très complète et cohérente visuellement. Ne pas utiliser `lucide-react` ni d'autres bibliothèques d'icônes.

## Architecture

Ce projet utilise le Next.js App Router. Toutes les routes et layouts sont dans `app/` :

- `app/layout.tsx` — Layout racine avec les variables de police Geist sur `<body>`
- `app/globals.css` — Styles globaux (imports Tailwind)
- `app/page.tsx` — Page d'accueil (route `/`)

Les nouvelles routes sont des dossiers sous `app/` avec un fichier `page.tsx`. Les composants UI partagés sont dans `components/`. Les Server Components sont la valeur par défaut ; ajouter `"use client"` uniquement si nécessaire pour l'interactivité ou les APIs navigateur.

## Qualité du code

- **Fichiers courts** : ne pas dépasser 200-300 lignes par fichier. Si un fichier grossit, découper en sous-composants dans des sous-dossiers dédiés.
- **Factorisation** : extraire les parties répétées en composants ou utilitaires réutilisables. Éviter la duplication de code.
- **Organisation** : ranger les composants dans des sous-dossiers thématiques (ex: `components/settings/`, `components/dashboard/`, etc.) plutôt que de tout mettre à plat. Les états "première fois / aucune donnée" de chaque page vont dans `components/onboarding/` (ex: `DashboardOnboarding.tsx`, `TemplatesOnboarding.tsx`).
- **Pas de wrappers inutiles** : coder directement dans les fichiers de route (`page.tsx`) sans créer de composants intermédiaires qui ne font que réexporter.
- **Types et données centralisés** : ne jamais déclarer de types/interfaces, de constantes UI (couleurs, configs, mappings) ou de données mockées directement dans les fichiers de `app/`. Placer les types dans `types/`, les constantes et configs dans `lib/constants/`, les données mockées dans `lib/mockupdata/`.
