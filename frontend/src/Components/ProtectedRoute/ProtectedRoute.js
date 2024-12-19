import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem("token"); // Vérifie si le token est présent

  if (!isLoggedIn) {
    return <Navigate to="/" replace />; // Redirige vers /login si non connecté
  }

  return children; // Sinon, rend le composant enfant
};

export default ProtectedRoute;
