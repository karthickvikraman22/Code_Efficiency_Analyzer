import { createContext, useState, useContext, useEffect } from "react";

// Create context
const AuthContext = createContext();

// Custom hook to use authentication context
export function useAuth() {
  return useContext(AuthContext);
}

// AuthProvider component to provide auth context
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if token exists on initial load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true); // If token exists, set user as authenticated
    }
  }, []);

  // Login function to set user as authenticated
  const login = () => {
    setIsAuthenticated(true); // Set to true when user logs in
  };

  // Logout function to set user as not authenticated
  const logout = () => {
    setIsAuthenticated(false); // Set to false when user logs out
    localStorage.removeItem("token"); // Remove token from localStorage on logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
