// FeatureCards.js
import React from 'react';
import './FeatureCards.css';

const FeatureCards = ({ features }) => {
  return (
    <div className="feature-cards">
      <h2>Key Features</h2>
      <div className="feature-cards-container">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <p>{feature}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeatureCards;
