import React from 'react';
import './FAQSection.css';
import { assets } from '../../../../Assets/Images/assets';

const FAQSection = () => {
  return (
    <div className="faq-section">
      <div className="faq-text">
        <h1>FAQS</h1>
        <p>Have questions? Here you'll find the answers most valued by our partners, along with access to step-by-step instructions and support.</p>
      </div>
      <div className="faq-image">
        <img src={assets.faq_image} alt="Illustration of FAQs" />
      </div>
    </div>
  );
};

export default FAQSection;
