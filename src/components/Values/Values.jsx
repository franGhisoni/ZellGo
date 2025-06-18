// src/components/Values/Values.jsx
import { useState, useEffect } from 'react';
import { FaHandshake, FaStar, FaHeart } from 'react-icons/fa';
import './Values.css';

const Values = () => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.pageYOffset);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // calculamos dos velocidades: 
  // el fondo se mueve despacio (factor 0.2) 
  // y el contenido rápido (factor 0.5)
  const bgTranslate = -offsetY * 0.9
  ;
  const contentTranslate = -offsetY * 0.05
  ;

  const values = [
    { id: 1, icon: <FaHandshake className="value-icon" />, title: 'Confianza',  description: 'Cada cliente recibe una atención honesta y transparente.' },
    { id: 2, icon: <FaStar     className="value-icon" />, title: 'Excelencia', description: 'Brindamos asesoría especializada para encontrar la mejor solución.' },
    { id: 3, icon: <FaHeart    className="value-icon" />, title: 'Compromiso',  description: 'Brindamos asesoría especializada para encontrar la mejor solución.' },
  ];

  return (
    <section className="values-section">
      {/* Capa de fondo parallax */}
      <div
        className="values-bg"
        style={{ transform: `translateY(${bgTranslate}px)` }}
      />

      {/* Contenido que sube más rápido */}
      <div
        className="values-container"
        style={{ transform: `translateY(${contentTranslate}px)` }}
      >
        {values.map(v => (
          <div key={v.id} className="value-card">
            {v.icon}
            <h3>{v.title}</h3>
            <p>{v.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Values;
