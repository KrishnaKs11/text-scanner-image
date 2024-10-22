import React, { useState } from 'react';
import './HeaderComponent.css';
import logophotoscanner from './Assets/screensight_logo.png';

const AboutModal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modalBackdrop">
      <div className="modalContent">
        <button onClick={closeModal} className="modalCloseButton">×</button>
        {children}
      </div>
    </div>
  );
}

const HeaderComponent = () => {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  const openAboutModal = () => setIsAboutModalOpen(true);
  const closeAboutModal = () => setIsAboutModalOpen(false);

  return (
    <div className="header">
      <div className="logo">
        <img src={logophotoscanner} alt="Logo" />
      </div>
      <div className="navigation">
        <ul>
          <li><a href="#!" onClick={(e) => e.preventDefault()}>Home</a></li>
          <li><a href="#!" onClick={(e) => { e.preventDefault(); openAboutModal(); }}>About</a></li>
          <li><a href="mailto:photoScanner.customerCare@gmail.com?subject=Contact%20PhotoScanner%20Support">Contact</a></li>
        </ul>
      </div>
      <div className="user-actions">
        <button>Login</button>
      </div>

      <AboutModal isOpen={isAboutModalOpen} closeModal={closeAboutModal}>
        <div className="modalHeader">
          <h2>ScreenInsights Use Cases</h2>
        </div>
        <p>This app can be utilized in various scenarios, including but not limited to:</p>
        <ul className="modalList">
          <li>Enhancing productivity by providing real-time AI insights directly on your Windows screen.</li>
          <li>Integrating seamlessly with applications like WhatsApp for instant notifications and updates.</li>
          <li>Offering instant analysis of your screen content with a simple press of <strong>Ctrl + \</strong>.</li>
          <li>Supporting users in optimizing their workflows with intelligent suggestions tailored to their tasks.</li>
          <li>And many more innovative applications designed to improve your efficiency.</li>
        </ul>
        <div className="Contact-info">
          <h3>Operational Address:</h3>
          Contact Mail: krishnabasavarajks@gmail.com<br />
          Contact No: 9325729983
        </div>
      </AboutModal>

    </div>
  );
}

export default HeaderComponent;
