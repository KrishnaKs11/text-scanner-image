import React from 'react';
import './TextSlider.css';

const steps = [
  "1. Extract the HiddenOverlayExposer folder and run HiddenOverlayExposer.exe.",
  '2. Click "Refresh" after install or mid-interview if suspicious. If overlay detected, column "isOverlay?" will show "Yes".',
  '3. Select the suspicious overlay and click "Expose" to bring it to front.',
];

const TextSlider = () => {
  return (
    <div className="text-slider-container">
      <div className="text-cards-wrapper">
        {steps.map((text, index) => (
          <div className="text-card" key={index}>
            <p>{text}</p>
          </div>
        ))}
      </div>
      <div className="purchase-section">
      </div>
    </div>
  );
};

export default TextSlider;
