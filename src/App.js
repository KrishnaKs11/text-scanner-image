import React, { useState } from 'react';
import './App.css';
import FileUpload from './FileUpload';
import PhotoCapture from './PhotoCapture';

function App() {
  const [ocrText, setOcrText] = useState('');
  const [captionText, setCaptionText] = useState('');

  return (
    <div className="App">
      <h1>Theft Scanner</h1>
      {/* Photo Capture Component */}
      <PhotoCapture setOcrText={setOcrText} setCaptionText = {setCaptionText} />
      {/* File Upload Component */}
      <FileUpload setOcrText={setOcrText} />
      {/* Display OCR Results */}
      {ocrText && (
        <div>
          <h2>Extracted Text:</h2>
          <pre>{ocrText}</pre>
        </div>
      )}
         {captionText && (
        <div>
          <h2>caption Text:</h2>
          <pre>{captionText}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
