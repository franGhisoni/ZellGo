import { useState } from 'react';
import { FaCalendarAlt, FaUser, FaArrowRight } from 'react-icons/fa';
import './Blog.css';

const Blog = () => {
  const [hoveredPost, setHoveredPost] = useState(null);

  const blogPosts = [
    {
      id: 1,
      title: 'Tendencias en desarrollo web para 2023',
      excerpt: 'Descubre las tecnologías y enfoques que están definiendo el futuro del desarrollo web este año.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80',
      date: '15 Jun 2023',
      author: 'Carlos Rodríguez',
      category: 'Desarrollo Web'
    },
    {
      id: 2,
      title: 'Cómo mejorar la experiencia de usuario en tu aplicación',
      excerpt: 'Estrategias prácticas para optimizar la UX de tu aplicación y aumentar la satisfacción de tus usuarios.',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      date: '28 May 2023',
      author: 'Laura Martínez',
      category: 'Diseño UX/UI'
    },
    {
      id: 3,
      title: 'Seguridad en aplicaciones web: mejores prácticas',
      excerpt: 'Aprende a proteger tus aplicaciones web contra las amenazas más comunes con estas prácticas recomendadas.',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      date: '10 Apr 2023',
      author: 'Javier López',
      category: 'Seguridad'
    }
  ];

  const handlePostHover = (id) => {
    setHoveredPost(id);
  };

  const handlePostLeave = () => {
    setHoveredPost(null);
  };

  return (
    <section id="blog" className="blog-section">
      <div className="blog-container">
        <h2 className="blog-title">Nuestro Blog</h2>
        <p className="blog-subtitle">Artículos, guías y recursos sobre tecnología y desarrollo</p>
        
        <div className="blog-grid">
          {blogPosts.map((post) => (
            <div 
              key={post.id} 
              className={`blog-post ${hoveredPost === post.id ? 'hovered' : ''}`}
              onMouseEnter={() => handlePostHover(post.id)}
              onMouseLeave={handlePostLeave}
            >
              <div className="post-image-container">
                <img src={post.image} alt={post.title} className="post-image" />
                <div className="post-category">{post.category}</div>
              </div>
              <div className="post-content">
                <div className="post-meta">
                  <span><FaCalendarAlt /> {post.date}</span>
                  <span><FaUser /> {post.author}</span>
                </div>
                <h3 className="post-title">{post.title}</h3>
                <p className="post-excerpt">{post.excerpt}</p>
                <a href="#" className="post-read-more">
                  Leer más <FaArrowRight className="arrow-icon" />
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="blog-cta">
          <a href="#" className="view-all-btn">Ver todos los artículos</a>
        </div>
      </div>
    </section>
  );
};

export default Blog;