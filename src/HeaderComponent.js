import React, { useState } from 'react';
import './HeaderComponent.css';
import logophotoscanner from './Assets/aifrauddetectlogo.png';

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

  const features = [
    { icon: '🛡️', title: 'AI Fraud Detection', description: 'Identifies hidden AI overlays like InterviewCoder and exposes them in real-time.' },
    { icon: '🖥️', title: 'StealthAIOverlay Installer', description: 'Deploys a background service to scan and reveal unauthorized AI helpers.' },
    { icon: '⚡', title: 'One-Click Exposure', description: 'Highlights the cheater’s hidden overlay window live during the interview.' },
    { icon: '🧠', title: 'Anti-AI Intelligence', description: 'Detects GPT-based prompts and behavioral clues from fraudulent apps.' },
    { icon: '🏢', title: 'Enterprise Grade', description: 'Built for Fortune 500 hiring teams to eliminate AI-fueled cheating.' },
    { icon: '📊', title: 'Live Dashboard (Coming Soon)', description: 'Track AI detection stats and candidate behavior analytics.' },
  ];

  return (
    <>
      <div className="header slide-down">
        <div className="logo">
          <img src={logophotoscanner} alt="Logo" />
        </div>
        <nav className="navigation">
          <ul>
            <li><a href="#!" onClick={(e) => e.preventDefault()}>Home</a></li>
            <li><a href="#!" onClick={(e) => { e.preventDefault(); openAboutModal(); }}>About</a></li>
            <li><a href="mailto:photoScanner.customerCare@gmail.com?subject=Contact%20PhotoScanner%20Support">Contact</a></li>
          </ul>
        </nav>
      </div>

      <div className="header-spacer" /> {/* Prevent overlap with body */}

      <AboutModal isOpen={isAboutModalOpen} closeModal={closeAboutModal}>
        <div className="modalHeader">
          <h2>AI Fraud Detection - Product Features</h2>
        </div>
        <p>Our AI-powered fraud detection tool is built to ensure fairness in interviews by detecting unauthorized AI overlays. Here’s how it helps:</p>
        <ul className="modalList">
          {features.map((feature, index) => (
            <li key={index} className="feature-item">
              <span className="feature-icon">{feature.icon}</span>
              <strong>{feature.title}</strong>: {feature.description}
            </li>
          ))}
        </ul>
        <div className="Contact-info">
          <h3>Contact Us:</h3>
          <p>Email: <a href="mailto:krishnabasavarajks@gmail.com">krishnabasavarajks@gmail.com</a></p>
          <p>Phone: 9325729983</p>
        </div>
      </AboutModal>
    </>
  );
}

export default HeaderComponent;
