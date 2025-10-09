import React, { createContext, useContext } from "react";
import { useLocation } from "react-router-dom";

const PageContext = createContext({ isHomepage: false });

export function usePageContext() {
  return useContext(PageContext);
}

export function PageProvider({ children }) {
  const location = useLocation();
  const isHomepage = location.pathname === "/homepage";

  return (
    <PageContext.Provider value={{ isHomepage }}>
      {children}
    </PageContext.Provider>
  );
}
