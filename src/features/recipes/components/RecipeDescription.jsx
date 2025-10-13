import React from "react";

const RecipeDescription = ({ description }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <p className="text-gray-700 leading-relaxed text-lg">{description}</p>
    </div>
  );
};

export default RecipeDescription;
