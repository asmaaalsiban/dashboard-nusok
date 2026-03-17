/** @format */

import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const storedUser = localStorage.getItem("adminUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulate API call - replace with actual authentication logic
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Demo credentials - replace with your validation logic
        if (email === "admin@nusok.com" && password === "admin123") {
          const userData = {
            id: 1,
            email,
            name: "Admin User",
            role: "admin",
          };
          setUser(userData);
          setIsAuthenticated(true);
          localStorage.setItem("adminUser", JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error("Invalid email or password"));
        }
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("adminUser");
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
