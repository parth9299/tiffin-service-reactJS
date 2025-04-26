import React, { useEffect } from 'react';
import './Menu.css';
import { assets } from '../../../../Assets/Images/assets';
import { Link } from 'react-router-dom';

const Menu = () => {
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <div className="home-menu-title">
        <h1>Build Your Healthy, Tasty and Convenient <span>Meal Box</span></h1>
        <p>Make great food choices with traditional Indian superfoods. Enjoy our carefully curated <span>Pure Vegetarian</span> options for a wholesome experience.<br /> Ideal for students, busy professionals & families.</p>
        <h2><span>Select Your Preferred Meal!</span></h2>
      </div>
      <div className="home-menu-container">
        <div className="menu-grid">
          {/* Breakfast */}
          <div className="home-menu-item">
            <Link to='/breakfast'><img src={assets.breakfast} alt="Breakfast" /></Link>
            <div className="home-menu-label"><h3>Breakfast</h3></div>
          </div>

          {/* Lunch */}
          <div className="home-menu-item">
            <Link to='/lunch'><img src={assets.lunch} alt="Lunch" /></Link>
            <div className="home-menu-label"><h3>Lunch</h3></div>
          </div>

          {/* Dinner */}
          <div className="home-menu-item">
            <Link to='/dinner'><img src={assets.dinner} alt="Dinner" /></Link>
            <div className="home-menu-label"><h3>Dinner</h3></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
