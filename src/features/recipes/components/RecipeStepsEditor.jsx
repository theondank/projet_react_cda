import React from "react";
import { Button } from "@ui/button";
import { Field, FieldLabel, FieldError } from "@ui/field";

const RecipeStepsEditor = ({ steps, errors, onChange, onAdd, onRemove }) => {
  return (
    <Field>
      <FieldLabel>Étapes de préparation * ({steps.length})</FieldLabel>
      <FieldError>{errors.etapesPreparation}</FieldError>

      <div className="space-y-3 mt-2">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="flex gap-3 items-start p-4 bg-neutral-50 border border-neutral-200 rounded-lg"
          >
            <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm mt-1">
              {index + 1}
            </div>
            <textarea
              value={step.description}
              onChange={(e) => onChange(index, e.target.value)}
              placeholder={`Décrivez l'étape ${index + 1}...`}
              rows="2"
              className="flex-1 px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
            />
            {steps.length > 1 && (
              <Button
                type="button"
                onClick={() => onRemove(index)}
                variant="outline"
                size="sm"
                className="text-red-600 border-red-300 hover:bg-red-50 flex-shrink-0 mt-1"
              >
                🗑️
              </Button>
            )}
          </div>
        ))}
      </div>

      <Button
        type="button"
        onClick={onAdd}
        variant="outline"
        className="mt-3 w-full border-primary/30 text-primary hover:bg-primary/5"
      >
        <span className="mr-2">+</span>
        Ajouter une étape
      </Button>
    </Field>
  );
};

export default RecipeStepsEditor;
