import React from 'react'
import { assets } from '../../../Assets/Images/assets';
import './DeliveryForgetPass.css'

const DeliveryForgetPass = () => {
  return (
    <div>
      <div className='d-forget-password'>
        <div className='d-forget-left-container' align='center'>
          <div className='left-title'>
            <h1>Tiffin Viffin</h1>
            <img src={assets.loginlogo} alt='' />
            <h2>Create Account</h2>
            <h3>Signup to create, discover and connect with the global community</h3>
          </div>
        </div>
        <form className='d-forget-password-right-container'>
          <div className='d-forget-password-title'>
            <h1>Forget Password</h1>
          </div>
          <div className='d-forget-password-inputs'>
            <input type='email' placeholder='Enter Email' required />
          </div>
          <button>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default DeliveryForgetPass
