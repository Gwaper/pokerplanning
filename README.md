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
