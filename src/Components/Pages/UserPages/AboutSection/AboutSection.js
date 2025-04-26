import React from 'react';
import './AboutSection.css';
import { assets } from '../../../../Assets/Images/assets';

const AboutSection = () => {
  return (
    <div className="about-section">
    <h2>ABOUT US</h2>
      <p className="about-text">
        Tiffin Viffin is renowned for its dedication to health and flavour. We craft dishes with low oil
        and salt content, ensuring high nutritional value without compromising on taste. Our offerings have
        become a trusted staple for a wide range of individuals across the UK, including doctors, tech
        professionals, students, and the elderly.
      </p>

      <div className="badges-container">
        <div>
          <img src={assets.about_lowsodium} alt="Low Sodium" className="badge-image" />
        </div>

        <div>
          <img src={assets.about_lowfat} alt="Low Fats" className="badge-image" />
        </div>
      </div>

      <p className="delivery-text">
        We deliver throughout all over India, catering to all generations. Our meals offer
        the comfort of homemade food, cooked with minimal oil and fewer spices, thereby delivering the
        joy of healthy and authentic Indian cuisine.
      </p>

      <p className="founders-quote">
        In the words of our founders, "We are the Indian home kitchen for everyone craving homestyle,
        authentic Indian food . Delivering not just fresh, healthy, and nutritious meals, but also happiness,
        wherever you go."
      </p>
    </div>
  );
};

export default AboutSection;
