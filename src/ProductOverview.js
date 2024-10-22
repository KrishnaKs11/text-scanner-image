import React, { useState } from 'react';
import './ProductOverview.css'; // Import the CSS file for styling
import productScreenshot from './Assets/product-screenshot.jpeg'; // Add your product screenshot here
import { WhatsApp } from '@mui/icons-material';

const ProductOverview = () => {
    const [reviews, setReviews] = useState([
        { name: "Rahul Sharma", rating: 5, comment: "Incredible insights! This product has transformed my workflow." },
        { name: "Priya Gupta", rating: 4, comment: "Great tool for real-time analysis. A bit pricey, but worth it!" }
    ]);

    const [name, setName] = useState('');
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal popup

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (name && comment) {
            setReviews([...reviews, { name, rating: parseInt(rating), comment }]);
            setName('');
            setComment('');
        }
    };

    const handlePurchaseClick = () => {
        setIsModalOpen(true); // Open the modal on purchase click
    };

    const closeModal = () => {
        setIsModalOpen(false); // Close the modal
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
                    <button className="purchase-button" onClick={handlePurchaseClick}>Purchase Now</button>
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

            {/* Modal Popup for Purchase */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Pricing Details</h2>
                        <p>For pricing details and installation charges, please contact <strong>9325729983</strong>.</p>
                        <p>Approximate charges: <strong>₹500/month</strong> (including installation).</p>
                        <p>ScreenInsights is a highly valuable tool that offers instant AI-driven insights and optimizes your workflow. It's a worthy investment for professionals who value productivity and efficiency.</p>
                        <button className="close-button" onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductOverview;
