import React, { useState } from 'react';
import './Modal.css';
import { FaTimes, FaRegFileAlt, FaPlay, FaCamera } from 'react-icons/fa';
import phonePayImage from './Assets/phonePay.jpeg'; // Ensure this path is correct
import googlePayImage from './Assets/googlePay.png'; // Adjust the path as necessary

const Modal = ({ onClose, onValidTransaction }) => {
  const [transactionId, setTransactionId] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State to handle error messages

  const handleSubscription = () => {
    // Regular expression to match a transaction ID starting with 'T' followed by 22 digits
    const isValidTransactionId = /^T\d{22}$/.test(transactionId);

    if (isValidTransactionId) {
      console.log(transactionId); // For demonstration
      onValidTransaction();
      onClose(); // Optionally close the modal after entering a valid transaction ID
    } else {
      // If the transaction ID is not valid, set an error message
      setErrorMessage('Invalid Transaction ID. Please provide a valid ID.');
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>
          <FaTimes />
        </button>
        <h2>Become a Premium Member</h2>
        <p>Make a payment using one of the options below and enter your transaction ID to unlock premium features:</p>
        
        {/* Displaying Phone Pay and Google Pay images */}
        <div className="payment-options">
          <img src={phonePayImage} alt="Phone Pay" className="payment-image"/>
          <img src={googlePayImage} alt="Google Pay" className="payment-image"/>
        </div>
        
        <ul>
          <li><FaRegFileAlt /> Convert notes to documents</li>
          <li><FaPlay /> Play audio of text/notes</li>
          <li><FaCamera /> Upload photo and get captions</li>
        </ul>
        
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message if any */}
        
        <div className="transaction-id-input">
          <input
            type="text"
            placeholder="Enter Transaction ID"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
          />
          <button onClick={handleSubscription} className="button-cta">Submit</button>
        </div>
        <p className="charges"><strong>Charges:</strong> ₹30 per 30 requests</p>
      </div>
    </div>
  );
};

export default Modal;
