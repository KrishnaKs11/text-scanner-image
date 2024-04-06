import React from 'react';
import './PrivacyModal.css'; // Make sure the CSS file is correctly linked

const PrivacyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Privacy Policy for www.photoscanner.in</h2>
        <p><strong>Effective Date:</strong> 06/04/2024</p>
        <p><strong>Last Updated:</strong> 06/04/2024</p>
        
        <h3>Introduction</h3>
        <p>At www.photoscanner.in, we prioritize the privacy of our visitors and users. This Privacy Policy outlines how we collect, use, and share your personal information. By using our website, you consent to the practices described in this policy.</p>
        
        <h3>Information We Collect</h3>
        <p>We may collect personal information from various sources, including:</p>
        <ul>
          <li>Information you provide when you visit or interact with our website, such as your name, email address, mailing address, phone number, and any other information you choose to provide.</li>
          <li>Information collected automatically, including your IP address, browser type, device type, and browsing behavior on our website.</li>
          <li>Information from third parties, such as service providers, analytics providers, and social media platforms, in accordance with their privacy policies.</li>
        </ul>

        <h3>How We Use Your Information</h3>
        <p>We may use your personal information for the following purposes:</p>
        <ul>
          <li>To provide and improve our products and services.</li>
          <li>To communicate with you, respond to your inquiries, and provide customer support.</li>
          <li>To personalize your experience on our website.</li>
          <li>To analyze trends, track user engagement, and gather demographic information.</li>
          <li>To prevent fraud and ensure the security of our website.</li>
          <li>To comply with legal obligations and protect our rights.</li>
        </ul>

        <h3>Sharing Your Information</h3>
        <p>We may share your personal information with:</p>
        <ul>
          <li>Service providers and third-party vendors who assist us in operating our website and providing our services.</li>
          <li>Analytics providers to help us analyze website traffic and improve user experience.</li>
          <li>Legal authorities or regulatory bodies in response to valid legal requests or to protect our rights.</li>
        </ul>

        <h3>Your Rights</h3>
        <p>Depending on your location and applicable laws, you may have certain rights over your personal information, including the right to access, correct, amend, delete, or restrict the processing of your information. You may also have the right to object to certain uses of your information. To exercise these rights or inquire about your personal information, please contact us using the information provided below.</p>

        <h3>Data Retention</h3>
        <p>We will retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.</p>

        <h3>Cookies and Tracking Technologies</h3>
        <p>We use cookies and similar tracking technologies to enhance your browsing experience and analyze website usage. By using our website, you consent to the use of cookies in accordance with our Cookie Policy.</p>

        <h3>Contact Us</h3>
        <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:</p>
        <p>  <li><a href="mailto:photoScanner.customerCare@gmail.com?subject=Contact%20PhotoScanner%20Support">Contact</a></li></p>

        <h3>Changes to This Privacy Policy</h3>
        <p>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on our website or by other means as required by law.</p>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PrivacyModal;
