// src/services/authService.js
import fetchAPI from './api';

/**
 * Servicio para gestionar la autenticación de usuarios
 */
const authService = {
  /**
   * Iniciar sesión con email y contraseña
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña del usuario
   * @returns {Promise<Object>} - Datos del usuario autenticado
   */
  async login(email, password) {
    try {
      const data = await fetchAPI('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      
      // Guardar token en localStorage
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      
      return data;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  },

  /**
   * Registrar un nuevo usuario
   * @param {Object} userData - Datos del usuario a registrar
   * @returns {Promise<Object>} - Datos del usuario registrado
   */
  async register(userData) {
    try {
      const data = await fetchAPI('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
      
      // Guardar token en localStorage si se devuelve
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      
      return data;
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  },

  /**
   * Cerrar sesión
   */
  logout() {
    localStorage.removeItem('authToken');
  },

  /**
   * Verificar si el usuario está autenticado
   * @returns {boolean} - true si está autenticado, false en caso contrario
   */
  isAuthenticated() {
    return !!localStorage.getItem('authToken');
  },

  /**
   * Obtener el token de autenticación
   * @returns {string|null} - Token de autenticación o null si no existe
   */
  getToken() {
    return localStorage.getItem('authToken');
  },

  /**
   * Obtener datos del usuario actual
   * @returns {Promise<Object>} - Datos del usuario
   */
  async getCurrentUser() {
    try {
      return await fetchAPI('/auth/me', {
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });
    } catch (error) {
      console.error('Error al obtener usuario actual:', error);
      throw error;
    }
  }
};

export default authService;