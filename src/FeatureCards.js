// FeatureCards.js
import React from 'react';
import './FeatureCards.css';
import { FaStar, FaCamera, FaFileUpload, FaHeadphones, FaCheckCircle } from 'react-icons/fa';

const FeatureCards = ({ features }) => {
  // Define icons for each feature
  const icons = [FaStar, FaCamera, FaFileUpload, FaHeadphones, FaCheckCircle];

  return (
    <div className="feature-cards">
      <h2>Key Features</h2>
      <div className="feature-cards-container">
        {features.map((feature, index) => {
          // Get a random icon from the icons array
          const Icon = icons[index % icons.length];
          return (
            <div key={index} className="feature-card">
              <Icon className="feature-icon" />
              <p>{feature}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FeatureCards;
