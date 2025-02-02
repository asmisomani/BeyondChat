import { createContext, useState, useContext } from "react";

// Create Context
const AuthContext = createContext();

// Custom Hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// Provider Component
export const AuthProvider = ({ children }) => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Toggle Authentication Overlay
  const toggleAuth = () => setIsAuthOpen((prev) => !prev);

  return (
    <AuthContext.Provider value={{ isAuthOpen, toggleAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
