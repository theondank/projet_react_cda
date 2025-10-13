# 🏗️ Architecture du Projet - Riz-Setter

## 📁 Structure des Dossiers

Cette architecture suit les meilleures pratiques React pour une application maintenable et scalable.

```
src/
├── app/                     # Configuration globale de l'application
│   ├── App.jsx             # Composant racine avec routing
│   └── main.jsx            # Point d'entrée de l'application
│
├── pages/                   # Pages principales de l'application
│   ├── auth/               # Pages d'authentification
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   └── index.js
│   ├── recipes/            # Pages de gestion des recettes
│   │   ├── RecipeListPage.jsx
│   │   ├── MyRecipesPage.jsx
│   │   └── index.js
│   └── account/            # Pages de compte utilisateur
│       └── AccountPage.jsx
│
├── features/               # Fonctionnalités métier par domaine
│   ├── auth/              # Domaine authentification
│   │   ├── components/    # Composants spécifiques à l'auth
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegisterForm.jsx
│   │   │   ├── Account.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── index.js
│   │   └── services/      # Services d'authentification
│   │
│   └── recipes/           # Domaine recettes
│       ├── components/    # Composants spécifiques aux recettes
│       │   ├── RecipeList.jsx
│       │   ├── MyRecipes.jsx
│       │   ├── RecipeDetail.jsx
│       │   ├── RecipeForm.jsx
│       │   ├── RecipeCard.jsx
│       │   ├── RecipeIngredients.jsx
│       │   ├── RecipeStats.jsx
│       │   ├── RecipeDescription.jsx
│       │   ├── RecipeSteps.jsx
│       │   ├── RecipeActions.jsx
│       │   ├── RecipeMetadata.jsx
│       │   ├── RecipeIngredientsSection.jsx
│       │   └── index.js
│       └── services/      # Services de gestion des recettes
│           ├── recipeService.js
│           └── index.js
│
├── shared/                 # Éléments partagés dans toute l'app
│   ├── components/        # Composants réutilisables
│   │   ├── ui/           # Composants UI génériques
│   │   │   ├── button.jsx
│   │   │   ├── input.jsx
│   │   │   ├── card.jsx
│   │   │   └── ...
│   │   └── common/       # Composants communs
│   │       ├── LoadingState.jsx
│   │       ├── ErrorState.jsx
│   │       ├── EmptyState.jsx
│   │       └── index.js
│   ├── hooks/            # Hooks personnalisés partagés
│   │   └── use-mobile.js
│   ├── services/         # Services partagés
│   │   ├── appwrite.js
│   │   └── index.js
│   └── utils/            # Utilitaires et helpers
│       ├── utils.js
│       └── index.js
│
├── context/               # Contextes React globaux
│   ├── authContext.jsx
│   ├── recipeContext.jsx
│   └── pageContext.jsx
│
├── layouts/              # Layouts de l'application
│   ├── AuthLayout.jsx
│   ├── MainLayout.jsx
│   └── SideBarLayout.jsx
│
└── assets/               # Ressources statiques
    └── react.svg
```

## 🎯 Principes Architecturaux

### 1. **Séparation par Domaine (Feature-based)**

- Chaque fonctionnalité métier (`auth`, `recipes`) est isolée
- Composants, services et logiques regroupés par domaine
- Facilite la maintenance et les tests

### 2. **Composants Réutilisables**

- `shared/components/ui/` : Composants UI génériques
- `shared/components/common/` : Composants métier partagés
- Design system cohérent

### 3. **Services Centralisés**

- `shared/services/` : Services partagés (Appwrite, etc.)
- `features/*/services/` : Services spécifiques à un domaine
- Séparation claire entre logique métier et présentation

### 4. **Pages vs Composants**

- `pages/` : Composants de niveau page avec routing
- `features/*/components/` : Composants métier spécialisés
- Hiérarchie claire et logique

## 📦 Avantages de cette Architecture

### ✅ **Maintenabilité**

- Code organisé par domaine métier
- Responsabilités clairement définies
- Facilité de modification et extension

### ✅ **Réutilisabilité**

- Composants UI génériques réutilisables
- Services partagés centralisés
- Évite la duplication de code

### ✅ **Testabilité**

- Isolation des fonctionnalités
- Tests unitaires facilités
- Mocking simplifié

### ✅ **Scalabilité**

- Ajout de nouvelles features facile
- Structure prévisible
- Gestion d'équipe améliorée

### ✅ **Developer Experience**

- Fichiers `index.js` pour imports simplifiés
- Structure intuitive
- Navigation rapide dans le code

## 🚀 Utilisation

### Imports Simplifiés

```javascript
// Au lieu de
import LoginForm from "../../../features/auth/components/LoginForm";

// Utilisez
import { LoginForm } from "@/features/auth/components";
```

### Ajout d'une Nouvelle Feature

1. Créer `src/features/nouvelle-feature/`
2. Ajouter `components/`, `services/`, `hooks/` selon besoin
3. Créer les fichiers `index.js` appropriés
4. Ajouter les pages dans `src/pages/`

Cette architecture assure une base solide pour le développement et la maintenance de l'application Riz-Setter ! 🎉
