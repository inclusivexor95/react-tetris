import React from 'react';
import './ScorePage.css';
import NavBar from '../../components/NavBar/NavBar';
import { useEffect } from 'react';
import scoreService from '../../utils/scoreService';


const ScorePage = ({ user, handleLogout }) => {

    const getHighScores = async () => {
        try {
            await scoreService.index();
        }
        catch(err) {
            console.log(err.message);
        };
    };

    useEffect(() => {
        getHighScores();
    }, []);
    
    return (
        <div className='ScorePage Wrapper'>
            <NavBar user={user} handleLogout={handleLogout} />
            <div id="scoreContainer">

            </div>
        </div>
    );
}


export default ScorePage;