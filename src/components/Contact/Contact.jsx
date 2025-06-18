import { useState } from 'react';
import './Contact.css';
import { FaPhone, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    alert('Mensaje enviado correctamente!');
    setFormData({
      name: '',
      email: '',
      reason: '',
      message: ''
    });
  };

  return (
    <section id="contacto" className="contact-section">
      <div className="contact-container">
        <div className="contact-info">
          <img src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80" alt="Contact" />
          <h2>Contáctanos</h2>
          <div className="contact-details">
            <div className="contact-detail">
              <div className="contact-icon">
                <FaPhone />
              </div>
              <div className="contact-text">
                <h3>Teléfono</h3>
                <p>+34 123 456 789</p>
              </div>
            </div>
            <div className="contact-detail">
              <div className="contact-icon">
                <FaMapMarkerAlt />
              </div>
              <div className="contact-text">
                <h3>Dirección</h3>
                <p>Calle Principal 123, Madrid, España</p>
              </div>
            </div>
            <div className="contact-detail">
              <div className="contact-icon">
                <FaEnvelope />
              </div>
              <div className="contact-text">
                <h3>Email</h3>
                <p>info@zellgo.com</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="contact-form">
          <h2>Envíanos un mensaje</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="reason">Motivo de contacto</label>
              <select
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona una opción</option>
                <option value="info">Información general</option>
                <option value="quote">Solicitar presupuesto</option>
                <option value="support">Soporte técnico</option>
                <option value="other">Otro</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="message">Mensaje</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-button">Enviar mensaje</button>
          </form>
        </div>
      </div>
      
      <div className="contact-footer">
        <div className="footer-info">
          <div className="footer-section">
            <h3>ZellGo</h3>
            <ul className="contact-list">
              <li><FaMapMarkerAlt /> Calle Principal 123, Madrid, España</li>
              <li><FaPhone /> +34 123 456 789</li>
              <li><FaEnvelope /> info@zellgo.com</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Servicios</h3>
            <ul>
              <li><a href="#">Desarrollo Web</a></li>
              <li><a href="#">Diseño UX/UI</a></li>
              <li><a href="#">Marketing Digital</a></li>
              <li><a href="#">Consultoría</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Enlaces</h3>
            <ul>
              <li><a href="#">Inicio</a></li>
              <li><a href="#">Nosotros</a></li>
              <li><a href="#">Servicios</a></li>
              <li><a href="#contacto">Contacto</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-social">
          <p>© {new Date().getFullYear()} ZellGo. Todos los derechos reservados.</p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaPhone /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaMapMarkerAlt /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaEnvelope /></a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;