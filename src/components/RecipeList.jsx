import React from "react";
import { useRecipes } from "../context/recipeContext";

const RecipeList = () => {
  const { recipes, loading, error, refresh } = useRecipes();

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-lg">Chargement des recettes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 m-4">
        <div className="flex">
          <div className="text-red-800">
            <h3 className="font-medium">Erreur</h3>
            <p className="mt-1 text-sm">{error}</p>
            <button
              onClick={refresh}
              className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">Aucune recette trouvée</p>
        <button
          onClick={refresh}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Actualiser
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Mes Recettes Riz-Setter
        </h1>
        <button
          onClick={refresh}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Actualiser
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {recipe.nom}
            </h2>

            <div className="text-sm text-gray-600 mb-3">
              <span className="inline-flex items-center">
                ⏱️ Temps: {recipe.temps} minutes
              </span>
            </div>

            <p className="text-gray-700 text-sm leading-relaxed">
              {recipe.description}
            </p>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                Créé le:{" "}
                {new Date(recipe.createdAt).toLocaleDateString("fr-FR")}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        {recipes.length} recette{recipes.length > 1 ? "s" : ""} trouvée
        {recipes.length > 1 ? "s" : ""}
      </div>
    </div>
  );
};

export default RecipeList;
