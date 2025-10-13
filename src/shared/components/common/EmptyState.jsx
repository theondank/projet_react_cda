import React from "react";
import { Button } from "@ui/button";

const EmptyState = ({ onRefresh }) => {
  return (
    <div className="text-center py-12">
      <span className="text-6xl mb-4 block">🍳</span>
      <h3 className="text-xl font-semibold text-gray-600 mb-2">
        Aucune recette pour le moment
      </h3>
      <p className="text-gray-500 mb-6">
        Commencez par créer votre première recette !
      </p>
      <Button
        onClick={onRefresh}
        className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white border-0 rounded-full px-8 py-3 shadow-lg transform hover:scale-105 transition-all duration-200"
      >
        <span className="mr-2">✨</span>
        Créer ma première recette
      </Button>
    </div>
  );
};

export default EmptyState;
