import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Compte() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    motDePasse: "",
  });

  // 🔹 Fetch au montage du composant
  useEffect(() => {
    fetch("http://localhost:3000/user") // 🔸 endpoint à adapter à ton API
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur réseau");
        }
        return response.json();
      })
      .then((data) => {
        setFormData({
          nom: data.nom || "",
          email: data.email || "",
          motDePasse: "",
        });
      })
      .catch((error) => console.error("❌ Erreur :", error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("✅ Données envoyées :", formData);
    // tu pourrais faire ici un fetch PUT / PATCH pour enregistrer
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
                placeholder="Entrez votre nom"
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
                placeholder="exemple@domaine.com"
              />
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Nouveau mot de passe
              </label>
              <Input
                type="password"
                name="motDePasse"
                value={formData.motDePasse}
                onChange={handleChange}
                placeholder="********"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            >
              💾 Enregistrer les modifications
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
