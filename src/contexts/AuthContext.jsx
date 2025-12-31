import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Loading user and token from the localStorage
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      // Check if values exist and are not "undefined" string
      if (
        storedToken &&
        storedToken !== "undefined" &&
        storedUser &&
        storedUser !== "undefined"
      ) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } else {
        // Clear invalid data
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error("Error loading auth data from localStorage:", error);
      // Clear corrupted data
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Login function
  const login = (userData, authToken) => {
    console.log("login function hit in AuthContext");
    console.log("User data:", userData);
    console.log("Token:", authToken);

    // Validate inputs before storing
    if (!userData || !authToken) {
      console.error("Invalid login data: userData or authToken is missing");
      return;
    }

    if (typeof userData !== "object") {
      console.error("Invalid userData: must be an object");
      return;
    }

    setUser(userData);
    setToken(authToken);

    localStorage.setItem("token", authToken);
    // FIXED: Must stringify user object before storing
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!token && !!user;
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be within an AuthProvider');
  }
  
  return context;
};