import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "@context/authContext";
import { recetteAPI } from "../services";
import RecipeCardModern from "./RecipeCardModern";
import RecipeDetailModal from "./RecipeDetailModal";

export default function MyRecipesModern() {
  const { loggedInUser } = useContext(AuthContext);
  const [userRecipes, setUserRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [openRecipeId, setOpenRecipeId] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchUserRecipes() {
      if (!loggedInUser?.$id) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await recetteAPI.listRecettesParUtilisateur(
          loggedInUser.$id
        );
        setUserRecipes(response.rows || []);
      } catch (err) {
        console.error("Erreur MesRecettes:", err);
        setFetchError("Impossible de charger vos recettes.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserRecipes();
  }, [loggedInUser]);

  const toggleEtapes = (id) => {
    setOpenRecipeId(openRecipeId === id ? null : id);
  };

  const handleViewDetails = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600">Chargement de vos recettes...</p>
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-xl font-semibold text-neutral-800 mb-2">
            Une erreur est survenue
          </h2>
          <p className="text-neutral-600">{fetchError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Mes Recettes
          </h1>
          <p className="text-neutral-600">
            {userRecipes.length > 0
              ? `${userRecipes.length} recette${
                  userRecipes.length > 1 ? "s" : ""
                } créée${userRecipes.length > 1 ? "s" : ""}`
              : "Aucune recette pour le moment"}
          </p>
        </div>

        {/* Contenu */}
        {userRecipes.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-16">
            <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-5xl">🍳</span>
            </div>
            <h3 className="text-xl font-semibold text-neutral-800 mb-2">
              Aucune recette créée
            </h3>
            <p className="text-neutral-600 mb-6">
              Créez votre première recette pour la voir apparaître ici !
            </p>
            <button className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm">
              Créer une recette
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {userRecipes.map((recipe) => (
              <RecipeCardModern
                key={recipe.$id}
                recipe={recipe}
                isExpanded={openRecipeId === recipe.$id}
                onToggleExpand={() => toggleEtapes(recipe.$id)}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modale pour les détails */}
      <RecipeDetailModal
        recipe={selectedRecipe}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
