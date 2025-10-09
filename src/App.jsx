import { Routes, Route } from "react-router-dom";
// import RecipeList from "./components/recipeList";
import SidebarLayout from "./components/SideBarLayout";

function App() {
  return (
    <Routes>
      {/* <RecipeList /> */}
      <Route path="/homepage" element={<SidebarLayout />} />
    </Routes>
  );
}

export default App;
