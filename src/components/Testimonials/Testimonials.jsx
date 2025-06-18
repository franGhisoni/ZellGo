import { useState, useEffect } from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import './Testimonials.css';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.pageYOffset);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const bgTranslate = -offsetY * 0.1;

  const testimonials = [
    {
      id: 1,
      name: 'María García',
      position: 'CEO, Innovatech',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      text: 'ZellGo transformó completamente nuestra presencia digital. Su enfoque personalizado y atención al detalle nos permitió destacar en un mercado altamente competitivo. El equipo no solo entendió nuestras necesidades, sino que superó nuestras expectativas.',
      rating: 5
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      position: 'Director de Marketing, TechSolutions',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      text: 'Trabajar con ZellGo ha sido una experiencia excepcional. Su capacidad para traducir nuestras ideas en soluciones tecnológicas efectivas es impresionante. El sitio web que desarrollaron no solo es visualmente atractivo, sino también altamente funcional y fácil de usar.',
      rating: 5
    },
    {
      id: 3,
      name: 'Laura Martínez',
      position: 'Fundadora, EcoStyle',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      text: 'Desde que implementamos las estrategias de marketing digital diseñadas por ZellGo, hemos visto un aumento significativo en nuestras conversiones. Su enfoque basado en datos y su comprensión de nuestro mercado objetivo han sido fundamentales para nuestro crecimiento.',
      rating: 4
    },
    {
      id: 4,
      name: 'Javier López',
      position: 'CTO, FinancePlus',
      image: 'https://randomuser.me/api/portraits/men/75.jpg',
      text: 'La consultoría IT proporcionada por ZellGo nos ayudó a optimizar nuestros procesos internos y mejorar significativamente nuestra eficiencia operativa. Su equipo técnico es altamente competente y siempre está disponible para resolver cualquier problema.',
      rating: 5
    }
  ];

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <FaStar key={i} className={i < rating ? 'star-filled' : 'star-empty'} />
    ));
  };

  return (
    <section id="testimonios" className="testimonials-section">
      <div 
        className="testimonials-bg"
        style={{ transform: `translateY(${bgTranslate}px)` }}
      />
      
      <div className="testimonials-container">
        <h2 className="testimonials-title">Lo que dicen nuestros clientes</h2>
        <p className="testimonials-subtitle">Historias de éxito y experiencias con nuestros servicios</p>
        
        <div className="testimonials-carousel">
          <div 
            className="testimonials-slider"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-quote">
                  <FaQuoteLeft className="quote-icon" />
                  <p>{testimonial.text}</p>
                  <div className="testimonial-rating">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
                <div className="testimonial-author">
                  <img src={testimonial.image} alt={testimonial.name} />
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <button 
                key={index} 
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
                aria-label={`Ver testimonio ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;