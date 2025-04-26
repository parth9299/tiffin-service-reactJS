import React from "react";
import "./PremiumPlan.css";

const PremiumPlan = () => {
  return (
    <div className="premium-plan-container">
      <h2>PREMIUM PACKAGES</h2>
      <div className="premium-plan-grid">
        {/* Full Month */}
        <div className="premium-plan-item">
          <h3>Full Month</h3>
          <p className="premium-days">30 DAYS</p>
          <div className="premium-price"> 7800.00 / Month</div>
          <ul className="premium-meals">
            <li>Breakfast</li>
            <li>Lunch</li>
            <li>Dinner</li>
          </ul>
          <button className="premium-membership-button">Get Membership</button>
        </div>

        {/* Monthly Without Sunday */}
        <div className="premium-plan-item">
          <h3>Monthly Without Sunday</h3>
          <p className="premium-days">27 DAYS</p>
          <div className="premium-price"> 7020.00 / Month</div>
          <ul className="premium-meals">
            <li>Breakfast</li>
            <li>Lunch</li>
            <li>Dinner</li>
          </ul>
          <button className="premium-membership-button">Get Membership</button>
        </div>

        {/* Monthly Without Weekends */}
        <div className="premium-plan-item">
          <h3>Monthly Without Weekends</h3>
          <p className="premium-days">23 DAYS</p>
          <div className="premium-price"> 5980.00 / Month</div>
          <ul className="premium-meals">
            <li>Breakfast</li>
            <li>Lunch</li>
            <li>Dinner</li>
          </ul>
          <button className="premium-membership-button">Get Membership</button>
        </div>
      </div>
    </div>
  );
};

export default PremiumPlan;
