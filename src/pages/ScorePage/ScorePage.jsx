import React from 'react';
import './ScorePage.css';
import NavBar from '../../components/NavBar/NavBar';
import { useEffect, useState } from 'react';
import scoreService from '../../utils/scoreService';


const ScorePage = ({ user, handleLogout }) => {
    const [scoreJSON, setScoreJSON] = useState([]);
    const [scoreHTML, setScoreHTML] = useState([]);


    const getHighScores = async () => {
        try {
            // console.log('trying');
            const result = await scoreService.index(user ? true : false);
            const sortedResult = result.sort((a, b) => (a.score > b.score) ? -1 : (a.score === b.score) ? ((a.linesCleared > b.linesCleared) ? -1 : 1) : 1);
            setScoreJSON(sortedResult);
        }
        catch(err) {
            console.log(err.message);
        };
    };

    const generateScoreHTML = (page) => {
        setScoreHTML(scoreJSON.map((score, index) => {
            if (index < (page * 10)) {
                return (
                    <div className="Score">
                        <p className="ScoreText">{score.score}</p>
                        <p>User: {score.userName}</p>
                        <p>Level: {score.level}</p>
                        <p>Lines Cleared: {score.linesCleared}</p>
                    </div>
                );
            };
        }));
    };

    useEffect(() => {
        generateScoreHTML(1);
    }, [scoreJSON.length]);

    useEffect(() => {
        getHighScores();
    }, []);
    
    return (
        <div className='ScorePage Wrapper'>
            <NavBar user={user} handleLogout={handleLogout} />
            <h1>High Scores</h1>
            <div id="highScoresContainer">
                {scoreHTML}
            </div>
        </div>
    );
}


export default ScorePage;