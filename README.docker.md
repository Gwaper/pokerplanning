# Déploiement Docker - Poker Planning

## Prérequis

- Docker Desktop installé
- Docker Compose installé

## Structure

```
pokerplanning/
├── docker-compose.yml      # Configuration Docker Compose
├── back/
│   ├── Dockerfile         # Image Docker backend
│   └── .dockerignore
├── front/
│   ├── Dockerfile         # Image Docker frontend
│   ├── nginx.conf         # Configuration Nginx
│   └── .dockerignore
└── .env.docker            # Variables d'environnement
```

## Services

### 1. **PostgreSQL** (port 5432)
- Base de données PostgreSQL 16
- Volume persistant pour les données
- Healthcheck pour vérifier la disponibilité

### 2. **Backend** (port 3001)
- API Node.js/Express/TypeScript
- Lance automatiquement les migrations au démarrage
- Connexion à PostgreSQL

### 3. **Frontend** (port 8080)
- Application React/Vite
- Servie par Nginx
- Build de production optimisé

## Commandes

### Démarrer tous les services

```bash
docker-compose up -d
```

### Voir les logs

```bash
# Tous les services
docker-compose logs -f

# Backend uniquement
docker-compose logs -f backend

# Frontend uniquement
docker-compose logs -f frontend

# PostgreSQL uniquement
docker-compose logs -f postgres
```

### Arrêter les services

```bash
docker-compose down
```

### Arrêter et supprimer les volumes (⚠️ supprime les données)

```bash
docker-compose down -v
```

### Rebuild les images

```bash
# Rebuild tout
docker-compose up -d --build

# Rebuild un service spécifique
docker-compose up -d --build backend
```

### Accéder aux containers

```bash
# Backend
docker exec -it pokerplanning-backend sh

# Frontend
docker exec -it pokerplanning-frontend sh

# PostgreSQL
docker exec -it pokerplanning-db psql -U postgres -d mydb
```

## URLs d'accès

Une fois les services démarrés :

- **Frontend** : http://localhost:8080
- **Backend API** : http://localhost:3001
- **PostgreSQL** : localhost:5432

## Test de l'API

```bash
# Health check
curl http://localhost:3001/health

# Test database connection
curl http://localhost:3001/db-test

# Create a vote
curl -X POST http://localhost:3001/vote \
  -H "Content-Type: application/json" \
  -d '{"value": 5, "userName": "John"}'

# Get all votes
curl http://localhost:3001/vote
```

## Connexion à la base de données

Utilisez Beekeeper Studio ou tout autre client PostgreSQL :

```
Host: localhost
Port: 5432
Database: mydb
User: postgres
Password: postgres
```

## Troubleshooting

### Le backend ne démarre pas

Vérifiez que PostgreSQL est prêt :
```bash
docker-compose logs postgres
```

### Les migrations ne s'exécutent pas

Relancez le backend :
```bash
docker-compose restart backend
docker-compose logs -f backend
```

### Erreur "port already in use"

Arrêtez les services locaux qui utilisent les ports 3001, 5432 ou 8080 :
```bash
# macOS
lsof -ti:3001 | xargs kill -9
lsof -ti:5432 | xargs kill -9
lsof -ti:8080 | xargs kill -9
```

### Reset complet

```bash
docker-compose down -v
docker-compose up -d --build
```

## Production

Pour la production, modifiez :

1. **Mots de passe PostgreSQL** dans docker-compose.yml
2. **VITE_API_URL** avec votre domaine réel
3. Ajoutez HTTPS avec un reverse proxy (Traefik, Nginx)
4. Utilisez des secrets Docker au lieu de variables d'environnement en clair

## Notes

- Les migrations sont exécutées automatiquement au démarrage du backend
- Le frontend est optimisé et servi par Nginx
- Les données PostgreSQL sont persistées dans un volume Docker
- Réseau isolé pour la communication entre services
