import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, introduce un email válido');
      return;
    }
    
    // Aquí normalmente enviarías el email a tu backend
    console.log('Email para suscripción:', email);
    
    // Simulamos éxito
    setSubscribed(true);
    setError('');
    setEmail('');
    
    // Resetear el estado después de 5 segundos
    setTimeout(() => {
      setSubscribed(false);
    }, 5000);
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-container">
        <div className="newsletter-content">
          <h2>Mantente actualizado</h2>
          <p>
            Suscríbete a nuestro newsletter para recibir las últimas noticias, 
            artículos y recursos sobre tecnología y desarrollo.
          </p>
          
          {subscribed ? (
            <div className="success-message">
              <FaPaperPlane className="success-icon" />
              <p>¡Gracias por suscribirte! Pronto recibirás nuestras actualizaciones.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="newsletter-form">
              <div className="form-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu dirección de email"
                  required
                />
                <button type="submit">
                  <FaPaperPlane />
                  <span>Suscribirse</span>
                </button>
              </div>
              {error && <p className="error-message">{error}</p>}
              <p className="privacy-note">
                Respetamos tu privacidad. Puedes darte de baja en cualquier momento.
              </p>
            </form>
          )}
        </div>
        
        <div className="newsletter-image">
          <img 
            src="https://images.unsplash.com/photo-1596526131083-e8c633c948d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" 
            alt="Newsletter" 
          />
        </div>
      </div>
    </section>
  );
};

export default Newsletter;