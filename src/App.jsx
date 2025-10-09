import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import RecipeList from "./components/recipeList";

function App() {
  return (
    <>
      <RecipeList />
      <SidebarLayout />
    </>
  );
}

export default App;
