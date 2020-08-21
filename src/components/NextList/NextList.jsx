import React, { useState, useEffect } from 'react';


const NextList = ({ sevenBag, tetrominoIndex, nextSeven, currentTetromino }) => {

    const [tetrominoHTML, setTetrominoHTML] = useState({
        stateHTML: []
    });

    const generateTetrominoHTML = (tetrominoId) => {
        return (
            <div className={'Tetromino' + tetrominoIndex[tetrominoId].name}>
                {tetrominoIndex[tetrominoId].shape.map((cell) => {
                    return <div className={cell ? 'MinoDiv' : 'TransparentDiv'}></div>;
                })}
            </div>
        ); 
    };

    const displayTetrominoes = () => {

        const fullList = sevenBag.concat(nextSeven);

        const newHTML = fullList.map((tetrominoId, index) => {
            if (currentTetromino < index && index < (currentTetromino + 7)) {
                return generateTetrominoHTML(tetrominoId);
            };
        });

        const newObject = {...tetrominoHTML, ...{stateHTML: newHTML}};
        
        setTetrominoHTML(newObject);
    };

    useEffect(() => {
        displayTetrominoes();
    }, [sevenBag.length, currentTetromino]);
    
    return (
        <div className='NextList'>
            <h2>NEXT</h2>
            <div id="nextTetrominoes">
                {tetrominoHTML.stateHTML}
            </div>
        </div>
    );
}


export default NextList;