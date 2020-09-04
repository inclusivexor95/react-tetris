import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';
import userService from '../../utils/userService';


const LoginPage = ({ handleSignupOrLogin, history }) => {
    const [errMessage, setErrMessage] = useState('');
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        pw: ''
    });

    const handleChange = (e) => {
        const newField = {[e.target.name]: e.target.value};
        const newData = {...loginInfo, ...newField};

        setLoginInfo(newData);
        setErrMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userService.login(loginInfo);
            handleSignupOrLogin();
            history.push('/');
        } catch (err) {
            setErrMessage(err.message);
        };
    };

    return (
        <div className="LoginPage Wrapper">
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <div className="EmailContainer">
                    <label htmlFor="email">Email: </label>
                    <input type="email" id="email" value={loginInfo.email} name="email" onChange={handleChange} />
                </div>
                <div className="PasswordContainer">
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" value={loginInfo.pw} name="pw" onChange={handleChange} />
                </div>
                <button id="loginButton">Log In</button>
                <Link to='/'>Cancel</Link>
            </form>
            <p>{errMessage}</p>
        </div>
    );
}

export default LoginPage;