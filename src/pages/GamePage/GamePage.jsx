import './GamePage.css';
import React, { useState, useEffect, useRef } from 'react';
import GameBoard from '../../components/GameBoard/GameBoard';
import NextList from '../../components/NextList/NextList';
import InfoBox from '../../components/InfoBox/InfoBox';


const GamePage = () => {
    const [sevenBag, setSevenBag] = useState([]);
    const [nextSeven, setNextSeven] = useState([]);
    const [currentTetromino, setCurrentTetromino] = useState(0);
    const [tetReady, setTetReady] = useState(false);
    const [currentTetCoords, setCurrentTetCoords] = useState([]);
    const [prevTetCoords, setPrevTetCoords] = useState([]);
    const [tick, setTick] = useState(0);
    const [boardArray, setBoardArray] = useState([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]);

    // refs to different state variables for use within useInterval() controlled functions
    const coordsRef = useRef(currentTetCoords);
    const prevCoordsRef = useRef(prevTetCoords);
    const boardRef = useRef(boardArray);
    const bagRef = useRef(sevenBag);
    const tetRef = useRef(currentTetromino);

    const lockMovementRef = useRef(false);
    const lockGravityRef = useRef(false);
    
    // constant Tetromino data
    const tetrominoIndex = [
        {
            name: 'I',
            shape: [0, 0, 0, 0, 1, 1, 1, 1] 
        },
        {
            name: 'J',
            shape: [1, 0, 0, 0, 1, 1, 1, 0] 
        },
        {
            name: 'L',
            shape: [0, 0, 1, 0, 1, 1, 1, 0] 
        },
        {
            name: 'O',
            shape: [0, 1, 1, 0, 0, 1, 1, 0] 
        },
        {
            name: 'S',
            shape: [0, 1, 1, 0, 1, 1, 0, 0] 
        },
        {
            name: 'T',
            shape: [0, 1, 0, 0, 1, 1, 1, 0] 
        },
        {
            name: 'Z',
            shape: [1, 1, 0, 0, 0, 1, 1, 0] 
        },
    ];

    // generates a random sequence of the seven different Tetrominoes (each one must be included)
    const generateBag = (first = true) => {
        
        const bag = [];
        
        const randomTetromino = (numLeft = 7) => {
            let randomNum = Math.floor(Math.random() * numLeft);
            
            const checkBag = () => {
                if (bag.includes(randomNum)) {
                    randomNum++;
                    checkBag();
                }
                else {
                    bag.push(randomNum);
                    if (bag.length < 7) {
                        randomTetromino(numLeft - 1);
                    }
                    else {
                        if (first) {
                            setSevenBag(bag);
                            setTetReady(true);
                            generateBag(false);
                        }
                        else {
                            setNextSeven(bag);
                        };
                    };
                };
            };

            checkBag();
        };

        randomTetromino();
    };

    // updates board in state with new Tetromino coordinates
    const updateTetPos = (newCoords, oldCoords, board, eventCase = false) => {
        let whichNumber;
        setPrevTetCoords(newCoords);
        if (eventCase) {
            whichNumber = bagRef.current[tetRef.current] + 1;
        }
        else {
            whichNumber = sevenBag[currentTetromino] + 1;
        };
        const arrayClone = board.map(row => row.slice());

        // 'erases' old coordinates
        oldCoords.forEach((minoCoord) => {
            arrayClone[minoCoord[0]][minoCoord[1]] = 0;
        });

        // 'paints' new coordinates
        newCoords.forEach((minoCoord) => {
            arrayClone[minoCoord[0]][minoCoord[1]] = whichNumber;
        });

        setBoardArray(arrayClone);
    };

    // creates 
    const createTetromino = () => {
        const tetCoords = [];
        const dummyCoords = [[39, 3], [39, 4], [39, 5], [39, 6]];

        tetrominoIndex[sevenBag[currentTetromino]].shape.forEach((cell, index) => {
            if (index < 4) {
                if (cell) {
                    tetCoords.push([21, index + 3]);
                };
            }; 
            if (index > 3) {
                if (cell) {
                    tetCoords.push([20, index - 1]);
                };
            };
        });

        if (!collisionDetection(tetCoords, dummyCoords)) {
            setCurrentTetCoords(tetCoords);
            setPrevTetCoords(tetCoords);
            updateTetPos(tetCoords, dummyCoords, boardRef.current);
        }
        else {
            clearInterval(window.tickInterval);
            console.log('game over');
        };
    };

    const collisionDetection = (newCoords, oldCoords, eventCase = false) => {
        let board;

        if (eventCase) {
            board = boardRef.current;
        }
        else {
            board = boardArray;
        };

        // returns only brand new coordinates (to avoid false positives with old position)
        const brandNewCoords = newCoords.filter((newMinoCoord) => {
            return oldCoords.every((oldMinoCoord) => {
                return (newMinoCoord[0] !== oldMinoCoord[0] || newMinoCoord[1] !== oldMinoCoord[1]);
            });
        });

        // check if the new coordinates are already occupied
        return brandNewCoords.some((newMinoCoord) => {
            return (newMinoCoord[0] < 0 || board[newMinoCoord[0]][newMinoCoord[1]] !== 0);
        });
    };

    const gravity = () => {
        const newTetCoords = coordsRef.current.map((minoCoord) => {
            return [minoCoord[0] - 1, minoCoord[1]];
        });
            
        if (!collisionDetection(newTetCoords, currentTetCoords)) {
            setCurrentTetCoords(newTetCoords);
            updateTetPos(newTetCoords, currentTetCoords, boardArray);
        }
        else {
            if (tetReady === true) {
                clearInterval(window.tickInterval);
                console.log('game over');
            };
            if (currentTetromino === 6) {
                setSevenBag([...nextSeven]);
                generateBag(false);
                setCurrentTetromino(0);
            }
            else {
                setCurrentTetromino(currentTetromino + 1);
            };
            setTetReady(true);
        };
    };

    const shiftTetromino = (x, y) => {
        // console.log('shifting');
        const currentCoords = coordsRef.current;
        const newTetCoords = currentCoords.map((minoCoord) => {
            return [minoCoord[0] + y, minoCoord[1] + x];
        });

        if (!collisionDetection(newTetCoords, currentCoords, true)) {
            setCurrentTetCoords(newTetCoords);
            updateTetPos(newTetCoords, currentCoords, boardRef.current, true);
        }
        else if (lockGravityRef.current === true && y === -1) {
            console.log('stopping because of collisiond');
            softDrop(false);
        }
        else {
            console.log('collision');
        };
    };

    const softDrop = (startStop) => {
        if (startStop) {
            lockGravityRef.current = true;
            window.softDropInterval = setInterval(() => {
                shiftTetromino(0, -1);
            }, 50);
        }
        else {
            clearInterval(window.softDropInterval);
            lockGravityRef.current = false;
        };
    };

    const controllerFunction = (e) => {
        console.log('firing', e.type);
        if (!lockMovementRef.current && e.type === 'keydown') {
            // console.log('firing', e.keyCode, lockMovementRef);
            switch(e.keyCode) {
                case 37:
                    shiftTetromino(-1, 0);
                    break;
                case 39:
                    shiftTetromino(1, 0);
                    break;
                case 40:
                    if (lockGravityRef.current === false) {
                        softDrop(true);
                    };
                    break;
                default:
                    break;
            };
        }
        else if (e.type === 'keyup' && e.keyCode === 40) {
            console.log('stopping because of keyup');
            softDrop(false);
        };
    };

    const startGame = () => {
        generateBag();
        document.addEventListener('keydown', controllerFunction);
        document.addEventListener('keyup', controllerFunction);
        window.tickInterval = setInterval(() => {
            setTick(prevTick => prevTick + 1);
        }, 1000);
    }; 

    useEffect(() => {
        if (currentTetCoords.length > 0) {
            lockMovementRef.current = true;
            bagRef.current = sevenBag;

            if (!lockGravityRef.current) {
                gravity();
            };
            if (tetReady === true) {
                setTetReady(false);
            };
        };
    }, [tick]);

    useEffect(() => {
        tetRef.current = currentTetromino;
        coordsRef.current = currentTetCoords;
        prevCoordsRef.current = prevTetCoords;
        boardRef.current = boardArray;
        lockMovementRef.current = false;
    }, [JSON.stringify(boardArray)]);

    useEffect(() => {
        if (tetReady === true) {
            createTetromino();
        };
    }, [tetReady]);

    return (
        <div className="GamePage Wrapper">
            <InfoBox />
            <GameBoard startGame={startGame} boardArray={boardArray} />
            <NextList sevenBag={sevenBag} currentTetromino={currentTetromino} nextSeven={nextSeven} tetrominoIndex={tetrominoIndex} />
        </div>
    );
};


export default GamePage;
