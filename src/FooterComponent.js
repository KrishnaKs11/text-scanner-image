import React from 'react';
import './FooterComponent.css'; // Make sure to create and link the corresponding CSS file

const FooterComponent = () => {
  const year = new Date().getFullYear(); // Dynamically get the current year

  return (
    <footer className="footer">
      <div className="footer-content">
        © {year} PhotoScanner. All rights reserved.
        <div className="footer-links">
          <a href="#!">Privacy Policy</a> | 
          <a href="#!">Terms of Use</a> | 
          <a href="#!">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
