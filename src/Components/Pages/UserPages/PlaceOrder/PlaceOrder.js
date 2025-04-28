import React, { useEffect, useState } from 'react';
import './PlaceOrder.css';
import { useLocation } from 'react-router-dom';
import { apiRequest } from '../../../../Helper/api';
import { BASE_URL } from '../../../../Helper/BaseURL';

const PlaceOrder = () => {
  const [rzp, setRzp] = useState(null);
  const [address, setAddress] = useState("Vastral");
  const { state } = useLocation()
  const email = localStorage.getItem("email");
  const userName = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");

  // useEffect(async () => {

  //   const options = {
  //     key: "rzp_test_gEREBntUWy5mmQ", // Replace with your actual Razorpay Key
  //     amount: state.totalPrice * 100, // Amount in paise (e.g., 50000 paise = ₹500)
  //     currency: "INR",
  //     name: "Tiffin Service ",
  //     description: "Test Transaction",
  //     image: "https://example.com/your_logo",
  //     // order_id: "order_XXXXXXXXXXXX", 
  //     handler: function (response) {
  //       console.log(response, "responseresponse")
  //       alert("Payment ID: " + response.razorpay_payment_id);
  //       alert("Order ID: " + JSON.stringify(response));
  //     },
  //     prefill: {
  //       name: userName,
  //       email: email,

  //     },
  //     notes: {
  //       address: "Razorpay Corporate Office"
  //     },
  //     theme: {
  //       color: "#3399cc"
  //     }
  //   };

  //   const rzpInstance = new window.Razorpay(options);

  //   rzpInstance.on('payment.failed', function (response) {
  //     alert(`Payment Failed: ${response.error.description}`);
  //   });

  //   setRzp(rzpInstance);
  // }, []);

  // const handlePayment = async (e) => {
  //   e.preventDefault();
  //   if (rzp) {
  //     const url = `${BASE_URL}/createOrder`;
  //     const { success, data } = await apiRequest(url, "POST", {
  //       totalPrice: state.totalPrice,
  //       userId: localStorage.getItem("userId"),
  //       address: address,
  //     });
  //     console.log(data, "data")
  //     rzp.open();
  //   } else {
  //     alert("Payment gateway not initialized");
  //   }
  // };
  const handlePayment = async (e) => {
    e.preventDefault();

    // 1. First hit your backend to create an order
    const url = `${BASE_URL}/createOrder`;
    const { success, data } = await apiRequest(url, "POST", {
      totalPrice: state.totalPrice,
      userId: userId,
      address: address, // sending address from user input
    });
console.log(data.data, "data")
    if (success) {
      // 2. When backend returns Razorpay order details
      const options = {
        key: "rzp_test_gEREBntUWy5mmQ",
        amount: data.data.amount, // already in paise
        currency: data.data.currency,
        name: "Tiffin Service",
        description: "Tiffin Order Payment",
        image: "https://example.com/your_logo",
        order_id: data.data.orderId, // <-- Important: Pass orderId here
        handler: function (response) {
          debugger
          // 3. After successful payment you should call another backend API to update your order with payment_id
          const paymentUpdateUrl = `${BASE_URL}/paymentSuccess`;
           apiRequest(paymentUpdateUrl, "POST", {
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          });
        
          alert("Payment Successful!");
        },
        prefill: {
          name: userName,
          email: email,
        },
        notes: {
          address: address,
        },
        theme: {
          color: "#3399cc"
        }
      };

      const rzpInstance = new window.Razorpay(options);

      rzpInstance.on('payment.failed', function (response) {
        alert(`Payment Failed: ${response.error.description}`);
      });

      rzpInstance.open();
    } else {
      alert('Failed to create order. Please try again.');
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
        <input type="text" placeholder="Phone" required />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Sub Total</p> {state?.totalPrice || 0}
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>0
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p> {state?.totalPrice || 0}
            </div>
          </div>
          <button onClick={handlePayment}>Proceed to Payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
