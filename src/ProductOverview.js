import React, { useState } from 'react';
import './ProductOverview.css';
import productScreenshot from './Assets/product-screenshot.jpeg';
import { WhatsApp } from '@mui/icons-material';
import PurchaseButton from './PurchaseButton'; // Import the new PurchaseButton component

const ProductOverview = () => {
    const [reviews, setReviews] = useState([
        { name: "Rahul Sharma", rating: 5, comment: "Incredible insights! This product has transformed my workflow." },
        { name: "Priya Gupta", rating: 4, comment: "Great tool for real-time analysis. A bit pricey, but worth it!" }
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

    return (
        <div className="product-overview">
            <div className="content">
                <div className="text-section">
                    <h1 className="product-title">ScreenInsights</h1>
                    <p className="product-description">
                        Unlock the power of AI with ScreenInsights, your essential tool for boosting productivity on Windows.
                        Experience real-time screen analysis by simply pressing <strong>Ctrl + \</strong>. Our advanced AI integrates seamlessly into your workflow, providing instant insights and tailored suggestions.
                        With built-in <span className="whatsapp-integration"><div className="whatsapp-icon"><WhatsApp fontSize="small" /></div> WhatsApp</span> integration, receive notifications directly in your workspace.
                        Stay ahead of tasks with intelligent support that adapts to your needs.
                    </p>
                </div>
                <div className="image-section">
                    <img
                        src={productScreenshot}
                        alt="AI Product Screenshot"
                        className="product-screenshot"
                    />
                    {/* Replace the old purchase button with the PurchaseButton component */}
                    <PurchaseButton />
                </div>
            </div>

            <div className="reviews-section">
                <h2>Customer Reviews</h2>
                {reviews.map((review, index) => (
                    <div key={index} className="review">
                        <p><strong>{review.name}</strong> - <span className="rating">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span></p>
                        <p>{review.comment}</p>
                    </div>
                ))}

                <h3>Add Your Review</h3>
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
                        placeholder="Your Review"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    />
                    <button type="submit">Submit Review</button>
                </form>
            </div>
        </div>
    );
};

export default ProductOverview;
