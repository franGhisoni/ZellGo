import { Parallax } from 'react-parallax';
import './Vision.css';

const Vision = () => {
  const visionImage = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';

  return (
    <section className="vision-section">
      <div className="vision-container">
        <Parallax
          bgImage={visionImage}
          strength={300}
          className="vision-image"
        >
          <div style={{ height: '400px' }} />
        </Parallax>
        <div className="vision-content">
          <h2>Nuestra Visión</h2>
          <p>
            We believe that every journey has a story, and every traveler deserves an unforgettable experience. 
            Founded with a passion for exploration and a commitment to excellence, we strive to create meaningful 
            connections and innovative solutions that transform the way people interact with technology.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Vision;