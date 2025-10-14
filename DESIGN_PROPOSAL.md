# 🎨 Design System Moderne - Proposition

## Analyse de l'image de référence

L'image montre un design moderne avec :

- **Palette minimaliste** : Beige/crème, orange doux, vert pastel
- **Typographie claire** : Sans-serif moderne, hiérarchie visuelle forte
- **Espacement généreux** : Breathing room, pas d'éléments tassés
- **Photos de qualité** : Grande image mise en valeur
- **Badges subtils** : Notes, temps, niveau - design épuré
- **Icônes minimalistes** : Simples et fonctionnelles
- **Ombres douces** : Pas d'ombres dures, tout est subtil

## 🎯 Principes de Design

### 1. **Palette de Couleurs Épurée**

```css
/* Couleurs principales */
--primary: #F97316      /* Orange doux - accent principal */
--primary-light: #FDBA74 /* Orange clair */
--primary-lighter: #FED7AA /* Orange très clair */

/* Neutres (base du design) */
--neutral-50: #FAFAF9   /* Fond principal */
--neutral-100: #F5F5F4  /* Fond secondaire */
--neutral-200: #E7E5E4  /* Bordures subtiles */
--neutral-300: #D6D3D1  /* Bordures */
--neutral-400: #A8A29E  /* Texte désactivé */
--neutral-500: #78716C  /* Texte secondaire */
--neutral-600: #57534E  /* Texte principal */
--neutral-700: #44403C  /* Texte foncé */
--neutral-800: #292524  /* Titres */
--neutral-900: #1C1917  /* Noir presque */

/* Accents subtils */
--success: #10B981      /* Vert - actions positives */
--success-light: #D1FAE5 /* Vert clair */
--warning: #F59E0B      /* Ambre - attention */
--error: #EF4444        /* Rouge - erreurs */
--info: #3B82F6         /* Bleu - information */
```

### 2. **Typographie Moderne**

```css
/* Famille de polices */
font-family: 'Inter', 'SF Pro Display', -apple-system, system-ui, sans-serif;

/* Échelle typographique */
--text-xs: 0.75rem    /* 12px */
--text-sm: 0.875rem   /* 14px */
--text-base: 1rem     /* 16px */
--text-lg: 1.125rem   /* 18px */
--text-xl: 1.25rem    /* 20px */
--text-2xl: 1.5rem    /* 24px */
--text-3xl: 1.875rem  /* 30px */
--text-4xl: 2.25rem   /* 36px */

/* Poids de police */
--font-normal: 400
--font-medium: 500
--font-semibold: 600
--font-bold: 700
```

### 3. **Espacement Harmonieux**

```css
--spacing-1: 0.25rem   /* 4px */
--spacing-2: 0.5rem    /* 8px */
--spacing-3: 0.75rem   /* 12px */
--spacing-4: 1rem      /* 16px */
--spacing-5: 1.25rem   /* 20px */
--spacing-6: 1.5rem    /* 24px */
--spacing-8: 2rem      /* 32px */
--spacing-10: 2.5rem   /* 40px */
--spacing-12: 3rem     /* 48px */
```

### 4. **Ombres Subtiles**

```css
--shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
```

### 5. **Bordures Douces**

```css
--radius-sm: 0.375rem  /* 6px */
--radius-md: 0.5rem    /* 8px */
--radius-lg: 0.75rem   /* 12px */
--radius-xl: 1rem      /* 16px */
--radius-2xl: 1.5rem   /* 24px */
--radius-full: 9999px  /* Cercle */
```

## 📐 Composants Modernisés

### **RecipeCard** (inspiré de l'image)

- Fond blanc pur
- Image de recette en grand format (ratio 16:9)
- Titre en gras, taille généreuse
- Badges minimalistes (temps, niveau, note)
- Description courte et claire
- Boutons discrets avec icônes
- Hover subtil (légère élévation)
- Pas de couleurs criantes

### **Boutons**

- Style principal : Orange avec hover légèrement plus foncé
- Style secondaire : Bordure grise, fond blanc
- Style ghost : Transparent avec hover gris clair
- Padding généreux, texte lisible
- Icônes alignées avec le texte

### **Badges/Tags**

- Fond coloré très pâle
- Texte de la même couleur mais plus foncé
- Bordure optionnelle
- Padding compact
- Coins arrondis

### **Layout**

- Max-width conteneur : 1280px
- Grilles avec gaps généreux (24px+)
- Padding sections : 48px-64px
- Pas de fond coloré partout (principalement blanc/crème)

## 🚀 Améliorations à Implémenter

1. **Supprimer les gradients arc-en-ciel**

   - Remplacer par des fonds unis ou très subtils
   - Utiliser maximum 2-3 couleurs par composant

2. **Simplifier les ombres**

   - Réduire l'intensité
   - Utiliser des ombres plus douces

3. **Uniformiser les espacements**

   - Utiliser une échelle cohérente
   - Plus d'espace = plus de clarté

4. **Améliorer la hiérarchie**

   - Titres plus gros et plus gras
   - Texte secondaire plus petit et plus clair
   - Utiliser la taille, pas la couleur

5. **Photos de qualité**

   - Ajouter des images de recettes
   - Format consistant
   - Placeholder élégant si pas d'image

6. **Animations subtiles**
   - Transitions douces (200-300ms)
   - Hover states discrets
   - Pas de transformations exagérées
