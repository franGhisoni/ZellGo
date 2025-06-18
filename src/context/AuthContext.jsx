import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Usuarios de prueba para desarrollo
const TEST_USERS = {
  'admin@zellgo.com': {
    id: 'A001',
    name: 'Laura Gómez',
    email: 'admin@zellgo.com',
    role: 'admin',
    password: 'admin123' // En un entorno real, nunca almacenar contraseñas en texto plano
  },
  'vendedor@zellgo.com': {
    id: 'S001',
    name: 'Carlos Rodríguez',
    email: 'vendedor@zellgo.com',
    role: 'seller',
    password: 'vendedor123' // En un entorno real, nunca almacenar contraseñas en texto plano
  }
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const user = authService.getCurrentUser();
          setCurrentUser(user);
          setIsAuthenticated(true);
          setUserRole(user.role || 'visitor');
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      // Para desarrollo, verificar si es un usuario de prueba
      if (TEST_USERS[email] && TEST_USERS[email].password === password) {
        const testUser = { ...TEST_USERS[email] };
        delete testUser.password; // No incluir la contraseña en el objeto de usuario
        
        // Simular respuesta de API
        const mockResponse = {
          user: testUser,
          token: `mock-token-${Date.now()}`
        };
        
        // Guardar en localStorage como lo haría authService
        localStorage.setItem('authToken', mockResponse.token);
        localStorage.setItem('currentUser', JSON.stringify(mockResponse.user));
        
        setCurrentUser(mockResponse.user);
        setIsAuthenticated(true);
        setUserRole(mockResponse.user.role);
        
        return mockResponse;
      }
      
      // Si no es un usuario de prueba, continuar con el flujo normal de API
      const response = await authService.login(email, password);
      setCurrentUser(response.user);
      setIsAuthenticated(true);
      setUserRole(response.user.role || 'visitor');
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      setCurrentUser(response.user);
      setIsAuthenticated(true);
      setUserRole(response.user.role || 'visitor');
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setCurrentUser(null);
    setIsAuthenticated(false);
    setUserRole(null);
  };

  const value = {
    currentUser,
    loading,
    isAuthenticated,
    userRole,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export default AuthContext;