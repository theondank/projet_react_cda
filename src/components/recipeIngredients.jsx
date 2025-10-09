import React, { useState, useEffect } from "react";
import { useRecipes } from "../context/recipeContext";

const RecipeIngredients = ({ recipeId }) => {
  const { getRecipeIngredients } = useRecipes();
  const [ingredients, setIngredients] = useState([]);
  const [loadingIngredients, setLoadingIngredients] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);

  const fetchIngredients = async () => {
    if (!showIngredients || ingredients.length > 0) return;

    setLoadingIngredients(true);
    try {
      const recipeIngredients = await getRecipeIngredients(recipeId);
      console.log("Ingrédients récupérés:", recipeIngredients);
      setIngredients(recipeIngredients);
    } catch (error) {
      console.error("Erreur lors du chargement des ingrédients:", error);
    } finally {
      setLoadingIngredients(false);
    }
  };

  useEffect(() => {
    if (showIngredients) {
      fetchIngredients();
    }
  }, [showIngredients]);

  return (
    <div className="mt-4">
      <button
        onClick={() => setShowIngredients(!showIngredients)}
        className="hover:text-neutral-700 text-sm font-medium flex items-center"
      >
        {showIngredients ? "🔽" : "▶️"} Ingrédients
      </button>

      {showIngredients ? (
        <div className="mt-2 pl-4 border-l-2 border-blue-200">
          {loadingIngredients ? (
            <p className="text-sm text-gray-500">
              Chargement des ingrédients...
            </p>
          ) : ingredients.length > 0 ? (
            <ul className="space-y-1">
              {ingredients.map((ingredient) => (
                <li key={ingredient.id} className="text-sm text-gray-700">
                  <span className="font-medium">{ingredient.nom}</span>
                  {ingredient.quantite && ingredient.uniteDeMesure && (
                    <span className="text-gray-500">
                      {" "}
                      - {ingredient.quantite} {ingredient.uniteDeMesure}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">Aucun ingrédient trouvé</p>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default RecipeIngredients;
