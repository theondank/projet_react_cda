import React from "react";
import RecipeIngredients from "./RecipeIngredients";

const RecipeIngredientsSection = ({ recipeId }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <RecipeIngredients recipeId={recipeId} showTitle={false} />
    </div>
  );
};

export default RecipeIngredientsSection;
