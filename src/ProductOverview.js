import React, { useState } from 'react';
import './ProductOverview.css';
import productScreenshot from './Assets/chatAi.jpg';
import PurchaseButton from './PurchaseButton';

const ProductOverview = () => {
    const [reviews, setReviews] = useState([
        { name: "Amit Verma", rating: 5, comment: "Cracked my tech interview with ease. AI Interview Assist is a game-changer!" },
        { name: "Neha Sinha", rating: 4, comment: "The stealth mode works like magic. Very helpful during virtual interviews." }
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
        }
    };

    const features = [
        { icon: '🕵️‍♂️', title: 'Stealth Mode', description: 'Invisible to screen sharing tools and interviewers.' },
        { icon: '🧠', title: 'GPT-4o + OCR', description: 'AI-driven insights and real-time content recognition.' },
        { icon: '🖼️', title: 'Overlay UI', description: 'Transparent, draggable, and always accessible.' },
        { icon: '⚙️', title: 'Customizable', description: 'Toggle input modes and personalize settings easily.' },
        { icon: '💬', title: 'Text Input', description: 'Ask questions manually and receive AI-powered answers.' },
        { icon: '📸', title: 'Screenshot Mode', description: 'Capture screen content and get contextual AI help.' },
    ];

    return (
        <div className="product-overview">
            <div className="overview-content">
                <div className="text-content">
                    <h1>AI Interview Assist</h1>
                    <p className="intro-text">
                        Your invisible AI co-pilot for online tech interviews.
                        Whether you’re tackling a live coding challenge or behavioral question,
                        AI Interview Assist supports you—stealthily and intelligently.
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
                        alt="AI Interview Assist Screenshot"
                        className="product-screenshot"
                    />
                    <PurchaseButton />
                </div>
            </div>

            <div className="reviews-section">
                <h2>⭐ What Users Say</h2>
                <div className="reviews-list">
                    {reviews.map((review, index) => (
                        <div key={index} className="review-card">
                            <p className="review-name"><strong>{review.name}</strong></p>
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
                        <select
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        >
                            {[5, 4, 3, 2, 1].map((r) => (
                                <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>
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
