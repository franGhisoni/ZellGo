import { useState } from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import QRCode from 'react-qr-code';
import './Team.css';

// Set the app element for accessibility
Modal.setAppElement('#root');

const Team = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const teamMembers = [
    {
      id: 1,
      name: 'Federico Zoia',
      position: 'Asesor de Ventas',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      bio: 'Stats helps you see how many more days you need to work to reach your financial goal for the month and year.',
      social: {
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com',
        instagram: 'https://instagram.com'
      },
      uniqueLink: 'https://zellgo.com/vendedor/federico-zoia'
    },
    {
      id: 2,
      name: 'Laura Martínez',
      position: 'Directora de Operaciones',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80',
      bio: 'Stats helps you see how many more days you need to work to reach your financial goal for the month and year.',
      social: {
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com',
        instagram: 'https://instagram.com'
      },
      uniqueLink: 'https://zellgo.com/vendedor/laura-martinez'
    },
    {
      id: 3,
      name: 'Carlos Rodríguez',
      position: 'Desarrollador Senior',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      bio: 'Stats helps you see how many more days you need to work to reach your financial goal for the month and year.',
      social: {
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com',
        instagram: 'https://instagram.com'
      },
      uniqueLink: 'https://zellgo.com/vendedor/carlos-rodriguez'
    }
  ];

  const openModal = (member) => {
    setSelectedMember(member);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedMember(null);
  };

  return (
    <section className="team-section">
      <div className="team-container">
        <h2>Nuestro equipo</h2>
        <p className="team-subtitle">
          Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
        </p>
        
        <div className="team-members">
          {teamMembers.map((member) => (
            <div key={member.id} className="team-member" onClick={() => openModal(member)}>
              <div className="member-image">
                <img src={member.image} alt={member.name} />
              </div>
              <h3>{member.name}</h3>
              <p>{member.position}</p>
              <p className="member-bio">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="member-modal"
        overlayClassName="modal-overlay"
      >
        {selectedMember && (
          <div className="modal-content">
            <button className="close-modal" onClick={closeModal}>
              <FaTimes />
            </button>
            <div className="modal-header">
              <div className="modal-image">
                <img src={selectedMember.image} alt={selectedMember.name} />
              </div>
              <div className="modal-info">
                <h2>{selectedMember.name}</h2>
                <p className="modal-position">{selectedMember.position}</p>
              </div>
            </div>
            <div className="modal-body">
              <p>{selectedMember.bio}</p>
              <div className="modal-social">
                <a href={selectedMember.social.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
                <a href={selectedMember.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href={selectedMember.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
              </div>
              <div className="modal-qr-section">
                <h3>Escanea mi código QR</h3>
                <div className="qr-code-container">
                  <QRCode value={selectedMember.uniqueLink} size={180} level="H" />
                </div>
                <p className="qr-link">
                  <a href={selectedMember.uniqueLink} target="_blank" rel="noopener noreferrer">
                    {selectedMember.uniqueLink}
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Team;