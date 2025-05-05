import React from "react";

const PurchaseButton = () => {
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.querySelector("#razorpay-script")) return resolve(true);

      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      const orderResponse = await fetch("https://localhost:7058/api/razorpaycallback/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 400 }), // Amount in paise
      });

      const orderData = await orderResponse.json();

      const options = {
        key: "rzp_live_SUq7jMbXhUcfHL", // Replace with your test/live key
        amount: orderData.amount,
        currency: "INR",
        name: "Your Company",
        description: "Secure Order Verification",
        order_id: orderData.id,
        handler: async function () {
          const verifyRes = await fetch("https://localhost:7058/api/razorpaycallback/check-order-status", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId: orderData.id }),
          });

          const result = await verifyRes.json();
          if (result.status === "paid") {
            alert("✅ Payment Successful & Verified");
          } else {
            alert("❌ Payment not captured.");
          }
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment init error:", err);
    }
  };

  return <button onClick={handlePayment}>Pay ₹500</button>;
};

export default PurchaseButton;
