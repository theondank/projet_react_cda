import { TablesDB, Query } from "appwrite";

export const recette = {
    listRecettes: async (userId) => {
       return await TablesDB.listRecettes({
            tableId: import.meta.env.VITE_APPWRITE_TABLE_RECETTES,
            filters: [`userId=${userId}`],
            queries: [Query.equal('userId', userId), ]
       });
    }
}