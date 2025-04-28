import React, { useState } from 'react';
import './Header.css'; // Import the CSS file
import { assets } from '../../../Assets/Images/assets';
import { Link } from 'react-router-dom'

function Header({ setShowLogin }) {
  const [menu, setMenu] = useState("Home");
  const name = localStorage.getItem("username")
  return (
    <header>
      <div className="top-bar">
        <div className='sub-bar'>
          <Link to='/subscriptionplan'><p>SUBSCRIBE WEEKLY TODAY-GET 20% OFF YOUR 1ST WEEK + 10% OFF FOR NEXT 6 WEEKS</p></Link>
        </div>
      </div>
      <div className="main-header">
        <div className="header-section-left">
          <div className="logo-container">
            <img src={assets.logo} alt="" className="logo" />
          </div>
        </div>

        <div className="header-section center">
          <nav className="main-nav">
            <ul className='navbar-menu'>
              <Link to='/' onClick={() => setMenu("Home")} className={menu === "Home" ? "active" : ""}>Home</Link>
              <Link to='/menu' onClick={() => setMenu("Menu")} className={menu === "Menu" ? "active" : ""}>Menu</Link>
              <a href='#app-download' onClick={() => setMenu("Mobile-App")} className={menu === "Mobile-App" ? "active" : ""}>Mobile-App</a>
              <Link to='/contactus' onClick={() => setMenu("Contact-Us")} className={menu === "Contact-Us" ? "active" : ""}>Contact Us</Link>
              <a href='#footer' onClick={() => setMenu("About-Us")} className={menu === "About-Us" ? "active" : ""}>About Us</a>
            </ul>
          </nav>
        </div>

        {name && <div className="header-section-right">
          <img src={assets.profile_icon} alt='Profile' className='icon' />
          <Link to='/cart'><img src={assets.basket_icon} alt='cart' className='icon' /></Link>
        </div>}
        {!name && <button onClick={() => setShowLogin(true)}>Sign In</button>}
      </div>
    </header>
  );
}

export default Header;


