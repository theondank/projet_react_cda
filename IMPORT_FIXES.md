# 🔧 Guide de Correction des Imports

## ✅ Corrections Effectuées

### Fichiers Principaux

- ✅ `src/app/main.jsx` - CSS et contextes corrigés
- ✅ `src/app/App.jsx` - Tous les imports mis à jour vers la nouvelle architecture
- ✅ `src/context/authContext.jsx` - Import d'Appwrite corrigé
- ✅ `src/context/recipeContext.jsx` - Import du service recettes corrigé
- ✅ `src/features/auth/components/LoginForm.jsx` - Imports UI et contexte corrigés
- ✅ `src/features/recipes/components/RecipeList.jsx` - Imports de layout et composants corrigés

## 🛠️ Patterns de Correction

### Depuis `src/features/auth/components/`:

```javascript
// Ancien
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { AuthContext } from "../context/authContext";

// Nouveau
import { Button } from "../../../shared/components/ui/button";
import { cn } from "../../../shared/utils";
import { AuthContext } from "../../../context/authContext";
```

### Depuis `src/features/recipes/components/`:

```javascript
// Ancien
import { recetteAPI } from "../lib/recette";
import { MainLayout } from "../layouts/MainLayout";
import LoadingState from "./LoadingState";

// Nouveau
import { recetteAPI } from "../services";
import { MainLayout } from "../../../layouts/MainLayout";
import { LoadingState } from "../../../shared/components/common";
```

### Depuis `src/features/recipes/services/`:

```javascript
// Ancien
import { tablesDB } from "./appwrite";

// Nouveau
import { tablesDB } from "../../../shared/services/appwrite";
```

## 📝 Fichiers Restants à Corriger

### Composants Auth

- [ ] `src/features/auth/components/RegisterForm.jsx`
- [ ] `src/features/auth/components/Account.jsx`
- [ ] `src/features/auth/components/ProtectedRoute.jsx`

### Composants Recipes

- [ ] `src/features/recipes/components/MyRecipes.jsx`
- [ ] `src/features/recipes/components/RecipeDetail.jsx`
- [ ] `src/features/recipes/components/RecipeForm.jsx`
- [ ] `src/features/recipes/components/RecipeCard.jsx`
- [ ] `src/features/recipes/components/RecipeIngredients.jsx`
- [ ] `src/features/recipes/components/RecipeStats.jsx`
- [ ] `src/features/recipes/components/RecipeDescription.jsx`
- [ ] `src/features/recipes/components/RecipeSteps.jsx`
- [ ] `src/features/recipes/components/RecipeActions.jsx`
- [ ] `src/features/recipes/components/RecipeMetadata.jsx`
- [ ] `src/features/recipes/components/RecipeIngredientsSection.jsx`

### Services

- [ ] `src/features/recipes/services/recipeService.js`

### Layouts

- [ ] `src/layouts/SideBarLayout.jsx`
- [ ] `src/layouts/AuthLayout.jsx`
- [ ] `src/layouts/MainLayout.jsx`

## 🎯 Méthode Recommandée

1. **Ouvrir chaque fichier individuellement**
2. **Identifier les imports cassés** (lignes rouges dans l'éditeur)
3. **Appliquer les patterns de correction** selon le dossier source
4. **Tester que l'import fonctionne** en vérifiant l'IntelliSense

## 🚀 Test Final

Une fois tous les imports corrigés :

```bash
npm run dev
```

L'application devrait démarrer sans erreurs d'import ! 🎉
