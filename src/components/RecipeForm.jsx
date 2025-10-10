import React, { useState, useEffect } from "react";
import { databases, ID } from "../lib/appwrite";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { PageCard, SectionCard, SectionTitle } from "./ui/page-card";
import { MainLayout } from "../layouts/MainLayout";

const RecipeForm = ({ onRecipeCreated }) => {
  const [formData, setFormData] = useState({
    nom: "",
    temps: "",
    difficulte: 1,
    prix: "",
    description: "",
    etapesPreparation: "",
  });

  const [ingredients, setIngredients] = useState([]);
  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [recipeIngredients, setRecipeIngredients] = useState([
    { id: Date.now(), ingredientId: "", quantite: "", uniteDeMesure: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAvailableIngredients();
  }, []);

  const fetchAvailableIngredients = async () => {
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        "ingredient"
      );
      setAvailableIngredients(response.documents);
    } catch (error) {
      console.error("Erreur lors du chargement des ingrédients:", error);
      setError("Impossible de charger les ingrédients");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "number"
          ? parseInt(value) || 0
          : name === "difficulte"
          ? parseInt(value) || 1
          : name === "prix"
          ? parseFloat(value) || 0
          : value,
    }));
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...recipeIngredients];
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      [field]: field === "quantite" ? parseFloat(value) || 0 : value,
    };
    setRecipeIngredients(updatedIngredients);
  };

  const addIngredient = () => {
    setRecipeIngredients((prevIngredients) => {
      const newIngredients = [
        ...prevIngredients,
        {
          id: Date.now() + Math.random(),
          ingredientId: "",
          quantite: "",
          uniteDeMesure: "",
        },
      ];
      return newIngredients;
    });
  };

  const removeIngredient = (index) => {
    if (recipeIngredients.length > 1) {
      setRecipeIngredients(recipeIngredients.filter((_, i) => i !== index));
    }
  };

  const validateForm = () => {
    if (!formData.nom.trim()) {
      setError("Le nom de la recette est requis");
      return false;
    }
    if (!formData.temps || formData.temps <= 0) {
      setError("Le temps de préparation doit être supérieur à 0");
      return false;
    }
    if (formData.difficulte < 1 || formData.difficulte > 5) {
      setError("La difficulté doit être entre 1 et 5");
      return false;
    }
    if (!formData.prix || formData.prix <= 0) {
      setError("Le prix doit être supérieur à 0");
      return false;
    }
    if (!formData.description.trim()) {
      setError("La description est requise");
      return false;
    }
    if (!formData.etapesPreparation.trim()) {
      setError("Les étapes de préparation sont requises");
      return false;
    }

    const validIngredients = recipeIngredients.filter(
      (ing) => ing.ingredientId && ing.quantite && ing.uniteDeMesure
    );
    if (validIngredients.length === 0) {
      setError("Au moins un ingrédient est requis");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const recipeData = {
        nom: formData.nom.trim(),
        temps: parseInt(formData.temps) || 0,
        difficulte: parseInt(formData.difficulte) || 1,
        prix: parseFloat(formData.prix) || 0,
        description: formData.description.trim(),
        etapesPreparation: formData.etapesPreparation.trim(),
      };

      const recipe = await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        "recette",
        ID.unique(),
        recipeData
      );

      const validIngredients = recipeIngredients.filter(
        (ing) => ing.ingredientId && ing.quantite && ing.uniteDeMesure
      );

      const ingredientPromises = validIngredients.map((ingredient) =>
        databases.createDocument(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          "recetteIngredient",
          ID.unique(),
          {
            recetteId: recipe.$id,
            ingredientId: ingredient.ingredientId,
            quantite: ingredient.quantite,
            uniteDeMesure: ingredient.uniteDeMesure.trim(),
          }
        )
      );

      await Promise.all(ingredientPromises);

      setFormData({
        nom: "",
        temps: "",
        difficulte: 1,
        prix: "",
        description: "",
        etapesPreparation: "",
      });
      setRecipeIngredients([
        { id: Date.now(), ingredientId: "", quantite: "", uniteDeMesure: "" },
      ]);

      if (onRecipeCreated) {
        onRecipeCreated(recipe);
      }

      alert("Recette créée avec succès !");
    } catch (error) {
      console.error("Erreur lors de la création de la recette:", error);
      setError("Erreur lors de la création de la recette: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout
      title="Créer une nouvelle recette"
      subtitle="Partagez votre création culinaire avec le monde"
      icon="🍳"
    >
      <PageCard>
        {error && (
          <div className="bg-gradient-to-r from-red-100 to-pink-100 border border-red-300 text-red-700 px-6 py-4 rounded-2xl mb-6 shadow-sm">
            <div className="flex items-center">
              <span className="text-red-500 mr-2">⚠️</span>
              {error}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <SectionCard gradient="from-blue-50 to-purple-50">
            <SectionTitle icon="📝">Informations générales</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="transform hover:scale-105 transition-transform duration-200">
                <Label
                  htmlFor="nom"
                  className="block text-sm mb-2 font-medium text-gray-700 flex items-center"
                >
                  <span className="text-yellow-500 mr-1">🏷️</span>
                  Nom de la recette *
                </Label>
                <Input
                  id="nom"
                  name="nom"
                  type="text"
                  value={formData.nom}
                  onChange={handleInputChange}
                  placeholder="Ex: Tarte aux pommes"
                  className="border-2 border-yellow-200 focus:border-yellow-400 focus:ring-yellow-300 rounded-xl"
                  required
                />
              </div>

              <div className="transform hover:scale-105 transition-transform duration-200">
                <Label
                  htmlFor="temps"
                  className="block text-sm mb-2 font-medium text-gray-700 flex items-center"
                >
                  <span className="text-orange-500 mr-1">⏰</span>
                  Temps de préparation (minutes) *
                </Label>
                <Input
                  id="temps"
                  name="temps"
                  type="number"
                  min="1"
                  value={formData.temps}
                  onChange={handleInputChange}
                  placeholder="Ex: 45"
                  className="border-2 border-orange-200 focus:border-orange-400 focus:ring-orange-300 rounded-xl"
                  required
                />
              </div>
            </div>
          </SectionCard>

          <SectionCard gradient="from-green-50 to-teal-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="transform hover:scale-105 transition-transform duration-200">
                <Label
                  htmlFor="difficulte"
                  className="block text-sm mb-2 font-medium text-gray-700 flex items-center"
                >
                  <span className="text-red-500 mr-1">🌶️</span>
                  Difficulté (1-5) *
                </Label>
                <select
                  id="difficulte"
                  name="difficulte"
                  value={formData.difficulte}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-red-200 focus:border-red-400 focus:ring-red-300 rounded-xl focus:outline-none focus:ring-2 bg-white shadow-sm"
                  required
                >
                  <option value={1}>🟢 1 - Très facile</option>
                  <option value={2}>🟡 2 - Facile</option>
                  <option value={3}>🟠 3 - Modéré</option>
                  <option value={4}>🔴 4 - Difficile</option>
                  <option value={5}>🟣 5 - Très difficile</option>
                </select>
              </div>

              <div className="transform hover:scale-105 transition-transform duration-200">
                <Label
                  htmlFor="prix"
                  className="block text-sm mb-2 font-medium text-gray-700 flex items-center"
                >
                  <span className="text-green-500 mr-1">💰</span>
                  Prix (€) *
                </Label>
                <Input
                  id="prix"
                  name="prix"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.prix}
                  onChange={handleInputChange}
                  placeholder="Ex: 15.50"
                  className="border-2 border-green-200 focus:border-green-400 focus:ring-green-300 rounded-xl"
                  required
                />
              </div>
            </div>
          </SectionCard>

          <SectionCard gradient="from-pink-50 to-rose-50">
            <Label
              htmlFor="description"
              className="block text-sm mb-3 font-medium text-gray-700 flex items-center text-lg"
            >
              <span className="text-pink-500 mr-2">📖</span>
              Description *
            </Label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Décrivez votre recette avec passion..."
              rows="4"
              className="w-full px-4 py-3 border-2 border-pink-200 focus:border-pink-400 focus:ring-pink-300 rounded-xl focus:outline-none focus:ring-2 bg-white shadow-sm resize-none"
              required
            />
          </SectionCard>

          <SectionCard gradient="from-indigo-50 to-purple-50">
            <Label
              htmlFor="etapesPreparation"
              className="block text-sm mb-3 font-medium text-gray-700 flex items-center text-lg"
            >
              <span className="text-indigo-500 mr-2">👨‍🍳</span>
              Étapes de préparation *
            </Label>
            <textarea
              id="etapesPreparation"
              name="etapesPreparation"
              value={formData.etapesPreparation}
              onChange={handleInputChange}
              placeholder="1. Préchauffer le four à 180°C&#10;2. Mélanger les ingrédients secs avec amour...&#10;3. Laisser mijoter..."
              rows="6"
              className="w-full px-4 py-3 border-2 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300 rounded-xl focus:outline-none focus:ring-2 bg-white shadow-sm resize-none"
              required
            />
          </SectionCard>

          <SectionCard gradient="from-amber-50 to-yellow-50">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                <span className="text-amber-500 mr-2">🥕</span>
                Ingrédients magiques *
              </h3>
              <Button
                type="button"
                onClick={addIngredient}
                className="bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white border-0 rounded-full px-6 py-2 shadow-lg transform hover:scale-105 transition-all duration-200"
                size="sm"
              >
                <span className="mr-1">✨</span>
                Ajouter un ingrédient
              </Button>
            </div>

            <div className="space-y-4">
              {recipeIngredients.map((ingredient, index) => (
                <div
                  key={ingredient.id}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 bg-white border-2 border-amber-200 rounded-2xl relative shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div>
                    <Label
                      htmlFor={`ingredient-${index}`}
                      className="block text-sm mb-2 font-medium text-gray-700 flex items-center"
                    >
                      <span className="text-green-500 mr-1">🌿</span>
                      Ingrédient
                    </Label>
                    <select
                      id={`ingredient-${index}`}
                      value={ingredient.ingredientId}
                      onChange={(e) =>
                        handleIngredientChange(
                          index,
                          "ingredientId",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border-2 border-green-200 focus:border-green-400 focus:ring-green-300 rounded-xl focus:outline-none focus:ring-2 bg-white shadow-sm"
                    >
                      <option value="">Sélectionner un ingrédient</option>
                      {availableIngredients.map((ing) => (
                        <option key={ing.$id} value={ing.$id}>
                          {ing.ingredientName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label
                      htmlFor={`quantite-${index}`}
                      className="block text-sm mb-2 font-medium text-gray-700 flex items-center"
                    >
                      <span className="text-blue-500 mr-1">🔢</span>
                      Quantité
                    </Label>
                    <Input
                      id={`quantite-${index}`}
                      type="number"
                      step="0.1"
                      min="0"
                      value={ingredient.quantite}
                      onChange={(e) =>
                        handleIngredientChange(
                          index,
                          "quantite",
                          e.target.value
                        )
                      }
                      placeholder="Ex: 200"
                      className="border-2 border-blue-200 focus:border-blue-400 focus:ring-blue-300 rounded-xl"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor={`unite-${index}`}
                      className="block text-sm mb-2 font-medium text-gray-700 flex items-center"
                    >
                      <span className="text-purple-500 mr-1">⚖️</span>
                      Unité de mesure
                    </Label>
                    <select
                      id={`unite-${index}`}
                      value={ingredient.uniteDeMesure}
                      onChange={(e) =>
                        handleIngredientChange(
                          index,
                          "uniteDeMesure",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border-2 border-purple-200 focus:border-purple-400 focus:ring-purple-300 rounded-xl focus:outline-none focus:ring-2 bg-white shadow-sm"
                    >
                      <option value="">Choisir une unité</option>
                      <option value="g">grammes (g)</option>
                      <option value="kg">kilogrammes (kg)</option>
                      <option value="ml">millilitres (ml)</option>
                      <option value="l">litres (l)</option>
                      <option value="cl">centilitres (cl)</option>
                      <option value="cuillère à café">cuillère à café</option>
                      <option value="cuillère à soupe">cuillère à soupe</option>
                      <option value="tasse">tasse</option>
                      <option value="pièce">pièce(s)</option>
                      <option value="pincée">pincée</option>
                    </select>
                  </div>

                  <div className="flex items-end">
                    {recipeIngredients.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeIngredient(index)}
                        className="bg-gradient-to-r from-red-400 to-pink-400 hover:from-red-500 hover:to-pink-500 text-white border-0 rounded-full px-4 py-2 shadow-md transform hover:scale-105 transition-all duration-200"
                        size="sm"
                      >
                        <span className="mr-1">🗑️</span>
                        Supprimer
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <div className="flex justify-center space-x-6 pt-8">
            <Button
              type="button"
              onClick={() => {
                setFormData({
                  nom: "",
                  temps: "",
                  difficulte: 1,
                  prix: "",
                  description: "",
                  etapesPreparation: "",
                });
                setRecipeIngredients([
                  {
                    id: Date.now(),
                    ingredientId: "",
                    quantite: "",
                    uniteDeMesure: "",
                  },
                ]);
                setError("");
              }}
              className="bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white border-0 rounded-full px-8 py-3 shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <span className="mr-2">🔄</span>
              Réinitialiser
            </Button>

            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white border-0 rounded-full px-8 py-3 shadow-lg transform hover:scale-105 transition-all duration-200 min-w-[200px]"
            >
              <span className="mr-2">{loading ? "⏳" : "🚀"}</span>
              {loading ? "Création en cours..." : "Créer ma recette"}
            </Button>
          </div>
        </form>
      </PageCard>
    </MainLayout>
  );
};

export default RecipeForm;
