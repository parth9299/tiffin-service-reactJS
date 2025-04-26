import React from 'react';
import { assets } from '../../../Assets/Images/assets';
import './DeliveryLogin.css'
import { Link   } from 'react-router-dom';

const DeliveryLogin = () => {
    return (
        <>
            <div className='d-login'>
                <div className='d-login-left-container' align='center'>
                    <div className='left-title'>
                        <h1>Tiffin Viffin</h1>
                        <img src={assets.loginlogo} alt='' />
                        <h2>Create Account</h2>
                        <h3>Signup to create, discover and connect with the global community</h3>
                    </div>
                </div>
                <form className='d-login-right-container'>
                    <div className='d-login-title'>
                        <h1>Delivery Partner Login</h1>
                    </div>
                    <div className='d-login-inputs'>
                        <input
                            type='text'
                            placeholder='Enter User Name'
                            required
                        />
                        <input
                            type='password'
                            placeholder='Enter Password'
                            required
                        />
                    </div>
                    <div>
                        <p>Forget Password - <Link to='/delivery/forgetpass'>Click Here</Link></p>
                    </div>
                    <button type='submit'>Login</button>
                </form>
            </div>
        </>
    );
};

export default DeliveryLogin;