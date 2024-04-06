import React from 'react';
import './TermsModal.css'; // Make sure the CSS file is correctly linked

const TermsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Terms of Use for www.photoscanner.in</h2>
        <p><strong>Effective Date:</strong> 06/04/2024</p>
        <p><strong>Last Updated:</strong> 06/04/2024</p>
        
        <h3>1. Introduction</h3>
        <p>Welcome to www.photoscanner.in. By accessing our website and using our services, you agree to be bound by these Terms of Use and all terms incorporated by reference. If you do not agree to all of these terms, do not use our services.</p>
        
        <h3>2. Use of Services</h3>
        <p>a. The services provided by www.photoscanner.in are for your personal and non-commercial use. Unless otherwise specified, you may not modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information, software, products, or services obtained from these services.</p>
        <p>b. You agree not to use the services for illegal purposes or in a manner that is detrimental to the operation of the services or the access and use of the services by anyone else.</p>

        <h3>3. Intellectual Property Rights</h3>
        <p>All content included on www.photoscanner.in, such as text, graphics, logos, images, as well as the compilation thereof, and any software used on the site, is the property of www.photoscanner.in or its suppliers and protected by copyright and other intellectual property laws.</p>

        {/* Abbreviated for brevity. Continue adding all sections similarly. */}

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default TermsModal;
