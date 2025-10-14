# 🎨 Guide de Style - Design System Moderne

## 🎯 Philosophie de Design

### Minimalisme Fonctionnel

- **Moins, c'est plus** : Chaque élément a un but
- **Clarté avant tout** : L'information doit être immédiatement compréhensible
- **Cohérence** : Mêmes patterns partout dans l'application

## 🎨 Palette de Couleurs

### Couleur Principale

```css
--primary: #F97316     /* Orange - Actions principales */
--primary-hover: #EA580C
--primary-light: #FDBA74
```

**Utilisation :**

- Boutons d'action principaux
- Liens importants
- Éléments interactifs clés
- Maximum 10-15% de la surface visible

### Neutre (Base)

```css
--neutral-50: #FAFAF9   /* Fond principal */
--neutral-100: #F5F5F4  /* Fond secondaire */
--neutral-200: #E7E5E4  /* Bordures subtiles */
--neutral-500: #78716C  /* Texte secondaire */
--neutral-800: #292524  /* Texte principal */
```

**Utilisation :**

- 85% de l'interface
- Fonds, bordures, textes
- Créer de la hiérarchie par contraste

### Accent Sémantique

```css
--success: #10B981   /* Vert - Succès */
--error: #EF4444     /* Rouge - Erreur */
--warning: #F59E0B   /* Ambre - Attention */
--info: #3B82F6      /* Bleu - Information */
```

**Utilisation :**

- Uniquement pour les messages d'état
- Badges de statut
- Notifications
- **JAMAIS** pour la décoration

## 📝 Typographie

### Hiérarchie

```css
h1: 2.25rem (36px) - font-bold - text-neutral-900
h2: 1.875rem (30px) - font-bold - text-neutral-800
h3: 1.5rem (24px) - font-semibold - text-neutral-800
h4: 1.25rem (20px) - font-semibold - text-neutral-700
p: 1rem (16px) - font-normal - text-neutral-600
small: 0.875rem (14px) - font-normal - text-neutral-500
```

### Règles

- **Maximum 3 niveaux** dans un composant
- **Taille pour hiérarchie**, pas la couleur
- Line-height : 1.5 pour le corps, 1.2 pour les titres
- Letter-spacing : Par défaut (pas de modification)

## 🎯 Composants Standards

### Boutons

#### Primaire

```jsx
<button className="px-4 py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm">
  Action
</button>
```

#### Secondaire

```jsx
<button className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium rounded-lg transition-colors duration-200">
  Action
</button>
```

#### Ghost

```jsx
<button className="px-4 py-2 text-neutral-700 hover:bg-neutral-100 font-medium rounded-lg transition-colors duration-200">
  Action
</button>
```

### Cards

```jsx
<div className="bg-white rounded-2xl border border-neutral-200 hover:border-neutral-300 transition-all duration-300 overflow-hidden">
  {/* Contenu */}
</div>
```

**Règles :**

- Fond blanc pur
- Bordure neutre subtile
- Hover : bordure + ombre
- Pas de gradients
- Coins arrondis : 1rem (16px)

### Badges

```jsx
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
  Badge
</span>
```

**Règles :**

- Fond coloré pâle (-50)
- Texte foncé (-700)
- Bordure optionnelle
- Petit et discret

## 📐 Espacements

### Échelle (basée sur 4px)

```
0.25rem (4px)   - Micro espacement
0.5rem (8px)    - Espacement minimal
0.75rem (12px)  - Petit
1rem (16px)     - Normal
1.5rem (24px)   - Moyen
2rem (32px)     - Grand
3rem (48px)     - Très grand
```

### Règles

- Utiliser la même échelle partout
- Plus d'espace = plus de clarté
- Grouper les éléments liés avec moins d'espace
- Séparer les sections avec plus d'espace

## 🎭 Ombres

```css
/* Utiliser avec parcimonie */
shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1); /* Cartes au repos */
shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1); /* Cartes hover */
shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1); /* Modales */
```

**Règles :**

- Maximum 2 niveaux d'ombre par vue
- Ombre douce, jamais dure
- Utiliser hover pour ajouter de l'ombre

## 🎬 Animations

### Transitions Standards

```css
transition-all duration-200  /* Hover buttons */
transition-colors duration-300  /* Couleurs */
transition-opacity duration-200  /* Fades */
```

**Règles :**

- 200-300ms maximum
- ease ou ease-out
- Pas de cubic-bezier complexes
- Hover = subtil (pas de scale >1.05)

## ❌ À Éviter

### Couleurs

- ❌ Plus de 3 couleurs sur un composant
- ❌ Gradients arc-en-ciel
- ❌ Couleurs saturées partout
- ❌ Texte coloré pour la hiérarchie

### Layout

- ❌ Composants trop serrés
- ❌ Fonds colorés partout
- ❌ Bordures épaisses
- ❌ Multiple box-shadows

### Typographie

- ❌ Plus de 3 tailles de police
- ❌ Italic excessif
- ❌ All caps dans le corps
- ❌ Texte justifié

### Animations

- ❌ Animations automatiques non nécessaires
- ❌ Durées > 500ms
- ❌ Transformations exagérées
- ❌ Trop d'éléments animés simultanément

## ✅ Checklist Design

Avant de valider un composant :

- [ ] Maximum 3 couleurs utilisées
- [ ] Hiérarchie visuelle claire
- [ ] Espacements cohérents (échelle 4px)
- [ ] Animations < 300ms
- [ ] Lisible sur fond blanc
- [ ] Responsive (mobile-first)
- [ ] Accessible (contraste > 4.5:1)
- [ ] Icônes cohérentes
- [ ] Pas de gradient décoratif
- [ ] États hover/focus définis

## 🎯 Exemples de Transformation

### Avant (Trop coloré)

```jsx
<div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-orange-200">
  <button className="bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500">
    Action
  </button>
</div>
```

### Après (Épuré)

```jsx
<div className="bg-white rounded-lg p-4 border border-neutral-200">
  <button className="bg-primary hover:bg-primary/90 text-white">Action</button>
</div>
```

## 🚀 Migration Progressive

1. **Phase 1** : Remplacer les couleurs par des neutres
2. **Phase 2** : Simplifier les ombres et bordures
3. **Phase 3** : Uniformiser les espacements
4. **Phase 4** : Optimiser la typographie
5. **Phase 5** : Peaufiner les animations
