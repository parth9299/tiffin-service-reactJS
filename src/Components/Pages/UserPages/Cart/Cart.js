import React from 'react';
import './Cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="cart">
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {/* Add cart items here */}
        </div>
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>Sub Total</p>
                <p>₹</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>₹ </p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Total</p>
                <p>₹ </p>
              </div>
            </div>
            <button onClick={() => navigate('/placeorder')}>Proceed to Checkout</button>
          </div>
          <div className="cart-promocode">
            <div>
              <p>If you have Promo Code, Enter Here</p>
              <div className="cart-promocode-input">
                <input type="text" placeholder="Promo Code" />
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
