import React, { createContext, useState, useEffect } from "react";
import { account } from "../lib/appwrite";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Vérifier si l'utilisateur est déjà connecté au chargement
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await account.get();
        setLoggedInUser(user);
      } catch (error) {
        // L'utilisateur n'est pas connecté, c'est normal
        setLoggedInUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  async function login(email, password) {
    if (!email || !password) {
      throw new Error("Un email et un mot de passe sont requis.");
    }
    try {
      // D'abord, s'assurer qu'aucune session n'est active
      try {
        await account.deleteSession("current");
      } catch (error) {
        // Pas de session active, c'est normal
      }

      // Créer une nouvelle session
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      setLoggedInUser(user);
      return user;
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      throw error;
    }
  }

  async function logout() {
    try {
      await account.deleteSession("current");
      setLoggedInUser(null);
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
      throw error;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        loggedInUser,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
