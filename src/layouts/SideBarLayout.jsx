import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { PageProvider, usePageContext } from "@context/pageContext";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@context/authContext";
import {
  ChefHat,
  Home,
  BookOpen,
  User,
  PlusCircle,
  LogOut,
} from "lucide-react";

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
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: "/homepage", label: "Accueil", icon: Home },
    { path: "/mesrecettes", label: "Mes recettes", icon: BookOpen },
    { path: "/compte", label: "Compte", icon: User },
    { path: "/nouvelle-recette", label: "Nouvelle recette", icon: PlusCircle },
  ];

  return (
    <div className="flex h-screen bg-neutral-50">
      <aside className="w-64 bg-white border-r border-neutral-200 flex flex-col justify-between shadow-sm">
        {/* Logo */}
        <div className="p-6 border-b border-neutral-200">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-sm">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-neutral-800">
              Riz-Setter
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  active
                    ? "bg-primary text-white shadow-sm"
                    : "text-neutral-700 hover:bg-neutral-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer avec déconnexion */}
        <div className="p-4 border-t border-neutral-200">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center space-x-2 bg-neutral-100 hover:bg-red-50 text-neutral-700 hover:text-red-600 py-3 px-4 rounded-lg transition-colors duration-200 font-medium"
          >
            <LogOut className="w-5 h-5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
