import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import FileUpload from './FileUpload';
import PhotoCapture from './PhotoCapture';
import FeatureCards from './FeatureCards';
import Modal from './Modal';
import { FaPlay, FaCopy, FaDownload } from 'react-icons/fa';

function App() {
  const [ocrText, setOcrText] = useState('');
  const [captionText, setCaptionText] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [scanCount, setScanCount] = useState(0);
  
  // Removed dependency on scanCount within useCallback
  const incrementScanCount = useCallback(() => {
    setScanCount((prevCount) => prevCount + 1);
  }, []);

  // Now we check if we should show the modal inside useEffect
  useEffect(() => {
    if (scanCount > 3 && !isPremium) {
      setShowModal(true);
    }
  }, [scanCount, isPremium]); // Include scanCount and isPremium as dependencies

  useEffect(() => {
    if (ocrText || captionText) {
      incrementScanCount();
    }
  }, [ocrText, captionText, incrementScanCount]);

  const handleSetOcrText = (text) => {
    setOcrText(text);
    setIsUploading(false);
  };

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
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const playAudio = () => {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(ocrText);
    speechSynthesis.speak(utterance);
  };

  const handleValidTransaction = () => {
    setIsPremium(true);
    setShowModal(false);
    setScanCount(0); // Reset scan count after becoming premium
  };

  const features = [
    "Convert notes to documents",
    "Play audio of text/notes",
    "Upload photo and get the captions and text extracted from images",
  ];

  return (
    <div className="App">
      {showModal && (
        <Modal onClose={() => setShowModal(false)} onValidTransaction={handleValidTransaction}>
          Please subscribe to continue using our service.
        </Modal>
      )}
      {isPremium && (
        <div className="premium-content">
          Welcome, Premium Member! Enjoy your unlimited access.
        </div>
      )}
      <div className="feature-container">
        <FeatureCards features={features} />
      </div>
      <div className="container">
        <div className={`input-container ${fileSelected ? 'highlighted' : ''}`}>
          <PhotoCapture setOcrText={setOcrText} setCaptionText={setCaptionText} />
          <FileUpload setOcrText={handleSetOcrText} handleFileSelect={handleFileSelect} />
        </div>
        <div className={`results-container ${ocrText || captionText ? 'shown' : 'hidden'}`}>
          {ocrText && (
            <div>
              <pre>{ocrText}</pre>
              <div>
                <button onClick={playAudio}><FaPlay /></button>
                <button onClick={copyTextToClipboard}><FaCopy /></button>
                <button onClick={() => downloadTextAsFile(ocrText, 'extracted-text.txt')}><FaDownload /></button>
              </div>
            </div>
          )}
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
