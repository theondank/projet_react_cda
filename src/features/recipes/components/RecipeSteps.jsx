import React from "react";

const formatSteps = (steps) => {
  if (!steps) return [];
  return steps.split("\n").filter((step) => step.trim() !== "");
};

const RecipeSteps = ({ steps }) => {
  const formattedSteps = formatSteps(steps);

  if (formattedSteps.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="text-center py-8">
          <span className="text-4xl mb-4 block">📝</span>
          <p className="text-gray-500">Aucune étape de préparation définie</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="space-y-4">
        {formattedSteps.map((step, index) => (
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
    </div>
  );
};

export default RecipeSteps;
