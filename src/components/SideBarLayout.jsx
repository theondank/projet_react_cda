import React, { useState } from "react";
import { Link } from "react-router-dom"; // ✅ import du Link
import RecipeForm from "./RecipeForm";
import { Button } from "./ui/button";
import RecipeList from "./RecipeList";

export default function SidebarLayout() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* === SIDEBAR === */}
      <aside className="w-64 bg-gray-900 text-gray-100 flex flex-col justify-between">
        {/* Logo / Titre */}
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          🍳 Riz-Setter
        </div>

        {/* === Menu === */}
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/mesrecettes"
            className="block px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Mes recettes
          </Link>
          <Link
            to="/compte"
            className="block px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Compte
          </Link>
        </nav>

        {/* === Bas de la sidebar === */}
        <div className="p-4 border-t border-gray-700 space-y-3">
          {/* Bouton pour afficher/masquer le formulaire */}
          <Button
            onClick={() => setShowForm(!showForm)}
            className="w-full bg-green-600 hover:bg-green-700 text-white rounded"
          >
            {showForm ? "Fermer le formulaire" : "Ajouter une recette 🍳"}
          </Button>

          {/* Bouton de déconnexion */}
          <button className="w-full bg-red-600 hover:bg-red-700 py-2 rounded transition">
            Déconnexion
          </button>
        </div>
      </aside>

      {/* === CONTENU PRINCIPAL === */}
      <main className="flex-1 p-8 overflow-y-auto">
        {showForm && (
          <div className="max-w-lg mx-auto">
            <RecipeForm />
            <RecipeList />
          </div>
        )}
      </main>
    </div>
  );
}
