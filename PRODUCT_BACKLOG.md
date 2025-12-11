# 📋 Product Backlog - Poker Planning

## 🎯 Vision Produit

Application de Planning Poker collaborative permettant aux équipes agiles d'estimer la complexité des user stories en temps réel.

---

## 🔥 Épopées

- [Epic 1 - Collaboration en Temps Réel](#epic-1---collaboration-en-temps-réel)
- [Epic 2 - Gestion de Session](#epic-2---gestion-de-session)
- [Epic 3 - Persistance et Historique](#epic-3---persistance-et-historique)
- [Epic 4 - Améliorations UX/UI](#epic-4---améliorations-uxui)
- [Epic 5 - Administration et Modération](#epic-5---administration-et-modération)
- [Epic 6 - Intégrations Externes](#epic-6---intégrations-externes)
- [Epic 7 - Analytics et Rapports](#epic-7---analytics-et-rapports)
- [Epic 8 - Performance et Scalabilité](#epic-8---performance-et-scalabilité)

---

## Epic 1 - Collaboration en Temps Réel

### 🎯 Objectif
Permettre à plusieurs utilisateurs de voter simultanément et de voir les résultats en temps réel.

### User Stories

#### US-101: WebSocket pour synchronisation en temps réel
**En tant qu'** utilisateur
**Je veux** voir les votes des autres participants en temps réel
**Afin de** suivre l'avancement de la session sans rafraîchir la page

**Critères d'acceptation:**
- [ ] Connexion WebSocket établie au chargement de la page
- [ ] Les votes apparaissent instantanément chez tous les participants
- [ ] Indicateur visuel du nombre de participants connectés
- [ ] Gestion de la reconnexion automatique en cas de perte de connexion
- [ ] Message "X est en train de voter..." affiché aux autres

**Tâches techniques:**
- [ ] Backend: Installer `socket.io` ou `ws`
- [ ] Backend: Créer service WebSocket avec gestion des rooms
- [ ] Frontend: Intégrer client WebSocket
- [ ] Frontend: État global pour les votes des participants
- [ ] Tests: Scénarios multi-utilisateurs
---

#### US-102: Salle de vote privée avec code d'accès
**En tant qu'** Scrum Master
**Je veux** créer une salle privée avec un code unique
**Afin de** garantir que seuls les membres de l'équipe participent

**Critères d'acceptation:**
- [ ] Génération automatique d'un code de salle (ex: ABCD-1234)
- [ ] Page de création de salle avec configuration
- [ ] Partage du lien ou du code aux participants
- [ ] Validation du code avant d'entrer dans la salle
- [ ] Redirection automatique si salle inexistante

**Tâches techniques:**
- [ ] Backend: Route POST `/api/rooms` (création)
- [ ] Backend: Route GET `/api/rooms/:code` (vérification)
- [ ] Backend: Table `rooms` (id, code, created_at, expires_at)
- [ ] Frontend: Page `/create-room`
- [ ] Frontend: Page `/join/:code`

---

#### US-103: Révélation synchronisée des votes
**En tant qu'** animateur
**Je veux** un bouton "Révéler les votes"
**Afin que** tous les participants découvrent les résultats en même temps

**Critères d'acceptation:**
- [ ] Bouton "Révéler" visible seulement pour l'animateur
- [ ] Les cartes restent cachées tant que non révélées
- [ ] Animation de retournement des cartes simultanée
- [ ] Affichage des statistiques (moyenne, médiane)
- [ ] Possibilité de relancer un vote

**Tâches techniques:**
- [ ] Backend: WebSocket event `reveal-votes`
- [ ] Frontend: État `isRevealed` global
- [ ] Frontend: Animation CSS flip des cartes
- [ ] Frontend: Composant Statistics
- [ ] Backend: Calcul moyenne/médiane

---

#### US-104: Liste des participants avec statut
**En tant qu'** participant
**Je veux** voir la liste de tous les participants et leur statut
**Afin de** savoir qui a déjà voté

**Critères d'acceptation:**
- [ ] Liste des participants affichée sur le côté
- [ ] Icône ✅ pour les participants ayant voté
- [ ] Icône ⏳ pour ceux qui n'ont pas encore voté
- [ ] Avatar ou initiales pour chaque participant
- [ ] Mise à jour en temps réel

**Tâches techniques:**
- [ ] Backend: WebSocket event `user-voted`
- [ ] Frontend: Composant `ParticipantsList`
- [ ] Frontend: État `participants[]` avec statut
- [ ] CSS: Design de la liste latérale

---

## Epic 2 - Gestion de Session

### 🎯 Objectif
Structurer les sessions de vote autour de user stories ou tickets spécifiques.

### User Stories

#### US-201: Créer une session avec liste de stories
**En tant qu'** Product Owner
**Je veux** créer une session avec plusieurs user stories à estimer
**Afin de** organiser une réunion de planning complète

**Critères d'acceptation:**
- [ ] Formulaire de création de session (nom, description)
- [ ] Ajout manuel de user stories (titre, description)
- [ ] Import depuis un fichier CSV/JSON
- [ ] Ordre des stories modifiable (drag & drop)
- [ ] Sauvegarde automatique en brouillon

**Tâches techniques:**
- [ ] Backend: Table `sessions` (id, name, created_by, created_at)
- [ ] Backend: Table `stories` (id, session_id, title, description, order)
- [ ] Backend: Routes CRUD pour sessions
- [ ] Frontend: Page `/session/create`
- [ ] Frontend: Composant `StoryForm` avec drag & drop

---

#### US-202: Navigation entre les stories d'une session
**En tant qu'** animateur
**Je veux** passer d'une story à l'autre
**Afin de** progresser dans l'estimation de toutes les stories

**Critères d'acceptation:**
- [ ] Boutons "Précédent" / "Suivant"
- [ ] Indicateur de progression (2/10 stories)
- [ ] Affichage de la story courante (titre + description)
- [ ] Synchronisation avec tous les participants
- [ ] Possibilité de revenir sur une story déjà votée

**Tâches techniques:**
- [ ] Backend: WebSocket event `next-story`
- [ ] Frontend: État `currentStoryIndex`
- [ ] Frontend: Composant `StoryCard`
- [ ] Frontend: Progress bar

---

#### US-203: Timer pour limiter le temps de vote
**En tant qu'** Scrum Master
**Je veux** définir un temps limite par vote
**Afin de** maintenir un rythme soutenu

**Critères d'acceptation:**
- [ ] Configuration du timer (30s, 1min, 2min, ∞)
- [ ] Compte à rebours visible par tous
- [ ] Alerte sonore à 10s restantes
- [ ] Révélation automatique à 0s
- [ ] Possibilité d'ajouter du temps

**Tâches techniques:**
- [ ] Backend: WebSocket event `timer-update`
- [ ] Frontend: Composant `Timer` avec countdown
- [ ] Frontend: Son d'alerte (Web Audio API)
- [ ] Backend: Logique de révélation auto

---

## Epic 3 - Persistance et Historique

### 🎯 Objectif
**⚠️ DEMANDE INTERNE PRIORITAIRE**
Migrer vers DynamoDB pour améliorer le tracking des sessions et faciliter les rapports.

### User Stories

#### US-301: Migration PostgreSQL → DynamoDB
**En tant que** équipe technique
**Nous voulons** migrer la base de données vers DynamoDB
**Afin de** faciliter le tracking et la scalabilité sur AWS

**Critères d'acceptation:**
- [ ] Schéma DynamoDB défini (tables, indexes)
- [ ] Script de migration des données existantes
- [ ] Adaptation du data-access layer (ORM → SDK DynamoDB)
- [ ] Tests de performance (latence < 50ms)
- [ ] Rollback plan en cas d'échec

**Schéma proposé:**
```
Table: Sessions
PK: sessionId (String)
SK: METADATA
Attributes: name, createdBy, createdAt, status, roomCode

Table: Votes
PK: sessionId (String)
SK: storyId#userId#timestamp
Attributes: value, userName, revealedAt

Table: Stories
PK: sessionId (String)
SK: STORY#storyId
Attributes: title, description, order, estimationFinal
```

**Tâches techniques:**
- [ ] Infrastructure: Terraform pour DynamoDB
- [ ] Backend: Installer `@aws-sdk/client-dynamodb`
- [ ] Backend: Refactor `vote.data-access.ts` → DynamoDB
- [ ] Backend: Créer `session.data-access.ts`
- [ ] Backend: Créer `story.data-access.ts`
- [ ] Script: Migration SQL → DynamoDB
- [ ] Tests: Suite complète avec DynamoDB Local
- [ ] Documentation: Guide de migration

---

#### US-302: Historique des sessions avec filtres
**En tant qu'** utilisateur
**Je veux** consulter l'historique de toutes mes sessions
**Afin de** retrouver les estimations passées

**Critères d'acceptation:**
- [ ] Page `/history` avec liste paginée des sessions
- [ ] Filtres: date, équipe, nom de session
- [ ] Recherche par mot-clé
- [ ] Tri par date (croissant/décroissant)
- [ ] Export CSV de l'historique

**Tâches techniques:**
- [ ] Backend: GSI sur DynamoDB (createdBy, createdAt)
- [ ] Backend: Route GET `/api/sessions?userId=X&from=Y`
- [ ] Frontend: Page `/history`
- [ ] Frontend: Composant `SessionCard`
- [ ] Backend: Export CSV service

---

#### US-303: Détails d'une session passée
**En tant qu'** Product Owner
**Je veux** revoir les détails d'une session passée
**Afin de** comparer avec les estimations réelles

**Critères d'acceptation:**
- [ ] Vue détaillée de chaque story votée
- [ ] Affichage des votes individuels (qui a voté quoi)
- [ ] Statistiques de la session (durée, consensus, écart-type)
- [ ] Possibilité de dupliquer la session
- [ ] Téléchargement PDF du rapport

**Tâches techniques:**
- [ ] Backend: Route GET `/api/sessions/:id/details`
- [ ] Frontend: Page `/session/:id/report`
- [ ] Frontend: Graphique de distribution (Chart.js)
- [ ] Backend: Génération PDF (PDFKit)

---

#### US-304: Métriques et tracking avancé (DynamoDB Streams)
**En tant que** data analyst
**Je veux** des métriques détaillées sur les sessions
**Afin de** analyser les patterns de vote

**Critères d'acceptation:**
- [ ] DynamoDB Streams activé sur la table Votes
- [ ] Lambda pour agréger les métriques en temps réel
- [ ] Métriques: vitesse de vote, taux de consensus, écart-type moyen
- [ ] Dashboard avec graphiques (temps réel)
- [ ] Alertes si session trop longue (>2h)

**Tâches techniques:**
- [ ] Infrastructure: DynamoDB Streams + Lambda
- [ ] Backend: Lambda handler pour traiter les events
- [ ] Backend: Table `Metrics` (DynamoDB)
- [ ] Frontend: Page `/analytics`
- [ ] Frontend: Graphiques en temps réel (Recharts)

---

## Epic 4 - Améliorations UX/UI

### 🎯 Objectif
Rendre l'expérience utilisateur plus fluide et intuitive.

### User Stories

#### US-401: Mode sombre (Dark Mode)
**En tant qu'** utilisateur
**Je veux** un mode sombre
**Afin de** réduire la fatigue oculaire

**Critères d'acceptation:**
- [ ] Toggle "Clair / Sombre" dans le header
- [ ] Préférence sauvegardée dans localStorage
- [ ] Détection automatique du thème système
- [ ] Toutes les pages adaptées (pas de fond blanc)
- [ ] Transition fluide entre les thèmes

**Tâches techniques:**
- [ ] Frontend: Context `ThemeProvider`
- [ ] CSS: Variables CSS pour les couleurs
- [ ] CSS: Définir palette sombre
- [ ] Frontend: Hook `useTheme()`

---

#### US-402: Notifications toast pour les actions
**En tant qu'** utilisateur
**Je veux** des notifications visuelles
**Afin de** confirmer mes actions (vote enregistré, session créée)

**Critères d'acceptation:**
- [ ] Toast "✅ Vote enregistré" après avoir voté
- [ ] Toast "❌ Erreur de connexion" si échec
- [ ] Auto-dismiss après 3 secondes
- [ ] Possibilité de fermer manuellement
- [ ] Maximum 3 toasts visibles simultanément

**Tâches techniques:**
- [ ] Frontend: Installer `react-hot-toast` ou custom
- [ ] Frontend: Hook `useToast()`
- [ ] CSS: Animations d'apparition/disparition

---

#### US-403: Animations et transitions fluides
**En tant qu'** utilisateur
**Je veux** des animations subtiles
**Afin d'** avoir une expérience agréable

**Critères d'acceptation:**
- [ ] Transition au survol des cartes (scale + shadow)
- [ ] Animation de flip lors de la révélation
- [ ] Fade-in des participants rejoignant
- [ ] Skeleton loading pendant les requêtes
- [ ] Pas de lag (60fps garanti)

**Tâches techniques:**
- [ ] CSS: Animations avec `@keyframes`
- [ ] CSS: Transitions avec `will-change` pour perf
- [ ] Frontend: Composant `Skeleton`

---

#### US-404: Responsive mobile
**En tant qu'** utilisateur mobile
**Je veux** utiliser l'app sur téléphone
**Afin de** participer aux sessions en déplacement

**Critères d'acceptation:**
- [ ] Layout adapté sur écrans < 768px
- [ ] Cartes en colonne au lieu de grille
- [ ] Menu hamburger pour la navigation
- [ ] Touch-friendly (boutons > 44px)
- [ ] Pas de scroll horizontal

**Tâches techniques:**
- [ ] CSS: Media queries
- [ ] CSS: Flexbox/Grid responsive
- [ ] Frontend: Hook `useMediaQuery()`
- [ ] Tests: Chrome DevTools mobile

---

#### US-405: Choix du deck de cartes
**En tant qu'** utilisateur
**Je veux** choisir entre différents decks
**Afin de** m'adapter à différentes méthodes d'estimation

**Critères d'acceptation:**
- [ ] Fibonacci standard (1, 2, 3, 5, 8, 13, 21, 34, 55)
- [ ] Fibonacci modifié (0, 1, 2, 3, 5, 8, 13, 20, 40, 100)
- [ ] T-shirt sizes (XS, S, M, L, XL, XXL)
- [ ] Powers of 2 (1, 2, 4, 8, 16, 32)
- [ ] Sélection dans les paramètres de session

**Tâches techniques:**
- [ ] Backend: Champ `deckType` dans table Sessions
- [ ] Frontend: Sélecteur de deck
- [ ] Frontend: Mapping des valeurs par deck
- [ ] Frontend: Adapter CardSvg pour textes (XS, M...)

---

## Epic 5 - Administration et Modération

### 🎯 Objectif
Donner des outils de contrôle aux organisateurs de session.

### User Stories

#### US-501: Rôles utilisateur (Spectateur, Votant, Animateur)
**En tant qu'** animateur
**Je veux** définir des rôles
**Afin de** contrôler qui peut voter

**Critères d'acceptation:**
- [ ] Rôle "Spectateur" : voir uniquement, pas de vote
- [ ] Rôle "Votant" : peut voter
- [ ] Rôle "Animateur" : contrôle la session (next story, reveal)
- [ ] Changement de rôle en cours de session
- [ ] Badge visuel du rôle dans la liste des participants

**Tâches techniques:**
- [ ] Backend: Champ `role` dans Participants
- [ ] Backend: Middleware pour vérifier les permissions
- [ ] Frontend: Affichage conditionnel des boutons
- [ ] Frontend: Badge role (Admin, Voter, Observer)


---

#### US-503: Réinitialiser les votes
**En tant qu'** animateur
**Je veux** réinitialiser tous les votes
**Afin de** recommencer l'estimation d'une story

**Critères d'acceptation:**
- [ ] Bouton "Réinitialiser les votes"
- [ ] Tous les votes supprimés instantanément
- [ ] État "Non voté" pour tous les participants
- [ ] Notification "Votes réinitialisés" pour tous
- [ ] Historique conservé (log de réinitialisation)

**Tâches techniques:**
- [ ] Backend: WebSocket event `reset-votes`
- [ ] Backend: Soft delete des votes (keep history)
- [ ] Frontend: Modal de confirmation
- [ ] Frontend: Reset de l'état local

**Estimation:** 3 points
**Priorité:** 🟡 MOYENNE

---

## Epic 6 - Intégrations Externes

### 🎯 Objectif
Connecter Poker Planning avec les outils existants de l'équipe.

### User Stories

#### US-601: Import Jira (stories à estimer)
**En tant qu'** Product Owner
**Je veux** importer des tickets Jira
**Afin de** ne pas ressaisir les stories

**Critères d'acceptation:**
- [ ] Connexion OAuth avec Jira Cloud
- [ ] Sélection du projet Jira
- [ ] Filtrage par sprint ou label
- [ ] Import des tickets (titre, description, clé)
- [ ] Mapping automatique Jira → Stories

**Tâches techniques:**
- [ ] Backend: OAuth Jira (client ID/secret)
- [ ] Backend: API Jira REST v3
- [ ] Backend: Route POST `/api/integrations/jira/import`
- [ ] Frontend: Page `/integrations`
- [ ] Frontend: Formulaire de connexion Jira

**Estimation:** 13 points
**Priorité:** 🟡 MOYENNE

---

#### US-602: Export résultats vers Jira
**En tant qu'** Scrum Master
**Je veux** mettre à jour les story points dans Jira
**Afin de** synchroniser les estimations

**Critères d'acceptation:**
- [ ] Bouton "Exporter vers Jira" après session
- [ ] Mise à jour du champ "Story Points" automatique
- [ ] Mapping des valeurs (Fibonacci → Jira custom field)
- [ ] Confirmation avant export
- [ ] Rapport des tickets mis à jour

**Tâches techniques:**
- [ ] Backend: API Jira PUT `/issue/:key`
- [ ] Backend: Route POST `/api/sessions/:id/export-jira`
- [ ] Frontend: Modal de confirmation
- [ ] Backend: Gestion des erreurs Jira (permission, champ manquant)

**Estimation:** 8 points
**Priorité:** 🟢 BASSE

---

#### US-603: Webhooks pour notifier Slack
**En tant qu'** équipe
**Nous voulons** recevoir une notification Slack
**Afin d'** être alertés de la fin d'une session

**Critères d'acceptation:**
- [ ] Configuration webhook Slack dans les settings
- [ ] Message envoyé à la fin de la session
- [ ] Contenu: nom session, nombre de stories estimées, lien
- [ ] Format rich (bloc Slack avec boutons)
- [ ] Retry en cas d'échec d'envoi

**Tâches techniques:**
- [ ] Backend: Service `slack.service.ts`
- [ ] Backend: Route POST `/api/webhooks/slack`
- [ ] Backend: Event listener `session-ended`
- [ ] Backend: Slack Block Kit pour message
- [ ] Frontend: Formulaire config webhook

**Estimation:** 5 points
**Priorité:** 🟢 BASSE

---

## Epic 7 - Analytics et Rapports

### 🎯 Objectif
Fournir des insights sur les sessions de planning.

### User Stories

#### US-701: Dashboard d'équipe
**En tant que** manager
**Je veux** un dashboard avec les métriques d'équipe
**Afin d'** analyser la performance

**Critères d'acceptation:**
- [ ] Nombre total de sessions
- [ ] Taux de consensus moyen (% votes identiques)
- [ ] Temps moyen par story
- [ ] Graphique d'évolution dans le temps
- [ ] Comparaison entre équipes

**Tâches techniques:**
- [ ] Backend: Agrégation des données (DynamoDB queries)
- [ ] Backend: Route GET `/api/analytics/team/:teamId`
- [ ] Frontend: Page `/analytics`
- [ ] Frontend: Charts (Recharts ou Chart.js)

**Estimation:** 13 points
**Priorité:** 🟢 BASSE

---

#### US-702: Rapport de session PDF
**En tant qu'** Scrum Master
**Je veux** générer un PDF de la session
**Afin de** l'archiver ou le partager

**Critères d'acceptation:**
- [ ] Bouton "Télécharger PDF"
- [ ] Contenu: nom session, date, participants, stories, votes
- [ ] Graphiques inclus (distribution des votes)
- [ ] Branding (logo de l'entreprise)
- [ ] Génération rapide (<5s)

**Tâches techniques:**
- [ ] Backend: Librairie PDF (PDFKit ou Puppeteer)
- [ ] Backend: Template HTML/CSS pour PDF
- [ ] Backend: Route GET `/api/sessions/:id/pdf`
- [ ] Frontend: Bouton download

**Estimation:** 8 points
**Priorité:** 🟢 BASSE

---

#### US-802: CDN pour les assets statiques
**En tant qu'** utilisateur
**Je veux** un chargement rapide de la page
**Afin de** ne pas attendre

**Critères d'acceptation:**
- [ ] Assets (CSS, JS, images) servis via CloudFront
- [ ] Compression gzip/brotli
- [ ] Cache-Control headers optimisés
- [ ] Temps de chargement < 2s (Lighthouse > 90)
- [ ] Support HTTP/2

**Tâches techniques:**
- [ ] Infrastructure: CloudFront distribution (Terraform)
- [ ] Infrastructure: S3 bucket pour assets
- [ ] CI/CD: Upload assets vers S3 lors du build
- [ ] Frontend: Update des URLs vers CDN

**Estimation:** 8 points
**Priorité:** 🟡 MOYENNE

---

#### US-803: Auto-scaling du backend (ECS Fargate)
**En tant que** équipe technique
**Nous voulons** un auto-scaling automatique
**Afin de** gérer les pics de charge

**Critères d'acceptation:**
- [ ] Scale up si CPU > 70% pendant 2 min
- [ ] Scale down si CPU < 30% pendant 5 min
- [ ] Minimum 2 tasks, maximum 10 tasks
- [ ] Health checks sur `/health`
- [ ] Zero downtime pendant scaling

**Tâches techniques:**
- [ ] Infrastructure: ECS Service avec auto-scaling (Terraform)
- [ ] Infrastructure: Target tracking policy (CPU/Memory)
- [ ] Backend: Endpoint `/health` avec checks DB
- [ ] Monitoring: Alarmes CloudWatch

**Estimation:** 8 points
**Priorité:** 🟡 MOYENNE

---

#### US-804: Tests de charge
**En tant que** équipe technique
**Nous voulons** valider la scalabilité
**Afin de** garantir 1000 utilisateurs simultanés

**Critères d'acceptation:**
- [ ] Scénario: 1000 utilisateurs, 10 sessions, 100 votes/s
- [ ] Latence p95 < 200ms
- [ ] Taux d'erreur < 0.1%
- [ ] WebSocket connections stables
- [ ] Rapport de test automatisé

**Tâches techniques:**
- [ ] Tests: Script k6 ou Artillery
- [ ] CI/CD: Job de load testing
- [ ] Monitoring: Dashboard Grafana
- [ ] Documentation: Playbook incident

**Estimation:** 13 points
**Priorité:** 🟢 BASSE

---

## 📊 Métriques de Succès (KPIs)

### Adoption
- [ ] 100 utilisateurs actifs dans les 3 premiers mois
- [ ] 50 sessions/semaine
- [ ] Taux de rétention 60% (M1 → M3)

### Performance
- [ ] Temps de chargement < 2s
- [ ] Latence API p95 < 200ms
- [ ] Disponibilité 99.5%

### Satisfaction
- [ ] NPS > 40
- [ ] <5% taux d'abandon en cours de session
- [ ] Feedback positif > 80%

---

## 📋 Notes Techniques

### Stack Technologique Actuel
- **Frontend:** React 19, TypeScript, Vite, CSS Modules
- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL → **Migration vers DynamoDB prévue** 🚀
- **Déploiement:** Docker, AWS ECS Fargate
- **Linting:** Biome, Husky

### Stack Cible (après évolutions)
- **Frontend:** React 19, TypeScript, Vite, CSS Modules
- **Backend:** Node.js, Express, TypeScript, Socket.io
- **Database:** DynamoDB (avec Streams pour analytics)
- **Cache:** Redis (ElastiCache)
- **CDN:** CloudFront
- **Monitoring:** CloudWatch, Grafana
- **CI/CD:** GitHub Actions

---

## 🎯 Priorisation

### Critères de priorisation
1. **Valeur utilisateur** (impact sur l'expérience)
2. **Urgence business** (demandes internes)
3. **Dépendances techniques** (prérequis)
4. **Effort d'implémentation** (story points)

### Sprint 1 (Sprint actuel)
**Objectif:** Collaboration temps réel + Migration DynamoDB

- [ ] US-301: Migration DynamoDB (21 pts) - **CRITIQUE**
- [ ] US-101: WebSocket temps réel (13 pts)
- [ ] US-102: Salles privées (8 pts)

**Total:** 42 points

### Sprint 2
**Objectif:** Sessions structurées

- [ ] US-201: Créer session avec stories (13 pts)
- [ ] US-202: Navigation stories (5 pts)
- [ ] US-103: Révélation synchronisée (8 pts)
- [ ] US-104: Liste participants (5 pts)

**Total:** 31 points

