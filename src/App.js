// App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import FileUpload from './FileUpload';
import PhotoCapture from './PhotoCapture';
import FeatureCards from './FeatureCards';
import Modal from './Modal';
import { FaPlay, FaCopy, FaDownload } from 'react-icons/fa';

function App() {
  const [ocrText, setOcrText] = useState('');
  const [captionText, setCaptionText] = useState('');
  const [isUploading, setIsUploading] = useState(false); // New state to track uploading
  const [fileSelected, setFileSelected] = useState(false); // State to track if a file is selected // Tracking scan counts
  const [showModal, setShowModal] = useState(false); // For showing the subscription modal
  const [isPremium, setIsPremium] = useState(false);
  const [scanCount, setScanCount] = useState(0);
  useEffect(() => {
    // If either ocrText or captionText changes, it's considered a scan operation
    if (ocrText || captionText) {
      incrementScanCount();
    }
  }, [ocrText, captionText]); // Depend on ocrText and captionText

  const hasData = ocrText || captionText;
  const incrementScanCount = () => {
    setScanCount(prevCount => {
      const newCount = prevCount + 1;
      if (scanCount > 3) {
        setShowModal(true);
      }
      return newCount;
    });
  };
  // Update setOcrText to handle uploading state
  const handleSetOcrText = (text) => {
    setOcrText(text);
    setIsUploading(true); // Assume text update from FileUpload means uploading
  };

  // Function to handle file selection
  const handleFileSelect = () => {
    setFileSelected(true);
  };

  const copyTextToClipboard = () => {
    navigator.clipboard.writeText(ocrText).then(() => {
      alert('Text copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  const downloadTextAsFile = (text, filename) => {
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element); // Clean-up
  };

  // Function to play audio of the extracted text
  const playAudio = () => {
    // Using browser's built-in Text-to-Speech functionality
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(ocrText);
    speechSynthesis.speak(utterance);
  };
  const handleValidTransaction = () => {
    setIsPremium(true); // Update state to reflect premium status
    setShowModal(false); // Close the modal
  };

  // List of features
  const features = [
    "Convert notes to documents",
    "Play audio of text/notes",
    "Upload photo and get the captions and text extracted from images",
    // Add more features as needed
  ];

  return (
    <div className="App">
      {
        showModal && <Modal onClose={() => setShowModal(false)} onValidTransaction={handleValidTransaction} />
      }
      {
        isPremium && (
          <div className="premium-content">
            Welcome, Premium Member! Enjoy your unlimited access.
          </div>
        )
      }      <div className="feature-container">
        <FeatureCards features={features} />
      </div>
      <div className="container">
        <div className={`input-container ${fileSelected ? 'highlighted' : ''}`}>
          <PhotoCapture setOcrText={setOcrText} setCaptionText={setCaptionText} />
          <FileUpload setOcrText={handleSetOcrText} handleFileSelect={handleFileSelect} />
          {/* Add static content */}
        </div>
        <div className={`results-container ${hasData ? 'shown' : 'hidden'}`}>
          {ocrText && (
            <div>
              <pre>{ocrText}</pre>
              {/* Add button to play audio */}
              <div>
                <button onClick={playAudio}><FaPlay /></button>
                <button onClick={copyTextToClipboard}><FaCopy /></button>
                <button onClick={() => downloadTextAsFile(ocrText, 'extracted-text.txt')}><FaDownload /></button>
              </div>
            </div>
          )}
          {/* Conditionally render caption based on isUploading */}
          {!isUploading && captionText && (
            <div>
              <h2>Caption Text:</h2>
              <pre>{captionText}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
