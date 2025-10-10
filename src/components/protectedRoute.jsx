import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export const ProtectedRoute = () => {
  const { loggedInUser, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return  loggedInUser ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
