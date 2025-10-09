import SidebarLayout from "./components/sideBarLayout";
import { LoginForm } from "./components/login-form";
import { AuthLayout } from "./layouts/AuthLayout";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<LoginForm />} />
      </Route>
      <Route path="/homepage" element={<SidebarLayout />} />
    </Routes>
  );
}

export default App;
