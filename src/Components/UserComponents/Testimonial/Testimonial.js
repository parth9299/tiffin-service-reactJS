import React, { useState, useEffect } from 'react';
import './Testimonial.css';
import { assets } from '../../../Assets/Images/assets'

const testimonials = [
  {
    text: "It has been a game-changer for me! Their home-style meals make balancing work and health so much easier. ",
    author: "Abdullah M.",
    rating: 5
  },
  {
    text: "The food was excellent and always on time. Really appreciate the service!",
    author: "Emily S.",
    rating: 5
  },
  {
    text: "Food was amazing. Wasn’t sure how exactly it works at first but I’m completely in love with the food.",
    author: "David L.",
    rating: 4
  },
  {
    text: "It's juicy, packed with flavor, and the toppings are just perfect. A must-try for everyone.",
    author: "Lalu L.",
    rating: 5
  },
  {
    text: "It was amazing. Wasn’t sure how exactly it works at first but I’m completely in love with the food.",
    author: "Tom H.",
    rating: 5
  }
];

function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const { text, author, rating } = testimonials[currentIndex];

  return (
    <div className="testimonial">
      <div className="quote">
        <img src={assets.quote} alt="quote" />
      </div>
      <div className="testimonial-content">
        <button className="arrow left" onClick={goToPrevious}>
          <img src={assets.left_arrow} alt="Previous" />
        </button>
        <div className="testimonial-text">
          <h3>{text} </h3>
        </div>
        <button className="arrow right" onClick={goToNext}>
          <img src={assets.right_arrow} alt="Next" />
        </button>
      </div>
      <div className="testimonial-rating">
        {[...Array(rating)].map((_, index) => (
          <span key={index} className="star">&#9733;</span>
        ))}
      </div>

      <div className="testimonial-author">
        <h3>{author}</h3>
      </div>

      <div className="testimonial-dots">
        {testimonials.map((_, index) => (
          <span key={index} className={index === currentIndex ? 'active' : ''}>.</span>
        ))}
      </div>
    </div>
  );
}

export default Testimonial;
