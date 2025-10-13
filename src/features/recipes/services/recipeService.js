import { Query } from "appwrite";
import { tablesDB, databases, ID } from "@services/appwrite";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const RECETTE_TABLE_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID; // Renommé pour plus de clarté
const INGREDIENT_TABLE_ID = "ingredient";
const RECETTE_INGREDIENT_TABLE_ID = "recetteingredient";

export const recetteAPI = {
  listRecettesParUtilisateur: async (userId) => {
    return await tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: RECETTE_TABLE_ID,
      filters: [`userId=${userId}`],
      queries: [Query.equal("userId", userId)],
    });
  },

  listRecettes: async () => {
    return await tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: RECETTE_TABLE_ID,
    });
  },

  getRecetteById: async (recetteId) => {
    return await tablesDB.getRow({
      databaseId: DATABASE_ID,
      tableId: RECETTE_TABLE_ID,
      rowId: recetteId,
    });
  },

  createRecette: async (recetteData) => {
    return await databases.createDocument(
      DATABASE_ID,
      RECETTE_TABLE_ID,
      ID.unique(),
      recetteData
    );
  },

  createRecetteIngredient: async (relationData) => {
    return await databases.createDocument(
      DATABASE_ID,
      RECETTE_INGREDIENT_TABLE_ID,
      ID.unique(),
      relationData
    );
  },

  listIngredients: async () => {
    return await databases.listDocuments(DATABASE_ID, INGREDIENT_TABLE_ID);
  },

  getIngredientsByRecetteId: async (recetteId) => {
    const relations = await tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: RECETTE_INGREDIENT_TABLE_ID,
      filters: [`recetteId=${recetteId}`],
      queries: [Query.equal("recetteId", recetteId)],
    });

    if (!relations.rows || relations.rows.length === 0) {
      return []; // Pas d'ingrédients pour cette recette
    }

    const ingredientPromises = relations.rows.map((relations) =>
      tablesDB
        .getRow({
          databaseId: DATABASE_ID,
          tableId: INGREDIENT_TABLE_ID,
          rowId: relations.ingredientId,
        })
        .then((ingredientDoc) => ({
          ...ingredientDoc,
          quantite: relations.quantite,
          uniteDeMesure: relations.uniteDeMesure,
        }))
    );

    return await Promise.all(ingredientPromises);
  },
};
