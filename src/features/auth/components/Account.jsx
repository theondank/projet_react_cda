import React, { useState, useEffect, useContext } from "react";
import { Button } from "@ui/button";
import { Input } from "@ui//input";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { AuthContext } from "@context/authContext";
import {
  User,
  Mail,
  Lock,
  KeyRound,
  Save,
  Shield,
  Zap,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

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
    <div className="min-h-screen bg-neutral-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Card principale */}
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
          {/* En-tête simplifié */}
          <div className="bg-white border-b border-neutral-200 p-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center shadow-sm">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-neutral-800">
                  Mon Profil
                </h1>
                <p className="text-neutral-600 text-sm mt-1">
                  Gérez vos informations personnelles
                </p>
              </div>
            </div>
          </div>

          {/* Contenu du formulaire */}
          <div className="p-8">
            {/* Message de feedback modernisé */}
            {message.text && (
              <div
                className={`mb-6 p-4 rounded-lg border flex items-center gap-3 ${
                  message.type === "success"
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-red-50 text-red-700 border-red-200"
                }`}
              >
                {message.type === "success" ? (
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                )}
                <span className="font-medium">{message.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nom */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
                  <User className="w-4 h-4 text-primary" />
                  Nom
                </label>
                <Input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  placeholder={loggedInUser?.name || "Votre nom"}
                  className="transition-colors duration-200"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
                  <Mail className="w-4 h-4 text-primary" />
                  Adresse e-mail
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={loggedInUser?.email || "email@exemple.com"}
                  className="transition-colors duration-200"
                />
                <p className="text-xs text-neutral-500 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  Le mot de passe actuel sera requis pour modifier l'email
                </p>
              </div>

              {/* Mot de passe actuel */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
                  <Lock className="w-4 h-4 text-primary" />
                  Mot de passe actuel
                </label>
                <Input
                  type="password"
                  name="motDePasseActuel"
                  value={formData.motDePasseActuel}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="transition-colors duration-200"
                />
                <p className="text-xs text-neutral-500 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  Requis pour modifier l'email ou le mot de passe
                </p>
              </div>

              {/* Nouveau mot de passe */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
                  <KeyRound className="w-4 h-4 text-primary" />
                  Nouveau mot de passe
                </label>
                <Input
                  type="password"
                  name="nouveauMotDePasse"
                  value={formData.nouveauMotDePasse}
                  onChange={handleChange}
                  placeholder="Minimum 8 caractères"
                  className="transition-colors duration-200"
                />
                <p className="text-xs text-neutral-500 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  Laissez vide pour conserver votre mot de passe actuel
                </p>
              </div>

              {/* Bouton de sauvegarde */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full mt-8 bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Mise à jour en cours...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Sauvegarder les modifications</span>
                  </>
                )}
              </Button>
            </form>

            {/* Section informations supplémentaires */}
            <div className="mt-8 pt-6 border-t border-neutral-200">
              <div className="flex items-center justify-center gap-4 text-xs text-neutral-500">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  Sécurisé
                </span>
                <span className="w-1 h-1 bg-neutral-300 rounded-full"></span>
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" />
                  Chiffré
                </span>
                <span className="w-1 h-1 bg-neutral-300 rounded-full"></span>
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  Instantané
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
