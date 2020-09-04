import React from 'react';
import { Link } from 'react-router-dom';


const NavBar = ({ user, handleLogout }) => {
    
    return (
        <div className='NavBar'>
            <div id="signupNav">
                {user ? <h3>Hello, {user.name}</h3> : <Link to='/signup'>Create an Account</Link>}
            </div>
            <div id="loginNav">
                {user ? <h3 onClick={handleLogout}>Log Out</h3> : <Link to='/login'>Log In</Link>}
            </div>
        </div>
    );
}


export default NavBar;