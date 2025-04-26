import React from 'react'
import { assets } from '../../../Assets/Images/assets';
import './ForgetPass.css'

const ForgetPass = () => {
  return (
    <div>
      <div className='forget-password'>
        <div className='forget-left-container' align='center'>
          <div className='left-title'>
            <h1>Tiffin Viffin</h1>
            <img src={assets.loginlogo} alt='' />
            <h2>Create Account</h2>
            <h3>Signup to create, discover and connect with the global community</h3>
          </div>
        </div>
        <form className='forget-password-right-container'>
          <div className='forget-password-title'>
            <h1>Forget Password</h1>
          </div>
          <div className='forget-password-inputs'>
            <input type='email' placeholder='Enter Email' required />
          </div>
          <button>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default ForgetPass
