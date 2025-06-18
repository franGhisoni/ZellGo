import { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-scroll';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

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

  return (
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
        <div className="navbar-login">
          <a href="#" className="login-button">Login</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;