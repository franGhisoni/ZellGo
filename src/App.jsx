import { useState, useEffect } from 'react'
import './App.css'

// Import all components
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Services from './components/Services/Services'
import Stats from './components/Stats/Stats'
import Mission from './components/Mission/Mission'
import Vision from './components/Vision/Vision'
import Values from './components/Values/Values'
import Team from './components/Team/Team'
import Testimonials from './components/Testimonials/Testimonials'
import Clients from './components/Clients/Clients'
import FAQ from './components/FAQ/FAQ'
import Blog from './components/Blog/Blog'
import Newsletter from './components/Newsletter/Newsletter'
import Contact from './components/Contact/Contact'

// Import Dashboard components
import SellerDashboard from './components/SellerDashboard/SellerDashboard'
import AdminDashboard from './components/AdminDashboard/AdminDashboard'

// Import AuthProvider
import { useAuth } from './context/AuthContext'

function App() {
  return (
    <AppContent />
  )
}

function AppContent() {
  const { currentUser, isAuthenticated } = useAuth();
  const [userRole, setUserRole] = useState(null);
  
  useEffect(() => {
    // Determinar el rol del usuario cuando se autentica
    if (isAuthenticated && currentUser) {
      // En un entorno real, esto vendría del objeto currentUser
      // Por ahora, lo determinamos por el email para pruebas
      if (currentUser.email === 'admin@zellgo.com') {
        setUserRole('admin');
      } else if (currentUser.email === 'vendedor@zellgo.com') {
        setUserRole('seller');
      } else {
        setUserRole('visitor');
      }
    } else {
      setUserRole('visitor');
    }
  }, [currentUser, isAuthenticated]);

  // Renderizar el dashboard correspondiente según el rol del usuario
  if (isAuthenticated && userRole === 'admin') {
    return (
      <>
        <Navbar />
        <AdminDashboard />
      </>
    );
  } else if (isAuthenticated && userRole === 'seller') {
    return (
      <>
        <Navbar />
        <SellerDashboard />
      </>
    );
  }

  // Renderizar la página principal para visitantes o usuarios sin rol específico
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Stats />
        <div className="about-section">
          <Mission />
          <Vision />
          <Values />
        </div>
        <Team />
        <Testimonials />
        <Clients />
        <FAQ />
        <Blog />
        <Newsletter />
        <Contact />
      </main>
    </>
  )
}

export default App
