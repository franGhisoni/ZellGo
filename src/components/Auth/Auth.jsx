import { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import { FaTimes, FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import './Auth.css';
import { useAuth } from '../../context/AuthContext';

// Set the app element for accessibility
Modal.setAppElement('#root');

const Auth = ({ isOpen, onClose }) => {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [animating, setAnimating] = useState(false);
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Limpiar errores al escribir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const toggleMode = () => {
    setAnimating(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        name: ''
      });
      setErrors({});
    }, 300); // Esperar a que termine la animación de salida
  };

  useEffect(() => {
    if (animating) {
      setTimeout(() => {
        setAnimating(false);
      }, 600); // Tiempo total para completar ambas animaciones
    }
  }, [animating]);

  const validateForm = () => {
    const newErrors = {};
    
    // Validar email
    if (!formData.email) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    // Validar contraseña
    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    // Validaciones adicionales para registro
    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'El nombre es obligatorio';
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Confirma tu contraseña';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setErrors({});
    
    try {
      if (isLogin) {
        // Iniciar sesión
        await login(formData.email, formData.password);
      } else {
        // Registrar nuevo usuario
        const userData = {
          name: formData.name,
          email: formData.email,
          password: formData.password
        };
        await register(userData);
      }
      
      // Cerrar modal después de autenticación exitosa
      onClose();
    } catch (error) {
      console.error('Error de autenticación:', error);
      setErrors({
        ...errors,
        form: 'Error en la autenticación. Verifica tus credenciales e inténtalo de nuevo.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="auth-modal"
      overlayClassName="auth-overlay"
    >
      <div className="auth-container">
        <button className="close-auth" onClick={onClose}>
          <FaTimes />
        </button>
        
        <h2>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</h2>
        
        {errors.form && <div className="auth-error">{errors.form}</div>}
        
        <form 
          onSubmit={handleSubmit} 
          ref={formRef} 
          className={`auth-form ${animating ? 'animating' : ''} ${isLogin ? 'login-form' : 'register-form'}`}
        >
          {!isLogin && (
            <div className="form-group">
              <label>
                <FaUser className="input-icon" />
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre completo"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                />
              </label>
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
          )}
          
          <div className="form-group">
            <label>
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
            </label>
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label>
              <FaLock className="input-icon" />
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
              />
            </label>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          
          {!isLogin && (
            <div className="form-group">
              <label>
                <FaLock className="input-icon" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmar contraseña"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={loading}
                />
              </label>
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>
          )}
          
          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Procesando...' : (isLogin ? 'Iniciar Sesión' : 'Registrarse')}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>
            {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
            <button 
              type="button" 
              className="toggle-auth" 
              onClick={toggleMode}
              disabled={loading || animating}
            >
              {isLogin ? 'Regístrate' : 'Inicia sesión'}
            </button>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default Auth;