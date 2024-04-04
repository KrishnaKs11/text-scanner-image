import React, { useState } from 'react';
import './App.css';
import FileUpload from './FileUpload';
import PhotoCapture from './PhotoCapture';

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

  return (
    <div className="App">
      <div className="container">
        <div className={`input-container ${fileSelected ? 'highlighted' : ''}`}>
          <h1>Theft Scanner</h1>
          {/* Pass down the modified handler and handleFileSelect */}
          <PhotoCapture setOcrText={setOcrText} setCaptionText={setCaptionText} />
          <FileUpload setOcrText={handleSetOcrText} handleFileSelect={handleFileSelect} />
        </div>
        <div className={`results-container ${hasData ? 'shown' : 'hidden'}`}>
          {ocrText && (
            <div>
              <h2>Extracted Text:</h2>
              <pre>{ocrText}</pre>
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
