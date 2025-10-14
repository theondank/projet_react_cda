import React from "react";
import { Hash, Clock } from "lucide-react";

const RecipeMetadata = ({ recipe }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
        <div className="flex items-center gap-2 mb-2">
          <Hash className="w-5 h-5 text-neutral-500" />
          <span className="font-medium text-neutral-700 text-sm">
            ID de la recette
          </span>
        </div>
        <p className="text-neutral-600 font-mono text-xs break-all">
          {recipe.$id}
        </p>
      </div>

      <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-5 h-5 text-neutral-500" />
          <span className="font-medium text-neutral-700 text-sm">
            Dernière modification
          </span>
        </div>
        <p className="text-neutral-600 text-sm">
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
  );
};

export default RecipeMetadata;
