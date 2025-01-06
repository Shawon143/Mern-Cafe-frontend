import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const userRole = localStorage.getItem("role"); // Retrieve role from localStorage

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />; // Redirect if not allowed
  }

  return children; // Render the component if role matches
};

export default ProtectedRoute;
