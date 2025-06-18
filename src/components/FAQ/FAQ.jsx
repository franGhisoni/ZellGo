import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      id: 1,
      question: '¿Qué servicios ofrece ZellGo?',
      answer: 'ZellGo ofrece una amplia gama de servicios tecnológicos, incluyendo desarrollo web, diseño UX/UI, marketing digital, consultoría IT, desarrollo móvil y soluciones cloud. Nuestro enfoque es personalizado, adaptándonos a las necesidades específicas de cada cliente para ofrecer soluciones a medida.'
    },
    {
      id: 2,
      question: '¿Cuánto tiempo toma desarrollar un proyecto web?',
      answer: 'El tiempo de desarrollo varía según la complejidad y alcance del proyecto. Un sitio web básico puede estar listo en 2-4 semanas, mientras que proyectos más complejos con funcionalidades personalizadas pueden tomar de 2 a 6 meses. Durante nuestra consulta inicial, evaluaremos tus necesidades y te proporcionaremos un cronograma detallado.'
    },
    {
      id: 3,
      question: '¿Cómo es el proceso de trabajo con ZellGo?',
      answer: 'Nuestro proceso comienza con una consulta inicial para entender tus necesidades y objetivos. Luego, desarrollamos una propuesta detallada con alcance, cronograma y presupuesto. Una vez aprobada, pasamos a la fase de diseño y desarrollo, manteniendo comunicación constante. Finalmente, realizamos pruebas exhaustivas antes de la entrega y ofrecemos soporte continuo post-lanzamiento.'
    },
    {
      id: 4,
      question: '¿Ofrecen mantenimiento para los proyectos entregados?',
      answer: 'Sí, ofrecemos varios planes de mantenimiento para asegurar que tu sitio web o aplicación funcione de manera óptima. Estos incluyen actualizaciones de seguridad, copias de seguridad regulares, corrección de errores, y actualizaciones de contenido. Podemos personalizar un plan de mantenimiento según tus necesidades específicas.'
    },
    {
      id: 5,
      question: '¿Cuánto cuesta desarrollar un sitio web o aplicación?',
      answer: 'El costo varía según los requisitos específicos de cada proyecto. Factores como la complejidad del diseño, funcionalidades requeridas, integración con sistemas externos y plazos de entrega influyen en el precio final. Ofrecemos presupuestos personalizados después de entender completamente tus necesidades durante la consulta inicial.'
    },
    {
      id: 6,
      question: '¿Trabajan con empresas de cualquier tamaño?',
      answer: 'Absolutamente. Trabajamos con empresas de todos los tamaños, desde startups y pequeñas empresas hasta grandes corporaciones. Adaptamos nuestros servicios y soluciones para satisfacer las necesidades y presupuestos específicos de cada cliente, manteniendo siempre el mismo nivel de calidad y compromiso.'
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-section">
      <div className="faq-container">
        <h2 className="faq-title">Preguntas Frecuentes</h2>
        <p className="faq-subtitle">Respuestas a las dudas más comunes sobre nuestros servicios</p>
        
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div 
              key={faq.id} 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            >
              <div 
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <h3>{faq.question}</h3>
                <span className="faq-icon">
                  {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </div>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="faq-cta">
          <p>¿No encuentras la respuesta que buscas?</p>
          <a href="#contacto" className="faq-contact-btn">Contáctanos</a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;