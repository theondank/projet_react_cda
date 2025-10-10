import React, { useState, useContext } from "react";
import { useRecipes } from "../context/recipeContext";
import { AuthContext } from "../context/authContext";
import { useParams } from "react-router-dom";
import { recette }  from "../lib/recette";
import { useEffect } from "react";


// Fonction pour afficher un emoji selon la difficulté
function getDifficultyEmoji(level) {
  const emojis = { 1: "🟢", 2: "🟡", 3: "🟠", 4: "🔴", 5: "🟣" };
  return emojis[level] || "⚪";
}

export default function MesRecettes() {
  const { recipes, loading, error } = useRecipes();
  const { loggedInUser } = useContext(AuthContext);
  const [openRecipeId, setOpenRecipeId] = useState(null);
  const { id } = useParams();

 useEffect(() => {
   recette.listRecettes(loggedInUser.$id);
 }, []);

console.log(recette.listRecettes(loggedInUser.$id));
  // ✅ Nouveau filtrage : on garde uniquement les recettes créées par l’utilisateur connecté
  const userRecipes = recipes.filter(
    (recipe) => recipe.userId === loggedInUser?.$id
  );

  // (Optionnel) log pour vérification
  console.log("Recettes utilisateur :", userRecipes);
  console.log("ID utilisateur connecté :", loggedInUser?.$id);

 
  const toggleEtapes = (id) => {
    setOpenRecipeId(openRecipeId === id ? null : id);
  };

 
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-2xl text-gray-500">Chargement...</span>
      </div>
    );
  }

  
  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-2xl text-red-500">Erreur: {error}</span>
      </div>
    );
  }

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-orange-700 mb-6 flex items-center gap-2">
          🍽️ Mes Recettes
        </h1>

        {/* Si aucune recette n'appartient à l'utilisateur */}
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
              <div
                key={recipe.id}
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

                <button
                  onClick={() => toggleEtapes(recipe.id)}
                  className="text-gray-600 hover:text-purple-600 text-sm font-medium flex items-center transition-colors w-full justify-center mb-2"
                >
                  {openRecipeId === recipe.id ? "🔽" : "▶️"} Voir les étapes
                </button>

                {/* Affichage des étapes si la recette est ouverte */}
                {openRecipeId === recipe.id && (
                  <div className="mt-2 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
