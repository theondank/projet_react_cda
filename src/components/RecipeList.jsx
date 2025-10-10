import React, { useState } from "react";
import { useRecipes } from "../context/recipeContext";
import RecipeIngredients from "./recipeIngredients";
import { MainLayout } from "../layouts/MainLayout";
import { PageCard, SectionCard, SectionTitle } from "./ui/page-card";
import { Button } from "./ui/button";
import RecipeDetail from "./RecipeDetail";

const RecipeList = () => {
  const { recipes, loading, error, refresh } = useRecipes();
  const [openRecipeId, setOpenRecipeId] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const getDifficultyEmoji = (level) => {
    const emojis = { 1: "🟢", 2: "🟡", 3: "🟠", 4: "🔴", 5: "🟣" };
    return emojis[level] || "⚪";
  };

  const getRecipeId = (recipe) => {
    return recipe.$id || recipe.id || recipe.nom;
  };

  const toggleEtapes = (recipeId) => {
    if (openRecipeId === recipeId) {
      setOpenRecipeId(null);
    } else {
      setOpenRecipeId(recipeId);
    }
  };

  if (selectedRecipe) {
    return (
      <RecipeDetail
        recipe={selectedRecipe}
        onBack={() => setSelectedRecipe(null)}
      />
    );
  }

  if (loading) {
    return (
      <MainLayout title="Recettes" subtitle="Chargement en cours..." icon="⏳">
        <PageCard>
          <div className="flex justify-center items-center p-12">
            <div className="text-center">
              <span className="text-4xl mb-4 block">⏳</span>
              <div className="text-lg text-gray-600">
                Chargement des recettes...
              </div>
            </div>
          </div>
        </PageCard>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout title="Erreur" subtitle="Problème de chargement" icon="⚠️">
        <PageCard>
          <SectionCard gradient="from-red-50 to-pink-50">
            <div className="text-center">
              <span className="text-4xl mb-4 block">😞</span>
              <h3 className="font-medium text-red-800 mb-2">Erreur</h3>
              <p className="mt-1 text-sm text-red-600 mb-4">{error}</p>
              <Button
                onClick={refresh}
                className="bg-gradient-to-r from-red-400 to-pink-400 hover:from-red-500 hover:to-pink-500 text-white border-0 rounded-full px-6 py-2 shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <span className="mr-2">🔄</span>
                Réessayer
              </Button>
            </div>
          </SectionCard>
        </PageCard>
      </MainLayout>
    );
  }

  return (
    <MainLayout
      title="Recettes"
      subtitle={`Découvrez ${recipes.length} création${
        recipes.length > 1 ? "s" : ""
      } culinaire${recipes.length > 1 ? "s" : ""}`}
      icon="📚"
    >
      <PageCard>
        <SectionCard gradient="from-amber-50 to-orange-50">
          <SectionTitle icon="🍽️">Recettes créées avec amour</SectionTitle>

          {recipes.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block">🍳</span>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Aucune recette pour le moment
              </h3>
              <p className="text-gray-500 mb-6">
                Commencez par créer votre première recette !
              </p>
              <Button
                onClick={refresh}
                className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white border-0 rounded-full px-8 py-3 shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <span className="mr-2">✨</span>
                Créer ma première recette
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recipes.map((recipe, index) => {
                const recipeId = getRecipeId(recipe);
                return (
                  <div
                    key={recipeId || `recipe-${index}`}
                    className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-orange-200"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-800 flex-1 mr-2">
                        {recipe.nom}
                      </h3>
                      <span className="text-2xl">
                        {getDifficultyEmoji(recipe.difficulte)}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4 text-sm">
                      {recipe.description}
                    </p>

                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <span className="text-orange-500 mr-1">⏰</span>
                          {recipe.temps}min
                        </span>
                        <span className="flex items-center">
                          <span className="text-green-500 mr-1">💰</span>
                          {recipe.prix}€
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <RecipeIngredients recipeId={recipeId} />
                    </div>

                    <div className="flex space-x-2 mb-3">
                      <Button
                        size="sm"
                        onClick={() => setSelectedRecipe(recipe)}
                        className="flex-1 bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white border-0 rounded-full transition-all duration-200"
                      >
                        <span className="mr-1">👁️</span>
                        Voir
                      </Button>
                    </div>

                    <button
                      onClick={() => toggleEtapes(recipeId)}
                      className="text-gray-600 hover:text-purple-600 text-sm font-medium flex items-center transition-colors w-full justify-center"
                    >
                      {openRecipeId === recipeId ? "🔽" : "▶️"} Voir les détails
                    </button>

                    {openRecipeId === recipeId && (
                      <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                        <h4 className="font-semibold mb-2 text-purple-800">
                          Étapes de préparation:
                        </h4>
                        <div className="text-sm text-gray-700 whitespace-pre-line">
                          {recipe.etapesPreparation}
                        </div>
                      </div>
                    )}

                    <div className="mt-4 pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-400 text-center">
                        Créé le{" "}
                        {new Date(recipe.createdAt).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </SectionCard>
      </PageCard>
    </MainLayout>
  );
};

export default RecipeList;
