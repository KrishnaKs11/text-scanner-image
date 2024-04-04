import React, { useState } from 'react';
import './App.css';
import FileUpload from './FileUpload';
import PhotoCapture from './PhotoCapture';

function App() {
  const [ocrText, setOcrText] = useState('');

  return (
    <div className="App">
      <h1>Theft Scanner</h1>
      {/* Photo Capture Component */}
      <PhotoCapture setOcrText={setOcrText} />
      {/* File Upload Component */}
      <FileUpload setOcrText={setOcrText} />
      {/* Display OCR Results */}
      {ocrText && (
        <div>
          <h2>Extracted Text:</h2>
          <pre>{ocrText}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
