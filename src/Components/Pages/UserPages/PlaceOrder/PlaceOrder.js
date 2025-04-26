import React, { useEffect, useState } from 'react';
import './PlaceOrder.css';

const PlaceOrder = () => {
  const [rzp, setRzp] = useState(null);

  useEffect(() => {
    const options = {
      key: "rzp_test_gEREBntUWy5mmQ", // Replace with your actual Razorpay Key
      amount: "50000", // Amount in paise (e.g., 50000 paise = ₹500)
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: "order_XXXXXXXXXXXX", // Fetch this dynamically from your backend
      handler: function (response) {
        alert("Payment ID: " + response.razorpay_payment_id);
        alert("Order ID: " + response.razorpay_order_id);
        alert("Signature: " + response.razorpay_signature);
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000"
      },
      notes: {
        address: "Razorpay Corporate Office"
      },
      theme: {
        color: "#3399cc"
      }
    };

    const rzpInstance = new window.Razorpay(options);

    rzpInstance.on('payment.failed', function (response) {
      alert(`Payment Failed: ${response.error.description}`);
    });

    setRzp(rzpInstance);
  }, []);

  const handlePayment = (e) => {
    e.preventDefault();
    if (rzp) {
      rzp.open();
    } else {
      alert("Payment gateway not initialized");
    }
  };

  return (
    <form className="place-order">
      <div className="place-order-left">
        <h2>Delivery Information</h2>
        <div className="multi-felids">
          <input type="text" placeholder="First Name" required></input>
          <input type="text" placeholder="Last Name" required></input>
        </div>
        <input type="textarea" placeholder="Address" required></input>
        <input type="text" placeholder="Street" required></input>
        <div className="multi-felids">
          <input type="text" placeholder="City" required></input>
          <input type="text" placeholder="State" required></input>
        </div>
        <div className="multi-felids">
          <input type="text" placeholder="Zip Code" required></input>
          <input type="text" placeholder="Country" required></input>
        </div>
        <input type="text" placeholder="Phone" required/>
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Sub Total</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
            </div>
          </div>
          <button onClick={handlePayment}>Proceed to Payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
