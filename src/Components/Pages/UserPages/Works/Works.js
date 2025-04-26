import React from 'react';
import './Works.css';
import { assets } from '../../../../Assets/Images/assets'; // Replace with the actual path to your assets

const Works = () => {
    return (
        <div className="order-step-container">
        <h2>HOW IT WORKS</h2>
        <br/>
            <h2 className="order-step-title">STEP 1: ORDER ONLINE</h2>
            <div className="order-step-image">
                <img src={assets.order_icon} alt="Order Icon" />
            </div>
            <p className="order-step-description">
                Select from our rotating menu and place your order online.
            </p>
            <h2 className="order-step-title">STEP 2: WE COOK FOR YOU</h2>
            <div className="order-step-image">
                <img src={assets.cook_icon} alt="Order Icon" />
            </div>
            <p className="order-step-description">
                Our chefs will prepare your meals made from only fresh and healthy ingredients.
            </p>
            <h2 className="order-step-title">STEP 3: WE DELIVER TO YOUR HOME</h2>
            <div className="order-step-image">
                <img src={assets.door_icon} alt="Order Icon" />
            </div>
            <p className="order-step-description">
                Your order will be delivered directly to your door step on your selected delivery day.
            </p>
            <h2 className="order-step-title">STEP 4: SERVE AND EAT</h2>
            <div className="order-step-image">
                <img src={assets.heat_icon} alt="Order Icon" />
            </div>
            <p className="order-step-description">
                Get you Food Heat it and have delicious taste of Indian Home Food
            </p>
        </div>
    );
};

export default Works;
