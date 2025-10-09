import { Outlet, Navigate } from "react-router-dom";

export const ProtectedRoute = () => {
  const isLoggedIn = () => {
    return false;
  };
  return isLoggedIn() ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
