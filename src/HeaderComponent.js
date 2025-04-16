import React, { useState } from 'react';
import './HeaderComponent.css';
import logophotoscanner from './Assets/hackimg.jpg';

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
          <li>Enhances productivity by delivering real-time AI insights exclusively on Windows machines.</li>
          <li>Seamlessly integrates with Windows-based applications like WhatsApp, Microsoft Teams, and more.</li>
          <li>Provides instant screen content analysis with a quick press of <strong>Ctrl + \</strong> (Windows only).</li>
          <li>Optimizes your workflow using smart, context-aware suggestions tailored to Windows environments.</li>
          <li>Designed specifically for Windows users to experience efficient, AI-powered assistance at work.</li>
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
