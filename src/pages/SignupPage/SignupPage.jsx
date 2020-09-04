import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import userService from '../../utils/userService';
import './SignupPage.css';


const SignupPage = ({ history, handleSignupOrLogin }) => {
    const [errMessage, setErrMessage] = useState('');
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: '',
        passwordConf: ''
    });

    const handleChange = (e) => {
        const newField = {[e.target.name]: e.target.value};
        const newData = {...signupInfo, ...newField};

        setSignupInfo(newData);
        setErrMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userService.signup(signupInfo);
            handleSignupOrLogin();
            history.push('/');
        } catch (err) {
            setErrMessage(err.message);
        };
    };

    return (
        <div className="SignupPage Wrapper">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className="nameContainer">
                    <label htmlFor="name">Name: </label>
                    <input type="text" id="name" value={signupInfo.name} name="name" onChange={handleChange} />
                </div>
                <div className="EmailContainer">
                    <label htmlFor="email">Email: </label>
                    <input type="email" id="email" value={signupInfo.email} name="email" onChange={handleChange} />
                </div>
                <div className="PasswordContainer">
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" value={signupInfo.password} name="password" onChange={handleChange} />
                </div>
                <div className="PassConfirmContainer">
                    <label htmlFor="passConfirm">Password: </label>
                    <input type="password" id="passConfirm" value={signupInfo.passwordConf} name="passwordConf" onChange={handleChange} />
                </div>
                <button id="signupButton">Sign Up</button>
                <Link to='/'>Cancel</Link>
            </form>
            <p>{errMessage}</p>
        </div>
    );
}

export default SignupPage;