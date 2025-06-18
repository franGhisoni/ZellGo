import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FaUser, FaUsers, FaChartLine, FaFileInvoiceDollar, FaCog, FaUserTie, FaEnvelope, FaPhone, FaIdCard, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const [adminData, setAdminData] = useState(null);
  const [usersData, setUsersData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    // Simulación de carga de datos del administrador desde la API
    const fetchAdminData = async () => {
      try {
        // En un entorno real, esto sería una llamada a la API
        // const response = await fetch('/api/admin/profile');
        // const data = await response.json();
        
        // Datos simulados para desarrollo
        const mockAdminData = {
          id: 'A001',
          name: 'Laura Gómez',
          email: 'admin@zellgo.com',
          phone: '555-987-6543',
          idNumber: '25789456',
          address: 'Av. Libertador 5000, CABA',
          joinDate: '2022-05-10',
          role: 'admin',
          department: 'Administración',
          permissions: ['users_manage', 'sales_view', 'reports_generate', 'settings_edit']
        };

        const mockUsersData = [
          { id: 'S001', name: 'Carlos Rodríguez', email: 'vendedor@zellgo.com', role: 'seller', status: 'active', joinDate: '2023-01-15', lastLogin: '2023-05-29', salesCount: 45 },
          { id: 'S002', name: 'Ana Martínez', email: 'ana.martinez@zellgo.com', role: 'seller', status: 'active', joinDate: '2023-02-20', lastLogin: '2023-05-28', salesCount: 38 },
          { id: 'S003', name: 'Miguel López', email: 'miguel.lopez@zellgo.com', role: 'seller', status: 'inactive', joinDate: '2023-03-10', lastLogin: '2023-05-15', salesCount: 22 },
          { id: 'A002', name: 'Sofía Torres', email: 'sofia.torres@zellgo.com', role: 'admin', status: 'active', joinDate: '2022-08-15', lastLogin: '2023-05-29', salesCount: 0 },
          { id: 'S004', name: 'Javier Sánchez', email: 'javier.sanchez@zellgo.com', role: 'seller', status: 'active', joinDate: '2023-04-05', lastLogin: '2023-05-27', salesCount: 18 }
        ];

        const mockSalesData = [
          { id: 1, date: '2023-05-10', seller: 'Carlos Rodríguez', client: 'Juan Pérez', product: 'Internet Movistar 300MB', amount: 15000, status: 'completed' },
          { id: 2, date: '2023-05-15', seller: 'Ana Martínez', client: 'María López', product: 'Telefonía Movistar Plan Familiar', amount: 8000, status: 'completed' },
          { id: 3, date: '2023-05-20', seller: 'Miguel López', client: 'Roberto Gómez', product: 'Seguro de Vida Zurich', amount: 12000, status: 'pending' },
          { id: 4, date: '2023-05-25', seller: 'Carlos Rodríguez', client: 'Laura Torres', product: 'Internet Movistar 500MB', amount: 18000, status: 'completed' },
          { id: 5, date: '2023-05-30', seller: 'Ana Martínez', client: 'Pedro Sánchez', product: 'Telefonía Movistar Plan Premium', amount: 10000, status: 'pending' },
          { id: 6, date: '2023-06-01', seller: 'Javier Sánchez', client: 'Lucía Fernández', product: 'Seguro de Vida Zurich', amount: 15000, status: 'pending' },
          { id: 7, date: '2023-06-02', seller: 'Carlos Rodríguez', client: 'Martín Gutiérrez', product: 'Internet Movistar 300MB', amount: 15000, status: 'completed' },
          { id: 8, date: '2023-06-03', seller: 'Ana Martínez', client: 'Valentina Díaz', product: 'Telefonía Movistar Plan Familiar', amount: 8000, status: 'completed' }
        ];

        // Simular retraso de red
        setTimeout(() => {
          setAdminData(mockAdminData);
          setUsersData(mockUsersData);
          setSalesData(mockSalesData);
          setLoading(false);
        }, 800);

      } catch (error) {
        console.error('Error al cargar datos del administrador:', error);
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  // Calcular estadísticas
  const calculateStats = () => {
    if (!salesData.length || !usersData.length) return { totalSales: 0, totalAmount: 0, activeSellers: 0, pendingSales: 0 };

    const totalSales = salesData.length;
    const totalAmount = salesData.reduce((sum, sale) => sum + sale.amount, 0);
    const activeSellers = usersData.filter(user => user.role === 'seller' && user.status === 'active').length;
    const pendingSales = salesData.filter(sale => sale.status === 'pending').length;

    return { totalSales, totalAmount, activeSellers, pendingSales };
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="admin-dashboard loading">
        <div className="loader"></div>
        <p>Cargando datos...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Panel de Administrador</h1>
        <div className="user-welcome">
          <span>Bienvenido, {adminData?.name}</span>
        </div>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <FaUser /> Perfil
        </button>
        <button 
          className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <FaUsers /> Usuarios
        </button>
        <button 
          className={`tab-button ${activeTab === 'sales' ? 'active' : ''}`}
          onClick={() => setActiveTab('sales')}
        >
          <FaChartLine /> Ventas
        </button>
        <button 
          className={`tab-button ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          <FaFileInvoiceDollar /> Reportes
        </button>
        <button 
          className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <FaCog /> Configuración
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'profile' && (
          <div className="profile-section">
            <h2>Información Personal</h2>
            <div className="profile-card">
              <div className="profile-info">
                <div className="info-item">
                  <FaUserTie className="info-icon" />
                  <div>
                    <span className="info-label">Nombre</span>
                    <span className="info-value">{adminData.name}</span>
                  </div>
                </div>
                <div className="info-item">
                  <FaEnvelope className="info-icon" />
                  <div>
                    <span className="info-label">Email</span>
                    <span className="info-value">{adminData.email}</span>
                  </div>
                </div>
                <div className="info-item">
                  <FaPhone className="info-icon" />
                  <div>
                    <span className="info-label">Teléfono</span>
                    <span className="info-value">{adminData.phone}</span>
                  </div>
                </div>
                <div className="info-item">
                  <FaIdCard className="info-icon" />
                  <div>
                    <span className="info-label">DNI</span>
                    <span className="info-value">{adminData.idNumber}</span>
                  </div>
                </div>
                <div className="info-item">
                  <FaMapMarkerAlt className="info-icon" />
                  <div>
                    <span className="info-label">Dirección</span>
                    <span className="info-value">{adminData.address}</span>
                  </div>
                </div>
                <div className="info-item">
                  <FaCalendarAlt className="info-icon" />
                  <div>
                    <span className="info-label">Fecha de ingreso</span>
                    <span className="info-value">{new Date(adminData.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="profile-actions">
                <button className="edit-profile-btn">Editar Perfil</button>
                <button className="change-password-btn">Cambiar Contraseña</button>
              </div>
            </div>

            <h2>Información Laboral</h2>
            <div className="work-info-card">
              <div className="info-item">
                <span className="info-label">Departamento</span>
                <span className="info-value">{adminData.department}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Rol</span>
                <span className="info-value">Administrador</span>
              </div>
              <div className="info-item">
                <span className="info-label">Permisos</span>
                <div className="permissions-list">
                  {adminData.permissions.map((permission, index) => (
                    <span key={index} className="permission-badge">
                      {permission.replace('_', ' ')}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="users-section">
            <h2>Gestión de Usuarios</h2>
            
            <div className="section-actions">
              <button className="add-user-btn">+ Agregar Usuario</button>
              <div className="search-container">
                <input type="text" placeholder="Buscar usuario..." className="search-input" />
                <button className="search-btn">Buscar</button>
              </div>
            </div>

            <div className="users-table-container">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Fecha Registro</th>
                    <th>Último Acceso</th>
                    <th>Ventas</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usersData.map(user => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`role-badge ${user.role}`}>
                          {user.role === 'admin' ? 'Admin' : 'Vendedor'}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${user.status}`}>
                          {user.status === 'active' ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td>{user.joinDate}</td>
                      <td>{user.lastLogin}</td>
                      <td>{user.salesCount}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="edit-btn">Editar</button>
                          <button className="delete-btn">Eliminar</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'sales' && (
          <div className="sales-section">
            <h2>Registro de Ventas</h2>
            
            <div className="stats-cards">
              <div className="stat-card">
                <div className="stat-value">{stats.totalSales}</div>
                <div className="stat-label">Total Ventas</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">${stats.totalAmount.toLocaleString()}</div>
                <div className="stat-label">Monto Total</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{stats.activeSellers}</div>
                <div className="stat-label">Vendedores Activos</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{stats.pendingSales}</div>
                <div className="stat-label">Ventas Pendientes</div>
              </div>
            </div>

            <div className="section-actions">
              <div className="filter-container">
                <select className="filter-select">
                  <option value="all">Todos los estados</option>
                  <option value="completed">Completadas</option>
                  <option value="pending">Pendientes</option>
                </select>
                <select className="filter-select">
                  <option value="all">Todos los vendedores</option>
                  <option value="Carlos Rodríguez">Carlos Rodríguez</option>
                  <option value="Ana Martínez">Ana Martínez</option>
                  <option value="Miguel López">Miguel López</option>
                  <option value="Javier Sánchez">Javier Sánchez</option>
                </select>
              </div>
              <div className="search-container">
                <input type="text" placeholder="Buscar venta..." className="search-input" />
                <button className="search-btn">Buscar</button>
              </div>
            </div>

            <div className="sales-table-container">
              <table className="sales-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Fecha</th>
                    <th>Vendedor</th>
                    <th>Cliente</th>
                    <th>Producto</th>
                    <th>Monto</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData.map(sale => (
                    <tr key={sale.id}>
                      <td>{sale.id}</td>
                      <td>{sale.date}</td>
                      <td>{sale.seller}</td>
                      <td>{sale.client}</td>
                      <td>{sale.product}</td>
                      <td>${sale.amount.toLocaleString()}</td>
                      <td>
                        <span className={`status-badge ${sale.status}`}>
                          {sale.status === 'completed' ? 'Completada' : 'Pendiente'}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="view-btn">Ver</button>
                          <button className="edit-btn">Editar</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="reports-section">
            <h2>Reportes y Estadísticas</h2>
            
            <div className="reports-grid">
              <div className="report-card">
                <h3>Reporte de Ventas</h3>
                <p>Genera informes detallados de ventas por período, vendedor o producto.</p>
                <div className="report-actions">
                  <select className="report-select">
                    <option value="daily">Diario</option>
                    <option value="weekly">Semanal</option>
                    <option value="monthly">Mensual</option>
                    <option value="yearly">Anual</option>
                  </select>
                  <button className="generate-report-btn">Generar</button>
                </div>
              </div>
              
              <div className="report-card">
                <h3>Rendimiento de Vendedores</h3>
                <p>Analiza el desempeño de cada vendedor con métricas detalladas.</p>
                <div className="report-actions">
                  <select className="report-select">
                    <option value="all">Todos los vendedores</option>
                    <option value="Carlos Rodríguez">Carlos Rodríguez</option>
                    <option value="Ana Martínez">Ana Martínez</option>
                    <option value="Miguel López">Miguel López</option>
                    <option value="Javier Sánchez">Javier Sánchez</option>
                  </select>
                  <button className="generate-report-btn">Generar</button>
                </div>
              </div>
              
              <div className="report-card">
                <h3>Análisis de Productos</h3>
                <p>Visualiza qué productos generan más ventas y comisiones.</p>
                <div className="report-actions">
                  <button className="generate-report-btn full-width">Generar</button>
                </div>
              </div>
              
              <div className="report-card">
                <h3>Proyecciones</h3>
                <p>Proyecta ventas futuras basadas en datos históricos.</p>
                <div className="report-actions">
                  <select className="report-select">
                    <option value="1month">1 mes</option>
                    <option value="3months">3 meses</option>
                    <option value="6months">6 meses</option>
                    <option value="1year">1 año</option>
                  </select>
                  <button className="generate-report-btn">Generar</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="settings-section">
            <h2>Configuración del Sistema</h2>
            
            <div className="settings-grid">
              <div className="settings-card">
                <h3>Configuración General</h3>
                <div className="settings-form">
                  <div className="form-group">
                    <label>Nombre de la Empresa</label>
                    <input type="text" value="ZellGo" />
                  </div>
                  <div className="form-group">
                    <label>Email de Contacto</label>
                    <input type="email" value="contacto@zellgo.com" />
                  </div>
                  <div className="form-group">
                    <label>Teléfono de Contacto</label>
                    <input type="text" value="+54 11 5555-5555" />
                  </div>
                  <button className="save-settings-btn">Guardar Cambios</button>
                </div>
              </div>
              
              <div className="settings-card">
                <h3>Configuración de Comisiones</h3>
                <div className="settings-form">
                  <div className="form-group">
                    <label>Tasa de Comisión Base</label>
                    <input type="number" value="5" min="0" max="100" /> %
                  </div>
                  <div className="form-group">
                    <label>Comisión Internet Movistar</label>
                    <input type="number" value="5" min="0" max="100" /> %
                  </div>
                  <div className="form-group">
                    <label>Comisión Telefonía Movistar</label>
                    <input type="number" value="5" min="0" max="100" /> %
                  </div>
                  <div className="form-group">
                    <label>Comisión Seguros Zurich</label>
                    <input type="number" value="5" min="0" max="100" /> %
                  </div>
                  <button className="save-settings-btn">Guardar Cambios</button>
                </div>
              </div>
              
              <div className="settings-card">
                <h3>Gestión de Roles y Permisos</h3>
                <div className="settings-form">
                  <div className="form-group">
                    <label>Rol</label>
                    <select>
                      <option value="admin">Administrador</option>
                      <option value="seller">Vendedor</option>
                    </select>
                  </div>
                  <div className="permissions-list-edit">
                    <div className="permission-item">
                      <input type="checkbox" id="users_manage" checked />
                      <label htmlFor="users_manage">Gestionar Usuarios</label>
                    </div>
                    <div className="permission-item">
                      <input type="checkbox" id="sales_view" checked />
                      <label htmlFor="sales_view">Ver Ventas</label>
                    </div>
                    <div className="permission-item">
                      <input type="checkbox" id="sales_edit" checked />
                      <label htmlFor="sales_edit">Editar Ventas</label>
                    </div>
                    <div className="permission-item">
                      <input type="checkbox" id="reports_generate" checked />
                      <label htmlFor="reports_generate">Generar Reportes</label>
                    </div>
                    <div className="permission-item">
                      <input type="checkbox" id="settings_edit" checked />
                      <label htmlFor="settings_edit">Editar Configuración</label>
                    </div>
                  </div>
                  <button className="save-settings-btn">Guardar Cambios</button>
                </div>
              </div>
              
              <div className="settings-card">
                <h3>Respaldo y Restauración</h3>
                <div className="settings-form">
                  <p>Realiza copias de seguridad de la base de datos y restaura cuando sea necesario.</p>
                  <div className="backup-actions">
                    <button className="backup-btn">Crear Respaldo</button>
                    <button className="restore-btn">Restaurar</button>
                  </div>
                  <div className="backup-history">
                    <h4>Respaldos Recientes</h4>
                    <ul>
                      <li>
                        <span>backup_2023-05-30.zip</span>
                        <div>
                          <button className="download-btn">Descargar</button>
                          <button className="delete-btn">Eliminar</button>
                        </div>
                      </li>
                      <li>
                        <span>backup_2023-05-15.zip</span>
                        <div>
                          <button className="download-btn">Descargar</button>
                          <button className="delete-btn">Eliminar</button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;