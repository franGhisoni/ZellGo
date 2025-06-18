import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FaUser, FaEnvelope, FaPhone, FaIdCard, FaMapMarkerAlt, FaCalendarAlt, FaChartLine, FaFileInvoiceDollar } from 'react-icons/fa';
import './SellerDashboard.css';

const SellerDashboard = () => {
  const { currentUser } = useAuth();
  const [sellerData, setSellerData] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    // Simulación de carga de datos del vendedor desde la API
    const fetchSellerData = async () => {
      try {
        // En un entorno real, esto sería una llamada a la API
        // const response = await fetch('/api/seller/profile');
        // const data = await response.json();
        
        // Datos simulados para desarrollo
        const mockSellerData = {
          id: 'S001',
          name: 'Carlos Rodríguez',
          email: 'vendedor@zellgo.com',
          phone: '555-123-4567',
          idNumber: '28456789',
          address: 'Av. Corrientes 1234, CABA',
          joinDate: '2023-01-15',
          role: 'seller',
          zone: 'Capital Federal',
          supervisor: 'Ana Martínez',
          commissionRate: 5
        };

        const mockSalesData = [
          { id: 1, date: '2023-05-10', client: 'Juan Pérez', product: 'Internet Movistar 300MB', amount: 15000, commission: 750, status: 'completed' },
          { id: 2, date: '2023-05-15', client: 'María López', product: 'Telefonía Movistar Plan Familiar', amount: 8000, commission: 400, status: 'completed' },
          { id: 3, date: '2023-05-20', client: 'Roberto Gómez', product: 'Seguro de Vida Zurich', amount: 12000, commission: 600, status: 'pending' },
          { id: 4, date: '2023-05-25', client: 'Laura Torres', product: 'Internet Movistar 500MB', amount: 18000, commission: 900, status: 'completed' },
          { id: 5, date: '2023-05-30', client: 'Pedro Sánchez', product: 'Telefonía Movistar Plan Premium', amount: 10000, commission: 500, status: 'pending' }
        ];

        // Simular retraso de red
        setTimeout(() => {
          setSellerData(mockSellerData);
          setSalesData(mockSalesData);
          setLoading(false);
        }, 800);

      } catch (error) {
        console.error('Error al cargar datos del vendedor:', error);
        setLoading(false);
      }
    };

    fetchSellerData();
  }, []);

  // Calcular estadísticas de ventas
  const calculateStats = () => {
    if (!salesData.length) return { total: 0, completed: 0, pending: 0, totalCommission: 0 };

    const total = salesData.length;
    const completed = salesData.filter(sale => sale.status === 'completed').length;
    const pending = salesData.filter(sale => sale.status === 'pending').length;
    const totalCommission = salesData.reduce((sum, sale) => sum + sale.commission, 0);

    return { total, completed, pending, totalCommission };
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="seller-dashboard loading">
        <div className="loader"></div>
        <p>Cargando datos...</p>
      </div>
    );
  }

  return (
    <div className="seller-dashboard">
      <div className="dashboard-header">
        <h1>Panel de Vendedor</h1>
        <div className="user-welcome">
          <span>Bienvenido, {sellerData?.name}</span>
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
          className={`tab-button ${activeTab === 'sales' ? 'active' : ''}`}
          onClick={() => setActiveTab('sales')}
        >
          <FaChartLine /> Ventas
        </button>
        <button 
          className={`tab-button ${activeTab === 'commissions' ? 'active' : ''}`}
          onClick={() => setActiveTab('commissions')}
        >
          <FaFileInvoiceDollar /> Comisiones
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'profile' && (
          <div className="profile-section">
            <h2>Información Personal</h2>
            <div className="profile-card">
              <div className="profile-info">
                <div className="info-item">
                  <FaUser className="info-icon" />
                  <div>
                    <span className="info-label">Nombre</span>
                    <span className="info-value">{sellerData.name}</span>
                  </div>
                </div>
                <div className="info-item">
                  <FaEnvelope className="info-icon" />
                  <div>
                    <span className="info-label">Email</span>
                    <span className="info-value">{sellerData.email}</span>
                  </div>
                </div>
                <div className="info-item">
                  <FaPhone className="info-icon" />
                  <div>
                    <span className="info-label">Teléfono</span>
                    <span className="info-value">{sellerData.phone}</span>
                  </div>
                </div>
                <div className="info-item">
                  <FaIdCard className="info-icon" />
                  <div>
                    <span className="info-label">DNI</span>
                    <span className="info-value">{sellerData.idNumber}</span>
                  </div>
                </div>
                <div className="info-item">
                  <FaMapMarkerAlt className="info-icon" />
                  <div>
                    <span className="info-label">Dirección</span>
                    <span className="info-value">{sellerData.address}</span>
                  </div>
                </div>
                <div className="info-item">
                  <FaCalendarAlt className="info-icon" />
                  <div>
                    <span className="info-label">Fecha de ingreso</span>
                    <span className="info-value">{new Date(sellerData.joinDate).toLocaleDateString()}</span>
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
                <span className="info-label">Zona asignada</span>
                <span className="info-value">{sellerData.zone}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Supervisor</span>
                <span className="info-value">{sellerData.supervisor}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Tasa de comisión</span>
                <span className="info-value">{sellerData.commissionRate}%</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sales' && (
          <div className="sales-section">
            <h2>Mis Ventas</h2>
            
            <div className="stats-cards">
              <div className="stat-card">
                <div className="stat-value">{stats.total}</div>
                <div className="stat-label">Total Ventas</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{stats.completed}</div>
                <div className="stat-label">Completadas</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{stats.pending}</div>
                <div className="stat-label">Pendientes</div>
              </div>
            </div>

            <div className="sales-table-container">
              <table className="sales-table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Cliente</th>
                    <th>Producto</th>
                    <th>Monto</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData.map(sale => (
                    <tr key={sale.id}>
                      <td>{sale.date}</td>
                      <td>{sale.client}</td>
                      <td>{sale.product}</td>
                      <td>${sale.amount.toLocaleString()}</td>
                      <td>
                        <span className={`status-badge ${sale.status}`}>
                          {sale.status === 'completed' ? 'Completada' : 'Pendiente'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'commissions' && (
          <div className="commissions-section">
            <h2>Mis Comisiones</h2>
            
            <div className="commission-summary">
              <div className="total-commission">
                <span className="commission-label">Comisión Total</span>
                <span className="commission-value">${stats.totalCommission.toLocaleString()}</span>
              </div>
            </div>

            <div className="commissions-table-container">
              <table className="commissions-table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Cliente</th>
                    <th>Producto</th>
                    <th>Monto Venta</th>
                    <th>Comisión</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData.map(sale => (
                    <tr key={sale.id}>
                      <td>{sale.date}</td>
                      <td>{sale.client}</td>
                      <td>{sale.product}</td>
                      <td>${sale.amount.toLocaleString()}</td>
                      <td>${sale.commission.toLocaleString()}</td>
                      <td>
                        <span className={`status-badge ${sale.status}`}>
                          {sale.status === 'completed' ? 'Pagada' : 'Pendiente'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;