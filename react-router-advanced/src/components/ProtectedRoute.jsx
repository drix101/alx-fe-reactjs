import React from "react";
import { Navigate } from "react-router-dom";

// You can pass isAuthenticated as a prop or import it from a context/store
const isAuthenticated = false; // Replace with your actual auth logic

const ProtectedRoute = ({ children }) => {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;