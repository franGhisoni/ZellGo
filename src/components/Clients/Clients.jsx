import { useEffect, useState } from 'react';
import './Clients.css';

const Clients = () => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.pageYOffset);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const bgTranslate = -offsetY * 0.05;

  // Logos de clientes (usando placeholders de logotipos genéricos)
  const clients = [
    {
      id: 1,
      name: 'TechCorp',
      logo: 'https://placehold.co/200x100/f5f5f5/333333?text=TechCorp',
    },
    {
      id: 2,
      name: 'InnovateLabs',
      logo: 'https://placehold.co/200x100/f5f5f5/333333?text=InnovateLabs',
    },
    {
      id: 3,
      name: 'FutureWorks',
      logo: 'https://placehold.co/200x100/f5f5f5/333333?text=FutureWorks',
    },
    {
      id: 4,
      name: 'GlobalSoft',
      logo: 'https://placehold.co/200x100/f5f5f5/333333?text=GlobalSoft',
    },
    {
      id: 5,
      name: 'NextGen',
      logo: 'https://placehold.co/200x100/f5f5f5/333333?text=NextGen',
    },
    {
      id: 6,
      name: 'SmartSolutions',
      logo: 'https://placehold.co/200x100/f5f5f5/333333?text=SmartSolutions',
    },
  ];

  return (
    <section className="clients-section">
      <div 
        className="clients-bg"
        style={{ transform: `translateY(${bgTranslate}px)` }}
      />
      
      <div className="clients-container">
        <h2 className="clients-title">Empresas que confían en nosotros</h2>
        <p className="clients-subtitle">Colaboramos con organizaciones de diversos sectores para impulsar su transformación digital</p>
        
        <div className="clients-grid">
          {clients.map((client) => (
            <div key={client.id} className="client-item">
              <img 
                src={client.logo} 
                alt={`${client.name} logo`} 
                className="client-logo"
              />
            </div>
          ))}
        </div>
        
        <div className="clients-cta">
          <p>¿Quieres ser parte de nuestra lista de clientes satisfechos?</p>
          <a href="#contacto" className="client-contact-btn">Contáctanos hoy</a>
        </div>
      </div>
    </section>
  );
};

export default Clients;