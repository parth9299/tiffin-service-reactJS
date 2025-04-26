import React from 'react';
import './Footer.css';
import { assets } from '../../../Assets/Images/assets';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" id='footer'>
      <div className="footer-section about-saakshis">
        <h3>ABOUT US</h3>
        <p>
          Foodies is an esteemed culinary venture that takes pride in delivering
          exceptional Indian cuisine experiences. With a commitment to
          authenticity and a passion for tantalizing flavors, Tiffin has
          become synonymous with unforgettable dining moments.
        </p>
        <p>
          Led by Foodies, a talented homechef with deep roots in India's
          culinary heritage, Tiffin offers a unique blend of traditional
          recipes and innovative culinary techniques. With a focus on
          handcrafted dishes made with love and attention to detail, Tiffin
          ensures that every plate reflects the true essence of home
          gastronomy.
        </p>
      </div>

      <div className="footer-section footer-menu">
        <h3>FOOTER MENU</h3>
        <ul>
          <div>Search</div>
          <div onClick={() => handleNavigate('/faqsection')}>FAQs</div>
          <div onClick={() => handleNavigate('/about')}>About Us</div>
          <div onClick={() => handleNavigate('/works')}>How It Works</div>
          <div onClick={() => handleNavigate('/contactus')}>Contact Us</div>
          <div onClick={() => handleNavigate('/refundpolicy')}>Refund Policy</div>
          <div onClick={() => handleNavigate('/terms')}>Terms of Service</div>
        </ul>
      </div>

      <div className="footer-section subscribe">
        <h3>SUBSCRIBE</h3>
        <input type="email" placeholder="Enter your email address" />
        <button>SUBSCRIBE</button><br />
        <div className='footer-social-icons'>
          <a href='https://www.facebook.com/'><img src={assets.facebook_icon} alt='' /></a>
          <a href='https://x.com/'><img src={assets.twitter_icon} alt='' /></a>
          <a href='https://www.linkedin.com/'><img src={assets.linkedin_icon} alt='' /></a>
        </div>
        <p className='footer-copyright'>Copyright @ 2025 Tiffin.com</p>
      </div>
    </footer>
  );
}

export default Footer;
