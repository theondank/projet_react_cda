import { Outlet, Navigate } from "react-router-dom";

export const ProtectedRoute = () => {
  const isLoggedIn = () => {
    return true;
  };
  return isLoggedIn() ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
