import React from "react";
import { Modal, ModalContent } from "@ui/modal";
import { Button } from "@ui/button";
import {
  UtensilsCrossed,
  BookOpen,
  Carrot,
  ChefHat,
  Zap,
  Info,
  Video,
} from "lucide-react";
import RecipeStats from "./RecipeStats";
import RecipeDescription from "./RecipeDescription";
import RecipeIngredientsSection from "./RecipeIngredientsSection";
import RecipeSteps from "./RecipeSteps";
import RecipeActions from "./RecipeActions";
import RecipeMetadata from "./RecipeMetadata";

const RecipeDetailModal = ({ recipe, isOpen, onClose }) => {
  if (!recipe) return null;

  // Gestionnaires d'événements pour les actions
  const handleEdit = () => {
    console.log("Modifier la recette:", recipe.$id);
    // TODO: Implémenter la logique de modification
  };

  const handleShare = () => {
    console.log("Partager la recette:", recipe.$id);
    // TODO: Implémenter la logique de partage
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAddToFavorites = () => {
    console.log("Ajouter aux favoris:", recipe.$id);
    // TODO: Implémenter la logique des favoris
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalContent>
        {/* En-tête avec titre */}
        <div className="mb-6 pb-4 border-b border-neutral-200">
          <h2 className="text-3xl font-bold text-neutral-900 mb-2 flex items-center gap-3">
            <UtensilsCrossed className="w-8 h-8 text-primary" />
            {recipe.nom}
          </h2>
          <p className="text-neutral-600 text-base">
            Découvrez tous les détails de cette délicieuse recette
          </p>
        </div>

        {/* Contenu scrollable */}
        <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
          {/* Informations principales */}
          <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
            <RecipeStats recipe={recipe} />
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl p-6 border border-neutral-200">
            <h3 className="text-xl font-semibold text-neutral-800 mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              Description
            </h3>
            <RecipeDescription description={recipe.description} />
          </div>

          {/* Ingrédients */}
          <div className="bg-white rounded-xl p-6 border border-neutral-200">
            <h3 className="text-xl font-semibold text-neutral-800 mb-4 flex items-center gap-2">
              <Carrot className="w-6 h-6 text-primary" />
              Ingrédients nécessaires
            </h3>
            <RecipeIngredientsSection recipeId={recipe.$id} />
          </div>

          {/* Étapes de préparation */}
          <div className="bg-white rounded-xl p-6 border border-neutral-200">
            <h3 className="text-xl font-semibold text-neutral-800 mb-4 flex items-center gap-2">
              <ChefHat className="w-6 h-6 text-primary" />
              Étapes de préparation
            </h3>
            <RecipeSteps steps={recipe.etapesPreparation} />
          </div>

          {/* Vidéo YouTube */}
          {recipe.videoUrl && (
            <div className="bg-white rounded-xl p-6 border border-neutral-200">
              <h3 className="text-xl font-semibold text-neutral-800 mb-4 flex items-center gap-2">
                <Video className="w-6 h-6 text-primary" />
                Vidéo de la recette
              </h3>
              <div
                className="relative w-full"
                style={{ paddingBottom: "56.25%" }}
              >
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src={recipe.videoUrl.replace("watch?v=", "embed/")}
                  title="Vidéo de la recette"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
            <h3 className="text-xl font-semibold text-neutral-800 mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6 text-primary" />
              Actions rapides
            </h3>
            <RecipeActions
              onEdit={handleEdit}
              onShare={handleShare}
              onPrint={handlePrint}
              onAddToFavorites={handleAddToFavorites}
            />
          </div>

          {/* Informations supplémentaires */}
          <div className="bg-white rounded-xl p-6 border border-neutral-200">
            <h3 className="text-xl font-semibold text-neutral-800 mb-4 flex items-center gap-2">
              <Info className="w-6 h-6 text-primary" />
              Informations supplémentaires
            </h3>
            <RecipeMetadata recipe={recipe} />
          </div>
        </div>

        {/* Footer avec bouton de fermeture */}
        <div className="mt-6 pt-4 border-t border-neutral-200 flex justify-between items-center">
          <div className="text-sm text-neutral-500">
            Pressez{" "}
            <kbd className="px-2 py-1 bg-neutral-100 rounded text-xs font-medium border border-neutral-200">
              Échap
            </kbd>{" "}
            pour fermer
          </div>
          <Button
            onClick={onClose}
            variant="secondary"
            className="rounded-lg px-6 py-2"
          >
            Fermer
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default RecipeDetailModal;
