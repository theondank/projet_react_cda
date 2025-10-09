import React, { createContext, useContext, useState, useEffect } from "react";
import { databases } from "../lib/appwrite";
import { Query } from "appwrite";

const RecipeContext = createContext();

export const useRecipes = () => {
  return useContext(RecipeContext);
};

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const DATABASE_ID =
    import.meta.env.VITE_APPWRITE_DATABASE_ID || "your-database-id";
  const COLLECTION_ID =
    import.meta.env.VITE_APPWRITE_COLLECTION_ID || "your-collection-id";
  const RECETTE_INGREDIENT_COLLECTION_ID = "recetteingredient";
  const INGREDIENT_COLLECTION_ID = "ingredient";

  const fetchRecipes = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID
      );

      const formattedRecipes = response.documents.map((doc) => ({
        id: doc.$id,
        nom: doc.nom,
        temps: doc.temps,
        difficulte: doc.difficulte,
        description: doc.description,
        prix: doc.prix,
        etapesPreparation: doc.etapesPreparation,
        createdAt: doc.$createdAt,
        updatedAt: doc.$updatedAt,
      }));

      setRecipes(formattedRecipes);
    } catch (err) {
      console.error("Erreur lors de la récupération des recettes:", err);
      setError(err.message || "Erreur lors du chargement des recettes");
    } finally {
      setLoading(false);
    }
  };

  const getRecipeById = async (recipeId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await databases.getDocument(
        DATABASE_ID,
        COLLECTION_ID,
        recipeId
      );

      return {
        id: response.$id,
        nom: response.nom,
        temps: response.temps,
        difficulte: response.difficulte,
        description: response.description,
        prix: response.prix,
        etapesPreparation: response.etapesPreparation,
        createdAt: response.$createdAt,
        updatedAt: response.$updatedAt,
      };
    } catch (err) {
      console.error("Erreur lors de la récupération de la recette:", err);
      setError(err.message || "Erreur lors du chargement de la recette");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getRecipeIngredients = async (recipeId) => {
    try {
      let recetteIngredientResponse;

      try {
        recetteIngredientResponse = await databases.listDocuments(
          DATABASE_ID,
          RECETTE_INGREDIENT_COLLECTION_ID,
          [Query.equal("recetteId", recipeId)]
        );
      } catch (relationError) {
        console.log(
          "Tentative avec relation échouée, essai sans filtre:",
          relationError.message
        );

        const allRecetteIngredients = await databases.listDocuments(
          DATABASE_ID,
          RECETTE_INGREDIENT_COLLECTION_ID
        );

        const filteredDocs = allRecetteIngredients.documents.filter((doc) => {
          return (
            doc.recetteId === recipeId ||
            doc.recetteId?.$id === recipeId ||
            doc.recette === recipeId ||
            doc.recette?.$id === recipeId
          );
        });

        recetteIngredientResponse = { documents: filteredDocs };
      }

      console.log(
        "Documents trouvés pour la recette:",
        recetteIngredientResponse.documents
      );

      const ingredientsPromises = recetteIngredientResponse.documents.map(
        async (recetteIngredient) => {
          try {
            let ingredientId = recetteIngredient.ingredientId;
            if (typeof ingredientId === "object" && ingredientId.$id) {
              ingredientId = ingredientId.$id;
            }

            console.log(
              "Tentative de récupération de l'ingrédient avec ID:",
              ingredientId
            );

            const ingredientResponse = await databases.getDocument(
              DATABASE_ID,
              INGREDIENT_COLLECTION_ID,
              ingredientId
            );

            return {
              id: ingredientResponse.$id,
              nom: ingredientResponse.ingredientName,
              quantite: recetteIngredient.quantite,
              uniteDeMesure: recetteIngredient.uniteDeMesure,
            };
          } catch (ingredientError) {
            console.error(
              "Erreur lors de la récupération de l'ingrédient:",
              ingredientError
            );
            return null;
          }
        }
      );

      const ingredients = await Promise.all(ingredientsPromises);
      return ingredients.filter((ingredient) => ingredient !== null);
    } catch (err) {
      console.error("Erreur lors de la récupération des ingrédients:", err);
      return [];
    }
  };

  const getAllIngredients = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        INGREDIENT_COLLECTION_ID
      );

      const formattedIngredients = response.documents.map((doc) => ({
        id: doc.$id,
        nom: doc.ingredientName,
        createdAt: doc.$createdAt,
        updatedAt: doc.$updatedAt,
      }));

      return formattedIngredients;
    } catch (err) {
      console.error("Erreur lors de la récupération des ingrédients:", err);
      setError(err.message || "Erreur lors du chargement des ingrédients");
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const value = {
    recipes,
    loading,
    error,
    fetchRecipes,
    getRecipeById,
    getRecipeIngredients,
    getAllIngredients,
    refresh: fetchRecipes,
  };

  return (
    <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
  );
};
