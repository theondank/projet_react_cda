import { useContext } from "react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "./ui/field";
import { Input } from "./ui/input";
import { useState } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export function LoginForm({ className, ...props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await login(email, password);
      // Redirection gérée par AuthLayout
    } catch (err) {
      console.error("Erreur de connexion:", err);
      setError("Échec de la connexion. Veuillez vérifier vos identifiants.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="relative">
      {/* Éléments décoratifs en arrière-plan */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-orange-200/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-32 h-32 bg-amber-200/30 rounded-full blur-3xl"></div>

      <form
        onSubmit={handleSubmit}
        className={cn(
          "relative flex flex-col gap-6 w-full max-w-md mx-auto p-8 bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-orange-100/50",
          className
        )}
        {...props}
      >
        <FieldGroup>
          {/* En-tête avec icône */}
          <div className="flex flex-col items-center gap-4 text-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">👨‍🍳</span>
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center">
                <span className="text-xs">🍴</span>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-red-500 to-amber-600 bg-clip-text text-transparent">
                Bon retour, Chef !
              </h1>
              <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                Connectez-vous pour découvrir de nouvelles saveurs
              </p>
            </div>
          </div>

          <Field>
            <FieldLabel
              htmlFor="email"
              className="text-sm font-semibold text-gray-700 flex items-center gap-2"
            >
              <span className="text-orange-500">📧</span>
              Email
            </FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="chef@cuisine.com"
              value={email}
              onChange={handleEmailChange}
              disabled={isLoading}
              required
              className="transition-all duration-300 focus:scale-[1.01] focus:shadow-lg focus:border-orange-400 bg-white/70 backdrop-blur-sm border-orange-200/50"
            />
          </Field>

          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel
                htmlFor="password"
                className="text-sm font-semibold text-gray-700 flex items-center gap-2"
              >
                <span className="text-orange-500">🔐</span>
                Mot de Passe
              </FieldLabel>
              <a
                href="#"
                className="ml-auto text-xs text-orange-600 hover:text-orange-800 underline-offset-4 hover:underline transition-colors duration-200 font-medium"
              >
                Mot de passe oublié ?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              onChange={handlePasswordChange}
              value={password}
              disabled={isLoading}
              required
              className="transition-all duration-300 focus:scale-[1.01] focus:shadow-lg focus:border-orange-400 bg-white/70 backdrop-blur-sm border-orange-200/50"
            />
          </Field>

          {error && (
            <div className="text-red-600 text-sm text-center py-3 bg-red-50/80 border border-red-200 rounded-xl backdrop-blur-sm">
              <span className="mr-2">⚠️</span>
              {error}
            </div>
          )}

          <Field>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 py-6 font-bold text-base bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">🍳</span>
                  Connexion en cours...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span>🚪</span>
                  Entrer en cuisine
                </span>
              )}
            </Button>
          </Field>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-orange-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-gray-500 font-medium">
                Nouveau dans notre cuisine ?
              </span>
            </div>
          </div>

          <FieldDescription className="text-center">
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-orange-600 font-bold hover:text-orange-800 underline-offset-4 hover:underline transition-all duration-200 bg-orange-50 px-4 py-2 rounded-lg hover:bg-orange-100"
            >
              <span className="mr-2">👨‍🍳</span>
              Rejoignez notre équipe de chefs !
            </button>
          </FieldDescription>
        </FieldGroup>
      </form>
    </div>
  );
}
