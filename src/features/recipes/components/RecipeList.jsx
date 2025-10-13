import React, { useState } from "react";
import { useRecipes } from "@context/recipeContext";
import { MainLayout } from "@layouts/MainLayout";
import {
  PageCard,
  SectionCard,
  SectionTitle,
} from "@ui/page-card";
import { Button } from "@ui/button";
import RecipeCard from "./RecipeCard";
import RecipeDetail from "./RecipeDetail";
import {
  LoadingState,
  ErrorState,
  EmptyState,
} from "@components/common";

const RecipeList = () => {
  const { recipes, loading, error, refresh } = useRecipes();
  const [openRecipeId, setOpenRecipeId] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const getRecipeId = (recipe) => {
    return recipe.$id || recipe.id || recipe.nom;
  };

  const toggleEtapes = (recipeId) => {
    setOpenRecipeId(openRecipeId === recipeId ? null : recipeId);
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
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={refresh} />;
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
            <EmptyState onRefresh={refresh} />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recipes.map((recipe, index) => {
                const recipeId = getRecipeId(recipe);
                return (
                  <div key={recipeId || `recipe-${index}`} className="relative">
                    <RecipeCard
                      recipe={recipe}
                      isExpanded={openRecipeId === recipeId}
                      onToggleExpand={() => toggleEtapes(recipeId)}
                    />
                    <div className="mt-3 flex justify-center">
                      <Button
                        size="sm"
                        onClick={() => setSelectedRecipe(recipe)}
                        className="bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white border-0 rounded-full transition-all duration-200 px-6"
                      >
                        <span className="mr-1">👁️</span>
                        Voir les détails
                      </Button>
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
