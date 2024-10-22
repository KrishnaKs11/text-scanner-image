import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import FeatureCards from './FeatureCards';
import Modal from './Modal';
import { FaPlay, FaCopy, FaDownload } from 'react-icons/fa';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import ProductOverview from './ProductOverview';

function App() {

  const [showModal, setShowModal] = useState(false);
  const [isPremium, setIsPremium] = useState(false);


  const features = [
    "Convert notes to documents",
    "Play audio of text/notes",
    "Upload photo and get the captions and text extracted from images",
  ];
  return (
    <div className="App">
      <HeaderComponent />
<ProductOverview></ProductOverview>

      <FooterComponent />
    </div>
  );
}

export default App;
