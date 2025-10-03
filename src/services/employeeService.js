// src/services/employeeService.js
import fetchAPI from './api';

function mapRelationItem(item) {
  if (!item) return null;
  const { id } = item;
  const attributes = item.attributes || item || {};
  return { id, ...attributes };
}

function mapRelationList(list) {
  if (!Array.isArray(list)) return [];
  return list.map(mapRelationItem).filter(Boolean);
}

function mapEmpleadoFromStrapi(entity) {
  if (!entity) return null;
  const { id } = entity;
  const attributes = entity.attributes || entity || {};
  const documentId = entity.documentId || attributes.documentId || null;
  const {
    nombre_completo,
    dni,
    telefono,
    email,
    codigo_vendedor,
    tipo,
    fecha_ingreso,
    fecha_egreso,
    activo,
    creado_por_scraping,
    foto_url,
    supervisor,
    subordinados,
    ventas,
    usuario,
  } = attributes;

  // Strapi v4 relations come under attributes.<rel>.data
  const supervisorData = supervisor?.data
    ? mapRelationItem(supervisor.data)
    : (supervisor && (supervisor.id || supervisor.nombre_completo) ? supervisor : null);
  const subordinadosData = subordinados?.data ? mapRelationList(subordinados.data) : (Array.isArray(subordinados) ? subordinados : []);
  // Evitamos cargar todas las ventas: si vinieron pobladas contamos; si no, dejamos 0 (se calcula por API aparte)
  const ventasData = ventas?.data ? mapRelationList(ventas.data) : [];
  const totalVentas = Array.isArray(ventasData) ? ventasData.length : 0;

  const emailResolved = email || (usuario && typeof usuario === 'object' ? usuario.email : null);

  return {
    id,
    documentId,
    nombre_completo,
    dni,
    telefono,
    email: emailResolved,
    codigo_vendedor,
    tipo,
    fecha_ingreso,
    fecha_egreso,
    activo,
    creado_por_scraping,
    foto_url,
    supervisor: supervisorData,
    subordinados: subordinadosData,
    ventas: ventasData,
    totalVentas,
  };
}

const employeeService = {
  async getById(id) {
    if (!id) throw new Error('id es requerido');
    const params = new URLSearchParams({
      'filters[id][$eq]': String(id),
      'fields[0]': 'nombre_completo',
      'fields[1]': 'dni',
      'fields[2]': 'telefono',
      'fields[3]': 'email',
      'fields[4]': 'codigo_vendedor',
      'fields[5]': 'tipo',
      'fields[6]': 'fecha_ingreso',
      'fields[7]': 'fecha_egreso',
      'fields[8]': 'activo',
      'fields[9]': 'foto_url',
      'populate[supervisor][fields][0]': 'nombre_completo',
      'populate[supervisor][fields][1]': 'dni',
      'populate[supervisor][fields][2]': 'codigo_vendedor',
      'populate[supervisor][fields][3]': 'foto_url',
    }).toString();

    const res = await fetchAPI(`/api/empleados?${params}`);
    const first = Array.isArray(res?.data)
      ? res.data[0]
      : (Array.isArray(res?.data?.data) ? res.data.data[0] : null);
    return mapEmpleadoFromStrapi(first);
  },
  async getByCodigo(codigoVendedor) {
    if (!codigoVendedor) throw new Error('codigoVendedor es requerido');
    // Búsqueda case-insensitive y populate mínimo
    const params = new URLSearchParams({
      'filters[codigo_vendedor][$eqi]': String(codigoVendedor),
      'fields[0]': 'nombre_completo',
      'fields[1]': 'dni',
      'fields[2]': 'telefono',
      'fields[3]': 'email',
      'fields[4]': 'codigo_vendedor',
      'fields[5]': 'tipo',
      'fields[6]': 'fecha_ingreso',
      'fields[7]': 'fecha_egreso',
      'fields[8]': 'activo',
      'fields[9]': 'foto_url',
      // Solo supervisor con campos básicos
      'populate[supervisor][fields][0]': 'nombre_completo',
      'populate[supervisor][fields][1]': 'dni',
      'populate[supervisor][fields][2]': 'codigo_vendedor',
      'populate[supervisor][fields][3]': 'foto_url',
    });
    const query = params.toString();

    const res = await fetchAPI(`/api/empleados?${query}`);
    try { console.log('[employeeService] raw response', res); } catch {}
    // Soporta { data: [...] } (Strapi v4) y { data: { data: [...] } } si hubiera proxy
    let first = Array.isArray(res?.data)
      ? res.data[0]
      : (Array.isArray(res?.data?.data) ? res.data.data[0] : null);
    // Si no hubo coincidencia por eqi, intentar exacto eq como fallback
    if (!first) {
      const q2 = new URLSearchParams({
        'filters[codigo_vendedor][$eq]': String(codigoVendedor),
        'fields[0]': 'nombre_completo',
        'fields[1]': 'dni',
        'fields[2]': 'telefono',
        'fields[3]': 'email',
        'fields[4]': 'codigo_vendedor',
        'fields[5]': 'tipo',
        'fields[6]': 'fecha_ingreso',
        'fields[7]': 'fecha_egreso',
        'fields[8]': 'activo',
        'fields[9]': 'foto_url',
        'populate[supervisor][fields][0]': 'nombre_completo',
        'populate[supervisor][fields][1]': 'dni',
        'populate[supervisor][fields][2]': 'codigo_vendedor',
        'populate[supervisor][fields][3]': 'foto_url',
      }).toString();
      const res2 = await fetchAPI(`/api/empleados?${q2}`);
      first = Array.isArray(res2?.data) ? res2.data[0] : (Array.isArray(res2?.data?.data) ? res2.data.data[0] : null);
    }
    try { console.log('[employeeService] first entity', first); } catch {}
    return mapEmpleadoFromStrapi(first);
  },

  async getSubordinates(supervisorId) {
    if (!supervisorId) return [];
    const query = new URLSearchParams({
      'filters[supervisor][id][$eq]': String(supervisorId),
      'pagination[pageSize]': '100',
      'sort': 'nombre_completo:asc',
    }).toString();
    const res = await fetchAPI(`/api/empleados?${query}`);
    const list = Array.isArray(res?.data)
      ? res.data
      : (Array.isArray(res?.data?.data) ? res.data.data : []);
    return list.map((e) => mapRelationItem(e));
  },

  async getVentasCount(empleadoId) {
    if (!empleadoId) return 0;
    const query = new URLSearchParams({
      'filters[empleado][id][$eq]': String(empleadoId),
      'pagination[page]': '1',
      'pagination[pageSize]': '1',
    }).toString();
    const res = await fetchAPI(`/api/ventas?${query}`);
    const total = res?.meta?.pagination?.total;
    return Number.isFinite(total) ? total : 0;
  },

  async getSupervisorFor(subordinateId) {
    if (!subordinateId) return null;
    const query = new URLSearchParams({
      'filters[subordinados][id][$eq]': String(subordinateId),
      'fields[0]': 'nombre_completo',
      'fields[1]': 'dni',
      'fields[2]': 'codigo_vendedor',
      'pagination[pageSize]': '1',
    }).toString();
    const res = await fetchAPI(`/api/empleados?${query}`);
    const first = Array.isArray(res?.data) ? res.data[0] : (Array.isArray(res?.data?.data) ? res.data.data[0] : null);
    return first ? mapRelationItem(first) : null;
  },
};

export default employeeService;


