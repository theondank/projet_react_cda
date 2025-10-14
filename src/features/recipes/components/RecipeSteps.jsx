import React from "react";
import { FileText } from "lucide-react";

const formatSteps = (steps) => {
  if (!steps) return [];
  return steps.split("\n").filter((step) => step.trim() !== "");
};

const RecipeSteps = ({ steps }) => {
  const formattedSteps = formatSteps(steps);

  if (formattedSteps.length === 0) {
    return (
      <div className="text-center py-8">
        <FileText className="w-12 h-12 mx-auto mb-4 text-neutral-400" />
        <p className="text-neutral-500">Aucune étape de préparation définie</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {formattedSteps.map((step, index) => (
        <div
          key={index}
          className="flex items-start gap-4 p-4 bg-neutral-50 rounded-lg border border-neutral-200 hover:border-neutral-300 transition-colors duration-200"
        >
          <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">
            {index + 1}
          </div>
          <p className="text-neutral-700 leading-relaxed flex-1">
            {step.trim()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default RecipeSteps;
