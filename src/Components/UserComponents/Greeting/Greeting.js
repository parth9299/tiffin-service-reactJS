import React from 'react';
import './Greeting.css';
import { assets } from '../../../Assets/Images/assets';
import { useNavigate } from 'react-router-dom';

function Greeting() {
  const navigate = useNavigate()
  return (
    <div className="greeting-container">
      <div className="decorative-top">
        <img src={assets.greetings} alt='' />
      </div>

      <div className="content">
        <h1>Order Your Food Here</h1>
        <p>Welcome To Our Kitchen</p>

        <div className="button-container">
          <button className="menu-button vegetarian" onClick={() => navigate('/menu')}>View Menu</button>
        </div>
      </div>
    </div>
  );
}

export default Greeting;
