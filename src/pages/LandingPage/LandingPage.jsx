import React from 'react';
import './LandingPage.css';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';

const LandingPage = ({ user, handleLogout }) => {
    return (
        <div className="LandingPage Wrapper">
            <NavBar user={user} handleLogout={handleLogout} />
            <img src="/assets/images/Tetris_logo.png" alt="tetris logo"></img>
            <Link id="playButton" to="/game"><p>PLAY</p></Link>
        </div>
    );
}

export default LandingPage;