import React from "react";
import "./StandardPlan.css";

const StandardPlan = () => {
  return (
    <div className="standard-plan-container">
      <h2>STANDARD PACKAGES</h2>
      <div className="standard-plan-grid">
        {/* Full Month */}
        <div className="standard-plan-item">
          <h3>Full Month</h3>
          <p className="standard-days">30 DAYS</p>
          <div className="standard-price"> 4950.00 / Month</div>
          <ul className="standard-meals">
            <li>Breakfast</li>
            <li>Lunch</li>
            <li>Dinner</li>
          </ul>
          <button className="standard-membership-button">Get Membership</button>
        </div>

        {/* Monthly Without Sunday */}
        <div className="standard-plan-item">
          <h3>Monthly Without Sunday</h3>
          <p className="standard-days">27 DAYS</p>
          <div className="standard-price"> 4455.00 / Month</div>
          <ul className="standard-meals">
            <li>Breakfast</li>
            <li>Lunch</li>
            <li>Dinner</li>
          </ul>
          <button className="standard-membership-button">Get Membership</button>
        </div>

        {/* Monthly Without Weekends */}
        <div className="standard-plan-item">
          <h3>Monthly Without Weekends</h3>
          <p className="standard-days">23 DAYS</p>
          <div className="standard-price"> 3795.00 / Month</div>
          <ul className="standard-meals">
            <li>Breakfast</li>
            <li>Lunch</li>
            <li>Dinner</li>
          </ul>
          <button className="standard-membership-button">Get Membership</button>
        </div>
      </div>
    </div>
  );
};

export default StandardPlan;
