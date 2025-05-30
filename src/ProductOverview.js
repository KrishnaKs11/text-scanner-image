import React, { useState, useEffect } from 'react';
import './ProductOverview.css';

import productScreenshot from './Assets/FraudExposer.png';
import aiGraphic from './Assets/AIFraudGraphic.jpg';
import graphImage from './Assets/graphimg.jpg';
import DifferentiaConsulting from "./Assets/logouse1.png";
import HARMAN_International from "./Assets/logouse2.png";

import PurchaseButton from './PurchaseButton';
import TextSlider from './TextSlider';
import VideoPlayer from './VideoPlayer';

const ProductOverview = () => {
  const [selectedImage, setSelectedImage] = useState(null); // null = no zoom
  const [isZoomed, setIsZoomed] = useState(false);
  const companies = [
    { name: "Differentia Consulting", logo: DifferentiaConsulting },
    { name: "HARMAN International", logo: HARMAN_International }
  ];


  // Reviews state & form handlers
  const [reviews, setReviews] = useState([
    {
      name: 'Ravi Sharma',
      rating: 5,
      comment:
        'InterviewGuard AI exposed a candidate using hidden AI assistance. A must-have for any recruitment team!',
    },
    {
      name: 'Priya Mehta',
      rating: 5,
      comment:
        'We caught multiple frauds using InterviewGuard AI tools. This software is a game-changer.',
    },
  ]);

  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (name && comment) {
      setReviews([...reviews, { name, rating: parseInt(rating), comment }]);
      setName('');
      setComment('');
      setRating(5);
    }
  };

  // Features data
  const features = [
    {
      icon: '🛡️',
      title: 'AI Fraud Detection',
      description:
        'Identifies hidden AI overlays like InterviewCoder and exposes them in real-time.',
    },
    {
      icon: '🖥️',
      title: 'Background Scanner',
      description:
        'Runs as a silent background service to detect unauthorized AI helpers during interviews.',
    },
    {
      icon: '⚡',
      title: 'One-Click Exposure',
      description:
        'Instantly highlights any suspicious AI overlay windows live during interviews.',
    },
    {
      icon: '🧠',
      title: 'Behavioral AI Intelligence',
      description:
        'Detects GPT-based prompts and behavioral clues from fraudulent applications.',
    },
    {
      icon: '🏢',
      title: 'Enterprise Ready',
      description:
        'Designed for Fortune 500 hiring teams to maintain interview integrity at scale.',
    },
    {
      icon: '📊',
      title: 'Live Analytics Dashboard (Coming Soon)',
      description:
        'Monitor AI detection stats and candidate behavior insights in real time.',
    },
  ];

  // Custom cursor animation effect
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-animation';
    document.body.appendChild(cursor);

    const moveCursor = (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    document.addEventListener('mousemove', moveCursor);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.body.removeChild(cursor);
    };
  }, []);

  return (
    <div className="product-overview">
      <div className="overview-content">
        <div className="text-content">
          <h1>InterviewGuard AI — Advanced AI Interview Fraud Detection</h1>

          {/* Image Scroll Container with zoom on click */}
          <div className={`image-scroll-container ${selectedImage !== null ? 'zoomed-container' : ''}`}>
            {[graphImage, aiGraphic].map((img, idx) => {
              const isSelected = selectedImage === idx;
              const baseClass = idx === 0 ? 'graph-image' : 'glow-image';

              return (
                <img
                  key={idx}
                  src={img}
                  alt={`InterviewGuard AI ${idx}`}
                  className={`${baseClass} ${isSelected ? 'selected-image' : 'not-selected-image'}`}
                  onClick={() => {
                    if (selectedImage === idx) {
                      setSelectedImage(null); // toggle zoom off
                    } else {
                      setSelectedImage(idx); // zoom on clicked image
                    }
                  }}
                  style={{
                    transform: isSelected ? 'scale(1.2)' : 'scale(1)',
                    transition: 'transform 0.3s ease',
                    cursor: 'pointer',
                    zIndex: isSelected ? 10 : 1, // Adjust z-index based on selection
                  }}
                />
              );
            })}
          </div>
          <div className="trusted-by-container">
            <h3>🔒 Trusted by Leading IT Security Companies Using AI-Based Fraud Detection</h3>
            <div className="logos-row">
              {companies.map((company) => (
                <div key={company.name} className="company-card">
                  <img src={company.logo} alt={company.name} className="company-logo" />
                  <h4>{company.name}</h4>
                  <p>{company.description}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="intro-text">
            Protect your hiring process with InterviewGuard AI’s real-time fraud detection and behavioral analytics.
          </p>
          <p className="intro-text">
            Detect and expose hidden AI overlays used by candidates during interviews, ensuring a fair and transparent recruitment process.
          </p>
          <p className="intro-text">
            Works ONLY on winodows 11 OS.      
       </p>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <div className="feature-info">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="image-content">
          <img
            src={productScreenshot}
            alt="InterviewGuard AI Screenshot"
            className="product-screenshot"
            onClick={() => setIsZoomed(true)}
            style={{ cursor: 'pointer' }}
          />
          <div className="purchase-button-container">
            <PurchaseButton />
          </div>
        </div>

        <div>
          <TextSlider />
        </div>

        <div className="video-player-container">
          <VideoPlayer />
        </div>
      </div>

      {/* Zoom overlay for product screenshot */}
      {isZoomed && (
        <div className="zoomed-image-overlay" onClick={() => setIsZoomed(false)}>
          <img src={productScreenshot} alt="Zoomed Screenshot" className="zoomed-image" />
          <button
            className="close-button"
            onClick={(e) => {
              e.stopPropagation();
              setIsZoomed(false);
            }}
          >
            ✖
          </button>
        </div>
      )}

      {/* Reviews Section */}
      <div className="reviews-section">
        <h2>🧑‍💼 Trusted by Recruitment Professionals</h2>
        <div className="reviews-list">
          {reviews.map((review, index) => (
            <div key={index} className="review-card">
              <p className="review-name">
                <strong>{review.name}</strong>
              </p>
              <p className="review-rating">{'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}</p>
              <p className="review-comment">"{review.comment}"</p>
            </div>
          ))}
        </div>

        <div className="review-form-container">
          <h3>📝 Share Your Experience</h3>
          <form className="review-form" onSubmit={handleReviewSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <select value={rating} onChange={(e) => setRating(e.target.value)}>
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} Star{r > 1 ? 's' : ''}
                </option>
              ))}
            </select>
            <textarea
              placeholder="Write your review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
            <button type="submit">Submit Review</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;
