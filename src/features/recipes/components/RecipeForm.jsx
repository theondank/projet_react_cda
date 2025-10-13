import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "@context/authContext";
import { recetteAPI } from "../services";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import {
  Field,
  FieldLabel,
  FieldGroup,
  FieldDescription,
  FieldError,
} from "@ui/field";
import { PageCard } from "@ui/page-card";
import { MainLayout } from "@layouts/MainLayout";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@ui/collapsible";

const RecipeForm = ({ onRecipeCreated }) => {
  const { loggedInUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    nom: "",
    temps: "",
    difficulte: 1,
    prix: "",
    description: "",
    etapesPreparation: "",
  });

  const [recipeIngredients, setRecipeIngredients] = useState([
    { id: Date.now(), ingredientId: "", quantite: "", uniteDeMesure: "" },
  ]);
  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoadingIngredients, setIsLoadingIngredients] = useState(false);
  const [isIngredientsOpen, setIsIngredientsOpen] = useState(true);
  useEffect(() => {
    fetchAvailableIngredients();
  }, []);

  const fetchAvailableIngredients = async () => {
    try {
      setIsLoadingIngredients(true);
      const response = await recetteAPI.listIngredients();
      setAvailableIngredients(response.documents || []);
    } catch (error) {
      console.error("Erreur lors du chargement des ingrédients:", error);
      setErrors((prev) => ({
        ...prev,
        ingredients: "Impossible de charger les ingrédients",
      }));
    } finally {
      setIsLoadingIngredients(false);
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
    const newErrors = {};

    if (!formData.nom.trim()) newErrors.nom = "Le nom de la recette est requis";
    if (!formData.temps || formData.temps <= 0)
      newErrors.temps = "Le temps doit être supérieur à 0";
    if (formData.difficulte < 1 || formData.difficulte > 5)
      newErrors.difficulte = "La difficulté doit être entre 1 et 5";
    if (!formData.prix || formData.prix <= 0)
      newErrors.prix = "Le prix doit être supérieur à 0";
    if (!formData.description.trim())
      newErrors.description = "La description est requise";
    if (!formData.etapesPreparation.trim())
      newErrors.etapesPreparation = "Les étapes sont requises";

    const validIngredients = recipeIngredients.filter(
      (ing) => ing.ingredientId && ing.quantite && ing.uniteDeMesure
    );
    if (validIngredients.length === 0) {
      newErrors.ingredients = "Au moins un ingrédient est requis";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loggedInUser?.$id) {
      setErrors({ general: "Vous devez être connecté pour créer une recette" });
      return;
    }

    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      const recipeData = {
        nom: formData.nom.trim(),
        temps: parseInt(formData.temps) || 0,
        difficulte: parseInt(formData.difficulte) || 1,
        prix: parseFloat(formData.prix) || 0,
        description: formData.description.trim(),
        etapesPreparation: formData.etapesPreparation.trim(),
        userId: loggedInUser.$id,
      };

      const recipe = await recetteAPI.createRecette(recipeData);

      const validIngredients = recipeIngredients.filter(
        (ing) => ing.ingredientId && ing.quantite && ing.uniteDeMesure
      );

      const ingredientPromises = validIngredients.map((ingredient) =>
        recetteAPI.createRecetteIngredient({
          recetteId: recipe.$id,
          ingredientId: ingredient.ingredientId,
          quantite: ingredient.quantite,
          uniteDeMesure: ingredient.uniteDeMesure.trim(),
        })
      );

      await Promise.all(ingredientPromises);

      // Reset form
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

      if (onRecipeCreated) onRecipeCreated(recipe);
      alert("Recette créée avec succès !");
    } catch (error) {
      console.error("Erreur lors de la création de la recette:", error);
      setErrors({ general: "Erreur lors de la création: " + error.message });
    } finally {
      setLoading(false);
    }
  };

  // Vérification si l'utilisateur est connecté
  if (!loggedInUser) {
    return (
      <MainLayout
        title="Créer une nouvelle recette"
        subtitle="Connexion requise"
        icon="🔒"
      >
        <PageCard>
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">🔒</span>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Connexion requise
            </h3>
            <p className="text-gray-500 mb-6">
              Vous devez être connecté pour créer une recette.
            </p>
          </div>
        </PageCard>
      </MainLayout>
    );
  }

  return (
    <MainLayout
      title="Créer une nouvelle recette"
      subtitle="Partagez votre création culinaire"
      icon="🍳"
    >
      <PageCard className="max-w-4xl mx-auto">
        {errors.general && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            <div className="flex items-center">
              <span className="mr-2">⚠️</span>
              {errors.general}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations de base */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
              <span className="mr-2">📝</span>
              Informations de base
            </h3>

            <FieldGroup>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="nom">
                    <span className="mr-1">🏷️</span>
                    Nom de la recette *
                  </FieldLabel>
                  <Input
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                    placeholder="Ex: Tarte aux pommes"
                    className="mt-1"
                  />
                  <FieldError>{errors.nom}</FieldError>
                </Field>

                <Field>
                  <FieldLabel htmlFor="temps">
                    <span className="mr-1">⏰</span>
                    Temps (minutes) *
                  </FieldLabel>
                  <Input
                    id="temps"
                    name="temps"
                    type="number"
                    min="1"
                    value={formData.temps}
                    onChange={handleInputChange}
                    placeholder="45"
                    className="mt-1"
                  />
                  <FieldError>{errors.temps}</FieldError>
                </Field>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="difficulte">
                    <span className="mr-1">🌶️</span>
                    Difficulté *
                  </FieldLabel>
                  <select
                    id="difficulte"
                    name="difficulte"
                    value={formData.difficulte}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={1}>🟢 Très facile</option>
                    <option value={2}>🟡 Facile</option>
                    <option value={3}>🟠 Modéré</option>
                    <option value={4}>🔴 Difficile</option>
                    <option value={5}>🟣 Très difficile</option>
                  </select>
                  <FieldError>{errors.difficulte}</FieldError>
                </Field>

                <Field>
                  <FieldLabel htmlFor="prix">
                    <span className="mr-1">💰</span>
                    Prix (€) *
                  </FieldLabel>
                  <Input
                    id="prix"
                    name="prix"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.prix}
                    onChange={handleInputChange}
                    placeholder="15.50"
                    className="mt-1"
                  />
                  <FieldError>{errors.prix}</FieldError>
                </Field>
              </div>
            </FieldGroup>
          </div>

          {/* Description et étapes */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
              <span className="mr-2">📖</span>
              Description et préparation
            </h3>

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="description">Description *</FieldLabel>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Décrivez votre recette..."
                  rows="3"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                />
                <FieldError>{errors.description}</FieldError>
              </Field>

              <Field>
                <FieldLabel htmlFor="etapesPreparation">
                  Étapes de préparation *
                </FieldLabel>
                <textarea
                  id="etapesPreparation"
                  name="etapesPreparation"
                  value={formData.etapesPreparation}
                  onChange={handleInputChange}
                  placeholder="1. Préchauffer le four...&#10;2. Mélanger..."
                  rows="4"
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                />
                <FieldError>{errors.etapesPreparation}</FieldError>
              </Field>
            </FieldGroup>
          </div>

          {/* Ingrédients - Section collapsible */}
          <Collapsible
            open={isIngredientsOpen}
            onOpenChange={setIsIngredientsOpen}
          >
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-xl">
              <CollapsibleTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full flex justify-between items-center p-0 h-auto hover:bg-transparent"
                >
                  <h3 className="text-lg font-semibold flex items-center text-gray-800">
                    <span className="mr-2">🥕</span>
                    Ingrédients * ({recipeIngredients.length})
                  </h3>
                  <span className="text-xl">
                    {isIngredientsOpen ? "🔽" : "▶️"}
                  </span>
                </Button>
              </CollapsibleTrigger>

              <CollapsibleContent className="mt-4">
                <FieldError>{errors.ingredients}</FieldError>

                <div className="space-y-3">
                  {recipeIngredients.map((ingredient, index) => (
                    <div
                      key={ingredient.id}
                      className="grid grid-cols-1 md:grid-cols-5 gap-3 p-4 bg-white border border-amber-200 rounded-lg"
                    >
                      <div className="md:col-span-2">
                        <select
                          value={ingredient.ingredientId}
                          onChange={(e) =>
                            handleIngredientChange(
                              index,
                              "ingredientId",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                          disabled={isLoadingIngredients}
                        >
                          <option value="">
                            {isLoadingIngredients
                              ? "Chargement..."
                              : "Sélectionner"}
                          </option>
                          {availableIngredients.map((ing) => (
                            <option key={ing.$id} value={ing.$id}>
                              {ing.ingredientName}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <Input
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
                          placeholder="Qté"
                          className="text-sm"
                        />
                      </div>

                      <div>
                        <select
                          value={ingredient.uniteDeMesure}
                          onChange={(e) =>
                            handleIngredientChange(
                              index,
                              "uniteDeMesure",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                        >
                          <option value="">Unité</option>
                          <option value="g">g</option>
                          <option value="kg">kg</option>
                          <option value="ml">ml</option>
                          <option value="l">l</option>
                          <option value="cl">cl</option>
                          <option value="cuillère à café">c. à café</option>
                          <option value="cuillère à soupe">c. à soupe</option>
                          <option value="tasse">tasse</option>
                          <option value="pièce">pièce(s)</option>
                          <option value="pincée">pincée</option>
                        </select>
                      </div>

                      <div className="flex justify-center">
                        {recipeIngredients.length > 1 && (
                          <Button
                            type="button"
                            onClick={() => removeIngredient(index)}
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-300 hover:bg-red-50"
                          >
                            🗑️
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  type="button"
                  onClick={addIngredient}
                  variant="outline"
                  className="mt-3 w-full border-amber-300 text-amber-700 hover:bg-amber-50"
                >
                  <span className="mr-2">+</span>
                  Ajouter un ingrédient
                </Button>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* Actions */}
          <div className="flex justify-center space-x-4 pt-4">
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
                setErrors({});
              }}
              variant="outline"
              className="px-6"
            >
              🔄 Réinitialiser
            </Button>

            <Button
              type="submit"
              disabled={loading}
              className="px-6 min-w-[150px]"
            >
              {loading ? "⏳ Création..." : "🚀 Créer la recette"}
            </Button>
          </div>
        </form>
      </PageCard>
    </MainLayout>
  );
};

export default RecipeForm;
