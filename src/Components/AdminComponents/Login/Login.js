import React, { useState } from 'react';
import { assets } from '../../../Assets/Images/assets';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../../Helper/BaseURL';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/adminLogin`, { 
        username: username,
        password: password
      });

      // Assuming the API returns a success status and some data
      if (response.status === 200) {
        
        localStorage.setItem('token', response.data.data.token); 
        localStorage.setItem('username', response.data.data.username); 
        // Redirect to admin dashboard or desired page
        navigate('/admin/dashboard');
      } else {
        // Handle other statuses like 401, 500, etc.
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
      // Optionally, display a more user-friendly error message based on the error type
    }
  };

  return (
    <div>
      <div className='login'>
        <div className='login-left-container' align='center'>
          <div className='left-title'>
            <h1>Tiffin Viffin</h1>
            <img src={assets.loginlogo} alt='' />
            <h2>Create Account</h2>
            <h3>Signup to create, discover and connect with the global community</h3>
          </div>
        </div>
        <form className='login-right-container' onSubmit={handleSubmit}>
          <div className='login-title'>
            <h1>Admin Login</h1>
          </div>
          <div className='login-inputs'>
            <input
              type='text'
              placeholder='Enter User Name'
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type='password'
              placeholder='Enter Password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <p>Forget Password - <Link to='/admin/forgetpass'>Click Here</Link></p>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
