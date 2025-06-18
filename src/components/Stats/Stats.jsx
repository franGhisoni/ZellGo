import { useState, useEffect, useRef } from 'react';
import { FaUsers, FaLaptopCode, FaSmile, FaTrophy } from 'react-icons/fa';
import './Stats.css';

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    clients: 0,
    projects: 0,
    satisfaction: 0,
    awards: 0
  });
  const statsRef = useRef(null);

  const stats = [
    {
      id: 'clients',
      icon: <FaUsers className="stat-icon" />,
      value: 150,
      label: 'Clientes Satisfechos',
      suffix: '+'
    },
    {
      id: 'projects',
      icon: <FaLaptopCode className="stat-icon" />,
      value: 300,
      label: 'Proyectos Completados',
      suffix: '+'
    },
    {
      id: 'satisfaction',
      icon: <FaSmile className="stat-icon" />,
      value: 98,
      label: 'Satisfacción del Cliente',
      suffix: '%'
    },
    {
      id: 'awards',
      icon: <FaTrophy className="stat-icon" />,
      value: 25,
      label: 'Premios Recibidos',
      suffix: ''
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000; // ms
      const frameDuration = 1000 / 60; // 60fps
      const totalFrames = Math.round(duration / frameDuration);

      let frame = 0;
      const countUp = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const easeOutQuad = 1 - (1 - progress) * (1 - progress);

        setCounts({
          clients: Math.floor(easeOutQuad * stats[0].value),
          projects: Math.floor(easeOutQuad * stats[1].value),
          satisfaction: Math.floor(easeOutQuad * stats[2].value),
          awards: Math.floor(easeOutQuad * stats[3].value)
        });

        if (frame === totalFrames) {
          clearInterval(countUp);
        }
      }, frameDuration);

      return () => clearInterval(countUp);
    }
  }, [isVisible]);

  return (
    <section className="stats-section" ref={statsRef}>
      <div className="stats-overlay"></div>
      <div className="stats-container">
        {stats.map((stat) => (
          <div key={stat.id} className="stat-item">
            {stat.icon}
            <div className="stat-value">
              {counts[stat.id]}{stat.suffix}
            </div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;