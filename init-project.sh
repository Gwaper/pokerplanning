#!/bin/bash

# Couleurs pour les messages
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Initialisation du projet fullstack...${NC}\n"

# Initialiser git si pas déjà fait
if [ ! -d .git ]; then
  git init
  echo -e "${GREEN}✓ Git initialisé${NC}"
fi

# Créer le .gitignore à la racine
cat > .gitignore << 'GITIGNORE'
node_modules/
dist/
build/
.env
.env.local
*.log
.DS_Store
coverage/
.vscode/
*.swp
*.swo
GITIGNORE

echo -e "${GREEN}✓ .gitignore créé${NC}"

# ============== FRONTEND ==============
echo -e "\n${BLUE}📦 Configuration du frontend (React + Vite + TypeScript)...${NC}"

npm create vite@latest front -- --template react-ts

cd front

# Installer React Router
npm install react-router-dom
npm install -D @types/node

# Créer la structure de dossiers
mkdir -p src/{components,pages,hooks,utils,services,types}

# Créer un fichier d'environnement
cat > .env.example << 'ENVEXAMPLE'
VITE_API_URL=http://localhost:3001
ENVEXAMPLE

cp .env.example .env

# Créer un exemple de routing
cat > src/App.tsx << 'APPTSX'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'

function Home() {
  return <h1>Home Page</h1>
}

function About() {
  return <h1>About Page</h1>
}

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
APPTSX

cd ..

echo -e "${GREEN}✓ Frontend configuré${NC}"

# ============== BACKEND ==============
echo -e "\n${BLUE}📦 Configuration du backend (Node.js + Express + TypeScript + PostgreSQL)...${NC}"

mkdir -p back
cd back

# Initialiser npm
npm init -y

# Installer les dépendances
npm install express cors dotenv pg
npm install -D typescript @types/node @types/express @types/cors @types/pg ts-node-dev nodemon

# Initialiser TypeScript
npx tsc --init

# Configurer tsconfig.json
cat > tsconfig.json << 'TSCONFIG'
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
TSCONFIG

# Créer la structure de dossiers
mkdir -p src/{routes,controllers,services,models,config,middleware,types}

# Créer le fichier de configuration de la DB
cat > src/config/database.ts << 'DBTS'
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'mydb',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
});

pool.on('connect', () => {
  console.log('✓ Connexion à la base de données établie');
});

pool.on('error', (err) => {
  console.error('Erreur de connexion à la base de données:', err);
});
DBTS

# Créer le fichier principal
cat > src/index.ts << 'INDEXTS'
import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './config/database';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Route de test
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'API is running' });
});

// Route de test DB
app.get('/db-test', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ 
      status: 'OK', 
      message: 'Database connected',
      timestamp: result.rows[0].now 
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'ERROR', 
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
INDEXTS

# Créer le fichier .env
cat > .env.example << 'ENVEXAMPLE'
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mydb
DB_USER=postgres
DB_PASSWORD=postgres
ENVEXAMPLE

cp .env.example .env

# Ajouter les scripts dans package.json
npm pkg set scripts.dev="ts-node-dev --respawn --transpile-only src/index.ts"
npm pkg set scripts.build="tsc"
npm pkg set scripts.start="node dist/index.js"

cd ..

echo -e "${GREEN}✓ Backend configuré${NC}"

# ============== DOCKER ==============
echo -e "\n${BLUE}🐳 Configuration Docker pour PostgreSQL...${NC}"

cat > docker-compose.yml << 'DOCKER'
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: myapp-postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: mydb
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
DOCKER

echo -e "${GREEN}✓ Docker Compose créé${NC}"

# ============== README ==============
cat > README.md << 'README'
# Fullstack TypeScript Application

## Stack Technique

### Frontend
- React 18+ avec TypeScript
- Vite (build tool)
- React Router DOM

### Backend
- Node.js avec Express
- TypeScript
- PostgreSQL

## Installation

### 1. Installer les dépendances

```bash
# Frontend
cd front
npm install

# Backend
cd ../back
npm install
```

### 2. Démarrer PostgreSQL avec Docker

```bash
docker-compose up -d
```

### 3. Configurer les variables d'environnement

Copier les fichiers `.env.example` en `.env` dans les dossiers `front` et `back` et ajuster les valeurs.

### 4. Démarrer l'application

```bash
# Terminal 1 - Backend
cd back
npm run dev

# Terminal 2 - Frontend
cd front
npm run dev
```

## URLs de développement

- Frontend: http://localhost:5173
- Backend: http://localhost:3001
- PostgreSQL: localhost:5432

## Commandes utiles

```bash
# Tester la connexion DB
curl http://localhost:3001/db-test

# Arrêter PostgreSQL
docker-compose down

# Voir les logs PostgreSQL
docker-compose logs -f postgres
```
README

echo -e "${GREEN}✓ README créé${NC}"

# Premier commit
git add .
git commit -m "feat: initial project setup with React, Express, TypeScript and PostgreSQL"

echo -e "\n${GREEN}✅ Projet initialisé avec succès !${NC}"
echo -e "\n${BLUE}📋 Prochaines étapes :${NC}"
echo "1. Vérifier les fichiers .env dans front/ et back/"
echo "2. Démarrer PostgreSQL : docker-compose up -d"
echo "3. Démarrer le backend : cd back && npm run dev"
echo "4. Démarrer le frontend : cd front && npm run dev"
echo "5. Ajouter ton remote GitHub : git remote add origin <url>"
echo "6. Pousser sur GitHub : git push -u origin main"
echo "7. Créer une branche : git checkout -b dev"