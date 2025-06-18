import { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';

// Crear el contexto
const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => {
  return useContext(AuthContext);
};

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar si hay un token almacenado
    const checkAuth = async () => {
      const isAuth = authService.isAuthenticated();
      setIsAuthenticated(isAuth);

      if (isAuth) {
        try {
          // Obtener datos del usuario actual
          const userData = await authService.getCurrentUser();
          setCurrentUser(userData);
        } catch (error) {
          console.error('Error al obtener usuario:', error);
          // Si hay un error, limpiar la autenticación
          authService.logout();
          setIsAuthenticated(false);
          setCurrentUser(null);
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  // Función para iniciar sesión
  const login = async (email, password) => {
    const userData = await authService.login(email, password);
    setCurrentUser(userData.user);
    setIsAuthenticated(true);
    return userData;
  };

  // Función para registrarse
  const register = async (userData) => {
    const result = await authService.register(userData);
    setCurrentUser(result.user);
    setIsAuthenticated(true);
    return result;
  };

  // Función para cerrar sesión
  const logout = () => {
    authService.logout();
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    currentUser,
    isAuthenticated,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;