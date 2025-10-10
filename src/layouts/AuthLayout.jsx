import { cn } from "../lib/utils";
import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export function AuthLayout({ className }) {
  const { loggedInUser, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
        {/* Arrière-plan dégradé */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-red-50"></div>

        {/* Animation de chargement culinaire */}
        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
              <span className="text-3xl animate-bounce">👨‍🍳</span>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-spin">
              <span className="text-sm">🍳</span>
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Préparation en cours...
            </h2>
            <p className="text-gray-600 mt-2 flex items-center gap-2 justify-center">
              <span className="animate-bounce delay-100">🥄</span>
              <span>On prépare votre espace cuisine</span>
              <span className="animate-bounce delay-300">🍽️</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Si l'utilisateur est déjà connecté, rediriger vers la page d'accueil
  if (loggedInUser) {
    return <Navigate to="/homepage" replace />;
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      {/* Arrière-plan dégradé inspiré cuisine */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-red-50"></div>

      {/* Motifs décoratifs subtils */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-orange-200/20 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute top-1/4 right-20 w-16 h-16 bg-yellow-200/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-red-200/20 rounded-full blur-2xl animate-pulse delay-2000"></div>
      <div className="absolute bottom-1/4 right-10 w-18 h-18 bg-green-200/20 rounded-full blur-2xl animate-pulse delay-500"></div>

      {/* Icônes culinaires flottantes */}
      <div className="absolute top-20 left-1/4 text-4xl opacity-10 animate-bounce delay-300">
        🍅
      </div>
      <div className="absolute top-1/3 right-1/4 text-3xl opacity-10 animate-bounce delay-700">
        🥕
      </div>
      <div className="absolute bottom-1/3 left-1/5 text-3xl opacity-10 animate-bounce delay-1100">
        🧄
      </div>
      <div className="absolute bottom-20 right-1/5 text-4xl opacity-10 animate-bounce delay-1500">
        🌿
      </div>
      <div className="absolute top-1/2 left-10 text-2xl opacity-10 animate-bounce delay-2000">
        🍋
      </div>
      <div className="absolute top-1/2 right-10 text-2xl opacity-10 animate-bounce delay-500">
        🫒
      </div>

      {/* Contenu principal */}
      <div className={cn("relative z-10 w-full max-w-md px-4", className)}>
        <Outlet />
      </div>

      {/* Footer discret */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-gray-400 text-xs flex items-center gap-2">
          <span>🍽️</span>
          <span>Créé avec passion pour les amoureux de la cuisine</span>
          <span>👨‍🍳</span>
        </p>
      </div>
    </div>
  );
}
