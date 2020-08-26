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
    const [rotation, setRotation] = useState(0);
    const [tick, setTick] = useState(0);
    const [level, setLevel] = useState(0);
    const [points, setPoints] = useState(0);
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
    const rotationRef = useRef(rotation);

    const lockMovementRef = useRef(false);
    const lockGravityRef = useRef(false);
    
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

    // creates the next tetromino in the 21st and 22nd rows
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

    // detects if there is something occupying the given coordinates
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

    const dropFloaters = (arrayClone, highestRowRemoved, numOfLines) => {
        console.log('dropping floaters starting at row ', (highestRowRemoved + 1), numOfLines, ' lines');
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
        // console.log('removing lines: ', linesToRemove);
        const arrayClone = boardArray.map(row => row.slice());
        let highestRow = 0;

        linesToRemove.forEach((line) => {
            if (line > highestRow) {
                highestRow = line;
            };
            // console.log(arrayClone[line]);
            arrayClone[line].forEach((_, index) => {
                // console.log('removing square ', line, square, ' from ', arrayClone[line]);
                arrayClone[line][index] = 0;
            });
            // console.log('removing row ', line);
        });

        // console.log('new board: ', arrayClone)

        dropFloaters(arrayClone, highestRow, linesToRemove.length);

        if (linesToRemove.length === 1) {
            setPoints(points + (level * 100));
        }
        else if (linesToRemove.length === 2) {
            setPoints(points + (level * 300));
        }
        switch(linesToRemove.length) {
            case 1:
                setPoints(points + (level * 100));
                break;
            case 2:
                setPoints(points + (level * 300));
                break;
            case 3:
                setPoints(points + (level * 500));
                break;
            case 4:
                setPoints(points + (level * 800));
                break;
            default:
                console.log('scoring error, >4 or <1 lines cleared?');
                break;
        };
    };

    const checkForLine = (tetCoords) => {
        // console.log('checking for line, coords: ', tetCoords, ' board: ', boardArray);
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
            }
            else {
                checkForLine(currentTetCoords);
    
                if (currentTetromino === 6) {
                    setSevenBag([...nextSeven]);
                    generateBag(false);
                    setCurrentTetromino(0);
                }
                else {
                    setCurrentTetromino(currentTetromino + 1);
                };
                setRotation(0);
                setTetReady(true);
            }
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
            console.log('stopping because of collision');
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

    const rotateTet = (direction) => {
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

        // console.log('rotating Tetromino ', bagRef.current[tetRef.current], ' ', direction, ' data: ', rotationData, ' from: ', rotationIndex);

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

    const controllerFunction = (e) => {
        // console.log('firing', e.type);
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
        rotationRef.current = rotation;
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
            <div className="GameContainer">
                <InfoBox level={level} points={points} />
                <GameBoard startGame={startGame} boardArray={boardArray} />
                <NextList sevenBag={sevenBag} currentTetromino={currentTetromino} nextSeven={nextSeven} tetrominoIndex={tetrominoIndex} />
            </div>
        </div>
    );
};


export default GamePage;
