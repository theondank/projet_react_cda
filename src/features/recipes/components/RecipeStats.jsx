import React from "react";
import { Clock, Gauge, DollarSign, Calendar } from "lucide-react";

const getDifficultyColor = (level) => {
  const colors = {
    1: "text-green-500",
    2: "text-yellow-500",
    3: "text-orange-500",
    4: "text-red-500",
    5: "text-purple-500",
  };
  return colors[level] || "text-neutral-400";
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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white rounded-lg p-4 text-center border border-neutral-200">
        <Clock className="w-8 h-8 mx-auto mb-2 text-primary" />
        <div className="text-lg font-semibold text-neutral-800">
          {recipe.temps} min
        </div>
        <div className="text-xs text-neutral-500 mt-1">
          Temps de préparation
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 text-center border border-neutral-200">
        <Gauge
          className={`w-8 h-8 mx-auto mb-2 ${getDifficultyColor(
            recipe.difficulte
          )}`}
        />
        <div className="text-lg font-semibold text-neutral-800">
          {getDifficultyText(recipe.difficulte)}
        </div>
        <div className="text-xs text-neutral-500 mt-1">Difficulté</div>
      </div>

      <div className="bg-white rounded-lg p-4 text-center border border-neutral-200">
        <DollarSign className="w-8 h-8 mx-auto mb-2 text-green-600" />
        <div className="text-lg font-semibold text-neutral-800">
          {recipe.prix} €
        </div>
        <div className="text-xs text-neutral-500 mt-1">Prix estimé</div>
      </div>

      <div className="bg-white rounded-lg p-4 text-center border border-neutral-200">
        <Calendar className="w-8 h-8 mx-auto mb-2 text-blue-600" />
        <div className="text-lg font-semibold text-neutral-800">
          {new Date(recipe.$createdAt).toLocaleDateString("fr-FR")}
        </div>
        <div className="text-xs text-neutral-500 mt-1">Créée le</div>
      </div>
    </div>
  );
};

export default RecipeStats;
