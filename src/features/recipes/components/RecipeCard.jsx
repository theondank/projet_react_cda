// /src/components/recipes/RecipeCard.jsx

import React, { useState } from "react";
import {
  Gauge,
  Clock,
  DollarSign,
  Heart,
  ChevronDown,
  ChevronRight,
  Eye,
} from "lucide-react";

// Fonction utilitaire pour obtenir la couleur de difficulté
function getDifficultyColor(level) {
  const colors = {
    1: "text-green-500",
    2: "text-yellow-500",
    3: "text-orange-500",
    4: "text-red-500",
    5: "text-purple-500",
  };
  return colors[level] || "text-gray-400";
}

// Le composant attend 4 props :
// 1. `recipe`: un objet contenant toutes les données d'une recette
// 2. `isExpanded`: un booléen pour savoir si la carte doit afficher les étapes
// 3. `onToggleExpand`: une fonction à appeler quand on clique sur le bouton
// 4. `onViewDetails`: une fonction optionnelle pour voir les détails complets
export default function RecipeCard({
  recipe,
  isExpanded,
  onToggleExpand,
  onViewDetails,
}) {
  // État local pour gérer le like
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  // Fonction pour gérer le clic sur le bouton de like
  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

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
        <Gauge className={`w-6 h-6 ${getDifficultyColor(difficulte)}`} />
      </div>

      <p className="text-gray-600 mb-4 text-sm">{description}</p>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-primary" />
            {temps}min
          </span>
          <span className="flex items-center gap-1">
            <DollarSign className="w-4 h-4 text-green-600" />
            {prix}€
          </span>
        </div>

        {/* Bouton de like */}
        <button
          onClick={handleLikeClick}
          className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all duration-200 ${
            isLiked
              ? "bg-red-100 text-red-600 hover:bg-red-200"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
          <span className="text-xs font-medium">{likeCount}</span>
        </button>
      </div>

      {/* Section des boutons d'action */}
      <div className="flex gap-2 mb-2">
        <button
          onClick={onToggleExpand}
          className="flex-1 text-gray-600 hover:text-purple-600 text-sm font-medium flex items-center justify-center gap-1 transition-colors py-2 px-3 rounded-lg hover:bg-purple-50"
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
          Voir les étapes
        </button>

        {/* Bouton Voir les détails - affiché seulement si onViewDetails est fourni */}
        {onViewDetails && (
          <button
            onClick={() => onViewDetails(recipe)}
            className="flex-1 bg-primary hover:bg-primary/90 text-white text-sm font-medium flex items-center justify-center gap-1 transition-colors duration-200 py-2 px-3 rounded-lg"
          >
            <Eye className="w-4 h-4" />
            Voir les détails
          </button>
        )}
      </div>

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
