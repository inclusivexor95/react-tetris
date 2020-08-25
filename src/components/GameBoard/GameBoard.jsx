import React from 'react';


const GameBoard = ({ startGame, boardArray }) => {

    const handleStartClick = (e) => {
        e.target.style.display = 'none';
        startGame();
    };

    const handleChange = () => {
        console.log('change');
    };

    return (
        <div className="GameBoard" onChange={handleChange}>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[0][0]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[0][1]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[0][2]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[0][3]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[0][4]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[0][5]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[0][6]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[0][7]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[0][8]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[0][9]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[1][0]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[1][1]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[1][2]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[1][3]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[1][4]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[1][5]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[1][6]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[1][7]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[1][8]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[1][9]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[2][0]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[2][1]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[2][2]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[2][3]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[2][4]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[2][5]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[2][6]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[2][7]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[2][8]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[2][9]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[3][0]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[3][1]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[3][2]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[3][3]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[3][4]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[3][5]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[3][6]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[3][7]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[3][8]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[3][9]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[4][0]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[4][1]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[4][2]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[4][3]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[4][4]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[4][5]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[4][6]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[4][7]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[4][8]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[4][9]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[5][0]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[5][1]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[5][2]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[5][3]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[5][4]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[5][5]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[5][6]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[5][7]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[5][8]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[5][9]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[6][0]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[6][1]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[6][2]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[6][3]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[6][4]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[6][5]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[6][6]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[6][7]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[6][8]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[6][9]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[7][0]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[7][1]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[7][2]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[7][3]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[7][4]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[7][5]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[7][6]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[7][7]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[7][8]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[7][9]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[8][0]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[8][1]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[8][2]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[8][3]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[8][4]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[8][5]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[8][6]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[8][7]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[8][8]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[8][9]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[9][0]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[9][1]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[9][2]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[9][3]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[9][4]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[9][5]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[9][6]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[9][7]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[9][8]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[9][9]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[10][0]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[10][1]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[10][2]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[10][3]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[10][4]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[10][5]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[10][6]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[10][7]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[10][8]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[10][9]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[11][0]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[11][1]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[11][2]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[11][3]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[11][4]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[11][5]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[11][6]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[11][7]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[11][8]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[11][9]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[12][0]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[12][1]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[12][2]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[12][3]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[12][4]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[12][5]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[12][6]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[12][7]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[12][8]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[12][9]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[13][0]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[13][1]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[13][2]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[13][3]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[13][4]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[13][5]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[13][6]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[13][7]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[13][8]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[13][9]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[14][0]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[14][1]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[14][2]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[14][3]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[14][4]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[14][5]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[14][6]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[14][7]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[14][8]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[14][9]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[15][0]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[15][1]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[15][2]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[15][3]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[15][4]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[15][5]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[15][6]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[15][7]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[15][8]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[15][9]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[16][0]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[16][1]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[16][2]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[16][3]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[16][4]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[16][5]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[16][6]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[16][7]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[16][8]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[16][9]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[17][0]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[17][1]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[17][2]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[17][3]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[17][4]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[17][5]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[17][6]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[17][7]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[17][8]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[17][9]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[18][0]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[18][1]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[18][2]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[18][3]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[18][4]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[18][5]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[18][6]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[18][7]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[18][8]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[18][9]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[19][0]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[19][1]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[19][2]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[19][3]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[19][4]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[19][5]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[19][6]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[19][7]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[19][8]}></div>
            <div className={'VisibleSquare BoardSquare Value' + boardArray[19][9]}></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <div className='BoardSquare'></div>
            <button id="startButton" onClick={handleStartClick}>START</button>
        </div>
    );
}

export default GameBoard;