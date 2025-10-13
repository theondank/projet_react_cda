// Fichier : /src/components/pages/MesRecettes.jsx

import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "@context/authContext";
import { recetteAPI } from "../services";
import RecipeCard from "./recipeCard";

function getDifficultyEmoji(level) {
  const emojis = { 1: "🟢", 2: "🟡", 3: "🟠", 4: "🔴", 5: "🟣" };
  return emojis[level] || "⚪";
}

export default function MesRecettes() {
  const { loggedInUser } = useContext(AuthContext);
  const [userRecipes, setUserRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [openRecipeId, setOpenRecipeId] = useState(null);

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
  }, [loggedInUser]); // Se redéclenche si l'utilisateur change

  const toggleEtapes = (id) => {
    setOpenRecipeId(openRecipeId === id ? null : id);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-2xl text-gray-500">Chargement...</span>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-2xl text-red-500">{fetchError}</span>
      </div>
    );
  }

  // 5. Rendu principal du composant
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-orange-700 mb-6 flex items-center gap-2">
          🍽️ Mes Recettes
        </h1>

        {userRecipes.length === 0 ? (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">🍳</span>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Aucune recette créée par vous
            </h3>
            <p className="text-gray-500 mb-6">
              Créez votre première recette pour la voir ici !
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {userRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.$id}
                recipe={recipe}
                isExpanded={openRecipeId === recipe.$id}
                onToggleExpand={() => toggleEtapes(recipe.$id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
