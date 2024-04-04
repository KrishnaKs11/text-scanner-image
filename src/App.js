// App.js
import React, { useState } from 'react';
import './App.css';
import FileUpload from './FileUpload';
import PhotoCapture from './PhotoCapture';
import FeatureCards from './FeatureCards';

function App() {
  const [ocrText, setOcrText] = useState('');
  const [captionText, setCaptionText] = useState('');
  const [isUploading, setIsUploading] = useState(false); // New state to track uploading
  const [fileSelected, setFileSelected] = useState(false); // State to track if a file is selected

  const hasData = ocrText || captionText;

  // Update setOcrText to handle uploading state
  const handleSetOcrText = (text) => {
    setOcrText(text);
    setIsUploading(true); // Assume text update from FileUpload means uploading
  };

  // Function to handle file selection
  const handleFileSelect = () => {
    setFileSelected(true);
  };

  // Function to play audio of the extracted text
  const playAudio = () => {
    // Using browser's built-in Text-to-Speech functionality
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(ocrText);
    speechSynthesis.speak(utterance);
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
      <div className="feature-container">
        <FeatureCards features={features} />
      </div>
      <div className="container">
        <div className={`input-container ${fileSelected ? 'highlighted' : ''}`}>
          <h1>Theft Scanner</h1>
          <PhotoCapture setOcrText={setOcrText} setCaptionText={setCaptionText} />
          <FileUpload setOcrText={handleSetOcrText} handleFileSelect={handleFileSelect} />
          {/* Add static content */}
        </div>
        <div className={`results-container ${hasData ? 'shown' : 'hidden'}`}>
          {ocrText && (
            <div>
              <h2>Extracted Text:</h2>
              <pre>{ocrText}</pre>
              {/* Add button to play audio */}
              <button onClick={playAudio}>Play Audio</button>
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
