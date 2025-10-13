import React, { createContext, useState, useEffect } from "react";
import { account } from "@services/appwrite";
import { ID } from "appwrite";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await account.get();
        setLoggedInUser(user);
      } catch (error) {
        // Aucune session active, c'est normal
        console.log("Aucune session active:", error.message);
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
      // Nettoyer toute session existante (optionnel)
      try {
        await account.deleteSession("current");
      } catch (error) {
        // Pas de session active, c'est normal
        console.log("Aucune session à supprimer:", error.message);
      }

      // Créer une nouvelle session
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      setLoggedInUser(user);
      return user;
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      throw new Error("Erreur lors de la connexion : " + error.message);
    }
  }

  async function register(email, password, name) {
    if (!email || !password || !name) {
      throw new Error("Un email, un mot de passe et un nom sont requis.");
    }

    try {
      const userId = ID.unique();

      // Créer le compte utilisateur
      await account.create(userId, email, password, name);

      // Créer une session
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      setLoggedInUser(user);
      return user;
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      throw new Error("Erreur lors de l'inscription : " + error.message);
    }
  }

  async function logout() {
    try {
      await account.deleteSession("current");
      setLoggedInUser(null);
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      // Même en cas d'erreur, on considère l'utilisateur comme déconnecté
      setLoggedInUser(null);
      throw new Error("Erreur lors de la déconnexion : " + error.message);
    }
  }

  async function modifyUser(data) {
    try {
      let updatedUser = loggedInUser;

      // Mettre à jour le nom si fourni
      if (data.name && data.name !== loggedInUser?.name) {
        updatedUser = await account.updateName(data.name);
      }

      // Mettre à jour l'email si fourni
      if (data.email && data.email !== loggedInUser?.email) {
        if (!data.password || data.password.length < 8) {
          throw new Error(
            "Le mot de passe actuel est requis pour modifier l'email et doit contenir au moins 8 caractères."
          );
        }
        updatedUser = await account.updateEmail(data.email, data.password);
      }

      // Mettre à jour le mot de passe si un nouveau est fourni
      if (data.newPassword) {
        if (!data.password) {
          throw new Error("Le mot de passe actuel est requis pour le changer.");
        }
        if (data.newPassword.length < 8) {
          throw new Error(
            "Le nouveau mot de passe doit contenir au moins 8 caractères."
          );
        }
        await account.updatePassword(data.newPassword, data.password);
      }

      // Récupérer les données utilisateur mises à jour
      const refreshedUser = await account.get();
      setLoggedInUser(refreshedUser);
      return refreshedUser;
    } catch (error) {
      console.error("Erreur lors de la modification de l'utilisateur:", error);
      throw new Error(
        "Erreur lors de la modification de l'utilisateur : " + error.message
      );
    }
  }

  return (
    <AuthContext.Provider
      value={{
        loggedInUser,
        login,
        logout,
        isLoading,
        modifyUser,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
