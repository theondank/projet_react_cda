// Fichier: /src/context/recipeContext.jsx

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { recetteAPI } from "../features/recipes/services"; // On importe notre nouvelle couche API

const RecipeContext = createContext();

export const useRecipes = () => useContext(RecipeContext);

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Utilisation de useCallback pour que la fonction ne soit pas recréée à chaque rendu,
  // ce qui est une bonne pratique.
  const chargerToutesLesRecettes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await recetteAPI.listRecettes();
      setRecipes(response.rows); // Le formatage n'est plus nécessaire ici
    } catch (err) {
      setError("Impossible de charger les recettes.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Charger les données au montage du Provider
  useEffect(() => {
    chargerToutesLesRecettes();
  }, [chargerToutesLesRecettes]);

  // L'objet `value` est plus simple. On n'expose que ce qui est utile aux composants.
  // Les composants n'ont pas besoin de connaître `recetteAPI`.
  const value = {
    recipes,
    loading,
    error,
    refreshRecipes: chargerToutesLesRecettes, // Une fonction pour rafraîchir manuellement
  };

  return (
    <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
  );
};
