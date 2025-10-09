import SidebarLayout from "./components/sidebarLayout";
import { RecipeProvider } from "./context/recipeContext";

function App() {
  return (
    <RecipeProvider>
      <SidebarLayout />
    </RecipeProvider>
  );
}

export default App;
