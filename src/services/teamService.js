// src/services/teamService.js
import fetchAPI from './api';

/**
 * Servicio para gestionar los datos del equipo
 */
const teamService = {
  /**
   * Obtiene todos los miembros del equipo
   * @returns {Promise<Array>} - Promesa con el array de miembros
   */
  async getAllMembers() {
    try {
      return await fetchAPI('/team');
    } catch (error) {
      console.error('Error al obtener miembros del equipo:', error);
      // Si hay un error, devolvemos un array vacío o podemos manejar un fallback
      return [];
    }
  },

  /**
   * Obtiene un miembro del equipo por su ID
   * @param {number|string} id - ID del miembro
   * @returns {Promise<Object>} - Promesa con los datos del miembro
   */
  async getMemberById(id) {
    try {
      return await fetchAPI(`/team/${id}`);
    } catch (error) {
      console.error(`Error al obtener miembro con ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Función de fallback que devuelve datos estáticos en caso de error
   * @returns {Array} - Array con datos estáticos de miembros
   */
  getFallbackData() {
    return [
      {
        id: 1,
        name: 'Federico Zoia',
        position: 'Asesor de Ventas',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
        bio: 'Stats helps you see how many more days you need to work to reach your financial goal for the month and year.',
        social: {
          twitter: 'https://twitter.com',
          linkedin: 'https://linkedin.com',
          instagram: 'https://instagram.com'
        },
        uniqueLink: 'https://zellgo.com/vendedor/federico-zoia'
      },
      {
        id: 2,
        name: 'Laura Martínez',
        position: 'Directora de Operaciones',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80',
        bio: 'Stats helps you see how many more days you need to work to reach your financial goal for the month and year.',
        social: {
          twitter: 'https://twitter.com',
          linkedin: 'https://linkedin.com',
          instagram: 'https://instagram.com'
        },
        uniqueLink: 'https://zellgo.com/vendedor/laura-martinez'
      },
      {
        id: 3,
        name: 'Carlos Rodríguez',
        position: 'Desarrollador Senior',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
        bio: 'Stats helps you see how many more days you need to work to reach your financial goal for the month and year.',
        social: {
          twitter: 'https://twitter.com',
          linkedin: 'https://linkedin.com',
          instagram: 'https://instagram.com'
        },
        uniqueLink: 'https://zellgo.com/vendedor/carlos-rodriguez'
      }
    ];
  }
};

export default teamService;