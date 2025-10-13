import React, { useState, useEffect, useContext } from "react";
import { Button } from "@ui/button";
import { Input } from "@ui//input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@ui/card";
import { AuthContext } from "@context/authContext";

export default function Compte() {
  const { loggedInUser, modifyUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    motDePasseActuel: "",
    nouveauMotDePasse: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // 🔹 Charger les données de l'utilisateur connecté
  useEffect(() => {
    if (loggedInUser) {
      setFormData({
        nom: loggedInUser.name || "",
        email: loggedInUser.email || "",
        motDePasseActuel: "",
        nouveauMotDePasse: "",
      });
    }
  }, [loggedInUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // Préparer les données pour Appwrite (mapper les noms de propriétés)
      const updateData = {
        name: formData.nom,
        email: formData.email,
      };

      // Ajouter le mot de passe actuel si fourni (nécessaire pour email et nouveau mot de passe)
      if (formData.motDePasseActuel.trim()) {
        updateData.password = formData.motDePasseActuel;
      }

      // Ajouter le nouveau mot de passe si fourni
      if (formData.nouveauMotDePasse.trim()) {
        if (!formData.motDePasseActuel.trim()) {
          throw new Error(
            "Le mot de passe actuel est requis pour changer le mot de passe"
          );
        }
        if (formData.nouveauMotDePasse.length < 8) {
          throw new Error(
            "Le nouveau mot de passe doit contenir au moins 8 caractères"
          );
        }
        updateData.newPassword = formData.nouveauMotDePasse;
      }

      await modifyUser(updateData);
      setMessage({
        type: "success",
        text: "✅ Profil mis à jour avec succès !",
      });

      // Vider les champs mot de passe après une mise à jour réussie
      setFormData((prev) => ({
        ...prev,
        motDePasseActuel: "",
        nouveauMotDePasse: "",
      }));
    } catch (error) {
      console.error("❌ Erreur lors de la mise à jour :", error);
      setMessage({
        type: "error",
        text: `❌ Erreur : ${
          error.message || "Impossible de mettre à jour le profil"
        }`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Arrière-plan dégradé culinaire */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50"></div>

      {/* Éléments décoratifs en arrière-plan */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/4 right-20 w-24 h-24 bg-indigo-200/20 rounded-full blur-2xl animate-pulse delay-500"></div>

      {/* Icônes culinaires flottantes */}
      <div className="absolute top-20 left-1/4 text-3xl opacity-10 animate-bounce delay-300">
        🧑‍🍳
      </div>
      <div className="absolute top-1/3 right-1/4 text-2xl opacity-10 animate-bounce delay-700">
        ⚙️
      </div>
      <div className="absolute bottom-1/3 left-1/5 text-3xl opacity-10 animate-bounce delay-1100">
        📝
      </div>
      <div className="absolute bottom-20 right-1/5 text-2xl opacity-10 animate-bounce delay-1500">
        ✨
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 flex justify-center items-center min-h-screen p-6">
        <div className="relative w-full max-w-lg">
          {/* Card principale avec effet glassmorphism */}
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-purple-100/50 overflow-hidden">
            {/* En-tête avec avatar et titre */}
            <div className="relative bg-gradient-to-r from-purple-500 to-indigo-600 p-8 text-center">
              {/* Avatar du chef */}
              <div className="relative inline-block mb-4">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl border border-white/30">
                  <span className="text-4xl">👨‍🍳</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white">
                  <span className="text-sm">⚙️</span>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-white mb-2">
                Mon Profil de Chef
              </h1>
              <p className="text-purple-100 text-sm">
                Gérez vos informations personnelles
              </p>

              {/* Décoration */}
              <div className="absolute top-4 left-4 text-white/20 text-2xl">
                🍽️
              </div>
              <div className="absolute bottom-4 right-4 text-white/20 text-2xl">
                🌟
              </div>
            </div>

            {/* Contenu du formulaire */}
            <div className="p-8">
              {/* Message de feedback avec style amélioré */}
              {message.text && (
                <div
                  className={`mb-6 p-4 rounded-xl border-2 text-center font-medium ${
                    message.type === "success"
                      ? "bg-green-50/80 text-green-700 border-green-200 backdrop-blur-sm"
                      : "bg-red-50/80 text-red-700 border-red-200 backdrop-blur-sm"
                  }`}
                >
                  <span className="mr-2">
                    {message.type === "success" ? "🎉" : "⚠️"}
                  </span>
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nom du chef */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <span className="text-purple-500">👤</span>
                    Nom de Chef
                  </label>
                  <Input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    placeholder={loggedInUser?.name || "Chef Auguste"}
                    className="transition-all duration-300 focus:scale-[1.01] focus:shadow-lg focus:border-purple-400 bg-white/70 backdrop-blur-sm border-purple-200/50 rounded-xl p-4"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <span className="text-purple-500">📧</span>
                    Adresse e-mail
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={loggedInUser?.email || "chef@cuisine.com"}
                    className="transition-all duration-300 focus:scale-[1.01] focus:shadow-lg focus:border-purple-400 bg-white/70 backdrop-blur-sm border-purple-200/50 rounded-xl p-4"
                  />
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <span>💡</span>
                    Le mot de passe actuel sera requis pour modifier l'email
                  </p>
                </div>

                {/* Mot de passe actuel */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <span className="text-purple-500">🔐</span>
                    Mot de passe actuel
                  </label>
                  <Input
                    type="password"
                    name="motDePasseActuel"
                    value={formData.motDePasseActuel}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="transition-all duration-300 focus:scale-[1.01] focus:shadow-lg focus:border-purple-400 bg-white/70 backdrop-blur-sm border-purple-200/50 rounded-xl p-4"
                  />
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <span>🔒</span>
                    Requis pour modifier l'email ou le mot de passe
                  </p>
                </div>

                {/* Nouveau mot de passe */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <span className="text-purple-500">🆕</span>
                    Nouveau mot de passe
                  </label>
                  <Input
                    type="password"
                    name="nouveauMotDePasse"
                    value={formData.nouveauMotDePasse}
                    onChange={handleChange}
                    placeholder="Minimum 8 caractères"
                    className="transition-all duration-300 focus:scale-[1.01] focus:shadow-lg focus:border-purple-400 bg-white/70 backdrop-blur-sm border-purple-200/50 rounded-xl p-4"
                  />
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <span>💡</span>
                    Laissez vide pour conserver votre mot de passe actuel
                  </p>
                </div>

                {/* Bouton de sauvegarde */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-8 py-6 font-bold text-base bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-3">
                      <span className="animate-spin text-xl">⚙️</span>
                      Mise à jour en cours...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-3">
                      <span className="text-xl">💾</span>
                      Sauvegarder les modifications
                    </span>
                  )}
                </Button>
              </form>

              {/* Section informations supplémentaires */}
              <div className="mt-8 pt-6 border-t border-purple-100">
                <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <span>🛡️</span>
                    Sécurisé
                  </span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span className="flex items-center gap-1">
                    <span>🔒</span>
                    Chiffré
                  </span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span className="flex items-center gap-1">
                    <span>⚡</span>
                    Instantané
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
