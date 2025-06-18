import { useState, useEffect } from 'react';
import { FaWifi, FaPhone, FaShieldAlt } from 'react-icons/fa';
import './Services.css';

const Services = () => {
  const [offsetY, setOffsetY] = useState(0);
  const [activeService, setActiveService] = useState(null);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.pageYOffset);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const bgTranslate = -offsetY * 0.1;
  const contentTranslate = -offsetY * 0.05;

  const services = [
    {
      id: 1,
      icon: <FaWifi />,
      title: 'Internet Movistar',
      shortDescription: 'Conexión de alta velocidad para tu hogar o negocio.',
      longDescription: 'Ofrecemos planes de internet de alta velocidad de Movistar con diferentes opciones adaptadas a tus necesidades. Disfruta de una conexión estable y rápida para tu hogar o negocio con el respaldo de una marca líder en telecomunicaciones.'
    },
    {
      id: 2,
      icon: <FaPhone />,
      title: 'Telefonía Movistar',
      shortDescription: 'Planes de telefonía móvil y fija.',
      longDescription: 'Comercializamos planes de telefonía móvil y fija de Movistar con tarifas competitivas. Nuestros asesores te ayudarán a encontrar el plan que mejor se adapte a tus necesidades de comunicación, ya sea para uso personal o empresarial.'
    },
    {
      id: 3,
      icon: <FaShieldAlt />,
      title: 'Seguros de Vida Zurich',
      shortDescription: 'Protección y tranquilidad para ti y tu familia.',
      longDescription: 'Como distribuidores autorizados de Zurich, ofrecemos seguros de vida que brindan protección financiera a ti y a tus seres queridos. Nuestros planes se adaptan a diferentes presupuestos y necesidades, garantizando tranquilidad ante cualquier imprevisto.'
    }
  ];

  const handleServiceClick = (id) => {
    setActiveService(activeService === id ? null : id);
  };

  return (
    <section id="servicios" className="services-section">
      <div 
        className="services-bg"
        style={{ transform: `translateY(${bgTranslate}px)` }}
      />
      
      <div 
        className="services-container"
        style={{ transform: `translateY(${contentTranslate}px)` }}
      >
        <h2 className="services-title">Nuestros Servicios</h2>
        <p className="services-subtitle">Somos una comercializadora especializada en servicios de telecomunicaciones y seguros</p>
        
        <div className="services-grid">
          {services.map((service) => (
            <div 
              key={service.id} 
              className={`service-card ${activeService === service.id ? 'active' : ''}`}
              onClick={() => handleServiceClick(service.id)}
            >
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p className="service-short-desc">{service.shortDescription}</p>
              <div className="service-details">
                <p>{service.longDescription}</p>
                <button className="service-cta">Solicitar información</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;