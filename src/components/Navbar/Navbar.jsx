import { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-scroll';
import Auth from '../Auth/Auth';
import { useAuth } from '../../context/AuthContext';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const openAuthModal = () => {
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <div className="navbar-logo">
            <a href="#">ZellGo</a>
          </div>
          <div className="navbar-links">
            <Link to="inicio" smooth={true} duration={500}>Inicio</Link>
            <Link to="nosotros" smooth={true} duration={500}>Nosotros</Link>
            <Link to="contacto" smooth={true} duration={500}>Contacto</Link>
            <Link to="trabaja" smooth={true} duration={500}>Trabaja con Nosotros</Link>
          </div>
          <div className="navbar-auth">
            {isAuthenticated ? (
              <div className="user-menu-container">
                <button onClick={toggleUserMenu} className="user-menu-button">
                  <FaUser />
                  <span className="user-name">{currentUser?.name || 'Usuario'}</span>
                </button>
                {userMenuOpen && (
                  <div className="user-dropdown">
                    <a href="#perfil">Mi Perfil</a>
                    <a href="#configuracion">Configuración</a>
                    <button onClick={handleLogout} className="logout-button">
                      <FaSignOutAlt /> Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={openAuthModal} className="login-button">Login</button>
            )}
          </div>
        </div>
      </nav>

      <Auth isOpen={authModalOpen} onClose={closeAuthModal} />
    </>
  );
};

export default Navbar;