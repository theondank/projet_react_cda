import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import RecipeList from "./components/recipeList";
import { LoginForm } from "./components/login-form";
import { AuthLayout } from "./layouts/AuthLayout";

function App() {
  return (
    <AuthLayout>
      {/* <RecipeList />
      <SidebarLayout /> */}
      <LoginForm />
    </AuthLayout>
  );
}

export default App;
