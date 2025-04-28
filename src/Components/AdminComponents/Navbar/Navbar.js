import React, { useState } from 'react';
import { assets } from '../../../Assets/Images/assets';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const name = localStorage.getItem("username") || "User Name";
  const role = localStorage.getItem("role") || "Admin";

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/admin/login";
  };
  return (
    <nav className="admin-navbar">
      {/* Hamburger menu or logo */}
      <div className="admin-navbar-menu">
        <FontAwesomeIcon icon={faBars} />
      </div>


      <Dropdown isOpen={dropdownOpen} toggle={toggle} className="admin-navbar-profile">
        <DropdownToggle caret tag="div" data-toggle="dropdown" style={{ display: "flex" }} aria-expanded={dropdownOpen}>
          <img src={assets.profile_image} alt="Profile" className="profile-pic" />
          <div className="admin-navbar-user-info">
            <div className="user-name">{name}</div>
            <div className="user-role">{role}</div>
          </div>
        </DropdownToggle>

        <DropdownMenu end>
          {/* Add more options if you want */}
          <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </nav>
  );
};

export default Navbar;
