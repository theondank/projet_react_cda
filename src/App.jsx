import SidebarLayout from "./components/sidebarLayout";
import { RecipeProvider } from "./context/recipeContext";
import { LoginForm } from "./components/login-form";
import { AuthLayout } from "./layouts/AuthLayout";

function App() {
  return (
    <RecipeProvider>
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    <SidebarLayout />
    </RecipeProvider>
  );
}

export default App;
