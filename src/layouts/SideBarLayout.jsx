import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { PageProvider, usePageContext } from "@context/pageContext";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@context/authContext";

export default function SidebarLayout() {
  const [showForm, setShowForm] = useState(false);

  return (
    <PageProvider>
      <LayoutContent showForm={showForm} setShowForm={setShowForm} />
    </PageProvider>
  );
}

function LayoutContent({ showForm, setShowForm }) {
  const { isHomepage } = usePageContext();
  const { logout } = useContext(AuthContext);
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-gray-900 text-gray-100 flex flex-col justify-between">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          🍳 Riz-Setter
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/homepage"
            className="block px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Accueil
          </Link>
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
          <Link
            to="/nouvelle-recette"
            className="block px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Nouvelle recette
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-700 space-y-3">
          <button
            onClick={logout}
            className="w-full bg-red-600 hover:bg-red-700 py-2 rounded transition"
          >
            Déconnexion
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
