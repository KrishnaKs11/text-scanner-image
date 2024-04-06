import {React, useState} from 'react';
import './FooterComponent.css'; // Make sure to create and link the corresponding CSS file
import PrivacyModal from './PrivacyModal'; 
import TermsModal  from './TermsModal'; 

const FooterComponent = () => {
  const year = new Date().getFullYear(); // Dynamically get the current year
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false); // Dynamically get the current year
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false); 
  const handlePrivacyClick = (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    setIsPrivacyModalOpen(true); // Open the modal
  };

  const handleTermsClick = (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    setIsTermsModalOpen(true); // Open the modal
  };
  return (
    <>
      <footer className="footer">
        <div className="footer-content">
          © {year} PhotoScanner. All rights reserved.
          <div className="footer-links">
            <a href="#!" onClick={handlePrivacyClick}>Privacy Policy</a> | 
            <a href="#!" onClick={handleTermsClick}>Terms of Use</a> | 
            <a href="mailto:photoScanner.customerCare@gmail.com?subject=Contact%20PhotoScanner%20Support">Contact</a>
          </div>
        </div>
      </footer>
      <PrivacyModal isOpen={isPrivacyModalOpen} onClose={() => setIsPrivacyModalOpen(false)} />
      <TermsModal isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)} />
    </>
  );
};

export default FooterComponent;
