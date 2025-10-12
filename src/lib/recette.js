import { Query } from "appwrite";
import { tablesDB } from "./appwrite";

export const recette = {
  listRecettes: async (userId) => {
    return await tablesDB.listRows({
      databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,      
      tableId: import.meta.env.VITE_APPWRITE_COLLECTION_ID,
      filters: [`userId=${userId}`],
      queries: [Query.equal("userId", userId)],
    });
  },
};
