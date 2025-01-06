import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(
    localStorage.getItem("role") || null
  );

  const login = (role) => {
    localStorage.setItem("role", role);
    setUserRole(role);
  };

  const logout = (navigate) => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    setUserRole(null);
    navigate("/login"); // Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
