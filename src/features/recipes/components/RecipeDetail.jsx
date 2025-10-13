import React from "react";
import { MainLayout } from "@layouts/MainLayout";
import { PageCard, SectionCard, SectionTitle } from "@ui/page-card";
import { Button } from "@ui/button";
import RecipeStats from "./RecipeStats";
import RecipeDescription from "./RecipeDescription";
import RecipeIngredientsSection from "./RecipeIngredientsSection";
import RecipeSteps from "./RecipeSteps";
import RecipeActions from "./RecipeActions";
import RecipeMetadata from "./RecipeMetadata";

const RecipeDetail = ({ recipe, onBack }) => {
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
    windo+w.print();
  };

  const handleAddToFavorites = () => {
    console.log("Ajouter aux favoris:", recipe.$id);
    // TODO: Implémenter la logique des favoris
  };

  return (
    <MainLayout
      title={recipe.nom}
      subtitle="Découvrez tous les détails de cette délicieuse recette"
      icon="🍽️"
    >
      <PageCard>
        {/* Bouton retour */}
        <div className="mb-6">
          <Button
            onClick={onBack}
            className="bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white border-0 rounded-full px-6 py-2 shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <span className="mr-2">←</span>
            Retour à la liste
          </Button>
        </div>

        {/* Informations principales */}
        <SectionCard gradient="from-purple-50 to-pink-50">
          <RecipeStats recipe={recipe} />
        </SectionCard>

        {/* Description */}
        <SectionCard gradient="from-blue-50 to-cyan-50">
          <SectionTitle icon="📖">Description</SectionTitle>
          <RecipeDescription description={recipe.description} />
        </SectionCard>

        {/* Ingrédients */}
        <SectionCard gradient="from-green-50 to-emerald-50">
          <SectionTitle icon="🥕">Ingrédients nécessaires</SectionTitle>
          <RecipeIngredientsSection recipeId={recipe.$id} />
        </SectionCard>

        {/* Étapes de préparation */}
        <SectionCard gradient="from-amber-50 to-orange-50">
          <SectionTitle icon="👨‍🍳">Étapes de préparation</SectionTitle>
          <RecipeSteps steps={recipe.etapesPreparation} />
        </SectionCard>

        {/* Actions */}
        <SectionCard gradient="from-indigo-50 to-purple-50">
          <SectionTitle icon="⚡">Actions rapides</SectionTitle>
          <RecipeActions
            onEdit={handleEdit}
            onShare={handleShare}
            onPrint={handlePrint}
            onAddToFavorites={handleAddToFavorites}
          />
        </SectionCard>

        {/* Informations supplémentaires */}
        <SectionCard gradient="from-gray-50 to-slate-50">
          <SectionTitle icon="ℹ️">Informations supplémentaires</SectionTitle>
          <RecipeMetadata recipe={recipe} />
        </SectionCard>
      </PageCard>
    </MainLayout>
  );
};

export default RecipeDetail;
