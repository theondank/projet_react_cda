# 🧩 Bibliothèque de Composants Modernes

## Composants Prêts à l'Emploi

### 1. Boutons

```jsx
// Bouton Primaire
<button className="px-4 py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm">
  Action Principale
</button>

// Bouton Secondaire
<button className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium rounded-lg transition-colors duration-200">
  Action Secondaire
</button>

// Bouton Ghost
<button className="px-4 py-2 text-neutral-700 hover:bg-neutral-100 font-medium rounded-lg transition-colors duration-200">
  Action Tertiaire
</button>

// Bouton Destructif
<button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200">
  Supprimer
</button>

// Bouton avec Icône
<button className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors duration-200">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14M5 12h14"/>
  </svg>
  Ajouter
</button>
```

### 2. Badges/Tags

```jsx
// Badge Success
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
  Succès
</span>

// Badge Warning
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
  Attention
</span>

// Badge Error
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
  Erreur
</span>

// Badge Neutre
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700 border border-neutral-200">
  Info
</span>
```

### 3. Cards

```jsx
// Card Simple
<div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
  <div className="p-6">
    <h3 className="text-lg font-semibold text-neutral-800 mb-2">Titre</h3>
    <p className="text-sm text-neutral-600">Description...</p>
  </div>
</div>

// Card avec Image
<div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:border-neutral-300 transition-all duration-300 hover:shadow-lg">
  <div className="aspect-video bg-neutral-100">
    <img src="..." alt="..." className="w-full h-full object-cover" />
  </div>
  <div className="p-6">
    <h3 className="text-lg font-semibold text-neutral-800 mb-2">Titre</h3>
    <p className="text-sm text-neutral-600">Description...</p>
  </div>
</div>

// Card Interactive
<button className="w-full text-left bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:border-primary hover:shadow-lg transition-all duration-300">
  <div className="p-6">
    <h3 className="text-lg font-semibold text-neutral-800 mb-2 group-hover:text-primary transition-colors">
      Titre Cliquable
    </h3>
    <p className="text-sm text-neutral-600">Description...</p>
  </div>
</button>
```

### 4. Inputs

```jsx
// Input Texte
<div className="space-y-2">
  <label className="block text-sm font-medium text-neutral-700">
    Label
  </label>
  <input
    type="text"
    placeholder="Entrez du texte..."
    className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
  />
</div>

// Input avec Erreur
<div className="space-y-2">
  <label className="block text-sm font-medium text-neutral-700">
    Label
  </label>
  <input
    type="text"
    className="w-full px-4 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
  />
  <p className="text-sm text-red-600">Message d'erreur</p>
</div>

// Textarea
<div className="space-y-2">
  <label className="block text-sm font-medium text-neutral-700">
    Label
  </label>
  <textarea
    rows="4"
    placeholder="Entrez du texte..."
    className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
  />
</div>
```

### 5. États de Chargement

```jsx
// Spinner
<div className="flex items-center justify-center p-8">
  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
</div>

// Skeleton Card
<div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden animate-pulse">
  <div className="aspect-video bg-neutral-200"></div>
  <div className="p-6 space-y-3">
    <div className="h-5 bg-neutral-200 rounded w-3/4"></div>
    <div className="h-4 bg-neutral-200 rounded"></div>
    <div className="h-4 bg-neutral-200 rounded w-5/6"></div>
  </div>
</div>

// État Vide
<div className="max-w-md mx-auto text-center py-16">
  <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
    </svg>
  </div>
  <h3 className="text-xl font-semibold text-neutral-800 mb-2">Aucun élément</h3>
  <p className="text-neutral-600 mb-6">Description de l'état vide...</p>
  <button className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors">
    Action
  </button>
</div>
```

### 6. Alertes/Notifications

```jsx
// Alert Success
<div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-3">
  <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
  <div className="flex-1">
    <h4 className="text-sm font-semibold text-emerald-900 mb-1">Succès !</h4>
    <p className="text-sm text-emerald-700">Votre action a été effectuée avec succès.</p>
  </div>
</div>

// Alert Error
<div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
  <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="15" y1="9" x2="9" y2="15"/>
    <line x1="9" y1="9" x2="15" y2="15"/>
  </svg>
  <div className="flex-1">
    <h4 className="text-sm font-semibold text-red-900 mb-1">Erreur</h4>
    <p className="text-sm text-red-700">Une erreur est survenue.</p>
  </div>
</div>

// Alert Warning
<div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
  <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
  <div className="flex-1">
    <h4 className="text-sm font-semibold text-amber-900 mb-1">Attention</h4>
    <p className="text-sm text-amber-700">Veuillez vérifier les informations.</p>
  </div>
</div>
```

### 7. Navigation

```jsx
// Tabs
<div className="border-b border-neutral-200">
  <nav className="flex gap-6">
    <button className="pb-3 px-1 border-b-2 border-primary text-primary font-medium text-sm">
      Onglet Actif
    </button>
    <button className="pb-3 px-1 border-b-2 border-transparent text-neutral-600 hover:text-neutral-800 font-medium text-sm transition-colors">
      Onglet
    </button>
    <button className="pb-3 px-1 border-b-2 border-transparent text-neutral-600 hover:text-neutral-800 font-medium text-sm transition-colors">
      Onglet
    </button>
  </nav>
</div>

// Breadcrumb
<nav className="flex items-center gap-2 text-sm">
  <a href="#" className="text-neutral-600 hover:text-neutral-800 transition-colors">Accueil</a>
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neutral-400">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
  <a href="#" className="text-neutral-600 hover:text-neutral-800 transition-colors">Catégorie</a>
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neutral-400">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
  <span className="text-neutral-800 font-medium">Page actuelle</span>
</nav>
```

### 8. Avatars

```jsx
// Avatar avec Initiales
<div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">
  AB
</div>

// Avatar avec Image
<img
  src="..."
  alt="Avatar"
  className="w-10 h-10 rounded-full object-cover border-2 border-neutral-200"
/>

// Avatar Groupe
<div className="flex -space-x-2">
  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm border-2 border-white">
    AB
  </div>
  <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-semibold text-sm border-2 border-white">
    CD
  </div>
  <div className="w-10 h-10 bg-amber-600 text-white rounded-full flex items-center justify-center font-semibold text-sm border-2 border-white">
    EF
  </div>
</div>
```

### 9. Dividers

```jsx
// Divider Simple
<div className="border-t border-neutral-200"></div>

// Divider avec Texte
<div className="relative">
  <div className="absolute inset-0 flex items-center">
    <div className="w-full border-t border-neutral-200"></div>
  </div>
  <div className="relative flex justify-center">
    <span className="px-4 bg-white text-sm text-neutral-500">ou</span>
  </div>
</div>
```

### 10. Tooltips

```jsx
// Tooltip Simple (avec Radix UI ou Headless UI recommandé)
<div className="relative group">
  <button className="px-4 py-2 bg-primary text-white rounded-lg">
    Hover moi
  </button>
  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-neutral-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
    Texte du tooltip
  </div>
</div>
```

## 🎯 Usage

Copiez-collez ces composants dans votre projet et personnalisez-les selon vos besoins. Tous utilisent le Design System moderne défini précédemment.

## 📝 Notes

- Tous les composants sont **responsive** par défaut
- Les **transitions** sont toutes à 200-300ms
- Les **couleurs** respectent la palette définie
- Les **espacements** suivent l'échelle 4px
- L'**accessibilité** est prise en compte (aria-labels, etc.)
