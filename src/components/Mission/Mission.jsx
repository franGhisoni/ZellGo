import { Parallax } from 'react-parallax';
import './Mission.css';

const Mission = () => {
  const missionImage = 'https://images.unsplash.com/photo-1506190503914-c9c1dd80c8e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80';

  return (
    <section id="nosotros" className="mission-section">
      <div className="mission-container">
        <div className="mission-content">
          <h2>Nuestra Misión</h2>
          <p>
            Nuestra misión es conectar a las personas a través de la tecnología de manera personalizada y eficaz. 
            Nos destacamos por adaptarnos a las necesidades de cada cliente, con confianza, excelencia y compromiso 
            como pilares fundamentales de nuestro trabajo.
          </p>
        </div>
        <Parallax
          bgImage={missionImage}
          strength={300}
          className="mission-image"
        >
          <div style={{ height: '400px' }} />
        </Parallax>
      </div>
    </section>
  );
};

export default Mission;