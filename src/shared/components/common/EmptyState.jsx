import React from "react";

const EmptyState = ({
  icon = "🍳",
  title = "Aucune recette pour le moment",
  description = "Commencez par créer votre première recette !",
  actionLabel = "Créer une recette",
  onAction,
}) => {
  return (
    <div className="max-w-md mx-auto text-center py-16">
      {/* Icône épurée */}
      <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <span className="text-5xl">{icon}</span>
      </div>

      <h3 className="text-xl font-semibold text-neutral-800 mb-2">{title}</h3>
      <p className="text-neutral-600 mb-6">{description}</p>

      {onAction && (
        <button
          onClick={onAction}
          className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
