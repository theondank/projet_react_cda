import React from "react";

const ErrorState = ({ error = "Une erreur est survenue", onRetry }) => {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <div className="max-w-md text-center">
        {/* Icône d'erreur moderne */}
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-red-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>

        <h2 className="text-xl font-semibold text-neutral-800 mb-2">
          Une erreur est survenue
        </h2>
        <p className="text-neutral-600 mb-6">{error}</p>

        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm"
          >
            Réessayer
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorState;
