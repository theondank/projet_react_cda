import SidebarLayout from "./components/SideBarLayout";
import Compte from "./components/compte";
import { LoginForm } from "./components/login-form";
import { AuthLayout } from "./layouts/AuthLayout";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/protectedRoute";
import RecipeList from "./components/RecipeList";

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<LoginForm />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<SidebarLayout />}>
          <Route path="/homepage" element={<RecipeList />} />
          <Route path="/compte" element={<Compte />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
