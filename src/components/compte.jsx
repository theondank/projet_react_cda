import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Compte() {
  const [formData, setFormData] = useState({
    nom: "Jean Dupont",
    email: "jean.dupont@example.com",
    motDePasse: "",
    nombreRecettes: 4,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("✅ Données modifiées :", formData);
    // ici tu pourrais appeler Appwrite pour mettre à jour les infos utilisateur
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
                className="w-full"
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
                className="w-full"
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
                className="w-full"
              />
            </div>

            {/* Bouton enregistrer */}
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
