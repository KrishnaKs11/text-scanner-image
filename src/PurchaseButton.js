import React, { useState } from "react";

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

        // ✅ Your original download logic
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
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      setLoading(false);
      alert("❌ Razorpay SDK failed to load.");
      return;
    }

    try {
      const orderResponse = await fetch("https://razorpay20250506150949.azurewebsites.net/api/razorpaycallback/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 50000 }),
      });

      const orderData = await orderResponse.json();

      const options = {
        key: "rzp_live_SUq7jMbXhUcfHL", // Replace with your Razorpay key
        amount: orderData.amount,
        currency: "INR",
        name: "Your Company",
        description: "Secure Order Verification",
        order_id: orderData.id,
        handler: async function () {
          setLoading(false);
          const verifyRes = await fetch("https://razorpay20250506150949.azurewebsites.net/api/razorpaycallback/check-order-status", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId: orderData.id }),
          });

          const result = await verifyRes.json();
          if (result.status === "paid") {
            alert("✅ Payment Successful & Verified");

            // ✅ Your original download logic
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
        modal: {
          ondismiss: () => {
            setLoading(false);
            alert("⚠️ Payment popup closed.");
          },
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      setTimeout(() => setLoading(false), 2000); // hide spinner if modal appears
      pollStatus(orderData.id);
    } catch (err) {
      console.error("Payment init error:", err);
      alert("❌ Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Processing..." : "Pay ₹500"}
      </button>

      {loading && (
        <div style={{ marginTop: "10px" }}>
          <span className="spinner" /> Loading Payment Options...
        </div>
      )}

      {/* Spinner CSS */}
      <style>{`
        .spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(0, 0, 0, 0.2);
          border-top-color: #000;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default PurchaseButton;
