import React from "react";

const getDifficultyEmoji = (level) => {
  const emojis = { 1: "🟢", 2: "🟡", 3: "🟠", 4: "🔴", 5: "🟣" };
  return emojis[level] || "⚪";
};

const getDifficultyText = (level) => {
  const texts = {
    1: "Très facile",
    2: "Facile",
    3: "Modéré",
    4: "Difficile",
    5: "Très difficile",
  };
  return texts[level] || "Non défini";
};

const RecipeStats = ({ recipe }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div className="bg-white rounded-2xl p-4 text-center shadow-md">
        <div className="text-3xl mb-2">⏰</div>
        <div className="text-xl font-bold text-orange-600">
          {recipe.temps} min
        </div>
        <div className="text-sm text-gray-600">Temps de préparation</div>
      </div>

      <div className="bg-white rounded-2xl p-4 text-center shadow-md">
        <div className="text-3xl mb-2">
          {getDifficultyEmoji(recipe.difficulte)}
        </div>
        <div className="text-xl font-bold text-red-600">
          {getDifficultyText(recipe.difficulte)}
        </div>
        <div className="text-sm text-gray-600">Difficulté</div>
      </div>

      <div className="bg-white rounded-2xl p-4 text-center shadow-md">
        <div className="text-3xl mb-2">💰</div>
        <div className="text-xl font-bold text-green-600">{recipe.prix} €</div>
        <div className="text-sm text-gray-600">Prix estimé</div>
      </div>

      <div className="bg-white rounded-2xl p-4 text-center shadow-md">
        <div className="text-3xl mb-2">📅</div>
        <div className="text-xl font-bold text-blue-600">
          {new Date(recipe.$createdAt).toLocaleDateString("fr-FR")}
        </div>
        <div className="text-sm text-gray-600">Créée le</div>
      </div>
    </div>
  );
};

export default RecipeStats;
