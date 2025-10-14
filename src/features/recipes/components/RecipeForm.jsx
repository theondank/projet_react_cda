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
import { BookOpen, Video, Shield } from "lucide-react";
import RecipeBasicInfoFields from "./RecipeBasicInfoFields";
import RecipeStepsEditor from "./RecipeStepsEditor";
import RecipeIngredientsEditor from "./RecipeIngredientsEditor";
import {
  validateAndSanitize,
  validateNumber,
  sanitizeUrl,
} from "@/shared/utils/security";

const RecipeForm = ({ onRecipeCreated }) => {
  const { loggedInUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    nom: "",
    temps: "",
    difficulte: 1,
    prix: "",
    description: "",
    videoUrl: "",
  });

  const [recipeSteps, setRecipeSteps] = useState([
    { id: Date.now(), description: "" },
  ]);

  const [recipeIngredients, setRecipeIngredients] = useState([
    { id: Date.now(), ingredientId: "", quantite: "", uniteDeMesure: "" },
  ]);
  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoadingIngredients, setIsLoadingIngredients] = useState(false);
  const [isIngredientsOpen, setIsIngredientsOpen] = useState(true);
  const [securityWarnings, setSecurityWarnings] = useState([]);
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
      [name]: value, // Garde la valeur brute pour permettre la saisie
    }));
  };

  const handleStepChange = (index, value) => {
    const updatedSteps = [...recipeSteps];
    updatedSteps[index] = {
      ...updatedSteps[index],
      description: value,
    };
    setRecipeSteps(updatedSteps);
  };

  const addStep = () => {
    setRecipeSteps((prevSteps) => [
      ...prevSteps,
      {
        id: Date.now() + Math.random(),
        description: "",
      },
    ]);
  };

  const removeStep = (index) => {
    if (recipeSteps.length > 1) {
      setRecipeSteps(recipeSteps.filter((_, i) => i !== index));
    }
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
    const warnings = [];

    // Validation et sanitization du nom
    const nomValidation = validateAndSanitize(formData.nom, {
      minLength: 3,
      maxLength: 100,
      fieldName: "Le nom de la recette",
    });
    if (!nomValidation.isValid) {
      newErrors.nom = nomValidation.errors[0];
      if (
        nomValidation.errors.some(
          (e) => e.includes("interdit") || e.includes("dangereux")
        )
      ) {
        warnings.push(...nomValidation.errors);
      }
    }

    // Validation du temps
    const tempsValidation = validateNumber(formData.temps, {
      min: 1,
      max: 1440, // Max 24 heures en minutes
      integer: true,
      fieldName: "Le temps de préparation",
    });
    if (!tempsValidation.isValid) {
      newErrors.temps = tempsValidation.errors[0];
    }

    // Validation de la difficulté
    const difficulteValidation = validateNumber(formData.difficulte, {
      min: 1,
      max: 5,
      integer: true,
      fieldName: "La difficulté",
    });
    if (!difficulteValidation.isValid) {
      newErrors.difficulte = difficulteValidation.errors[0];
    }

    // Validation du prix
    const prixValidation = validateNumber(formData.prix, {
      min: 0.01,
      max: 10000,
      fieldName: "Le prix",
    });
    if (!prixValidation.isValid) {
      newErrors.prix = prixValidation.errors[0];
    }

    // Validation et sanitization de la description
    const descriptionValidation = validateAndSanitize(formData.description, {
      minLength: 10,
      maxLength: 2000,
      fieldName: "La description",
    });
    if (!descriptionValidation.isValid) {
      newErrors.description = descriptionValidation.errors[0];
      if (
        descriptionValidation.errors.some(
          (e) => e.includes("interdit") || e.includes("dangereux")
        )
      ) {
        warnings.push(...descriptionValidation.errors);
      }
    }

    // Validation de l'URL vidéo (optionnelle)
    if (formData.videoUrl && formData.videoUrl.trim()) {
      const urlValidation = validateAndSanitize(formData.videoUrl, {
        maxLength: 500,
        allowUrls: true,
        fieldName: "L'URL de la vidéo",
      });
      if (!urlValidation.isValid) {
        newErrors.videoUrl = urlValidation.errors[0];
        if (urlValidation.errors.some((e) => e.includes("dangereux"))) {
          warnings.push(...urlValidation.errors);
        }
      }
    }

    // Validation des étapes
    const validSteps = recipeSteps.filter((step) => step.description.trim());
    if (validSteps.length === 0) {
      newErrors.etapesPreparation = "Au moins une étape est requise";
    } else {
      // Valider chaque étape
      validSteps.forEach((step, index) => {
        const stepValidation = validateAndSanitize(step.description, {
          minLength: 5,
          maxLength: 500,
          fieldName: `L'étape ${index + 1}`,
        });
        if (!stepValidation.isValid) {
          newErrors[`step_${index}`] = stepValidation.errors[0];
          if (
            stepValidation.errors.some(
              (e) => e.includes("interdit") || e.includes("dangereux")
            )
          ) {
            warnings.push(...stepValidation.errors);
          }
        }
      });
    }

    // Validation des ingrédients
    const validIngredients = recipeIngredients.filter(
      (ing) => ing.ingredientId && ing.quantite && ing.uniteDeMesure
    );
    if (validIngredients.length === 0) {
      newErrors.ingredients = "Au moins un ingrédient est requis";
    } else {
      // Valider chaque ingrédient
      validIngredients.forEach((ing, index) => {
        const quantiteValidation = validateNumber(ing.quantite, {
          min: 0.01,
          max: 10000,
          fieldName: `La quantité de l'ingrédient ${index + 1}`,
        });
        if (!quantiteValidation.isValid) {
          newErrors[`ingredient_quantity_${index}`] =
            quantiteValidation.errors[0];
        }

        const uniteValidation = validateAndSanitize(ing.uniteDeMesure, {
          minLength: 1,
          maxLength: 50,
          fieldName: `L'unité de mesure de l'ingrédient ${index + 1}`,
        });
        if (!uniteValidation.isValid) {
          newErrors[`ingredient_unit_${index}`] = uniteValidation.errors[0];
          if (
            uniteValidation.errors.some(
              (e) => e.includes("interdit") || e.includes("dangereux")
            )
          ) {
            warnings.push(...uniteValidation.errors);
          }
        }
      });
    }

    setErrors(newErrors);
    setSecurityWarnings(warnings);
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
    setSecurityWarnings([]);

    try {
      // Sanitization finale de toutes les données avant envoi
      const nomSanitized = validateAndSanitize(formData.nom, {
        maxLength: 100,
      }).sanitized;

      const descriptionSanitized = validateAndSanitize(formData.description, {
        maxLength: 2000,
      }).sanitized;

      const videoUrlSanitized = formData.videoUrl.trim()
        ? sanitizeUrl(formData.videoUrl)
        : "";

      // Convertir les étapes en une seule chaîne numérotée avec sanitization
      const validSteps = recipeSteps.filter((step) => step.description.trim());
      const etapesPreparation = validSteps
        .map((step, index) => {
          const sanitized = validateAndSanitize(step.description, {
            maxLength: 500,
          }).sanitized;
          return `${index + 1}. ${sanitized}`;
        })
        .join("\n");

      const recipeData = {
        nom: nomSanitized,
        temps: parseInt(formData.temps) || 0,
        difficulte: parseInt(formData.difficulte) || 1,
        prix: parseFloat(formData.prix) || 0,
        description: descriptionSanitized,
        etapesPreparation: etapesPreparation,
        videoUrl: videoUrlSanitized,
        userId: loggedInUser.$id,
      };

      const recipe = await recetteAPI.createRecette(recipeData);

      const validIngredients = recipeIngredients.filter(
        (ing) => ing.ingredientId && ing.quantite && ing.uniteDeMesure
      );

      const ingredientPromises = validIngredients.map((ingredient) => {
        // Sanitization de l'unité de mesure
        const uniteSanitized = validateAndSanitize(ingredient.uniteDeMesure, {
          maxLength: 50,
        }).sanitized;

        return recetteAPI.createRecetteIngredient({
          recetteId: recipe.$id,
          ingredientId: ingredient.ingredientId,
          quantite: parseFloat(ingredient.quantite),
          uniteDeMesure: uniteSanitized,
        });
      });

      await Promise.all(ingredientPromises);

      // Reset form
      setFormData({
        nom: "",
        temps: "",
        difficulte: 1,
        prix: "",
        description: "",
        videoUrl: "",
      });
      setRecipeSteps([{ id: Date.now(), description: "" }]);
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
        {/* Avertissement de sécurité */}
        {securityWarnings.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-lg mb-6">
            <div className="flex items-start">
              <Shield className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold mb-1">
                  ⚠️ Avertissement de sécurité
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {securityWarnings.map((warning, index) => (
                    <li key={index}>{warning}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Erreur générale */}
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
          <RecipeBasicInfoFields
            formData={formData}
            errors={errors}
            onChange={handleInputChange}
          />

          {/* Description et étapes */}
          <div className="bg-white p-6 rounded-xl border border-neutral-200">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-neutral-800">
              <BookOpen className="w-5 h-5 text-primary" />
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
                  className="mt-1 w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                />
                <FieldError>{errors.description}</FieldError>
              </Field>

              <RecipeStepsEditor
                steps={recipeSteps}
                errors={errors}
                onChange={handleStepChange}
                onAdd={addStep}
                onRemove={removeStep}
              />

              <Field>
                <FieldLabel
                  htmlFor="videoUrl"
                  className="flex items-center gap-1"
                >
                  <Video className="w-4 h-4" />
                  URL Vidéo YouTube (optionnelle)
                </FieldLabel>
                <Input
                  id="videoUrl"
                  name="videoUrl"
                  type="url"
                  value={formData.videoUrl}
                  onChange={handleInputChange}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="mt-1"
                />
                <FieldDescription>
                  Ajoutez un lien YouTube pour montrer votre recette en vidéo
                </FieldDescription>
                <FieldError>{errors.videoUrl}</FieldError>
              </Field>
            </FieldGroup>
          </div>

          {/* Ingrédients - Section collapsible */}
          <RecipeIngredientsEditor
            ingredients={recipeIngredients}
            availableIngredients={availableIngredients}
            isLoadingIngredients={isLoadingIngredients}
            isOpen={isIngredientsOpen}
            errors={errors}
            onOpenChange={setIsIngredientsOpen}
            onChange={handleIngredientChange}
            onAdd={addIngredient}
            onRemove={removeIngredient}
          />

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
                  videoUrl: "",
                });
                setRecipeSteps([{ id: Date.now(), description: "" }]);
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
