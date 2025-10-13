import React from "react";

const RecipeMetadata = ({ recipe }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex items-center mb-2">
          <span className="text-purple-500 mr-2">🆔</span>
          <span className="font-medium text-gray-700">ID de la recette</span>
        </div>
        <p className="text-gray-600 font-mono text-sm">{recipe.$id}</p>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex items-center mb-2">
          <span className="text-purple-500 mr-2">🕒</span>
          <span className="font-medium text-gray-700">
            Dernière modification
          </span>
        </div>
        <p className="text-gray-600">
          {new Date(recipe.$updatedAt).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
};

export default RecipeMetadata;
