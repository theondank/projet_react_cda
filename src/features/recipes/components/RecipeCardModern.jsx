import React, { useState } from "react";
import { cn } from "@/shared/utils/utils";
import { UtensilsCrossed, Heart, Clock, DollarSign } from "lucide-react";

// Badge de difficulté moderne et minimaliste
function DifficultyBadge({ level }) {
  const difficulties = {
    1: {
      label: "Débutant",
      color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    2: {
      label: "Facile",
      color: "bg-green-50 text-green-700 border-green-200",
    },
    3: { label: "Moyen", color: "bg-amber-50 text-amber-700 border-amber-200" },
    4: {
      label: "Difficile",
      color: "bg-orange-50 text-orange-700 border-orange-200",
    },
    5: { label: "Expert", color: "bg-red-50 text-red-700 border-red-200" },
  };

  const diff = difficulties[level] || {
    label: "Non défini",
    color: "bg-neutral-50 text-neutral-700 border-neutral-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        diff.color
      )}
    >
      {diff.label}
    </span>
  );
}

export default function RecipeCardModern({
  recipe,
  isExpanded,
  onToggleExpand,
  onViewDetails,
}) {
  const [isLiked, setIsLiked] = useState(false);

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
    <article className="group bg-white rounded-2xl overflow-hidden border border-neutral-200 hover:border-neutral-300 transition-all duration-300 hover:shadow-lg">
      {/* Image de la recette */}
      <div className="relative aspect-video bg-neutral-100 overflow-hidden">
        {/* Placeholder image - À remplacer par une vraie image */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100">
          <UtensilsCrossed className="w-16 h-16 text-neutral-300" />
        </div>

        {/* Badge de difficulté en overlay */}
        <div className="absolute top-3 left-3">
          <DifficultyBadge level={difficulte} />
        </div>

        {/* Bouton like en overlay */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md"
          aria-label={isLiked ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <Heart
            className={`w-5 h-5 ${
              isLiked ? "fill-red-500 text-red-500" : "text-neutral-400"
            }`}
          />
        </button>
      </div>

      {/* Contenu */}
      <div className="p-5">
        {/* Titre */}
        <h3 className="text-lg font-semibold text-neutral-800 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {nom}
        </h3>

        {/* Description */}
        <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
          {description}
        </p>

        {/* Métadonnées */}
        <div className="flex items-center gap-4 mb-4 text-sm text-neutral-500">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{temps}min</span>
          </div>

          <div className="flex items-center gap-1.5">
            <DollarSign className="w-4 h-4" />
            <span>{prix}€</span>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex gap-2">
          <button
            onClick={onToggleExpand}
            className="flex-1 px-4 py-2 text-sm font-medium text-neutral-700 bg-neutral-50 hover:bg-neutral-100 rounded-lg transition-colors duration-200"
          >
            {isExpanded ? "Masquer" : "Étapes"}
          </button>

          {onViewDetails && (
            <button
              onClick={() => onViewDetails(recipe)}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors duration-200 shadow-sm"
            >
              Voir plus
            </button>
          )}
        </div>

        {/* Section étapes (expandable) */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-neutral-200 animate-in slide-in-from-top-2 duration-300">
            <h4 className="text-sm font-semibold text-neutral-700 mb-2">
              Étapes de préparation
            </h4>
            <div className="text-sm text-neutral-600 leading-relaxed whitespace-pre-line">
              {etapesPreparation}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 bg-neutral-50 border-t border-neutral-100">
        <p className="text-xs text-neutral-400 text-center">
          Créé le{" "}
          {new Date($createdAt).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
    </article>
  );
}
