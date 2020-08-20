import React, { useState, useEffect } from 'react';


const NextList = ({ sevenBag, tetrominoIndex }) => {

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
        // newHTML.length = 0;
        // sevenBag.forEach((tetrominoId, index) => {
        //     tetrominoHTML[index] = <div className="Tetromino"></div>;
        //     console.log(tetrominoHTML);
        // });

        const newHTML = sevenBag.map((tetrominoId, index) => {
            if (index > 0) {
                return generateTetrominoHTML(tetrominoId);
            };
        });

        // const newObject = {stateHTML: newHTML};
        const newObject = {...tetrominoHTML, ...{stateHTML: newHTML}};
        
        setTetrominoHTML(newObject);
    };

    useEffect(() => {
        displayTetrominoes();
    }, [sevenBag.length]);
    
    return (
        <div className='NextList'>
            <h2>NEXT</h2>
            <div id="nextTetrominoes">
                {tetrominoHTML.stateHTML}
                {/* {newHTML} */}
            </div>
        </div>
    );
}


export default NextList;