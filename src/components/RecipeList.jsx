// Exemple d'utilisation du RecipeContext dans un composant

import React, { useContext } from "react";
import { Recipe } from "../context/recipeContext";

const RecipeList = () => {
  const {
    filteredRecipes,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    createRecipe,
    updateRecipe,
    deleteRecipe,
  } = useContext(Recipe);

  if (loading) {
    return <div>Chargement des recettes...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  const handleCreateRecipe = async () => {
    const newRecipe = {
      title: "Nouvelle recette",
      description: "Description de la recette",
      ingredients: ["Ingrédient 1", "Ingrédient 2"],
      instructions: "Instructions de préparation",
      cookingTime: 30,
      servings: 4,
    };

    await createRecipe(newRecipe);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher une recette..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <button onClick={handleCreateRecipe}>Ajouter une recette</button>

      <div>
        {filteredRecipes.map((recipe) => (
          <div key={recipe.$id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            <button
              onClick={() =>
                updateRecipe(recipe.$id, { ...recipe, title: "Titre modifié" })
              }
            >
              Modifier
            </button>
            <button onClick={() => deleteRecipe(recipe.$id)}>Supprimer</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
