import React from "react";
import { MainLayout } from "../layouts/MainLayout";
import { PageCard, SectionCard, SectionTitle } from "./ui/page-card";
import { Button } from "./ui/button";
import RecipeIngredients from "./recipeIngredients";

const RecipeDetail = ({ recipe, onBack }) => {
  const getDifficultyEmoji = (level) => {
    const emojis = { 1: "🟢", 2: "🟡", 3: "🟠", 4: "🔴", 5: "🟣" };
    return emojis[level] || "⚪";
  };

  const getDifficultyText = (level) => {
    const texts = {
      1: "Très facile",
      2: "Facile",
      3: "Modéré",
      4: "Difficile",
      5: "Très difficile",
    };
    return texts[level] || "Non défini";
  };

  const formatSteps = (steps) => {
    if (!steps) return [];
    return steps.split("\n").filter((step) => step.trim() !== "");
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-2xl p-4 text-center shadow-md">
              <div className="text-3xl mb-2">⏰</div>
              <div className="text-xl font-bold text-orange-600">
                {recipe.temps} min
              </div>
              <div className="text-sm text-gray-600">Temps de préparation</div>
            </div>

            <div className="bg-white rounded-2xl p-4 text-center shadow-md">
              <div className="text-3xl mb-2">
                {getDifficultyEmoji(recipe.difficulte)}
              </div>
              <div className="text-xl font-bold text-red-600">
                {getDifficultyText(recipe.difficulte)}
              </div>
              <div className="text-sm text-gray-600">Difficulté</div>
            </div>

            <div className="bg-white rounded-2xl p-4 text-center shadow-md">
              <div className="text-3xl mb-2">💰</div>
              <div className="text-xl font-bold text-green-600">
                {recipe.prix} €
              </div>
              <div className="text-sm text-gray-600">Prix estimé</div>
            </div>

            <div className="bg-white rounded-2xl p-4 text-center shadow-md">
              <div className="text-3xl mb-2">📅</div>
              <div className="text-xl font-bold text-blue-600">
                {new Date(recipe.createdAt).toLocaleDateString("fr-FR")}
              </div>
              <div className="text-sm text-gray-600">Créée le</div>
            </div>
          </div>
        </SectionCard>

        {/* Description */}
        <SectionCard gradient="from-blue-50 to-cyan-50">
          <SectionTitle icon="📖">Description</SectionTitle>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-gray-700 leading-relaxed text-lg">
              {recipe.description}
            </p>
          </div>
        </SectionCard>

        {/* Ingrédients */}
        <SectionCard gradient="from-green-50 to-emerald-50">
          <SectionTitle icon="🥕">Ingrédients nécessaires</SectionTitle>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <RecipeIngredients recipeId={recipe.id} showTitle={false} />
          </div>
        </SectionCard>

        {/* Étapes de préparation */}
        <SectionCard gradient="from-amber-50 to-orange-50">
          <SectionTitle icon="👨‍🍳">Étapes de préparation</SectionTitle>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            {formatSteps(recipe.etapesPreparation).length > 0 ? (
              <div className="space-y-4">
                {formatSteps(recipe.etapesPreparation).map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border-l-4 border-orange-400"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed flex-1">
                      {step.trim()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <span className="text-4xl mb-4 block">📝</span>
                <p className="text-gray-500">
                  Aucune étape de préparation définie
                </p>
              </div>
            )}
          </div>
        </SectionCard>

        {/* Actions */}
        <SectionCard gradient="from-indigo-50 to-purple-50">
          <SectionTitle icon="⚡">Actions rapides</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white border-0 rounded-2xl py-4 shadow-lg transform hover:scale-105 transition-all duration-200">
              <span className="mr-2">❤️</span>
              Ajouter aux favoris
            </Button>

            <Button className="bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white border-0 rounded-2xl py-4 shadow-lg transform hover:scale-105 transition-all duration-200">
              <span className="mr-2">📤</span>
              Partager
            </Button>

            <Button className="bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white border-0 rounded-2xl py-4 shadow-lg transform hover:scale-105 transition-all duration-200">
              <span className="mr-2">✏️</span>
              Modifier
            </Button>

            <Button className="bg-gradient-to-r from-green-400 to-teal-400 hover:from-green-500 hover:to-teal-500 text-white border-0 rounded-2xl py-4 shadow-lg transform hover:scale-105 transition-all duration-200">
              <span className="mr-2">🖨️</span>
              Imprimer
            </Button>
          </div>
        </SectionCard>

        {/* Informations supplémentaires */}
        <SectionCard gradient="from-gray-50 to-slate-50">
          <SectionTitle icon="ℹ️">Informations supplémentaires</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center mb-2">
                <span className="text-purple-500 mr-2">🆔</span>
                <span className="font-medium text-gray-700">
                  ID de la recette
                </span>
              </div>
              <p className="text-gray-600 font-mono text-sm">{recipe.$id}</p>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center mb-2">
                <span className="text-purple-500 mr-2">🕒</span>
                <span className="font-medium text-gray-700">
                  Dernière modification
                </span>
              </div>
              <p className="text-gray-600">
                {new Date(recipe.$updatedAt).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </SectionCard>
      </PageCard>
    </MainLayout>
  );
};

export default RecipeDetail;
