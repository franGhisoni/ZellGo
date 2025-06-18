import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import QRCode from 'react-qr-code';
import './Team.css';
import teamService from '../../services/teamService';

// Set the app element for accessibility
Modal.setAppElement('#root');

const Team = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        const data = await teamService.getAllMembers();
        
        if (data && data.length > 0) {
          setTeamMembers(data);
        } else {
          // Si no hay datos o el array está vacío, usamos los datos de fallback
          setTeamMembers(teamService.getFallbackData());
        }
        
        setError(null);
      } catch (err) {
        console.error('Error al cargar miembros del equipo:', err);
        setError('No se pudieron cargar los miembros del equipo');
        // Usamos datos de fallback en caso de error
        setTeamMembers(teamService.getFallbackData());
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

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
        
        {loading ? (
          <div className="loading-indicator">Cargando miembros del equipo...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
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
        )}
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