import React from "react";

export default function SidebarLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-gray-100 flex flex-col">
        {/* Logo / Titre */}
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          🍳 Recettes
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2">
          <a
            href="#"
            className="block px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Tableau de bord
          </a>
          <a
            href="#"
            className="block px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Mes recettes
          </a>
          <a
            href="#"
            className="block px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Équipe
          </a>
          <a
            href="#"
            className="block px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Paramètres
          </a>
        </nav>

        {/* Bouton bas */}
        <div className="p-4 border-t border-gray-700">
          <button className="w-full bg-red-600 hover:bg-red-700 py-2 rounded transition">
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-4">Bienvenue 👋</h1>
        <p className="text-gray-700">
          Ici s’affichera le contenu principal de ton application de recettes.
        </p>
      </main>
    </div>
  );
}
