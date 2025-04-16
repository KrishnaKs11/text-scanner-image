import React, { useState } from 'react';

const PurchaseButton = () => {
    const [isDownloaded, setIsDownloaded] = useState(false); // To track if the file has already been downloaded

    // Load the Razorpay SDK script dynamically
    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    // Call the backend to create an order and get the order details
    const createOrder = async (amount) => {
        try {
            const response = await fetch('https://razorpay-image-latest.onrender.com/api/razorpaycallback/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount }), // Send amount in paise
            });

            const data = await response.json();
            if (response.ok) {
                return data; // Return order details { id, amount, currency }
            } else {
                throw new Error(data.error || 'Error creating order');
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
            return null;
        }
    };

    const handlePayment = async () => {
        const isLoaded = await loadRazorpay();
        if (!isLoaded) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        // Amount in paise (e.g., ₹300 = 30000 paise)
        const amount = 300;

        // Create the Razorpay order via backend
        const order = await createOrder(amount);

        if (!order) {
            return;
        }

        const options = {
            key: 'rzp_live_yswNQy40Z4bnw0', // Your Razorpay key
            amount: order.amount, // Amount in paise
            currency: order.currency, // Currency, e.g., "INR"
            order_id: order.id, // Razorpay Order ID from backend
            name: 'ScreenInsights',
            description: 'Payment for ScreenInsights subscription',
            image: '/your-logo.png',
            handler: function (response) {
                // 👇 Send a POST request to your backend with all 3 fields
                fetch("https://razorpay-image-latest.onrender.com/api/razorpaycallback/callback", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature
                    })
                })
                .then(res => res.json())
                .then(data => {
                    console.log("Callback response:", data);
                    alert("Payment confirmed and callback handled!");
                    handlePaymentSuccess(response); // Proceed with file download
                })
                .catch(err => {
                    console.error("Callback error:", err);
                    alert("Callback failed!");
                });
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
            redirect: false, // Ensure redirect is false
        };

        // Create payment object using Razorpay
        const paymentObject = new window.Razorpay(options);

        // Handle failed payment scenario
        paymentObject.on('payment.failed', function (response) {
            alert(`Payment failed! Error: ${response.error.description}`);
            handlePaymentFailure(response);
        });

        // Open Razorpay payment modal
        paymentObject.open();
    };

    // This function handles the successful payment
    const handlePaymentSuccess = async (response) => {
        if (!isDownloaded) {
            console.log('Payment successful, details:', response);

            // Call the backend callback API after payment
            const callbackResponse = await callCallbackApi(response);

            if (callbackResponse.success) {
                // Trigger file download after successful payment and callback
                const sasUrl = 'https://drive.google.com/uc?export=download&id=1_pQiv4x0Vu-x8Y1ehfVqa_colLcbWZga';
                // Create an anchor element and trigger the download
                const a = document.createElement('a');
                a.href = sasUrl;
                a.download = 'WorkerService.zip'; // Set the file name
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a); // Clean up the DOM element

                setIsDownloaded(true); // Ensure that the file is downloaded only once
            } else {
                alert('Payment verification failed.');
            }
        }
    };

    // This function handles the failed payment
    const handlePaymentFailure = (response) => {
        console.log('Payment failed, error:', response);
    };

    // Call the backend callback API with the payment details
    const callCallbackApi = async (response) => {
        try {
            const signature = generateSignature(response.razorpay_order_id, response.razorpay_payment_id);

            const callbackData = {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: signature,
            };

            const callbackResponse = await fetch('https://localhost:7058/api/razorpaycallback/callback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(callbackData),
            });

            const data = await callbackResponse.json();
            return data;
        } catch (error) {
            console.log('Error calling callback API:', error);
            return { success: false };
        }
    };

    // Generate the Razorpay signature for verification
    const generateSignature = (orderId, paymentId) => {
        const secret = 'your_razorpay_secret'; // Use your Razorpay secret here
        const string = `${orderId}|${paymentId}`;
        const signature = window.btoa(window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(string)));

        return signature;
    };

    return (
        <button onClick={handlePayment} className="purchase-button">
            Purchase Now for ₹300
        </button>
    );
};

export default PurchaseButton;
