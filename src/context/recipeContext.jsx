import React, { createContext, useContext, useState, useEffect } from "react";
import { databases } from "../lib/appwrite";

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
        description: doc.description,
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
        description: response.description,
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

  useEffect(() => {
    fetchRecipes();
  }, []);

  const value = {
    recipes,
    loading,
    error,
    fetchRecipes,
    getRecipeById,
    refresh: fetchRecipes,
  };

  return (
    <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
  );
};
