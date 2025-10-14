import React, { useEffect } from "react";
import { cn } from "@/shared/utils/utils";

export function Modal({
  isOpen,
  onClose,
  children,
  size = "default",
  className,
}) {
  // Fermer la modale avec la touche Échap
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Empêcher le défilement du body
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    default: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
    full: "max-w-7xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Contenu de la modale */}
      <div
        className={cn(
          "relative w-full mx-4 my-6 bg-white rounded-2xl shadow-2xl",
          "max-h-[90vh] overflow-y-auto",
          "transform transition-all duration-300 scale-100",
          "animate-in zoom-in-95 fade-in-0",
          sizeClasses[size],
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton de fermeture */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          aria-label="Fermer la modale"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Contenu */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export function ModalHeader({ children, className }) {
  return (
    <div className={cn("mb-6 pb-4 border-b border-gray-200", className)}>
      {children}
    </div>
  );
}

export function ModalTitle({ children, className }) {
  return (
    <h2 className={cn("text-2xl font-bold text-gray-900", className)}>
      {children}
    </h2>
  );
}

export function ModalContent({ children, className }) {
  return <div className={cn("space-y-6", className)}>{children}</div>;
}

export function ModalFooter({ children, className }) {
  return (
    <div
      className={cn(
        "mt-6 pt-4 border-t border-gray-200 flex justify-end gap-3",
        className
      )}
    >
      {children}
    </div>
  );
}
