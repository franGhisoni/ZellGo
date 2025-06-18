import { useState } from 'react'
import './App.css'

// Import all components
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Mission from './components/Mission/Mission'
import Vision from './components/Vision/Vision'
import Values from './components/Values/Values'
import Team from './components/Team/Team'
import Contact from './components/Contact/Contact'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Values />
        <Mission />
        <Vision />
        <Team />
        <Contact />
      </main>
    </>
  )
}

export default App
