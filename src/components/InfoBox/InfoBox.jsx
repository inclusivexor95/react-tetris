import React from 'react';


const InfoBox = ({ points, level }) => {
    
    return (
        <div className='InfoBox'>
            <h2>HOLD</h2>
            <div id="holdContainer"></div>
            <h2>LEVEL</h2>
            <div id="levelContainer">
                <p>{level}</p>
            </div>
            <h2>SCORE</h2>
            <div id="scoreContainer">
                <p>{points}</p>
            </div>
            {/* <h2>TIME</h2>
            <div id="timeContainer"></div> */}
        </div>
    );
}


export default InfoBox;