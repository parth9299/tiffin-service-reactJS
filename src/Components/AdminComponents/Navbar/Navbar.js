import React from 'react';
import { assets } from '../../../Assets/Images/assets';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  return (
    <nav className="admin-navbar">
      {/* Hamburger menu or logo */}
      <div className="admin-navbar-menu">
        <FontAwesomeIcon icon={faBars} />
      </div>

      {/* Profile image */}
      <div className="admin-navbar-profile">
        <img src={assets.profile_image} alt="Profile" className="profile-pic" />
      </div>
    </nav>
  );
};

export default Navbar;
