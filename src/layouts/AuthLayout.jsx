import { cn } from "../lib/utils";
import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export function AuthLayout({ className }) {
  const { loggedInUser, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background px-4">
        <div>Chargement...</div>
      </div>
    );
  }

  // Si l'utilisateur est déjà connecté, rediriger vers la page d'accueil
  if (loggedInUser) {
    return <Navigate to="/homepage" replace />;
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4">
      <div className={cn("w-full max-w-md", className)}>
        <Outlet />
      </div>
    </div>
  );
}
