import React, { useState, useEffect } from 'react';
import './ProductOverview.css';
import productScreenshot from './Assets/FraudExposer.png';
import PurchaseButton from './PurchaseButton';
import TextSlider from './TextSlider';
import VideoPlayer from './VideoPlayer'; 

const ProductOverview = () => {
  const [reviews, setReviews] = useState([
    {
      name: 'Ravi Sharma',
      rating: 5,
      comment: 'StealthAIOverlay exposed a candidate using hidden AI assistance. A must-have for any recruitment team!',
    },
    {
      name: 'Priya Mehta',
      rating: 5,
      comment: 'We caught multiple frauds using InterviewCoder tools. This software is a game-changer.',
    },
  ]);

  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isZoomed, setIsZoomed] = useState(false);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (name && comment) {
      setReviews([...reviews, { name, rating: parseInt(rating), comment }]);
      setName('');
      setComment('');
    }
  };

  const features = [
    { icon: '🛡️', title: 'AI Fraud Detection', description: 'Identifies hidden AI overlays like InterviewCoder and exposes them in real-time.' },
    { icon: '🖥️', title: 'StealthAIOverlay Installer', description: 'Deploys a background service to scan and reveal unauthorized AI helpers.' },
    { icon: '⚡', title: 'One-Click Exposure', description: 'Highlights the cheater’s hidden overlay window live during the interview.' },
    { icon: '🧠', title: 'Anti-AI Intelligence', description: 'Detects GPT-based prompts and behavioral clues from fraudulent apps.' },
    { icon: '🏢', title: 'Enterprise Grade', description: 'Built for Fortune 500 hiring teams to eliminate AI-fueled cheating.' },
    { icon: '📊', title: 'Live Dashboard (Coming Soon)', description: 'Track AI detection stats and candidate behavior analytics.' },
  ];

  // Cursor animation effect
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
          <h1>StealthAIOverlay — AI Fraud Detect</h1>
          <p className="intro-text">
            Empower your hiring process with real-time AI fraud detection and analytics.
            StealthAIOverlay ensures integrity in every interview.
          </p>
          <p className="intro-text">
            Combat AI-assisted interview fraud with StealthAIOverlay. Our solution detects and exposes hidden AI overlays used by candidates during interviews, ensuring integrity in your hiring process.
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
            alt="StealthAIOverlay Screenshot"
            className="product-screenshot"
            onClick={() => setIsZoomed(true)}
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

      {isZoomed && (
        <div className="zoomed-image-overlay" onClick={() => setIsZoomed(false)}>
          <img src={productScreenshot} alt="Zoomed Screenshot" className="zoomed-image" />
          <button className="close-button">✖</button>
        </div>
      )}

      <div className="reviews-section">
        <h2>🧑‍💼 Trusted by Recruiters</h2>
        <div className="reviews-list">
          {reviews.map((review, index) => (
            <div key={index} className="review-card">
              <p className="review-name">
                <strong>{review.name}</strong>
              </p>
              <p className="review-rating">
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </p>
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
