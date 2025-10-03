// src/services/api.js

/**
 * Configuración base para las peticiones a la API
 */
const API_URL = (import.meta.env.VITE_API_URL || 'https://api.example.com').replace(/\/$/, '');

/**
 * Función para realizar peticiones a la API
 * @param {string} endpoint - Endpoint de la API
 * @param {Object} options - Opciones de la petición
 * @returns {Promise} - Promesa con la respuesta
 */
async function fetchAPI(endpoint, options = {}) {
  // Normaliza la URL final y evita duplicar /api (p.ej. base .../api + endpoint /api/empleados)
  let path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  if (API_URL.endsWith('/api') && path.startsWith('/api')) {
    path = path.replace(/^\/api/, '');
  }
  const url = `${API_URL}${path}`;
  
  const token = import.meta.env.VITE_STRAPI_TOKEN;
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error en la petición API:', error);
    throw error;
  }
}

export default fetchAPI;