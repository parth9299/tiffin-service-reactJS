import React from 'react';
import './Secrets.css';
import { assets } from '../../../Assets/Images/assets'; // Adjust path as needed
import { useNavigate } from 'react-router-dom';

function Secrets() {
  const navigate = useNavigate()
  return (
    <div className="secrets-section">
      <div className="secrets-text">
        <p className="tagline">INDIA'S BEST FOOD FOR YOU...</p>
        <h2 className="title">MADE WITH LOVE</h2>
        <p className="secret-intro">Our secret is simple:</p>

        <ul className="secrets-list">
          <li><span className="dot">•</span> Quality ingredients every time</li>
          <li><span className="dot">•</span> Some old recipes, some new</li>
          <li><span className="dot">•</span> Loads of love and attention to each meal</li>
          <li><span className="dot">•</span> And a great desire to serve you our very best</li>
        </ul>

        <div className="menu-link" onClick={() => navigate('/menu')}>See Our Menu</div>
      </div>
      <div className="secrets-image">
        <img src={assets.secrets} alt="Secrets of Cooking" className="image" />
      </div>
    </div>
  );
}

export default Secrets;
