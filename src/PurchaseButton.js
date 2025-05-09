import React from "react";

const pollStatus = (orderId) => {
  let hasPaid = false;

  const intervalId = setInterval(async () => {
    if (hasPaid) return;

    try {
      const res = await fetch("https://razorpay20250506150949.azurewebsites.net/api/razorpaycallback/check-order-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      const data = await res.json();
      if (data.status === "paid") {
        hasPaid = true;
        clearInterval(intervalId);
        alert("✅ Payment successful!");

        // Updated Download Link
        const downloadUrl = "https://drive.usercontent.google.com/u/0/uc?id=1aMeCgPW-qS9bYPzzf1QC2OK5x32G2HrH&export=download";
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = "Your_File.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Polling error:", error);
    }
  }, 3000);
};

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
      alert("Razorpay SDK failed to load.. Are you online?");
      return;
    }

    try {
      const orderResponse = await fetch("https://razorpay20250506150949.azurewebsites.net/api/razorpaycallback/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 400 }),
      });

      const orderData = await orderResponse.json();

      const options = {
        key: "rzp_live_SUq7jMbXhUcfHL",
        amount: orderData.amount,
        currency: "INR",
        name: "Your Company",
        description: "Secure Order Verification",
        order_id: orderData.id,
        handler: async function () {
          const verifyRes = await fetch("https://razorpay20250506150949.azurewebsites.net/api/razorpaycallback/check-order-status", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId: orderData.id }),
          });

          const result = await verifyRes.json();
          if (result.status === "paid") {
            alert("✅ Payment Successful & Verified");

            // Updated Download Link
            const downloadUrl = "https://drive.usercontent.google.com/u/0/uc?id=1aMeCgPW-qS9bYPzzf1QC2OK5x32G2HrH&export=download";
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = "Your_File.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
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
      pollStatus(orderData.id);
    } catch (err) {
      console.error("Payment init error:", err);
    }
  };

  return <button onClick={handlePayment}>Pay ₹500</button>;
};

export default PurchaseButton;
