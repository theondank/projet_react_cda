import React, { useState } from "react";
import { useRecipes } from "@context/recipeContext";
import RecipeCardModern from "./RecipeCardModern";
import RecipeDetailModal from "./RecipeDetailModal";
import { LoadingState, ErrorState, EmptyState } from "@components/common";
import { Book } from "lucide-react";

const RecipeList = () => {
  const { recipes, loading, error, refresh } = useRecipes();
  const [openRecipeId, setOpenRecipeId] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getRecipeId = (recipe) => {
    return recipe.$id || recipe.id || recipe.nom;
  };

  const toggleEtapes = (recipeId) => {
    setOpenRecipeId(openRecipeId === recipeId ? null : recipeId);
  };

  const handleViewDetails = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={refresh} />;
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* En-tête moderne et épuré */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            <Book className="w-6 h-6 inline-block mr-2" />
            Toutes les Recettes
          </h1>
          <p className="text-neutral-600">
            {recipes.length > 0
              ? `Découvrez ${recipes.length} création${
                  recipes.length > 1 ? "s" : ""
                } culinaire${recipes.length > 1 ? "s" : ""}`
              : "Aucune recette disponible"}
          </p>
        </div>

        {/* Contenu */}
        {recipes.length === 0 ? (
          <EmptyState onRefresh={refresh} />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe, index) => {
              const recipeId = getRecipeId(recipe);
              return (
                <RecipeCardModern
                  key={recipeId || `recipe-${index}`}
                  recipe={recipe}
                  isExpanded={openRecipeId === recipeId}
                  onToggleExpand={() => toggleEtapes(recipeId)}
                  onViewDetails={handleViewDetails}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Modale pour les détails de recette */}
      <RecipeDetailModal
        recipe={selectedRecipe}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default RecipeList;
