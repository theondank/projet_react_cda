// /src/components/recipes/RecipeCard.jsx

import React from "react";

// Fonction utilitaire, qu'on peut aussi importer depuis un fichier partagé
function getDifficultyEmoji(level) {
  const emojis = { 1: "🟢", 2: "🟡", 3: "🟠", 4: "🔴", 5: "🟣" };
  return emojis[level] || "⚪";
}

// Le composant attend 3 props :
// 1. `recipe`: un objet contenant toutes les données d'une recette
// 2. `isExpanded`: un booléen pour savoir si la carte doit afficher les étapes
// 3. `onToggleExpand`: une fonction à appeler quand on clique sur le bouton
export default function RecipeCard({ recipe, isExpanded, onToggleExpand }) {
  // On peut déstructurer l'objet recipe pour un accès plus facile
  const {
    $id,
    $createdAt,
    nom,
    description,
    difficulte,
    temps,
    prix,
    etapesPreparation,
  } = recipe;

  return (
    // On copie/colle le JSX qui était dans le .map() de MesRecettes.jsx
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-orange-200">
      {/* Contenu de la carte... */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-800 flex-1 mr-2">{nom}</h3>
        <span className="text-2xl">{getDifficultyEmoji(difficulte)}</span>
      </div>

      <p className="text-gray-600 mb-4 text-sm">{description}</p>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span className="flex items-center">
            <span className="text-orange-500 mr-1">⏰</span>
            {temps}min
          </span>
          <span className="flex items-center">
            <span className="text-green-500 mr-1">💰</span>
            {prix}€
          </span>
        </div>
      </div>

      <button
        // Le clic appelle la fonction passée en prop
        onClick={onToggleExpand}
        className="text-gray-600 hover:text-purple-600 text-sm font-medium flex items-center transition-colors w-full justify-center mb-2"
      >
        {/* On utilise la prop `isExpanded` pour décider de l'icône */}
        {isExpanded ? "🔽" : "▶️"} Voir les étapes
      </button>

      {/* On utilise la prop `isExpanded` pour afficher ou cacher les étapes */}
      {isExpanded && (
        <div className="mt-2 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
          <h4 className="font-semibold mb-2 text-purple-800">
            Étapes de préparation:
          </h4>
          <div className="text-sm text-gray-700 whitespace-pre-line">
            {etapesPreparation}
          </div>
        </div>
      )}

      <div className="mt-4 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-400 text-center">
          Créé le {new Date($createdAt).toLocaleDateString("fr-FR")}
        </p>
      </div>
    </div>
  );
}
