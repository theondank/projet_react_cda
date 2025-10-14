import React from "react";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { FieldError } from "@ui/field";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@ui/collapsible";
import { Carrot, ChevronDown, ChevronRight } from "lucide-react";

const RecipeIngredientsEditor = ({
  ingredients,
  availableIngredients,
  isLoadingIngredients,
  isOpen,
  errors,
  onOpenChange,
  onChange,
  onAdd,
  onRemove,
}) => {
  return (
    <Collapsible open={isOpen} onOpenChange={onOpenChange}>
      <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-200">
        <CollapsibleTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            className="w-full flex justify-between items-center p-0 h-auto hover:bg-transparent"
          >
            <h3 className="text-lg font-semibold flex items-center gap-2 text-neutral-800">
              <Carrot className="w-5 h-5 text-primary" />
              Ingrédients * ({ingredients.length})
            </h3>
            {isOpen ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="mt-4">
          <FieldError>{errors.ingredients}</FieldError>

          <div className="space-y-3">
            {ingredients.map((ingredient, index) => (
              <div
                key={ingredient.id}
                className="grid grid-cols-1 md:grid-cols-5 gap-3 p-4 bg-white border border-amber-200 rounded-lg"
              >
                <div className="md:col-span-2">
                  <select
                    value={ingredient.ingredientId}
                    onChange={(e) =>
                      onChange(index, "ingredientId", e.target.value)
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                    disabled={isLoadingIngredients}
                  >
                    <option value="">
                      {isLoadingIngredients ? "Chargement..." : "Sélectionner"}
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
                      onChange(index, "quantite", e.target.value)
                    }
                    placeholder="Qté"
                    className="text-sm"
                  />
                </div>

                <div>
                  <select
                    value={ingredient.uniteDeMesure}
                    onChange={(e) =>
                      onChange(index, "uniteDeMesure", e.target.value)
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
                  {ingredients.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => onRemove(index)}
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
            onClick={onAdd}
            variant="outline"
            className="mt-3 w-full border-amber-300 text-amber-700 hover:bg-amber-50"
          >
            <span className="mr-2">+</span>
            Ajouter un ingrédient
          </Button>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};

export default RecipeIngredientsEditor;
