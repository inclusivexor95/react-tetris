import './GamePage.css';
import React, { useState, useEffect, useRef } from 'react';
import GameBoard from '../../components/GameBoard/GameBoard';
import NextList from '../../components/NextList/NextList';
import InfoBox from '../../components/InfoBox/InfoBox';


const GamePage = () => {
    const [sevenBag, setSevenBag] = useState([]);
    const [nextSeven, setNextSeven] = useState([]);
    // const [currentTetromino, setCurrentTetromino] = useState(0);
    const [showGameOver, setShowGameOver] = useState(true);
    const [currentTetCoords, setCurrentTetCoords] = useState([]);
    const [showPauseButton, setShowPauseButton] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [tick, setTick] = useState(0);
    const [level, setLevel] = useState(0);
    const [linesCleared, setLinesCleared] = useState(0);
    const [score, setScore] = useState(0);
    const emptyBoard = [
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
    ];
    const [boardArray, setBoardArray] = useState(emptyBoard);

    // refs to different state variables for use within useInterval() controlled functions
    const coordsRef = useRef(currentTetCoords);
    const boardRef = useRef(boardArray);
    const bagRef = useRef(sevenBag);
    const nextBagRef = useRef(nextSeven);
    const rotationRef = useRef(rotation);

    const tetRef = useRef(0);
    const lockMovementRef = useRef(false);
    const lockGravityRef = useRef(false);
    const gravityInProgressRef = useRef(false);
    const softDropInProgressRef = useRef(false);
    const lockDropRef = useRef(false);
    const tetReadyRef = useRef(false);
    const pauseRef = useRef(false);
    const tickStoppedRef = useRef(false);
    const holdMoveRef = useRef('');
    
    // constant Tetromino data
    const tetrominoIndex = [
        {
            name: 'I',
            shape: [0, 0, 0, 0, 1, 1, 1, 1],
            rotation: [[[2, 1], [1, 0], [0, -1], [-1, -2]], [[1, -2], [0, -1], [-1, 0], [-2, 1]], [[-2, -1], [-1, 0], [0, 1], [1, 2]], [[-1, 2], [0, 1], [1, 0], [2, -1]]],
            wallKick: {
                '0>1': [[-2, 0], [1, 0], [-2, -1], [1, 2]],
                '1>0': [[2, 0], [-1, 0], [2, 1], [-1,-2]],
                '1>2': [[-1, 0], [2, 0], [-1, 2], [2, -1]],
                '2>1': [[1, 0], [-2, 0], [1, -2], [-2, 1]],
                '2>3': [[2, 0], [-1, 0], [2, 1], [-1, -2]],
                '3>2': [[-2, 0], [1, 0], [-2, -1], [1, 2]],
                '3>0': [[1, 0], [-2, 0], [1, -2], [-2, 1]],
                '0>3': [[-1, 0], [2, 0], [-1, 2], [2, -1]]
            }
        },
        {
            name: 'J',
            shape: [1, 0, 0, 0, 1, 1, 1, 0],
            rotation: [[[2, 0], [1, 1], [0, 0], [-1, -1]], [[0, -2], [1, -1], [0, 0], [-1, 1]], [[-2, 0], [-1, -1], [0, 0], [1, 1]], [[0, 2], [-1, 1], [0, 0], [1, -1]]],
            wallKick: {
                '0>1': [[-1, 0], [-1, 1], [0, -2], [-1, -2]],
                '1>0': [[1, 0], [1, -1], [0, 2], [1, 2]],
                '1>2': [[1, 0], [1, -1], [0, 2], [1, 2]],
                '2>1': [[-1, 0], [-1, 1], [0, -2], [-1, -2]],
                '2>3': [[1, 0], [1, 1], [0, -2], [1, -2]],
                '3>2': [[-1, 0], [-1, -1], [0, 2], [-1, 2]],
                '3>0': [[-1, 0], [-1, -1], [0, 2], [-1, 2]],
                '0>3': [[1, 0], [1, 1], [0, -2], [1, -2]]
            } 
        },
        {
            name: 'L',
            shape: [0, 0, 1, 0, 1, 1, 1, 0],
            rotation: [[[0, -2], [1, 1], [0, 0], [-1, -1]], [[-2, 0], [1, -1], [0, 0], [-1, 1]], [[0, 2], [-1, -1], [0, 0], [1, 1]], [[2, 0], [-1, 1], [0, 0], [1, -1]]],
            wallKick: {
                '0>1': [[-1, 0], [-1, 1], [0, -2], [-1, -2]],
                '1>0': [[1, 0], [1, -1], [0, 2], [1, 2]],
                '1>2': [[1, 0], [1, -1], [0, 2], [1, 2]],
                '2>1': [[-1, 0], [-1, 1], [0, -2], [-1, -2]],
                '2>3': [[1, 0], [1, 1], [0, -2], [1, -2]],
                '3>2': [[-1, 0], [-1, -1], [0, 2], [-1, 2]],
                '3>0': [[-1, 0], [-1, -1], [0, 2], [-1, 2]],
                '0>3': [[1, 0], [1, 1], [0, -2], [1, -2]]
            } 
        },
        {
            name: 'O',
            shape: [0, 1, 1, 0, 0, 1, 1, 0],
            rotation: [[[0, 0], [0, 0], [0, 0], [0, 0]], [[0, 0], [0, 0], [0, 0], [0, 0]], [[0, 0], [0, 0], [0, 0], [0, 0]], [[0, 0], [0, 0], [0, 0], [0, 0]]],
            wallKick: {
                '0>1': [[0, 0], [0, 0], [0, 0], [0, 0]],
                '1>0': [[0, 0], [0, 0], [0, 0], [0, 0]],
                '1>2': [[0, 0], [0, 0], [0, 0], [0, 0]],
                '2>1': [[0, 0], [0, 0], [0, 0], [0, 0]],
                '2>3': [[0, 0], [0, 0], [0, 0], [0, 0]],
                '3>2': [[0, 0], [0, 0], [0, 0], [0, 0]],
                '3>0': [[0, 0], [0, 0], [0, 0], [0, 0]],
                '0>3': [[0, 0], [0, 0], [0, 0], [0, 0]]
            } 
        },
        {
            name: 'S',
            shape: [0, 1, 1, 0, 1, 1, 0, 0],
            rotation: [[[1, -1], [0, -2], [1, 1], [0, 0]], [[-1, -1], [-2, 0], [1, -1], [0, 0]], [[-1, 1], [0, 2], [-1, -1], [0, 0]], [[1, 1], [2, 0], [-1, 1], [0, 0]]],
            wallKick: {
                '0>1': [[-1, 0], [-1, 1], [0, -2], [-1, -2]],
                '1>0': [[1, 0], [1, -1], [0, 2], [1, 2]],
                '1>2': [[1, 0], [1, -1], [0, 2], [1, 2]],
                '2>1': [[-1, 0], [-1, 1], [0, -2], [-1, -2]],
                '2>3': [[1, 0], [1, 1], [0, -2], [1, -2]],
                '3>2': [[-1, 0], [-1, -1], [0, 2], [-1, 2]],
                '3>0': [[-1, 0], [-1, -1], [0, 2], [-1, 2]],
                '0>3': [[1, 0], [1, 1], [0, -2], [1, -2]]
            } 
        },
        {
            name: 'T',
            shape: [0, 1, 0, 0, 1, 1, 1, 0],
            rotation: [[[1, -1], [1, 1], [0, 0], [-1, -1]], [[-1, -1], [1, -1], [0, 0], [-1, 1]], [[-1, 1], [-1, -1], [0, 0], [1, 1]], [[1, 1], [-1, 1], [0, 0], [1, -1]]],
            wallKick: {
                '0>1': [[-1, 0], [-1, 1], [0, -2], [-1, -2]],
                '1>0': [[1, 0], [1, -1], [0, 2], [1, 2]],
                '1>2': [[1, 0], [1, -1], [0, 2], [1, 2]],
                '2>1': [[-1, 0], [-1, 1], [0, -2], [-1, -2]],
                '2>3': [[1, 0], [1, 1], [0, -2], [1, -2]],
                '3>2': [[-1, 0], [-1, -1], [0, 2], [-1, 2]],
                '3>0': [[-1, 0], [-1, -1], [0, 2], [-1, 2]],
                '0>3': [[1, 0], [1, 1], [0, -2], [1, -2]]
            } 
        },
        {
            name: 'Z',
            shape: [1, 1, 0, 0, 0, 1, 1, 0],
            rotation: [[[2, 0], [1, -1], [0, 0], [-1, -1]], [[0, -2], [-1, -1], [0, 0], [-1, 1]], [[-2, 0], [-1, 1], [0, 0], [1, 1]], [[0, 2], [1, 1], [0, 0], [1, -1]]],
            wallKick: {
                '0>1': [[-1, 0], [-1, 1], [0, -2], [-1, -2]],
                '1>0': [[1, 0], [1, -1], [0, 2], [1, 2]],
                '1>2': [[1, 0], [1, -1], [0, 2], [1, 2]],
                '2>1': [[-1, 0], [-1, 1], [0, -2], [-1, -2]],
                '2>3': [[1, 0], [1, 1], [0, -2], [1, -2]],
                '3>2': [[-1, 0], [-1, -1], [0, 2], [-1, 2]],
                '3>0': [[-1, 0], [-1, -1], [0, 2], [-1, 2]],
                '0>3': [[1, 0], [1, 1], [0, -2], [1, -2]]
            } 
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
                            tetReadyRef.current = true;
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
        if (eventCase) {
            whichNumber = bagRef.current[tetRef.current] + 1;
        }
        else {
            whichNumber = sevenBag[tetRef.current] + 1;
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

    // creates the next tetromino in the 21st and 22nd rows
    const createTetromino = () => {
        const tetCoords = [];
        const dummyCoords = [[39, 3], [39, 4], [39, 5], [39, 6]];

        // console.log(sevenBag, bagRef.current);

        tetrominoIndex[sevenBag[tetRef.current]].shape.forEach((cell, index) => {
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
            updateTetPos(tetCoords, dummyCoords, boardArray);
        }
        else {
            clearInterval(window.tickInterval);
            setShowGameOver(true);
            // const playAgain = document.getElementById('playAgainButton');
        };
    };

    // detects if there is something occupying the given coordinates
    const collisionDetection = (newCoords, oldCoords, eventCase = false) => {
        let board;

        if (eventCase) {
            board = boardRef.current;
        }
        else {
            board = boardArray;
        };

        // newCoords.forEach((minoCoord) => {
        //     if (minoCoord[0] >= 0) {
        //         console.log(board[minoCoord[0]][minoCoord[1]]);
        //     }
        // });

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

    const dropFloaters = (arrayClone, highestRowRemoved, numOfLines) => {
        for (let i = (highestRowRemoved + 1); i < 40; i++) {
            arrayClone[i].forEach((square, index) => {
                if (square !== 0) {
                    arrayClone[i - numOfLines][index] = square;
                    arrayClone[i][index] = 0;
                };
            });
        };
        setBoardArray(arrayClone);
    };  

    const removeLine = (linesToRemove) => {
        const arrayClone = boardArray.map(row => row.slice());
        let highestRow = 0;

        linesToRemove.forEach((line) => {
            if (line > highestRow) {
                highestRow = line;
            };
            arrayClone[line].forEach((_, index) => {
                arrayClone[line][index] = 8;
            });
        });

        setBoardArray(arrayClone);

        setTimeout(() => {
            linesToRemove.forEach((line) => {
                arrayClone[line].forEach((_, index) => {
                    arrayClone[line][index] = 0;
                });
            });

            dropFloaters(arrayClone, highestRow, linesToRemove.length);

            switch(linesToRemove.length) {
                case 1:
                    setScore(score + ((level + 1) * 100));
                    break;
                case 2:
                    setScore(score + ((level + 1) * 300));
                    break;
                case 3:
                    setScore(score + ((level + 1) * 500));
                    break;
                case 4:
                    setScore(score + ((level + 1) * 800));
                    break;
                default:
                    console.log('scoring error, >4 or <1 lines cleared?');
                    break;
            };

            const totalLines = linesCleared + linesToRemove.length;
            setLinesCleared(totalLines);
            if (totalLines >= ((((level * level) + level) / 2) * 10)) {
                setLevel(level + 1);
            };
        }, 100);
    };

    const checkForLine = (tetCoords) => {
        const fullLines = [];

        tetCoords.forEach((minoCoord) => {
            if (boardArray[minoCoord[0]].every((rowSquare) => {
                return rowSquare !== 0;
            }) && !(fullLines.includes(minoCoord[0]))) {
                fullLines.push(minoCoord[0]);
            };
        });

        if (fullLines.length > 0) {
            removeLine(fullLines);
        };
    };

    const checkGravity = () => {
        const newTetCoords = coordsRef.current.map((minoCoord) => {
            return [minoCoord[0] - 1, minoCoord[1]];
        });

        // console.log('1. checking gravity, newcoords: ', newTetCoords, ' oldcoords: ', currentTetCoords, coordsRef.current, ' current tet: ', tetRef.current);

        if (collisionDetection(newTetCoords, coordsRef.current, true)) {
            // console.log('2. downward collision');
            lockGravityRef.current = true;
            lockDropRef.current = true;
            if (tickStoppedRef.current === false) {
                tickStoppedRef.current = true;
                clearInterval(window.tickInterval);
                console.log('starting timeout');
                window.lockDelay = setTimeout(() => {
                    if (tickStoppedRef.current === true) {
                        tickStoppedRef.current = false;
                        // console.log('gravity collision 1');
                        gravityCollision(1);
                        startGame(true);
                    };
                }, 500);
            };
            // else {
            //     clearTimeout(window.lockDelay);
            //     console.log('starting timeout');
            //     window.lockDelay = setTimeout(() => {
            //         if (tickStoppedRef.current === true) {
            //             tickStoppedRef.current = false;
            //             console.log('gravity collision 2');
            //             gravityCollision(2);
            //             startGame(true);
            //         };
            //     }, 500);
            // };
        }
        else if (tickStoppedRef.current === true) {
            tickStoppedRef.current = false;
            startGame(true);
        };
    };

    const gravityCollision = () => {
        lockMovementRef.current = true;
        checkForLine(coordsRef.current);
        if (tetRef.current === 6) {
            setSevenBag([...nextBagRef.current]);
            generateBag(false);
            tetRef.current = 0;
        }
        else {
            tetRef.current++;
            console.log('tet + 1');
        };
        setRotation(0);
        tetReadyRef.current = true;
    };

    const gravity = () => {
        const newTetCoords = coordsRef.current.map((minoCoord) => {
            return [minoCoord[0] - 1, minoCoord[1]];
        });
        
        
        // console.log(newTetCoords, ' lockgraavityref: ', lockGravityRef.current);

        setCurrentTetCoords(newTetCoords);
        updateTetPos(newTetCoords, currentTetCoords, boardArray);

    };

    const shiftTetromino = (x, y) => {
        const currentCoords = coordsRef.current;
        const newTetCoords = currentCoords.map((minoCoord) => {
            return [minoCoord[0] + y, minoCoord[1] + x];
        });

        if (gravityInProgressRef.current === false && !collisionDetection(newTetCoords, currentCoords, true)) {
            if (gravityInProgressRef.current === false) {
                lockGravityRef.current = true;
                setCurrentTetCoords(newTetCoords);
                updateTetPos(newTetCoords, currentCoords, boardRef.current, true);
            };
        }
        else if (softDropInProgressRef.current === true) {
            lockDropRef.current = true;
            softDrop(false);
        }
        else {
            console.log('collision');
        };
    };

    const softDrop = (startStop) => {
        if (startStop) {
            console.log('lock drop', lockDropRef.current)
            softDropInProgressRef.current = true;
            lockGravityRef.current = true;
            window.softDropInterval = setInterval(() => {
                shiftTetromino(0, -1);
            }, 50);
        }
        else {
            clearInterval(window.softDropInterval);
            if (tickStoppedRef.current === false) {
                lockGravityRef.current = false;
            };
            checkGravity();
            softDropInProgressRef.current = false;
            lockMovementRef.current = false;
        };
    };

    const hardDrop = () => {
        const currentCoords = coordsRef.current;
        const arrayClone = boardRef.current.map(row => row.slice());
        let lowestSpace;
        const flag = [];
        
        currentCoords.forEach((minoCoord) => {
            let numOfLines = 0;

            for(let i = (minoCoord[0] - 1); i >= 0; i--) {
                if (arrayClone[i][minoCoord[1]] === 0) {
                    numOfLines++;
                    if (i === 0 && (!lowestSpace || numOfLines < lowestSpace)) {
                        lowestSpace = numOfLines;
                    };
                }
                else if (numOfLines === 0) {
                    flag.push(minoCoord);
                    break;
                }
                else {
                    if (!lowestSpace || numOfLines < lowestSpace) {
                        lowestSpace = numOfLines;
                    };
                    break;
                };
            };
        });

        flag.forEach((flaggedMino) => {
            if (!(currentCoords.some((currentMino) => {
                return (flaggedMino[1] === currentMino[1] && flaggedMino[0] === (currentMino[0] - 1));
            }))) {
                return;
            };
        });

        const newCoords = currentCoords.map((minoCoord) => {
            const newMinoCoords = [minoCoord[0] - lowestSpace, minoCoord[1]];
            console.log(lowestSpace, newMinoCoords);
            arrayClone[minoCoord[0]][minoCoord[1]] = 0;
            arrayClone[newMinoCoords[0]][newMinoCoords[1]] = bagRef.current[tetRef.current] + 1;
            return newMinoCoords;
        });

        setCurrentTetCoords(newCoords);
        setBoardArray(arrayClone);
    };

    const rotateTet = (direction) => {
        console.log('rotating');
        let rotationIndex = rotationRef.current;

        if (direction === 'ccw') {
            if (rotationIndex === 0) {
                rotationIndex = 3;
            }
            else {
                rotationIndex--;
            };
        };

        const rotationData = tetrominoIndex[bagRef.current[tetRef.current]].rotation[rotationIndex];

        const newCoords = coordsRef.current.map((minoCoord, index) => {
            if (direction === 'cw') {
                return [minoCoord[0] + rotationData[index][1], minoCoord[1] + rotationData[index][0]];
            }
            else if (direction === 'ccw') {
                return [minoCoord[0] - rotationData[index][1], minoCoord[1] - rotationData[index][0]];
            };
        });

        if (direction === 'cw') {
            if (rotationIndex === 3) {
                rotationIndex = 0;
            }
            else {
                rotationIndex++;
            };
        };

        if (!collisionDetection(newCoords, coordsRef.current, true)) {
            setRotation(rotationIndex);
            setCurrentTetCoords(newCoords);
            updateTetPos(newCoords, coordsRef.current, boardRef.current, true);
        }
        else {
            const wallKickResult = doWallKick(newCoords, coordsRef.current, `${rotationRef.current}>${rotationIndex}`, tetrominoIndex[bagRef.current[tetRef.current]]);

            if (wallKickResult) {
                setRotation(rotationIndex);
                setCurrentTetCoords(wallKickResult);
                updateTetPos(wallKickResult, coordsRef.current, boardRef.current, true);
            }
            else {
                console.log('rotation collision');
            };
        };
    };

    const doWallKick = (newCoords, currentCoords, kickString, tetData) => {
        let newNewCoords;

        if (tetData.wallKick[kickString].find((testCoords) => {
            newNewCoords = newCoords.map((minoCoord) => {
                return [minoCoord[0] + testCoords[1], minoCoord[1] + testCoords[0]];
            });

            return !collisionDetection(newNewCoords, currentCoords, true);
        })) {
            return newNewCoords;
        };
    };

    const pauseGame = () => {
        console.log(pauseRef.current);
        if (pauseRef.current === false) {
            clearInterval(window.tickInterval);
            lockMovementRef.current = true;
            lockDropRef.current = true;
            pauseRef.current = true;
            setShowPauseButton(true);
        }
        else if (pauseRef.current === true) {
            setShowPauseButton(false);
            pauseRef.current = false;
            lockMovementRef.current = false;
            lockDropRef.current = false;
            startGame(true);
        };
    };

    // const holdMove = (e) => {
    //     holdMoveRef.current = e;

    // }

    const controllerFunction = (e) => {
        if (gravityInProgressRef.current === false) {
            if (lockMovementRef.current === false && e.type === 'keydown') {
                lockMovementRef.current = true;
                switch(e.keyCode) {
                    case 37:
                        shiftTetromino(-1, 0);
                        break;
                    case 39:
                        shiftTetromino(1, 0);
                        break;
                    case 40:
                        if (lockDropRef.current === false && softDropInProgressRef.current === false) {
                            softDrop(true);
                        };
                        break;
                    case 38:
                        rotateTet('cw');
                        break;
                    case 88:
                        rotateTet('cw');
                        break;
                    case 90:
                        rotateTet('ccw');
                        break;
                    case 17:
                        rotateTet('ccw');
                        break;
                    case 32:
                        if (lockDropRef.current === false) {
                            hardDrop();
                        };
                        break;
                    default:
                        break;
                };
            }
            else if (e.type === 'keyup' && e.keyCode === 40) {
                console.log('stopping because of keyup');
                softDrop(false);
            }
            else {
                holdMoveRef.current = e;
            };
        }
        else {
            holdMoveRef.current = e;
        };
        if (e.type === 'keydown' && (e.keyCode === 27 || e.keyCode === 112)) {
            pauseGame();
        };
    };

    const playAgain = () => {
        setLevel(0);
        setScore(0);
        setTick(0);
        setLinesCleared(0);
        setBoardArray(emptyBoard);

        // boardRef.current = boardArray;
        // bagRef.current = sevenBag;
        // nextBagRef.current = nextSeven;
        // rotationRef.current = rotation;

        tetRef.current = 0;
        lockMovementRef.current = false;
        lockGravityRef.current = false;
        gravityInProgressRef.current = false;
        softDropInProgressRef.current = false;
        lockDropRef.current = false;
        tetReadyRef.current = false;
        pauseRef.current = false;
        tickStoppedRef.current = false;
        holdMoveRef.current = '';

        setShowGameOver(false);
        startGame();
    };

    const startGame = (unpause = false) => {
        if (unpause === false) {
            const startButton = document.getElementById('startButton');
            startButton.style.display = 'none';
            generateBag();
            document.addEventListener('keydown', controllerFunction);
            document.addEventListener('keyup', controllerFunction);
        };
        window.tickInterval = setInterval(() => {
            setTick(prevTick => prevTick + 1);
        }, 1000);
    }; 

    useEffect(() => {
        if (currentTetCoords.length > 0) {
            bagRef.current = sevenBag;
            nextBagRef.current = nextSeven;
            if (lockGravityRef.current === false) {
                lockMovementRef.current = true;
                gravityInProgressRef.current = true;
                gravity();
            };
            console.log('tick', tick)
        };
    }, [tick]);

    useEffect(() => {
        clearTimeout(window.lockDelay);
        rotationRef.current = rotation;
        coordsRef.current = currentTetCoords;
        boardRef.current = boardArray;
        gravityInProgressRef.current = false;
        lockDropRef.current = false;
        tetReadyRef.current = false;
        if (softDropInProgressRef.current === false) {
            lockMovementRef.current = false;
            lockGravityRef.current = false;
            checkGravity();
        };
    }, [JSON.stringify(boardArray)]);

    useEffect(() => {
        // console.log('tetready change');
        if (tetReadyRef.current === true) {
            createTetromino();
        };
    }, [tetReadyRef.current]);

    // useEffect(() => {
    //     console.log('movement locked? ', lockMovementRef.current);
    // }, [lockMovementRef.current]);

    // useEffect(() => {
    //     console.log('drop locked? ', lockDropRef.current);
    // }, [lockDropRef.current]);

    useEffect(() => {
        // console.log('drop locked? ', lockDropRef.current);
        if (typeof holdMoveRef.current === 'object') {
            controllerFunction(holdMoveRef.current);
            holdMoveRef.current = '';
        };
    }, [holdMoveRef.current]);

    return (
        <div className="GamePage Wrapper">
            <div className="GameContainer">
                <InfoBox level={level} score={score} />
                <GameBoard startGame={startGame} boardArray={boardArray} showPauseButton={showPauseButton} />
                <NextList sevenBag={sevenBag} currentTetromino={tetRef.current} nextSeven={nextSeven} tetrominoIndex={tetrominoIndex} />
                {showGameOver ? <div id="gameOverContainer"><h2>GAME OVER</h2><button onClick={playAgain} id="playAgainButton"><p>PLAY AGAIN</p></button></div> : null}
            </div>
        </div>
    );
}


export default GamePage;
