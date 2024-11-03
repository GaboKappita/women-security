// hooks/useAuth.ts
import { useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

// Simulamos un contexto de autenticación
export function useAuth(): AuthContextType {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Efecto para simular un inicio de sesión
  useEffect(() => {
    // Simula que el usuario está autenticado
    setIsAuthenticated(true); 
  }, []);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
}
