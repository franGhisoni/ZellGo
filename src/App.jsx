import { useState } from 'react'
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

// Import AuthProvider
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  )
}

export default App
