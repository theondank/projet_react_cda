import React from "react";
import { Button } from "@ui/button";
import { Heart, Share2, Edit, Printer } from "lucide-react";

const RecipeActions = ({ onEdit, onShare, onPrint, onAddToFavorites }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      <Button
        onClick={onAddToFavorites}
        variant="outline"
        className="h-auto py-3"
      >
        <Heart className="w-4 h-4" />
        Favoris
      </Button>

      <Button onClick={onShare} variant="outline" className="h-auto py-3">
        <Share2 className="w-4 h-4" />
        Partager
      </Button>

      <Button onClick={onEdit} variant="default" className="h-auto py-3">
        <Edit className="w-4 h-4" />
        Modifier
      </Button>

      <Button onClick={onPrint} variant="secondary" className="h-auto py-3">
        <Printer className="w-4 h-4" />
        Imprimer
      </Button>
    </div>
  );
};

export default RecipeActions;
