import React from "react";

const RecipeDescription = ({ description }) => {
  return (
    <div className="text-neutral-700 leading-relaxed text-base">
      {description}
    </div>
  );
};

export default RecipeDescription;
