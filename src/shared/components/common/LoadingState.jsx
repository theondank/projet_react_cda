import React from "react";

const LoadingState = ({ message = "Chargement des recettes..." }) => {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
      <div className="text-center">
        {/* Spinner moderne et épuré */}
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-neutral-600 font-medium">{message}</p>
      </div>
    </div>
  );
};

export default LoadingState;
