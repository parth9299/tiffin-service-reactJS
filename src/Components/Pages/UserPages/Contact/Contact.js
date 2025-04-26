// ContactSection.js
import React from 'react';
import './Contact.css';
import { assets } from '../../../../Assets/Images/assets';

const Contact = () => {
  return (
    <div className="contact-section">
      <div className="contact-info">
        <h2>GET IN TOUCH</h2>
        <div className="contact-details">
          <div className="contact-item">
            <div className="icon-container">
              <img src={assets.phone} alt='' />
            </div>
            <p>+91 9876543210</p>
          </div>
          <div className="contact-item">
            <div className="icon-container">
              <img src={assets.email} alt='' />
            </div>
            <p>info@tiffins.com</p>
          </div>
        </div>
      </div>

      <div className="email-form">
        <h3>SEND US AN EMAIL</h3>
        <div className="form-grid">
          <input type="text" placeholder="ENTER YOUR NAME" />
          <input type="text" placeholder="ENTER YOUR MESSAGE" />
          <input type="tel" placeholder="ENTER YOUR MOBILE NUMBER" />
          <input type="email" placeholder="ENTER YOUR EMAIL" />
        </div>
        <button>SUBMIT</button>
      </div>
    </div>
  );
};

export default Contact;
