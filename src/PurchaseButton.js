import React, { useState } from 'react';

const PurchaseButton = () => {
    const [isDownloaded, setIsDownloaded] = useState(false); // To track if the file has already been downloaded

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
            key: 'rzp_live_yswNQy40Z4bnw0',
            amount: 300, // ₹3 in paise
            currency: 'INR',
            name: 'ScreenInsights',
            description: 'Payment for ScreenInsights subscription',
            image: '/your-logo.png',
            handler: function (response) {
              alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
              handlePaymentSuccess(response);
            },
            prefill: {
              name: 'Your Name',
              email: 'your-email@example.com',
              contact: '9999999999',
            },
            notes: {
              address: 'Your Company Address',
            },
            theme: {
              color: '#3399cc',
            },
            redirect: false, // 👈 Add this line
          };          

        const paymentObject = new window.Razorpay(options);

        // Handle failed payment scenario
        paymentObject.on('payment.failed', function (response) {
            alert(`Payment failed! Error: ${response.error.description}`);
            handlePaymentFailure(response); // Handle failure scenario
        });

        paymentObject.open();
    };

    // This function handles the successful payment
    const handlePaymentSuccess = (response) => {
        if (!isDownloaded) {
            console.log('Payment successful, details:', response);
            // Trigger file download after successful payment
            const sasUrl = 'https://drive.google.com/uc?export=download&id=1_pQiv4x0Vu-x8Y1ehfVqa_colLcbWZga';
            // Create an anchor element and trigger the download
            const a = document.createElement('a');
            a.href = sasUrl;
            a.download = 'WorkerService.zip'; // Set the file name
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a); // Clean up the DOM element

            setIsDownloaded(true); // Ensure that the file is downloaded only once
        }
    };

    const handlePaymentFailure = (response) => {
        console.log('Payment failed, error:', response);
    };

    return (
        <button onClick={handlePayment} className="purchase-button">
            Purchase Now for  ₹300
        </button>
    );
};

export default PurchaseButton;
