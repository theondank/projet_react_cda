import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { databases } from "../lib/appwrite";

export const Recipe = createContext();

export const RecipeContext = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Configuration AppWrite - Ajustez ces valeurs selon votre configuration
  const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
  const RECIPES_COLLECTION_ID = import.meta.env
    .VITE_APPWRITE_RECIPES_COLLECTION_ID;

  // Fonction pour récupérer toutes les recettes
  const fetchRecipes = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        RECIPES_COLLECTION_ID
      );

      setRecipes(response.documents);
    } catch (err) {
      console.error("Erreur lors de la récupération des recettes:", err);
      setError("Impossible de récupérer les recettes");
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour récupérer une recette par ID
  const getRecipeById = async (recipeId) => {
    setLoading(true);
    setError(null);

    try {
      const recipe = await databases.getDocument(
        DATABASE_ID,
        RECIPES_COLLECTION_ID,
        recipeId
      );

      return recipe;
    } catch (err) {
      console.error("Erreur lors de la récupération de la recette:", err);
      setError("Impossible de récupérer la recette");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour créer une nouvelle recette
  const createRecipe = async (recipeData) => {
    setLoading(true);
    setError(null);

    try {
      const newRecipe = await databases.createDocument(
        DATABASE_ID,
        RECIPES_COLLECTION_ID,
        "unique()", // AppWrite génère un ID unique
        recipeData
      );

      // Ajouter la nouvelle recette à la liste locale
      setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
      return newRecipe;
    } catch (err) {
      console.error("Erreur lors de la création de la recette:", err);
      setError("Impossible de créer la recette");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour mettre à jour une recette
  const updateRecipe = async (recipeId, recipeData) => {
    setLoading(true);
    setError(null);

    try {
      const updatedRecipe = await databases.updateDocument(
        DATABASE_ID,
        RECIPES_COLLECTION_ID,
        recipeId,
        recipeData
      );

      // Mettre à jour la liste locale
      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe.$id === recipeId ? updatedRecipe : recipe
        )
      );
      return updatedRecipe;
    } catch (err) {
      console.error("Erreur lors de la mise à jour de la recette:", err);
      setError("Impossible de mettre à jour la recette");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour supprimer une recette
  const deleteRecipe = async (recipeId) => {
    setLoading(true);
    setError(null);

    try {
      await databases.deleteDocument(
        DATABASE_ID,
        RECIPES_COLLECTION_ID,
        recipeId
      );

      // Retirer la recette de la liste locale
      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.$id !== recipeId)
      );
      return true;
    } catch (err) {
      console.error("Erreur lors de la suppression de la recette:", err);
      setError("Impossible de supprimer la recette");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Charger les recettes au montage du composant
  useEffect(() => {
    fetchRecipes();
  }, []);

  // Filtrer les recettes selon le terme de recherche
  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const contextValue = {
    // États
    recipes,
    filteredRecipes,
    searchTerm,
    loading,
    error,

    // Actions
    setSearchTerm,
    fetchRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,

    // Navigation
    navigate,
  };

  return <Recipe.Provider value={contextValue}>{children}</Recipe.Provider>;
};
