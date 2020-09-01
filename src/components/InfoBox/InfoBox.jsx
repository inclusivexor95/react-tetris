import React, { useEffect, useState } from 'react';


const InfoBox = ({ score, level, heldPiece, generateTetrominoHTML }) => {
    const [heldHTML, setHeldHTML] = useState(<div></div>);

    useEffect(() => {
        setHeldHTML(generateTetrominoHTML(heldPiece));
    }, [heldPiece]);
    
    return (
        <div className='InfoBox'>
            <h2>HOLD</h2>
            <div id="holdContainer">
                {heldHTML}
            </div>
            <h2>LEVEL</h2>
            <div id="levelContainer">
                <p>{level}</p>
            </div>
            <h2>SCORE</h2>
            <div id="scoreContainer">
                <p>{score}</p>
            </div>
            {/* <h2>TIME</h2>
            <div id="timeContainer"></div> */}
        </div>
    );
}


export default InfoBox;