import React, { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthContext } from "../context/authContext";

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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <Card className="w-full max-w-md shadow-lg border-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800 text-center">
            👤 Mon compte
          </CardTitle>
        </CardHeader>

        <CardContent>
          {/* Message de feedback */}
          {message.text && (
            <div
              className={`mb-4 p-3 rounded ${
                message.type === "success"
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-red-100 text-red-700 border border-red-300"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nom */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Nom complet
              </label>
              <Input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                placeholder={loggedInUser?.name || "Entrez votre nom"}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Adresse e-mail
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={loggedInUser?.email || "exemple@domaine.com"}
              />
            </div>

            {/* Mot de passe actuel */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Mot de passe actuel (requis pour modifier email/mot de passe)
              </label>
              <Input
                type="password"
                name="motDePasseActuel"
                value={formData.motDePasseActuel}
                onChange={handleChange}
                placeholder="Entrez votre mot de passe actuel"
              />
            </div>

            {/* Nouveau mot de passe */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Nouveau mot de passe (laissez vide pour ne pas changer)
              </label>
              <Input
                type="password"
                name="nouveauMotDePasse"
                value={formData.nouveauMotDePasse}
                onChange={handleChange}
                placeholder="Minimum 8 caractères"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 rounded"
            >
              {isLoading
                ? "⏳ Mise à jour..."
                : "💾 Enregistrer les modifications"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
