# 🚀 Guide de Migration : AutoMaComm vers Next.js + Mantine

## 📋 Contexte

Migration d'une application React + Vite + Radix UI vers Next.js 16 + Mantine v8.

**Application** : AutoMaComm - SaaS B2B pour automatisation communication réseaux sociaux des clubs de sport amateur.

**Scope** : Frontend uniquement avec données mockées (backend en suspens).

---

## 🎯 Objectifs de la migration

- ✅ Next.js 16 avec App Router
- ✅ Mantine v8 pour l'UI
- ✅ Yarn comme gestionnaire de paquets
- ✅ Architecture claire et compartimentée
- ✅ Données mockées + placeholders API
- ✅ Code prêt à brancher au backend Supabase

---

## 📦 Prérequis techniques

### Technologies à installer
- Node.js >= 20.0.0
- Yarn >= 1.22
- Git

### Design System AutoMaComm
**Palette de couleurs** :
- Bleu principal : `#04346D`
- Bleu clair : `#E8F4FD`
- Orange : `#FF6B35`
- Beige neutre : `#F5F3EB`

**Typographie** : Inter (font principale)

**Types de visuels** : Résultat, Classement, Affiche, Calendrier (4 types uniquement)

---

## 🏗️ Architecture cible

```
automacomm-nextjs/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── (public)/
│   │   ├── pricing/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── layout.tsx          # PublicLayout
│   │   └── page.tsx            # LandingPage
│   ├── dashboard/
│   │   ├── teams/
│   │   │   └── page.tsx
│   │   ├── templates/
│   │   │   └── page.tsx
│   │   ├── generation/
│   │   │   └── page.tsx
│   │   ├── scheduling/
│   │   │   └── page.tsx
│   │   ├── backgrounds/
│   │   │   └── page.tsx
│   │   ├── networks/
│   │   │   └── page.tsx
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   ├── layout.tsx          # DashboardLayout
│   │   └── page.tsx            # DashboardPage
│   ├── layout.tsx              # Root layout
│   └── providers.tsx           # Mantine Provider
├── components/
│   ├── ui/                     # Composants Mantine personnalisés
│   ├── shared/                 # Composants réutilisables
│   └── PostConfigDrawer.tsx    # Composants métier
├── features/
│   ├── teams/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── types.ts
│   ├── templates/
│   ├── scheduling/
│   └── ...
├── lib/
│   ├── services/
│   │   ├── api.ts              # Couche API (placeholders)
│   │   ├── teams.service.ts
│   │   ├── templates.service.ts
│   │   └── ...
│   ├── hooks/
│   ├── utils/
│   └── constants/
│       ├── colors.ts
│       ├── mockData.ts
│       └── visualTypes.ts
├── public/
│   └── images/
├── styles/
│   └── globals.css
├── types/
│   ├── index.ts
│   ├── team.ts
│   ├── template.ts
│   └── ...
├── .env.local
├── .env.example
├── next.config.js
├── package.json
├── tsconfig.json
└── yarn.lock
```

---

## 📝 Étape 1 : Initialiser le projet Next.js

### 1.1 Créer le projet

```bash
# Créer un nouveau projet Next.js
npx create-next-app@latest automacomm-nextjs --typescript --tailwind --app --no-src-dir

# Options à choisir :
# ✓ TypeScript: Yes
# ✓ ESLint: Yes
# ✓ Tailwind CSS: Yes
# ✓ App Router: Yes
# ✓ Import alias: No (nous utiliserons @/)

cd automacomm-nextjs
```

### 1.2 Convertir de npm à Yarn

```bash
# Supprimer package-lock.json et node_modules
rm -rf package-lock.json node_modules

# Installer avec Yarn
yarn install
```

### 1.3 Créer la structure de dossiers

```bash
# Créer tous les dossiers nécessaires
mkdir -p components/ui components/shared
mkdir -p features/teams/components features/teams/hooks
mkdir -p features/templates/components features/templates/hooks
mkdir -p features/scheduling/components features/scheduling/hooks
mkdir -p features/generation/components
mkdir -p lib/services lib/hooks lib/utils lib/constants
mkdir -p types
mkdir -p styles
mkdir -p public/images
```

---

## 📦 Étape 2 : Installer les dépendances

### 2.1 Installer Mantine v8

```bash
yarn add @mantine/core@^7.15.0 @mantine/hooks@^7.15.0 @mantine/form@^7.15.0 @mantine/notifications@^7.15.0 @mantine/modals@^7.15.0 @mantine/dropzone@^7.15.0 @mantine/dates@^7.15.0 dayjs
```

**Note** : Mantine v8 n'est pas encore stable, utiliser v7.x (dernière stable).

### 2.2 Installer les icônes et utilitaires

```bash
yarn add lucide-react recharts motion clsx tailwind-merge sonner date-fns
```

### 2.3 Installer les dépendances de développement

```bash
yarn add -D @types/node @types/react @types/react-dom postcss-preset-mantine postcss-simple-vars
```

---

## ⚙️ Étape 3 : Configuration des fichiers

### 3.1 `next.config.js`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
};

module.exports = nextConfig;
```

### 3.2 `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/features/*": ["./features/*"],
      "@/lib/*": ["./lib/*"],
      "@/types/*": ["./types/*"],
      "@/styles/*": ["./styles/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 3.3 `postcss.config.cjs`

```js
module.exports = {
  plugins: {
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '36em',
        'mantine-breakpoint-sm': '48em',
        'mantine-breakpoint-md': '62em',
        'mantine-breakpoint-lg': '75em',
        'mantine-breakpoint-xl': '88em',
      },
    },
  },
};
```

### 3.4 `package.json` - Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```

### 3.5 `.env.example`

```env
# Supabase (pour plus tard)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Meta APIs (pour plus tard)
NEXT_PUBLIC_META_APP_ID=
META_APP_SECRET=

# OpenAI (pour plus tard)
OPENAI_API_KEY=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=AutoMaComm
```

### 3.6 `.env.local`

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=AutoMaComm
```

---

## 🎨 Étape 4 : Configuration Mantine Theme

### 4.1 `app/theme.ts`

Créer le fichier de thème Mantine personnalisé :

```typescript
'use client';

import { createTheme, MantineColorsTuple } from '@mantine/core';

const primaryBlue: MantineColorsTuple = [
  '#E8F4FD',
  '#D1E9FB',
  '#A3D3F7',
  '#75BDF3',
  '#47A7EF',
  '#1991EB',
  '#04346D', // Couleur principale
  '#032A57',
  '#021F41',
  '#01152B',
];

const accentOrange: MantineColorsTuple = [
  '#FFF3EE',
  '#FFE7DD',
  '#FFCFBB',
  '#FFB799',
  '#FF9F77',
  '#FF8755',
  '#FF6B35', // Couleur accent
  '#CC562A',
  '#99411F',
  '#662C15',
];

export const theme = createTheme({
  primaryColor: 'primary',
  colors: {
    primary: primaryBlue,
    accent: accentOrange,
  },
  fontFamily: 'Inter, sans-serif',
  headings: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: '700',
  },
  defaultRadius: 'md',
  components: {
    Button: {
      defaultProps: {
        radius: 'xl',
      },
    },
    Card: {
      defaultProps: {
        radius: 'lg',
      },
    },
  },
});
```

### 4.2 `app/providers.tsx`

```typescript
'use client';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { theme } from './theme';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={theme}>
      <Notifications position="top-right" />
      <ModalsProvider>{children}</ModalsProvider>
    </MantineProvider>
  );
}
```

### 4.3 `app/layout.tsx` (Root Layout)

```typescript
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AutoMaComm - Automatisez votre communication sportive',
  description: 'Automatisez la communication sur les réseaux sociaux pour les clubs de sport amateur.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### 4.4 `styles/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary-blue: #04346d;
  --primary-blue-light: #e8f4fd;
  --accent-orange: #ff6b35;
  --neutral-beige: #f5f3eb;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
}

body {
  color: #04346d;
  background: #ffffff;
}

a {
  color: inherit;
  text-decoration: none;
}
```

---

## 📂 Étape 5 : Créer les constantes et types

### 5.1 `lib/constants/colors.ts`

```typescript
export const COLORS = {
  primary: {
    main: '#04346D',
    light: '#E8F4FD',
  },
  accent: {
    main: '#FF6B35',
  },
  neutral: {
    beige: '#F5F3EB',
  },
} as const;
```

### 5.2 `lib/constants/visualTypes.ts`

```typescript
import { Trophy, BarChart2, Layout, Radio } from 'lucide-react';

export type VisualType = 'Résultat' | 'Classement' | 'Affiche' | 'Calendrier';

export const VISUAL_TYPES: Record<
  VisualType,
  { icon: any; color: string; bg: string }
> = {
  Résultat: { icon: Trophy, color: '#0A5EBF', bg: '#E8F4FF' },
  Classement: { icon: BarChart2, color: '#D4640A', bg: '#FFF3E8' },
  Affiche: { icon: Layout, color: '#7A0FB0', bg: '#F3EEFB' },
  Calendrier: { icon: Radio, color: '#0F9B58', bg: '#EEFBF3' },
};

export const FORMAT_LABELS = {
  P: 'Post',
  S: 'Story',
} as const;
```

### 5.3 `types/index.ts`

```typescript
export * from './team';
export * from './template';
export * from './scheduling';
export * from './visual';
export * from './network';
```

### 5.4 `types/team.ts`

```typescript
export interface Team {
  id: string;
  name: string;
  category: string;
  color: string;
  logo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamFormData {
  name: string;
  category: string;
  color: string;
  logo?: File;
}
```

### 5.5 `types/template.ts`

```typescript
import { VisualType } from '@/lib/constants/visualTypes';

export type TemplateFormat = 'P' | 'S';

export interface Template {
  id: string;
  name: string;
  visualType: VisualType;
  format: TemplateFormat;
  thumbnail?: string;
  teams: string[]; // Team IDs
  isDefault?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### 5.6 `types/scheduling.ts`

```typescript
import { VisualType } from '@/lib/constants/visualTypes';
import { TemplateFormat } from './template';

export interface TeamTag {
  label: string;
  color: string;
  bg: string;
  borderColor: string;
}

export interface ScheduleRule {
  id: string;
  visualType: VisualType;
  format: TemplateFormat;
  teams: TeamTag[];
  active: boolean;
  moment: string;
  time: string;
  description?: string;
  isCustomDescription?: boolean;
  templates?: string[];
  isCarousel?: boolean;
}
```

### 5.7 `types/visual.ts`

```typescript
import { VisualType } from '@/lib/constants/visualTypes';

export interface GeneratedVisual {
  id: string;
  type: VisualType;
  teamId: string;
  templateId: string;
  imageUrl: string;
  description?: string;
  scheduledAt?: Date;
  publishedAt?: Date;
  status: 'draft' | 'scheduled' | 'published';
  createdAt: Date;
}
```

### 5.8 `types/network.ts`

```typescript
export type SocialNetwork = 'instagram' | 'facebook';

export interface ConnectedAccount {
  id: string;
  network: SocialNetwork;
  accountName: string;
  accountId: string;
  avatar?: string;
  isActive: boolean;
  connectedAt: Date;
}
```

---

## 🗂️ Étape 6 : Créer les données mockées

### 6.1 `lib/constants/mockData.ts`

```typescript
import { Team } from '@/types/team';
import { Template } from '@/types/template';
import { ScheduleRule } from '@/types/scheduling';
import { ConnectedAccount } from '@/types/network';

// Mock Teams
export const MOCK_TEAMS: Team[] = [
  {
    id: '1',
    name: 'Équipe 1',
    category: 'Senior',
    color: '#FF6B35',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Réserve',
    category: 'Senior',
    color: '#7A0FB0',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '3',
    name: 'U18',
    category: 'Jeunes',
    color: '#0F9B58',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
];

// Mock Templates
export const MOCK_TEMPLATES: Template[] = [
  {
    id: '1',
    name: 'Template Résultat Principal',
    visualType: 'Résultat',
    format: 'P',
    teams: ['1'],
    isDefault: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Template Affiche Match',
    visualType: 'Affiche',
    format: 'P',
    teams: ['1'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '3',
    name: 'Template Classement',
    visualType: 'Classement',
    format: 'P',
    teams: ['1', '2'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
];

// Mock Schedule Rules
export const MOCK_SCHEDULE_RULES: ScheduleRule[] = [
  {
    id: '1',
    visualType: 'Résultat',
    format: 'P',
    teams: [
      {
        label: 'Équipe 1',
        color: '#04346D',
        bg: '#F8F9FA',
        borderColor: '#FF6B35',
      },
    ],
    active: true,
    moment: 'J+1 (lendemain)',
    time: '09:00',
    description:
      '🏆 Belle victoire de {team} face à {opponent} ! Score final : {score}\n\n#VictoireALaMaison',
    isCustomDescription: true,
    templates: ['Template Résultat Principal'],
    isCarousel: false,
  },
  {
    id: '2',
    visualType: 'Affiche',
    format: 'P',
    teams: [
      {
        label: 'Équipe 1',
        color: '#04346D',
        bg: '#F8F9FA',
        borderColor: '#FF6B35',
      },
    ],
    active: true,
    moment: 'J-2',
    time: '18:00',
    templates: ['Template Affiche Match'],
    isCarousel: false,
  },
];

// Mock Connected Accounts
export const MOCK_CONNECTED_ACCOUNTS: ConnectedAccount[] = [
  {
    id: '1',
    network: 'instagram',
    accountName: '@club_example',
    accountId: 'instagram_123456',
    isActive: true,
    connectedAt: new Date('2024-01-10'),
  },
  {
    id: '2',
    network: 'facebook',
    accountName: 'Club Example FC',
    accountId: 'facebook_789012',
    isActive: true,
    connectedAt: new Date('2024-01-10'),
  },
];
```

---

## 🔌 Étape 7 : Créer la couche de services (API placeholders)

### 7.1 `lib/services/api.ts`

```typescript
// Couche de base pour les appels API
// TODO: Remplacer par de vrais appels Supabase

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  headers?: Record<string, string>;
}

export async function apiCall<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const { method = 'GET', body, headers = {} } = options;

  // TODO: Implémenter les vrais appels API vers Supabase
  console.log(`[API MOCK] ${method} ${endpoint}`, body);

  // Simuler un délai réseau
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Pour l'instant, retourner un mock
  return {} as T;
}
```

### 7.2 `lib/services/teams.service.ts`

```typescript
import { Team, TeamFormData } from '@/types/team';
import { MOCK_TEAMS } from '@/lib/constants/mockData';

export const teamsService = {
  // TODO: Connecter à Supabase table 'teams'
  async getAll(): Promise<Team[]> {
    // Simuler un délai
    await new Promise((resolve) => setTimeout(resolve, 300));
    return MOCK_TEAMS;
  },

  async getById(id: string): Promise<Team | null> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return MOCK_TEAMS.find((t) => t.id === id) || null;
  },

  async create(data: TeamFormData): Promise<Team> {
    console.log('[MOCK] Creating team:', data);
    await new Promise((resolve) => setTimeout(resolve, 400));

    const newTeam: Team = {
      id: Date.now().toString(),
      name: data.name,
      category: data.category,
      color: data.color,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return newTeam;
  },

  async update(id: string, data: Partial<TeamFormData>): Promise<Team> {
    console.log('[MOCK] Updating team:', id, data);
    await new Promise((resolve) => setTimeout(resolve, 400));

    const team = MOCK_TEAMS.find((t) => t.id === id);
    if (!team) throw new Error('Team not found');

    return {
      ...team,
      ...data,
      updatedAt: new Date(),
    };
  },

  async delete(id: string): Promise<void> {
    console.log('[MOCK] Deleting team:', id);
    await new Promise((resolve) => setTimeout(resolve, 300));
  },
};
```

### 7.3 `lib/services/templates.service.ts`

```typescript
import { Template } from '@/types/template';
import { MOCK_TEMPLATES } from '@/lib/constants/mockData';

export const templatesService = {
  // TODO: Connecter à Supabase table 'templates'
  async getAll(): Promise<Template[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return MOCK_TEMPLATES;
  },

  async getById(id: string): Promise<Template | null> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return MOCK_TEMPLATES.find((t) => t.id === id) || null;
  },

  async getByTeam(teamId: string): Promise<Template[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return MOCK_TEMPLATES.filter((t) => t.teams.includes(teamId));
  },

  async create(data: Partial<Template>): Promise<Template> {
    console.log('[MOCK] Creating template:', data);
    await new Promise((resolve) => setTimeout(resolve, 400));

    const newTemplate: Template = {
      id: Date.now().toString(),
      name: data.name || 'Nouveau template',
      visualType: data.visualType || 'Résultat',
      format: data.format || 'P',
      teams: data.teams || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return newTemplate;
  },

  async delete(id: string): Promise<void> {
    console.log('[MOCK] Deleting template:', id);
    await new Promise((resolve) => setTimeout(resolve, 300));
  },
};
```

### 7.4 `lib/services/scheduling.service.ts`

```typescript
import { ScheduleRule } from '@/types/scheduling';
import { MOCK_SCHEDULE_RULES } from '@/lib/constants/mockData';

export const schedulingService = {
  // TODO: Connecter à Supabase table 'schedule_rules'
  async getAll(): Promise<ScheduleRule[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return MOCK_SCHEDULE_RULES;
  },

  async getById(id: string): Promise<ScheduleRule | null> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return MOCK_SCHEDULE_RULES.find((r) => r.id === id) || null;
  },

  async update(id: string, data: Partial<ScheduleRule>): Promise<ScheduleRule> {
    console.log('[MOCK] Updating schedule rule:', id, data);
    await new Promise((resolve) => setTimeout(resolve, 400));

    const rule = MOCK_SCHEDULE_RULES.find((r) => r.id === id);
    if (!rule) throw new Error('Rule not found');

    return {
      ...rule,
      ...data,
    };
  },

  async toggleActive(id: string): Promise<ScheduleRule> {
    const rule = MOCK_SCHEDULE_RULES.find((r) => r.id === id);
    if (!rule) throw new Error('Rule not found');

    return this.update(id, { active: !rule.active });
  },
};
```

### 7.5 `lib/services/networks.service.ts`

```typescript
import { ConnectedAccount, SocialNetwork } from '@/types/network';
import { MOCK_CONNECTED_ACCOUNTS } from '@/lib/constants/mockData';

export const networksService = {
  // TODO: Connecter à Meta Graph API
  async getConnectedAccounts(): Promise<ConnectedAccount[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return MOCK_CONNECTED_ACCOUNTS;
  },

  async connectAccount(network: SocialNetwork): Promise<ConnectedAccount> {
    console.log('[MOCK] Connecting to:', network);
    // TODO: Implémenter OAuth flow avec Meta
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newAccount: ConnectedAccount = {
      id: Date.now().toString(),
      network,
      accountName: `@mock_${network}`,
      accountId: `${network}_${Date.now()}`,
      isActive: true,
      connectedAt: new Date(),
    };

    return newAccount;
  },

  async disconnectAccount(id: string): Promise<void> {
    console.log('[MOCK] Disconnecting account:', id);
    await new Promise((resolve) => setTimeout(resolve, 300));
  },
};
```

---

## 🎨 Étape 8 : Créer les Layouts

### 8.1 `app/(public)/layout.tsx`

```typescript
import { AppShell, Container } from '@mantine/core';
import Link from 'next/link';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell header={{ height: 70 }} padding="md">
      <AppShell.Header>
        <Container size="xl" h="100%" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 700, color: '#04346D' }}>
            AutoMaComm
          </Link>
          <nav style={{ display: 'flex', gap: '2rem' }}>
            <Link href="/pricing" style={{ color: '#04346D' }}>
              Tarifs
            </Link>
            <Link href="/contact" style={{ color: '#04346D' }}>
              Contact
            </Link>
            <Link href="/login" style={{ color: '#FF6B35', fontWeight: 600 }}>
              Connexion
            </Link>
          </nav>
        </Container>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
```

### 8.2 `app/dashboard/layout.tsx`

```typescript
'use client';

import { AppShell, Burger, Group, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  LayoutDashboard,
  Users,
  FileImage,
  Wand2,
  Calendar,
  Image,
  Share2,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Tableau de bord', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Équipes', icon: Users, href: '/dashboard/teams' },
  { label: 'Templates', icon: FileImage, href: '/dashboard/templates' },
  { label: 'Génération manuelle', icon: Wand2, href: '/dashboard/generation' },
  { label: 'Planification', icon: Calendar, href: '/dashboard/scheduling' },
  { label: 'Arrière-plans', icon: Image, href: '/dashboard/backgrounds' },
  { label: 'Réseaux sociaux', icon: Share2, href: '/dashboard/networks' },
  { label: 'Paramètres', icon: Settings, href: '/dashboard/settings' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure();
  const pathname = usePathname();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 280, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#04346D' }}>
              AutoMaComm
            </div>
          </Group>
          <div style={{ fontSize: '0.875rem', color: 'rgba(4,52,109,0.6)' }}>
            Club Example FC
          </div>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <NavLink
              key={item.href}
              component={Link}
              href={item.href}
              label={item.label}
              leftSection={<Icon size={18} />}
              active={isActive}
              variant="filled"
              mb={4}
            />
          );
        })}
      </AppShell.Navbar>

      <AppShell.Main style={{ backgroundColor: '#FAFAFA' }}>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
```

---

## 📄 Étape 9 : Créer les pages principales

### 9.1 `app/(public)/page.tsx` (Landing Page)

```typescript
import { Container, Title, Text, Button, Stack } from '@mantine/core';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <Container size="lg" py={80}>
      <Stack align="center" gap="xl">
        <Title order={1} size={56} ta="center" c="#04346D">
          Automatisez votre communication sportive
        </Title>
        <Text size="xl" ta="center" c="dimmed" maw={700}>
          AutoMaComm génère et publie automatiquement vos visuels sur Instagram et
          Facebook. Résultats, affiches, classements : tout est automatisé.
        </Text>
        <Button
          component={Link}
          href="/register"
          size="xl"
          radius="xl"
          style={{ backgroundColor: '#FF6B35' }}
        >
          Commencer gratuitement
        </Button>
      </Stack>
    </Container>
  );
}
```

### 9.2 `app/(public)/pricing/page.tsx`

```typescript
import { Container, Title, SimpleGrid, Card, Text, Button } from '@mantine/core';

export default function PricingPage() {
  return (
    <Container size="lg" py={60}>
      <Title order={1} ta="center" mb={40} c="#04346D">
        Tarifs
      </Title>
      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
        {['Starter', 'Pro', 'Premium'].map((plan) => (
          <Card key={plan} shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={3} mb="md">{plan}</Title>
            <Text size="sm" c="dimmed">
              Fonctionnalités du plan {plan}
            </Text>
            <Button fullWidth mt="md" radius="md">
              Choisir {plan}
            </Button>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}
```

### 9.3 `app/(auth)/login/page.tsx`

```typescript
import { Container, Paper, Title, TextInput, PasswordInput, Button } from '@mantine/core';

export default function LoginPage() {
  return (
    <Container size={420} my={80}>
      <Title ta="center" c="#04346D" mb="lg">
        Connexion
      </Title>
      <Paper withBorder shadow="md" p={30} radius="md">
        <TextInput label="Email" placeholder="votre@email.com" required />
        <PasswordInput label="Mot de passe" placeholder="••••••••" required mt="md" />
        <Button fullWidth mt="xl" style={{ backgroundColor: '#04346D' }}>
          Se connecter
        </Button>
      </Paper>
    </Container>
  );
}
```

### 9.4 `app/dashboard/page.tsx`

```typescript
import { Container, Title, Text, SimpleGrid, Card, Group } from '@mantine/core';
import { Users, FileImage, Calendar, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  const stats = [
    { label: 'Équipes', value: '3', icon: Users, color: '#FF6B35' },
    { label: 'Templates', value: '12', icon: FileImage, color: '#0A5EBF' },
    { label: 'Publications programmées', value: '24', icon: Calendar, color: '#0F9B58' },
    { label: 'Visuels générés', value: '156', icon: TrendingUp, color: '#7A0FB0' },
  ];

  return (
    <Container size="xl">
      <Title order={1} mb="md" c="#04346D">
        Tableau de bord
      </Title>
      <Text c="dimmed" mb="xl">
        Vue d'ensemble de votre activité AutoMaComm
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="apart">
                <div>
                  <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                    {stat.label}
                  </Text>
                  <Text size="xl" fw={700} mt="xs">
                    {stat.value}
                  </Text>
                </div>
                <Icon size={32} style={{ color: stat.color }} />
              </Group>
            </Card>
          );
        })}
      </SimpleGrid>
    </Container>
  );
}
```

### 9.5 `app/dashboard/teams/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { Container, Title, Button, Table, Badge, ActionIcon, Group } from '@mantine/core';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { teamsService } from '@/lib/services/teams.service';
import { Team } from '@/types/team';

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    try {
      const data = await teamsService.getAll();
      setTeams(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="xl">
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={1} c="#04346D">Équipes</Title>
        </div>
        <Button leftSection={<Plus size={16} />} style={{ backgroundColor: '#04346D' }}>
          Ajouter une équipe
        </Button>
      </Group>

      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Nom</Table.Th>
            <Table.Th>Catégorie</Table.Th>
            <Table.Th>Couleur</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {teams.map((team) => (
            <Table.Tr key={team.id}>
              <Table.Td>{team.name}</Table.Td>
              <Table.Td>{team.category}</Table.Td>
              <Table.Td>
                <Badge color={team.color}>{team.color}</Badge>
              </Table.Td>
              <Table.Td>
                <Group gap="xs">
                  <ActionIcon variant="subtle" color="blue">
                    <Pencil size={16} />
                  </ActionIcon>
                  <ActionIcon variant="subtle" color="red">
                    <Trash2 size={16} />
                  </ActionIcon>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Container>
  );
}
```

---

## 🔄 Étape 10 : Migration des composants complexes

### 10.1 Identifier les composants Radix UI à remplacer

**Mapping Radix → Mantine** :

| Radix UI | Mantine |
|----------|---------|
| `Dialog` | `Modal` |
| `Dropdown Menu` | `Menu` |
| `Tooltip` | `Tooltip` |
| `Switch` | `Switch` |
| `Select` | `Select` |
| `Drawer` (vaul) | `Drawer` |
| `Toast` (sonner) | `Notifications` |

### 10.2 Exemple de conversion : `PostConfigDrawer`

**Avant (Radix + Vaul)** :
```typescript
import { Drawer, DrawerContent, DrawerHeader } from '@/components/ui/drawer';
```

**Après (Mantine)** :
```typescript
'use client';

import { Drawer, TextInput, Button, Textarea, Switch } from '@mantine/core';
import { notifications } from '@mantine/notifications';

interface PostConfigDrawerProps {
  opened: boolean;
  onClose: () => void;
  config: any;
  onSave: (config: any) => void;
}

export function PostConfigDrawer({
  opened,
  onClose,
  config,
  onSave,
}: PostConfigDrawerProps) {
  const handleSave = () => {
    onSave(config);
    notifications.show({
      title: 'Configuration sauvegardée',
      message: 'La description a été mise à jour',
      color: 'green',
    });
    onClose();
  };

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      position="right"
      size="lg"
      title="Modifier la description"
    >
      <Textarea
        label="Description du post"
        placeholder="Écrivez votre description..."
        minRows={6}
        mb="md"
      />
      <Switch label="Utiliser une description personnalisée" mb="md" />
      <Button fullWidth onClick={handleSave} style={{ backgroundColor: '#04346D' }}>
        Enregistrer
      </Button>
    </Drawer>
  );
}
```

---

## ✅ Étape 11 : Checklist de validation

### 11.1 Vérifications fonctionnelles

- [ ] `yarn dev` démarre sans erreur
- [ ] Navigation fonctionne entre toutes les pages
- [ ] Layout Public s'affiche correctement (/, /pricing, /contact)
- [ ] Layout Dashboard s'affiche correctement (/dashboard/*)
- [ ] Sidebar responsive (collapse sur mobile)
- [ ] Thème Mantine appliqué (couleurs AutoMaComm)
- [ ] Données mockées s'affichent correctement
- [ ] Services retournent les bonnes données
- [ ] TypeScript compile sans erreur (`yarn type-check`)

### 11.2 Vérifications techniques

- [ ] Tous les types sont définis (`/types/*`)
- [ ] Toutes les constantes sont centralisées (`/lib/constants/*`)
- [ ] Services ont des placeholders clairs (`// TODO`)
- [ ] Aucune erreur ESLint
- [ ] Architecture respecte la structure définie
- [ ] Imports utilisent les alias `@/*`

### 11.3 Pages à migrer (ordre de priorité)

**Priorité 1 - Core** :
- [x] `app/dashboard/page.tsx` (Dashboard)
- [ ] `app/dashboard/teams/page.tsx` (Teams)
- [ ] `app/dashboard/scheduling/page.tsx` (Scheduling)

**Priorité 2 - Fonctionnalités** :
- [ ] `app/dashboard/templates/page.tsx` (Templates)
- [ ] `app/dashboard/generation/page.tsx` (Generation)
- [ ] `app/dashboard/networks/page.tsx` (Networks)

**Priorité 3 - Secondaires** :
- [ ] `app/dashboard/backgrounds/page.tsx` (Backgrounds)
- [ ] `app/dashboard/settings/page.tsx` (Settings)
- [ ] `app/(public)/contact/page.tsx` (Contact)

---

## 📚 Étape 12 : Exemple de page complète migrée

### `app/dashboard/scheduling/page.tsx` (Version complète)

```typescript
'use client';

import { useState, useEffect } from 'react';
import {
  Container,
  Title,
  Text,
  Button,
  Table,
  Badge,
  Group,
  Switch,
  Select,
  ActionIcon,
  Menu,
  Tabs,
} from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { MoreVertical, MessageSquare, FileText, CalendarClock } from 'lucide-react';
import { schedulingService } from '@/lib/services/scheduling.service';
import { ScheduleRule } from '@/types/scheduling';
import { VISUAL_TYPES } from '@/lib/constants/visualTypes';

const MOMENT_OPTIONS = [
  { group: 'Jours fixes', items: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'] },
  { group: 'Par rapport au match', items: ['J-4', 'J-3', 'J-2', 'J-1 (veille du match)', 'Jour J', 'J+1 (lendemain)', 'J+2', 'J+3', 'J+4'] },
];

export default function SchedulingPage() {
  const [rules, setRules] = useState<ScheduleRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('all');

  useEffect(() => {
    loadRules();
  }, []);

  const loadRules = async () => {
    try {
      const data = await schedulingService.getAll();
      setRules(data);
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (id: string) => {
    await schedulingService.toggleActive(id);
    loadRules();
  };

  const filteredRules = activeTab === 'all'
    ? rules
    : rules.filter((r) => r.teams.some((t) => t.label === activeTab));

  return (
    <Container size="xl">
      <Group justify="space-between" mb="md">
        <div>
          <Title order={1} c="#04346D">
            Planification des publications
          </Title>
          <Text size="sm" c="dimmed" mt="xs">
            Choisissez quand vos visuels doivent se publier automatiquement
          </Text>
        </div>
        <Group gap="xs">
          <Badge color="green" variant="light">
            {rules.filter((r) => r.active).length} actives
          </Badge>
          <Badge color="orange" variant="light" leftSection={<MessageSquare size={12} />}>
            {rules.filter((r) => r.format === 'P' && r.isCustomDescription).length} descriptions perso
          </Badge>
        </Group>
      </Group>

      {/* Info banner */}
      <div
        style={{
          background: 'rgba(4,52,109,0.04)',
          border: '1px solid rgba(4,52,109,0.08)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '24px',
          display: 'flex',
          gap: '12px',
        }}
      >
        <CalendarClock size={20} style={{ color: '#04346D', flexShrink: 0 }} />
        <div>
          <Text size="sm" fw={600} c="#04346D">
            Ces règles s'appliquent uniquement les semaines de match
          </Text>
          <Text size="xs" c="dimmed" mt={4}>
            Si aucun match n'est prévu pour une équipe, les publications ne seront pas
            déclenchées automatiquement.
          </Text>
        </div>
      </div>

      {/* Tabs filter */}
      <Tabs value={activeTab} onChange={(value) => setActiveTab(value || 'all')} mb="xl">
        <Tabs.List>
          <Tabs.Tab value="all">Tous</Tabs.Tab>
          <Tabs.Tab value="Équipe 1">Équipe 1</Tabs.Tab>
          <Tabs.Tab value="Réserve">Réserve</Tabs.Tab>
          <Tabs.Tab value="U18">U18</Tabs.Tab>
        </Tabs.List>
      </Tabs>

      {/* Table */}
      <Table striped highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Nom du visuel</Table.Th>
            <Table.Th>Équipe(s)</Table.Th>
            <Table.Th>Actif</Table.Th>
            <Table.Th>Moment</Table.Th>
            <Table.Th>Heure</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {filteredRules.map((rule) => {
            const visualConfig = VISUAL_TYPES[rule.visualType];
            
            return (
              <Table.Tr key={rule.id}>
                <Table.Td>
                  <Group gap="xs">
                    <Badge size="sm" variant="filled">
                      {rule.format}
                    </Badge>
                    <Badge
                      size="sm"
                      style={{ backgroundColor: visualConfig.color, color: 'white' }}
                    >
                      {rule.visualType}
                    </Badge>
                    {rule.isCustomDescription && (
                      <MessageSquare size={14} style={{ color: '#FF6B35' }} />
                    )}
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    {rule.teams.map((team) => (
                      <Badge
                        key={team.label}
                        size="sm"
                        variant="light"
                        style={{ borderLeft: `3px solid ${team.borderColor}` }}
                      >
                        {team.label}
                      </Badge>
                    ))}
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Switch
                    checked={rule.active}
                    onChange={() => toggleActive(rule.id)}
                  />
                </Table.Td>
                <Table.Td>
                  <Select
                    data={MOMENT_OPTIONS.flatMap((g) => g.items)}
                    value={rule.moment}
                    onChange={(value) => {
                      /* TODO: Update moment */
                    }}
                    w={180}
                  />
                </Table.Td>
                <Table.Td>
                  <TimeInput value={rule.time} onChange={() => {/* TODO */}} />
                </Table.Td>
                <Table.Td>
                  <Menu shadow="md" width={200}>
                    <Menu.Target>
                      <ActionIcon variant="subtle">
                        <MoreVertical size={16} />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      {rule.format === 'P' && (
                        <Menu.Item leftSection={<MessageSquare size={16} />}>
                          Modifier la description
                        </Menu.Item>
                      )}
                      <Menu.Item leftSection={<FileText size={16} />}>
                        Modifier le template
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
    </Container>
  );
}
```

---

## 🚀 Étape 13 : Commandes de démarrage

```bash
# Installation
cd automacomm-nextjs
yarn install

# Développement
yarn dev

# Build production
yarn build

# Lancer en production
yarn start

# Vérification TypeScript
yarn type-check

# Lint
yarn lint
```

---

## 📝 Notes importantes pour Claude

### Priorités de migration

1. **D'abord la structure** : Créer tous les dossiers et fichiers de config
2. **Ensuite les types et constantes** : Définir l'architecture des données
3. **Puis les services** : Créer la couche d'abstraction API
4. **Enfin les pages** : Migrer page par page en commençant par les plus simples

### Patterns à respecter

**✅ FAIRE** :
- Utiliser `'use client'` seulement si nécessaire (hooks, state, events)
- Centraliser les types dans `/types`
- Centraliser les constantes dans `/lib/constants`
- Utiliser les services pour toute logique de données
- Ajouter des `// TODO:` clairs pour les futures intégrations

**❌ NE PAS FAIRE** :
- Mettre du code métier dans les pages
- Dupliquer les types ou constantes
- Implémenter de vrais appels API (tout doit être mocké)
- Oublier les placeholders pour le backend

### Commandes utiles pendant la migration

```bash
# Vérifier la compilation TypeScript en continu
yarn type-check --watch

# Tester une page spécifique
# Naviguer vers http://localhost:3000/dashboard/teams

# Vérifier les erreurs ESLint
yarn lint --fix
```

---

## ✅ Checklist finale

### Configuration
- [ ] `next.config.js` créé
- [ ] `tsconfig.json` configuré avec alias
- [ ] `postcss.config.cjs` pour Mantine
- [ ] `.env.local` avec variables
- [ ] `package.json` avec bons scripts

### Architecture
- [ ] `/app` structure créée (public, auth, dashboard)
- [ ] `/components` organisé (ui, shared)
- [ ] `/features` créé pour logique métier
- [ ] `/lib` avec services, hooks, utils, constants
- [ ] `/types` avec tous les types

### Thème & Design
- [ ] Mantine theme configuré (`app/theme.ts`)
- [ ] Couleurs AutoMaComm intégrées
- [ ] Font Inter appliquée
- [ ] Providers configuré (`app/providers.tsx`)

### Pages migrées
- [ ] Landing page (`app/(public)/page.tsx`)
- [ ] Login (`app/(auth)/login/page.tsx`)
- [ ] Dashboard (`app/dashboard/page.tsx`)
- [ ] Teams (`app/dashboard/teams/page.tsx`)
- [ ] Scheduling (`app/dashboard/scheduling/page.tsx`)
- [ ] Templates (`app/dashboard/templates/page.tsx`)
- [ ] Generation (`app/dashboard/generation/page.tsx`)
- [ ] Networks (`app/dashboard/networks/page.tsx`)
- [ ] Backgrounds (`app/dashboard/backgrounds/page.tsx`)
- [ ] Settings (`app/dashboard/settings/page.tsx`)

### Services & Data
- [ ] Mock data créé (`lib/constants/mockData.ts`)
- [ ] Services créés avec placeholders
- [ ] Types définis pour toutes les entités
- [ ] Constantes centralisées (couleurs, types visuels)

### Tests
- [ ] Application démarre (`yarn dev`)
- [ ] Navigation fonctionne
- [ ] Pas d'erreur TypeScript
- [ ] Pas d'erreur ESLint
- [ ] Layout responsive

---

## 📞 Support

Pour toute question sur cette migration, référez-vous à :
- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Mantine](https://mantine.dev/)
- [Schéma de base de données](/database-schema.md)

---

**Bonne migration ! 🚀**