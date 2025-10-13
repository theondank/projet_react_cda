import SidebarLayout from "@layouts/SideBarLayout";
import { Account } from "@features/auth/components";
import { LoginForm } from "@features/auth/components";
import { AuthLayout } from "@layouts/AuthLayout";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@features/auth/components";
import { RecipeList } from "@features/recipes/components";
import { RecipeForm } from "@features/recipes/components";
import { RegisterForm } from "@features/auth/components";
import { MyRecipes } from "@features/recipes/components";

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<SidebarLayout />}>
          <Route path="/homepage" element={<RecipeList />} />
          <Route path="/mesrecettes" element={<MyRecipes />} />
          <Route path="/compte" element={<Account />} />
          <Route path="/nouvelle-recette" element={<RecipeForm />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
