# Poker Planning

> Application web collaborative de Planning Poker pour l'estimation agile en équipe

## 🎯 Description

Poker Planning est une application moderne de Planning Poker permettant aux équipes agiles d'estimer la complexité de leurs user stories de manière collaborative. L'application utilise la séquence de Fibonacci (1, 2, 3, 5, 8, 13, 21, 34, 55) pour les estimations.

## ✨ Fonctionnalités actuelles

- **Vote individuel** : Sélection de cartes Fibonacci avec interface SVG colorée
- **Persistance des votes** : Sauvegarde automatique dans PostgreSQL
- **Interface moderne** : React 19 avec CSS Modules et animations
- **API REST** : Backend Express TypeScript
- **Containerisation** : Docker Compose pour développement local
- **Déploiement AWS** : Support ECS Fargate + RDS (production)
- **Qualité de code** : Linting Biome avec hooks pre-commit

## 🚀 Démarrage rapide

### Prérequis
- Node.js 18+
- Docker + Docker Compose
- PostgreSQL (ou utiliser Docker Compose)

### Installation locale

```bash
# Cloner le repository
git clone <repo-url>
cd pokerplanning

# Lancer avec Docker Compose
docker-compose up -d

# Accéder à l'application
# Frontend : http://localhost:8080
# Backend API : http://localhost:3001
```

### Installation développement

```bash
# Frontend
cd front
npm install
npm run dev

# Backend (autre terminal)
cd back
npm install
npm run dev
```

## 📋 Roadmap

Consultez le [Product Backlog](backlog.md) pour voir les évolutions planifiées, notamment :
- Collaboration en temps réel (WebSocket)
- Gestion de sessions multi-utilisateurs
- Migration PostgreSQL → DynamoDB (PRIORITÉ)
- Intégrations Jira/Slack
- Analytics et rapports

## 📚 Documentation

- [Technologies Backend](backend.md)
- [Technologies Frontend](frontend.md)
- [Product Backlog](backlog.md)

## 🛠️ Stack technique

- **Frontend** : React 19, TypeScript, Vite
- **Backend** : Express, Node.js, TypeScript
- **Base de données** : PostgreSQL (→ DynamoDB planifié)
- **Infrastructure** : Docker, AWS ECS, Terraform
