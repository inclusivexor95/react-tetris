import React from 'react';
import './LandingPage.css';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="LandingPage Wrapper">
            <img src="/assets/Tetris_logo.png" alt="tetris logo"></img>
            <button id="playButton">
                <Link to="/game">PLAY</Link>
            </button>
        </div>
    );
}

export default LandingPage;