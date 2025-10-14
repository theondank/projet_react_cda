import React from "react";
import RecipeIngredients from "./RecipeIngredients";

const RecipeIngredientsSection = ({ recipeId }) => {
  return <RecipeIngredients recipeId={recipeId} showTitle={false} />;
};

export default RecipeIngredientsSection;
