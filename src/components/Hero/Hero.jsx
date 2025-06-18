import { Parallax } from 'react-parallax';
import './Hero.css';

const Hero = () => {
  const heroImage = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';

  return (
    <section id="inicio" className="hero-section">
      <Parallax
        bgImage={heroImage}
        strength={800}
        className="hero-parallax"
      >
        <div className="hero-content">
          <h1>Conectamos personas con soluciones personalizadas.</h1>
          <p>En ZellGo, no vendemos servicios, brindamos soluciones a medida.</p>
          <button className="cta-button">Déjanos asesorarte</button>
        </div>
      </Parallax>
    </section>
  );
};

export default Hero;