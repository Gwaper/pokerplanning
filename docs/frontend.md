# Technologies Frontend

## Stack principal

### React 19
- **React 19.2.0** : Dernière version majeure avec performance optimisée
- **React DOM 19.2.0** : Rendu DOM optimisé
- **Functional Components** : Approche moderne avec hooks
- **TypeScript strict** : Typage complet pour éviter erreurs runtime

### Routing
- **React Router DOM 7.10.1** : Navigation client-side
- **Configuration** : Routes définies dans `/front/src/App.tsx`

### Build Tool : Vite
- **rolldown-vite 7.2.5** : Bundler ultra-rapide (ESBuild + Rollup)
- **HMR (Hot Module Replacement)** : Rechargement instantané en dev
- **Build optimisé** : Tree-shaking, code splitting, minification
- **Plugin React** : @vitejs/plugin-react 5.1.1

### Styling : CSS Modules
- **Scoped styles** : Isolation automatique des classes CSS
- **Fichiers .module.css** : Un par composant
- **Pas de CSS-in-JS** : Performance optimale
- **Animations** : Transitions CSS natives

## Composants principaux

### `<PokerPlanning />` (Page principale)
**Fichier** : `/front/src/pages/PokerPlanning.tsx`

**Responsabilités :**
- Gère l'état de la carte sélectionnée
- Appelle l'API pour sauvegarder les votes
- Affiche la grille de cartes Fibonacci

**État local :**
```typescript
const [selectedCard, setSelectedCard] = useState<number | null>(null);
```

### `<Card />` (Composant carte)
**Fichier** : `/front/src/components/card.tsx`

**Props :**
```typescript
interface CardProps {
  cardContent: { value: number };
  isSelected?: boolean;
  onClick: () => void;
}
```

**Caractéristiques :**
- Sémantique HTML : `<button>` (accessibilité)
- ARIA labels : `aria-label`, `aria-pressed`
- Animations hover et sélection
- Classes CSS conditionnelles

### `<CardSvg />` (Rendu SVG)
**Fichier** : `/front/src/components/CardSvg.tsx`

**Caractéristiques :**
- SVG inline pour performance
- Palette de couleurs unique par valeur Fibonacci
- Accessibilité : `role="img"`, `<title>`, `aria-label`
- Design moderne avec border-radius et stroke

**Palette de couleurs :**
```typescript
{
  1: { bg: '#FFD1E6', stroke: '#FF4DAA', text: '#FF4DAA' },
  2: { bg: '#FFE5F5', stroke: '#FF70C8', text: '#FF70C8' },
  3: { bg: '#F1D4FF', stroke: '#BB6BFF', text: '#9F33FF' },
  5: { bg: '#D9E6FF', stroke: '#6CA3FF', text: '#2B65D9' },
  8: { bg: '#FFE9C7', stroke: '#FFB347', text: '#D67700' },
  13: { bg: '#E4FFD9', stroke: '#60D659', text: '#2D8A25' },
  21: { bg: '#E6DAFF', stroke: '#9966FF', text: '#5B2ECC' },
  34: { bg: '#FFE2DF', stroke: '#FF7267', text: '#C73528' },
  55: { bg: '#CCF7FF', stroke: '#65D1E8', text: '#1289A6' }
}
```

## Service API

### `voteService`
**Fichier** : `/front/src/services/api.ts`

**Méthodes :**
```typescript
saveVote(value: number): Promise<void>
```

**Configuration :**
- Base URL : `VITE_API_URL` (variable d'environnement)
- Méthode : POST `/api/votes`
- Headers : `Content-Type: application/json`

## Qualité de code

### Linting et Formatting
- **Biome 2.3.8** : Linter/formatter moderne
- **Configuration** : `/front/biome.json`
- **Règles** : Recommended + overrides pour tests
- **Pre-commit** : Validation automatique via Husky

### Accessibilité (a11y)
✅ **Boutons sémantiques** : `<button>` au lieu de `<div>` cliquables
✅ **ARIA labels** : Descriptions pour lecteurs d'écran
✅ **SVG accessibles** : `role="img"`, `<title>`, `aria-label`
✅ **Keyboard navigation** : Support natif via éléments sémantiques
✅ **Contrast ratios** : Couleurs WCAG compliant

### TypeScript
- **tsconfig.json** : 3 configurations (app, node, base)
- **Strict mode** : Toutes les vérifications activées
- **Types explicites** : Interfaces pour tous les props
- **No implicit any** : Typage obligatoire

## Configuration Vite

**vite.config.ts highlights :**
```typescript
{
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
}
```

## Scripts npm disponibles

```json
{
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview",
  "lint": "biome check .",
  "lint:check": "biome check .",
  "lint:fix": "biome check --write --unsafe .",
  "format": "biome format --write .",
  "format:check": "biome format ."
}
```

## Structure des fichiers

```
/front/
├── src/
│   ├── components/
│   │   ├── card.tsx             # Composant carte
│   │   ├── card.module.css      # Styles carte
│   │   ├── CardSvg.tsx          # Rendu SVG
│   │   └── ...
│   ├── pages/
│   │   ├── PokerPlanning.tsx    # Page principale
│   │   └── PokerPlanning.module.css
│   ├── services/
│   │   └── api.ts               # Service HTTP
│   ├── utils/
│   │   └── fibonacciArray.ts    # Valeurs Fibonacci
│   ├── App.tsx                  # Routes
│   ├── main.tsx                 # Entry point
│   └── index.css                # Styles globaux
├── public/                       # Assets statiques
├── biome.json                    # Configuration Biome
├── tsconfig.json                 # Config TypeScript
├── vite.config.ts                # Config Vite
└── package.json
```

## Dépendances complètes

### Production
```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-router-dom": "^7.10.1"
}
```

### Développement
```json
{
  "@biomejs/biome": "^2.3.8",
  "@eslint/js": "^9.39.1",
  "@types/react": "^19.0.10",
  "@types/react-dom": "^19.0.5",
  "@vitejs/plugin-react": "^5.1.1",
  "eslint": "^9.39.1",
  "eslint-plugin-react-hooks": "^5.1.0",
  "eslint-plugin-react-refresh": "^0.4.19",
  "globals": "^16.0.0",
  "rolldown-vite": "^7.2.5",
  "typescript": "^5.9.3",
  "typescript-eslint": "^8.27.0"
}
```

## Évolutions prévues

Voir [Product Backlog](backlog.md) pour :
- 🎨 Dark mode
- 📱 Responsive mobile
- 🔔 Notifications toast
- ⚡ Animations avancées
- 🎯 Sélection de decks personnalisés
- 🌐 WebSocket pour temps réel
