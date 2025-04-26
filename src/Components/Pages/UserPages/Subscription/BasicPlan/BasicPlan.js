import React from "react";
import "./BasicPlan.css";

const BasicPlan = () => {
  return (
    <div className="basic-plan-container">
      <h3>BASIC PACKAGES</h3>
      <div className="basic-plan-grid">
        {/* Full Month */}
        <div className="basic-plan-item">
          <h3>Full Month</h3>
          <p className="days">30 DAYS</p>
          <div className="sub-price"> 4200.00 / Month</div>
          <ul className="meals">
            <li>Breakfast</li>
            <li>Lunch</li>
            <li>Dinner</li>
          </ul>
          <button className="membership-button">Get Membership</button>
        </div>

        {/* Monthly Without Sunday */}
        <div className="basic-plan-item">
          <h3>Monthly Without Sunday</h3>
          <p className="days">27 DAYS</p>
          <div className="sub-price"> 3780.00 / Month</div>
          <ul className="meals">
            <li>Breakfast</li>
            <li>Lunch</li>
            <li>Dinner</li>
          </ul>
          <button className="membership-button">Get Membership</button>
        </div>

        {/* Monthly Without Weekends */}
        <div className="basic-plan-item">
          <h3>Monthly Without Weekends</h3>
          <p className="days">23 DAYS</p>
          <div className="sub-price"> 3220.00 / Month</div>
          <ul className="meals">
            <li>Breakfast</li>
            <li>Lunch</li>
            <li>Dinner</li>
          </ul>
          <button className="membership-button">Get Membership</button>
        </div>
      </div>
    </div>
  );
};

export default BasicPlan;
