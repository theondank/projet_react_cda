import SidebarLayout from "./components/sideBarLayout";
import { LoginForm } from "./components/login-form";
import { AuthLayout } from "./layouts/AuthLayout";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/protectedRoute";

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<LoginForm />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/homepage" element={<SidebarLayout />} />
      </Route>
    </Routes>
  );
}

export default App;
