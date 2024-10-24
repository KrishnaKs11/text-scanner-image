import React from 'react';

const PurchaseButton = () => {
    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        const isLoaded = await loadRazorpay();

        if (!isLoaded) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const options = {
            key: 'rzp_live_yswNQy40Z4bnw0', // Enter your Razorpay Key ID here
            amount: 500, // ₹5 in paise
            currency: 'INR',
            name: 'ScreenInsights',
            description: 'Payment for ScreenInsights subscription',
            image: '/your-logo.png', // Replace with your logo URL
            handler: function (response) {
                alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                handlePaymentSuccess(response); // Handle success scenario
            },
            prefill: {
                name: 'Your Name', // User name
                email: 'your-email@example.com', // User email
                contact: '9999999999', // User phone number
            },
            notes: {
                address: 'Your Company Address',
            },
            theme: {
                color: '#3399cc',
            },
        };

        const paymentObject = new window.Razorpay(options);

        // Handle failed payment scenario
        paymentObject.on('payment.failed', function (response) {
            alert(`Payment failed! Error: ${response.error.description}`);
            handlePaymentFailure(response); // Handle failure scenario
        });

        paymentObject.open();
    };

    const handlePaymentSuccess = (response) => {
        console.log('Payment successful, details:', response);
    };

    const handlePaymentFailure = (response) => {
        console.log('Payment failed, error:', response);
    };

    return (
        <button onClick={handlePayment} className="purchase-button">
            Purchase Now for ₹5
        </button>
    );
};

export default PurchaseButton;
