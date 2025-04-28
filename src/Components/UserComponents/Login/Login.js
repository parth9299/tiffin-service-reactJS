import React, { useEffect, useState } from 'react';
import './Login.css';
import { assets } from '../../../Assets/Images/assets';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../../Helper/BaseURL';
import { apiRequest } from '../../../Helper/api';
import { ApiResponseMessage } from '../../Common/ApiResponse';
import { DANGER, SUCCESS } from '../../../Helper/constent';

const Login = ({ setShowLogin, token }) => {
    const [currState, setCurrState] = useState(token ? "Set Password" : 'Sign Up');
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        mobile: '',
        email: '',
        password: '',newPassword:""
    });
    const [email, setEmail] = useState(""); // State for Reset Password
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // State for success message in Reset Password
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (currState === "Login") {
                await handleLogin();
            } else if (currState === "Sign Up") {
                await handleSignup();
            } else if (currState === "Reset Password") {
                await handleResetPassword();
            } else if (currState === "Set Password") {
                await handlSetPassword();
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async () => {
        try {
            const url = `${BASE_URL}/userLogin`;
            const { success, data } = await apiRequest(url, "POST", {
                email: formData.email,
                password: formData.password
            });

            if (success) {
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('username', `${data.data.firstName} ${data.data.lastName}`);
                localStorage.setItem('email', data.data.email);
                localStorage.setItem('userId', data.data.id);
                navigate('/menu');
                ApiResponseMessage(data.message, SUCCESS);  
                // setCurrState("Login");
                setShowLogin(false)
            } else {
                ApiResponseMessage(data.message, DANGER);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Server connection failed';
            setError(errorMessage);
        }
    };


    const handleSignup = async () => {
        const url = `${BASE_URL}/userRegister`;
        const { success, data } = await apiRequest(url, "POST", formData);

        if (success) {
            ApiResponseMessage(data.message, SUCCESS);
            resetForm();
            setCurrState("Login");

        } else {
            ApiResponseMessage(data.message, DANGER);
        }
    };
    const handleResetPassword = async () => {
        try {
            const url = `${BASE_URL}/userForgot`;
            const { success, data } = await apiRequest(url, "POST", { email });
            if (success) {
                setSuccessMessage("A reset link has been sent to your email.");
                ApiResponseMessage(data.message, SUCCESS);
                resetForm();
                setEmail("");
            } else {
                ApiResponseMessage(data.message, DANGER);
            }
        } catch (error) {
            setError(error.response?.data?.message || "Server connection failed");
        }
    };
    const handlSetPassword = async () => {
        try {
            console.log(formData,"formData")
            const url = `${BASE_URL}/userReset`;
            const { success, data } = await apiRequest(url, "POST", { newPassword: formData.password, token });
            if (success) {

                ApiResponseMessage(data.message, SUCCESS);
                resetForm();
                setCurrState("Login");
            } else {
                ApiResponseMessage(data.message, DANGER);
            }
        } catch (error) {
            setError(error.response?.data?.message || "Server connection failed");
        }
    };
    const resetForm = () => {
        setFormData({ name: '', address: '', mobile: '', email: '', password: '' });
        setEmail(""); // Reset email field for reset password
    };

    return (
        <div className='user-login'>
            <form className='user-login-container' onSubmit={handleSubmit}>
                <div className='user-login-title'>
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt='Close' />
                </div>

                {error && <div className='error-message'>{error}</div>}
                {successMessage && <div className='success-message'>{successMessage}</div>}

                <div className='user-login-inputs'>
                    {/* Show name, address, mobile only during Sign Up */}
                    {currState === "Sign Up" && (
                        <>
                            <div className="firstName">
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <input
                                type='text'
                                name='address'
                                placeholder='Enter Your Address'
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type='number'
                                name='mobile'
                                placeholder='Enter Your Mobile No.'
                                value={formData.mobile}
                                onChange={handleChange}
                                required
                            />
                        </>
                    )}
                    {/* Email input for all states */}
                    {currState !== "Set Password" && (     <input
                        type='email'
                        name='email'
                        placeholder='Enter Your Email'
                        value={currState === "Reset Password" ? email : formData.email}
                        onChange={(e) => currState === "Reset Password" ? setEmail(e.target.value) : handleChange(e)}
                        required
                    />)}
                    {/* Password input only for Login and Sign Up */}
                    {(currState === "Login" || currState === "Set Password") && (
                        <input
                            type='password'
                            name='password'
                            placeholder='Enter Your Password'
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    )}
                    {(currState === "Set Password") && (
                        <input
                            type='password'
                            name='newPassword'
                            placeholder='Enter Your Password'
                            value={formData.newPassword}
                            onChange={handleChange}
                            required
                        />
                    )}
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Processing...' : currState === "Sign Up" ? "Create Account" : currState === "Reset Password" ? "Submit" : "Login"}
                </button>

                {/* Conditional rendering for Reset Password link */}
                {currState === "Login" && (
                    <p>Forget Password? <span onClick={() => setCurrState("Reset Password")}>Reset Here</span></p>
                )}

                {/* Checkbox and policy text only for Login and Sign Up */}
                {(currState === 'Login' || currState === 'Sign Up') && (
                    <div className='user-login-condition'>
                        <input type='checkbox' required />
                        <p>By continuing, I agree to the terms of use & privacy policy.</p>
                    </div>
                )}

                {/* Toggle between Sign Up and Login */}
                {currState === 'Login' ? (
                    <p>Create Account? <span onClick={() => setCurrState("Sign Up")}>Click Here</span></p>
                ) : (
                    <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login</span></p>
                )}
            </form>
        </div>
    );
};

export default Login;
