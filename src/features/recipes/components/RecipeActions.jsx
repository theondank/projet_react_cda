import React from "react";
import { Button } from "@ui/button";

const RecipeActions = ({ onEdit, onShare, onPrint, onAddToFavorites }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Button
        onClick={onAddToFavorites}
        className="bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white border-0 rounded-2xl py-4 shadow-lg transform hover:scale-105 transition-all duration-200"
      >
        <span className="mr-2">❤️</span>
        Ajouter aux favoris
      </Button>

      <Button
        onClick={onShare}
        className="bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white border-0 rounded-2xl py-4 shadow-lg transform hover:scale-105 transition-all duration-200"
      >
        <span className="mr-2">📤</span>
        Partager
      </Button>

      <Button
        onClick={onEdit}
        className="bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white border-0 rounded-2xl py-4 shadow-lg transform hover:scale-105 transition-all duration-200"
      >
        <span className="mr-2">✏️</span>
        Modifier
      </Button>

      <Button
        onClick={onPrint}
        className="bg-gradient-to-r from-green-400 to-teal-400 hover:from-green-500 hover:to-teal-500 text-white border-0 rounded-2xl py-4 shadow-lg transform hover:scale-105 transition-all duration-200"
      >
        <span className="mr-2">🖨️</span>
        Imprimer
      </Button>
    </div>
  );
};

export default RecipeActions;
