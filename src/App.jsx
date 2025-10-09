import SidebarLayout from "./components/sidebarLayout";
import { RecipeProvider } from "./context/recipeContext";
import { LoginForm } from "./components/login-form";
import { AuthLayout } from "./layouts/AuthLayout";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <RecipeProvider>
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
      <SidebarLayout />
      <Routes>
        {/* <RecipeList /> */}
        <Route path="/homepage" element={<SidebarLayout />} />
      </Routes>
    </RecipeProvider>
  );
}

export default App;
