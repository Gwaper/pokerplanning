# Technologies Backend

## Stack principal

### Node.js + Express
- **Express 5.2.1** : Framework web moderne et minimaliste
- **TypeScript 5.9.3** : Typage statique pour robustesse et maintenabilité
- **ts-node-dev 2.0.0** : Rechargement automatique en développement

### Base de données

#### Actuel : PostgreSQL
- **pg 8.16.3** : Client PostgreSQL officiel
- **Schéma simple** : Table `votes` avec colonnes `id`, `value`, `created_at`
- **Docker** : Container PostgreSQL 15 en développement

#### Planifié : DynamoDB (PRIORITÉ)
- **Migration prévue** : Sprint 1 du Product Backlog
- **Raisons** : Scalabilité, coût optimisé, intégration AWS native
- **DynamoDB Streams** : Pour événements temps réel
- **Modèle de données** : Single-table design avec GSI

### Qualité de code

#### Linting et Formatting
- **Biome 2.3.8** : Linter/formatter ultra-rapide (remplace ESLint + Prettier)
- **Configuration** : `/back/biome.json` avec règles recommandées
- **Pre-commit hooks** : Husky + lint-staged pour validation automatique

#### Tests
- **Jest 30.2.0** : Framework de tests moderne
- **ts-jest 29.4.6** : Support TypeScript pour Jest
- **Supertest 7.1.4** : Tests d'API HTTP
- **Coverage** : Génération de rapports de couverture

### Infrastructure et DevOps

#### Développement local
- **Docker Compose** : Orchestration frontend + backend + PostgreSQL
- **Nodemon 3.1.11** : Rechargement automatique des fichiers
- **Dotenv 17.2.3** : Gestion des variables d'environnement

#### Production AWS
- **ECS Fargate** : Container serverless
- **RDS PostgreSQL** : Base de données managée (→ DynamoDB)
- **ECR** : Registry Docker privé
- **Application Load Balancer** : Répartition de charge
- **Terraform** : Infrastructure as Code

### Sécurité et CORS
- **CORS 2.8.5** : Configuration Cross-Origin Resource Sharing
- **Variables d'environnement** : Secrets via `.env` (non commités)

## Architecture API

### Endpoints actuels

#### POST `/api/votes`
Sauvegarde un vote utilisateur.

**Request Body :**
```json
{
  "value": 5
}
```

**Response :**
```json
{
  "id": 1,
  "value": 5,
  "created_at": "2025-12-10T10:30:00Z"
}
```

### Architecture prévue

Après migration DynamoDB et WebSocket :
- **GET `/api/sessions/:id`** : Récupérer une session
- **POST `/api/sessions`** : Créer une session
- **WebSocket `/ws`** : Connexion temps réel
- **POST `/api/sessions/:id/votes`** : Voter dans une session
- **POST `/api/sessions/:id/reveal`** : Révéler les votes

## Scripts npm disponibles

```json
{
  "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js",
  "test": "jest",
  "test:watch": "jest --watch",
  "lint": "biome check .",
  "lint:fix": "biome check --write --unsafe .",
  "format": "biome format --write ."
}
```

## Configuration TypeScript

**tsconfig.json highlights :**
- Target: ES2022
- Module: CommonJS
- Strict mode activé
- Source maps pour debugging
- Outdir: `dist/`

## Dépendances complètes

### Production
```json
{
  "express": "^5.2.1",
  "pg": "^8.16.3",
  "cors": "^2.8.5",
  "dotenv": "^17.2.3"
}
```

### Développement
```json
{
  "@biomejs/biome": "^2.3.8",
  "@types/cors": "^2.8.17",
  "@types/express": "^5.0.0",
  "@types/jest": "^30.0.6",
  "@types/node": "^22.13.5",
  "@types/pg": "^8.11.10",
  "@types/supertest": "^6.0.4",
  "jest": "^30.2.0",
  "nodemon": "^3.1.11",
  "supertest": "^7.1.4",
  "ts-jest": "^29.4.6",
  "ts-node-dev": "^2.0.0",
  "typescript": "^5.9.3"
}
```
