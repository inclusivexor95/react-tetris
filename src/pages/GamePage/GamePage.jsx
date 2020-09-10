import './GamePage.css';
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import GameBoard from '../../components/GameBoard/GameBoard';
import NextList from '../../components/NextList/NextList';
import InfoBox from '../../components/InfoBox/InfoBox';
import NavBar from '../../components/NavBar/NavBar';
import scoreService from '../../utils/scoreService';


const GamePage = ({ user, handleLogout }) => {
    // const audioObject = new Audio();
    const audio = new Audio();
    audio.src = '/assets/music/TetrisTypeA.mp3';
    audio.loop = true;
    audio.type = 'audio/mpeg';

    const [sevenBag, setSevenBag] = useState([]);
    const [nextSeven, setNextSeven] = useState([]);
    const [showGameOver, setShowGameOver] = useState(false);
    const [currentTetCoords, setCurrentTetCoords] = useState([]);
    const [showPauseButton, setShowPauseButton] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [tick, setTick] = useState(0);
    const [level, setLevel] = useState(0);
    const [linesCleared, setLinesCleared] = useState(0);
    const [score, setScore] = useState(0);
    const [heldPiece, setHeldPiece] = useState(8);
    const [audioState, setAudioState] = useState(audio);
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
    const heldPieceRef = useRef(heldPiece);
    // const scoreRef = useRef(score);
    const linesClearedRef = useRef(linesCleared);
    const levelRef = useRef(level);

    const tetRef = useRef(0);
    const holdMoveRef = useRef('');

    const lockMovementRef = useRef(false);
    const lockGravityRef = useRef(false);
    const lockDropRef = useRef(false);
    const lockHoldPieceRef = useRef(false);
    const lockPauseRef = useRef(false);

    const gravityInProgressRef = useRef(false);
    const softDropInProgressRef = useRef(false);
    const tetReadyRef = useRef(false);
    const pauseRef = useRef(false);
    const tickStoppedRef = useRef(false);
    
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
        {
            name: 'placeholder'
        },
        {
            name: 'EmptySquare',
            shape: [0, 0, 0, 0, 0, 0, 0, 0]
        }
    ];

    // generates tetromino HTML for the InfoBox and NextList components
    const generateTetrominoHTML = (tetrominoId) => {
        return (
            <div className={'Tetromino' + tetrominoIndex[tetrominoId].name}>
                {tetrominoIndex[tetrominoId].shape.map((cell) => {
                    return <div className={cell ? 'MinoDiv' : 'TransparentDiv'}></div>;
                })}
            </div>
        ); 
    };

    // sends score to the node backend upon game-over
    const logHighScore = async () => {
        try {
            await scoreService.logScore({
                score: score,
                level: level,
                linesCleared: linesCleared
            }, user ? true : false);
        }
        catch(err) {
            console.log(err.message);
        };
    };

    // generates a random sequence of the seven different Tetrominoes (each one must be included)
    const generateBag = (first = true) => {
        const bag = [];
        
        // makes sure all numbers are included once and only once (increments the random number if it is already used, and checks again recursively)
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

    // creates the next tetromino in the 20th and 21st rows
    const createTetromino = () => {
        const tetCoords = [];
        const dummyCoords = [[39, 3], [39, 4], [39, 5], [39, 6]];

        tetrominoIndex[sevenBag[tetRef.current]].shape.forEach((cell, index) => {
            if (index < 4) {
                if (cell) {
                    tetCoords.push([20, index + 3]);
                };
            }; 
            if (index > 3) {
                if (cell) {
                    tetCoords.push([19, index - 1]);
                };
            };
        });

        // checks for collision in initial position (game-over if there is)
        if (!collisionDetection(tetCoords, dummyCoords)) {
            setCurrentTetCoords(tetCoords);
            updateTetPos(tetCoords, dummyCoords, boardArray);
        }
        else {
            clearInterval(window.tickInterval);
            // audio.pause();
            audioState.pause();
            // console.log(audio);
            logHighScore();
            setShowGameOver(true);
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

    // drops any 'floating' minos after line(s) are cleared
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

    // triggers line clear animation and removes cleared lines, and then adjusts score/level/linesCleared state variables
    const removeLine = (linesToRemove) => {
        const arrayClone = boardRef.current.map(row => row.slice());
        let highestRow = 0;

        // stores highest row removed and triggers line clear animation
        linesToRemove.forEach((line) => {
            if (line > highestRow) {
                highestRow = line;
            };
            arrayClone[line].forEach((_, index) => {
                arrayClone[line][index] = 8;
            });
        });

        setBoardArray(arrayClone);

        // removes lines after animation duration
        setTimeout(() => {
            linesToRemove.forEach((line) => {
                arrayClone[line].forEach((_, index) => {
                    arrayClone[line][index] = 0;
                });
            });

            // drops 'floating' minos
            dropFloaters(arrayClone, highestRow, linesToRemove.length);

            // adjusts score state
            switch(linesToRemove.length) {
                case 1:
                    setScore(prevScore => prevScore + ((levelRef.current + 1) * 100));
                    break;
                case 2:
                    setScore(prevScore => prevScore + ((levelRef.current + 1) * 300));
                    break;
                case 3:
                    setScore(prevScore => prevScore + ((levelRef.current + 1) * 500));
                    break;
                case 4:
                    setScore(prevScore => prevScore + ((levelRef.current + 1) * 800));
                    break;
                default:
                    console.log('scoring error, >4 or <1 lines cleared?');
                    break;
            };

            // adjusts level and lines cleared state
            const totalLines = linesClearedRef.current + linesToRemove.length;
            setLinesCleared(totalLines);
            if (totalLines >= (((((levelRef.current + 1) * (levelRef.current + 1)) + (levelRef.current + 1)) / 2) * 10)) {
                setLevel(levelRef.current + 1);
            };
        }, 100);
    };

    // checks for completed lines at given coordinates, and calls line clear function if there are
    const checkForLine = (tetCoords) => {
        const fullLines = [];

        tetCoords.forEach((minoCoord) => {
            if (boardRef.current[minoCoord[0]].every((rowSquare) => {
                return rowSquare !== 0;
            }) && !(fullLines.includes(minoCoord[0]))) {
                fullLines.push(minoCoord[0]);
            };
        });

        if (fullLines.length > 0) {
            removeLine(fullLines);
        };
    };

    // checks if the space directly below current tetromino is occupied; stops gravity and initiates the 0.5s lock delay if so
    const checkGravity = () => {
        const newTetCoords = coordsRef.current.map((minoCoord) => {
            return [minoCoord[0] - 1, minoCoord[1]];
        });
        
        if (collisionDetection(newTetCoords, coordsRef.current, true)) {
            lockMovementRef.current = false;
            lockGravityRef.current = true;
            lockDropRef.current = true;
            if (tickStoppedRef.current === false) {
                tickStoppedRef.current = true;
                clearInterval(window.tickInterval);
                window.lockDelay = setTimeout(() => {
                    if (tickStoppedRef.current === true) {
                        // if lock delay is not interrupted, piece locks into place and gravity is restarted
                        tickStoppedRef.current = false;
                        gravityCollision();
                        startGame(true);
                    };
                }, 500);
            };
        }
        else if (tickStoppedRef.current === true) {
            // restarts gravity if piece is moved back to a 'gravity-able' location during lock delay 
            tickStoppedRef.current = false;
            startGame(true);
        }
        else {
            // makes sure gravity is not locked if there is no collision (probably when soft drop is ended)
            lockGravityRef.current = false;
        };
    };

    // locks piece into place and switches to the next one
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
        };
        setRotation(0);
        lockHoldPieceRef.current = false;
        tetReadyRef.current = true;
    };

    // gravity function (shifts tetromino down 1 square)
    const gravity = () => {
        const newTetCoords = coordsRef.current.map((minoCoord) => {
            return [minoCoord[0] - 1, minoCoord[1]];
        });

        setCurrentTetCoords(newTetCoords);
        updateTetPos(newTetCoords, currentTetCoords, boardArray);
    };

    // shifts tetromino left, right, or downwards after checking for collision
    const shiftTetromino = (x, y, event) => {
        const currentCoords = coordsRef.current;
        const newTetCoords = currentCoords.map((minoCoord) => {
            return [minoCoord[0] + y, minoCoord[1] + x];
        });

        // repeated checks for the gravityInProgress ref to allow gravity to take priority over movement as much as possible
        if (gravityInProgressRef.current === false && !collisionDetection(newTetCoords, currentCoords, true)) {
            if (gravityInProgressRef.current === false) {
                lockGravityRef.current = true;
                setCurrentTetCoords(newTetCoords);
                updateTetPos(newTetCoords, currentCoords, boardRef.current, true);
            }
            else {
                holdMoveRef.current = event;
            };
        }
        else if (gravityInProgressRef.current === true) {
            holdMoveRef.current = event;
        }
        else if (softDropInProgressRef.current === true) {
            // stops soft drop if collision while soft dropping
            lockDropRef.current = true;
            softDrop(false);
        };
    };

    // starts/stops soft drop interval depending on Boolean parameter
    const softDrop = (startStop) => {
        if (startStop) {
            softDropInProgressRef.current = true;
            lockGravityRef.current = true;
            window.softDropInterval = setInterval(() => {
                shiftTetromino(0, -1);
                setScore(prevScore => prevScore + 1);
            }, 50);
        }
        else {
            clearInterval(window.softDropInterval);
            // if (tickStoppedRef.current === false) {
            //     lockGravityRef.current = false;
            // };
            console.log('ending softdrop');
            if (tickStoppedRef.current === false) {
                checkGravity();
            }; 
            softDropInProgressRef.current = false;
            lockMovementRef.current = false;
        };
    };

    // performs its own collision detection and drops tetromino as far down as possible
    const hardDrop = (event) => {
        const currentCoords = coordsRef.current;
        const arrayClone = boardRef.current.map(row => row.slice());
        let lowestSpace;
        let noSpace = false;
        const flag = [];
        
        // scans downward from each mino until the drop location is found (highest collision) 
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
                    // flags any columns that have zero space under the mino
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

        // checks whether there is zero space because of the tetromino itself (does nothing) or because of collision (stops function)
        flag.forEach((flaggedMino) => {
            if (!currentCoords.some((currentMino) => {
                return (flaggedMino[1] === currentMino[1] && (flaggedMino[0] - 1) === currentMino[0]);
            })) {
                noSpace = true;
            };
        });
        if (noSpace === true) {
            return;
        };

        // calculates new/dropped coordinates and completes drop
        const newCoords = currentCoords.map((minoCoord) => {
            const newMinoCoords = [minoCoord[0] - lowestSpace, minoCoord[1]];
            arrayClone[minoCoord[0]][minoCoord[1]] = 0;
            arrayClone[newMinoCoords[0]][newMinoCoords[1]] = bagRef.current[tetRef.current] + 1;
            return newMinoCoords;
        });

        if (gravityInProgressRef.current === false) {
            setCurrentTetCoords(newCoords);
            setBoardArray(arrayClone);
            setScore(prevScore => prevScore + (lowestSpace * 2));
        }
        else {
            holdMoveRef.current = event;
        };
    };

    // rotates current tetromino
    const rotateTet = (direction, event) => {
        if (bagRef.current[tetRef.current] === 3) {
            return;
        }
        else {
            lockMovementRef.current = true;
        };

        let rotationIndex = rotationRef.current;

        // adjusts rotation index based on current orientation and rotation direction
        if (direction === 'ccw') {
            if (rotationIndex === 0) {
                rotationIndex = 3;
            }
            else {
                rotationIndex--;
            };
        };

        // retrieves constant rotation vector data based on rotation index and which tetromino is being rotated
        const rotationData = tetrominoIndex[bagRef.current[tetRef.current]].rotation[rotationIndex];

        // applies rotation vectors to find rotated coordinates
        const newCoords = coordsRef.current.map((minoCoord, index) => {
            if (direction === 'cw') {
                return [minoCoord[0] + rotationData[index][1], minoCoord[1] + rotationData[index][0]];
            }
            else if (direction === 'ccw') {
                return [minoCoord[0] - rotationData[index][1], minoCoord[1] - rotationData[index][0]];
            };
        });

        // once again adjusts rotation index
        if (direction === 'cw') {
            if (rotationIndex === 3) {
                rotationIndex = 0;
            }
            else {
                rotationIndex++;
            };
        };

        // completes rotation if no collision, otherwise performs wall kick
        if (gravityInProgressRef.current === false && !collisionDetection(newCoords, coordsRef.current, true)) {
            if (gravityInProgressRef.current === false) {
                lockGravityRef.current = true;
                setRotation(rotationIndex);
                setCurrentTetCoords(newCoords);
                updateTetPos(newCoords, coordsRef.current, boardRef.current, true);
            }
            else {
                holdMoveRef.current = event;
            };
        }
        else if (gravityInProgressRef.current === false) {
            const wallKickResult = doWallKick(newCoords, coordsRef.current, `${rotationRef.current}>${rotationIndex}`, tetrominoIndex[bagRef.current[tetRef.current]]);

            if (wallKickResult && gravityInProgressRef.current === false) {
                lockGravityRef.current = true;
                setRotation(rotationIndex);
                setCurrentTetCoords(wallKickResult);
                updateTetPos(wallKickResult, coordsRef.current, boardRef.current, true);
            }
            else if (gravityInProgressRef.current === true) {
                holdMoveRef.current = event;
            };
        }
        else {
            holdMoveRef.current = event;
        };
    };

    // calculates best alternative tetromino location if the initial rotated location collides with the wall or other minos 
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

    // pauses/unpauses the game
    const pauseGame = () => {
        if (pauseRef.current === false) {
            console.log('pause');
            // audio.pause();
            audioState.pause();
            clearInterval(window.tickInterval);
            pauseRef.current = true;
            lockPauseRef.current = true
            setTimeout(() => {
                lockPauseRef.current = false;
            }, 100);
            lockMovementRef.current = true;
            lockDropRef.current = true;
            setShowPauseButton(true);
        }
        else if (pauseRef.current === true) {
            console.log('unpause');
            // audio.play();
            audioState.play();
            setShowPauseButton(false);
            pauseRef.current = false;
            lockPauseRef.current = true;
            setTimeout(() => {
                lockPauseRef.current = false;
            }, 100);
            lockMovementRef.current = false;
            startGame(true);
        };
    };

    // transfers current (falling) tetromino to the hold box; a previously held tetromino becomes the new current (falling) tetromino
    const holdPiece = () => {
        lockGravityRef.current = true;
        lockDropRef.current = true;
        lockHoldPieceRef.current = true;
        const board = boardRef.current.map(row => row.slice());
        const bag = [...bagRef.current];

        // wipes current tetromino off the board
        coordsRef.current.forEach((minoCoord) => {
            board[minoCoord[0]][minoCoord[1]] = 0;
        });
        setBoardArray(board);

        // swaps the two variable values
        const nextHeldPiece = bag.splice(tetRef.current, 1, heldPieceRef.current)[0];

        // switches to next tetromino
        if (heldPieceRef.current === 8) {
            if (tetRef.current === 6) {
                setSevenBag([...nextBagRef.current]);
                generateBag(false);
                tetRef.current = 0;
            }
            else {
                setSevenBag(bag);
                tetRef.current++;
            };
        }
        else {
            setSevenBag(bag);
        };
        
        setHeldPiece(nextHeldPiece);
        setRotation(0);
        tetReadyRef.current = true;
    };

    // calls appropriate movement function based on key pressed (called by event listener)
    // holds last input in memory if another operation is being completed (holdMoveRef)
    const controllerFunction = (e) => {
        if (gravityInProgressRef.current === false) {
            if (lockMovementRef.current === false && e.type === 'keydown') {
                // console.log(lockMovementRef.current, gravityInProgressRef.current);
                switch(e.keyCode) {
                    case 37:
                        lockMovementRef.current = true;
                        shiftTetromino(-1, 0, e);
                        break;
                    case 39:
                        lockMovementRef.current = true;
                        shiftTetromino(1, 0, e);
                        break;
                    case 40:
                        if (lockDropRef.current === false && softDropInProgressRef.current === false) {
                            softDrop(true);
                        };
                        break;
                    case 38:
                        rotateTet('cw', e);
                        break;
                    case 88:
                        rotateTet('cw', e);
                        break;
                    case 90:
                        rotateTet('ccw', e);
                        break;
                    case 17:
                        rotateTet('ccw', e);
                        break;
                    case 32:
                        if (lockDropRef.current === false) {
                            hardDrop(e);
                        };
                        break;
                    case 16:
                        if (lockHoldPieceRef.current === false) {
                            holdPiece();
                        };
                            break;
                    case 67:
                        if (lockHoldPieceRef.current === false) {
                            holdPiece();
                        };
                            break;
                    default:
                        break;
                };
            }
            else if (e.type === 'keyup' && e.keyCode === 40 && lockDropRef.current === false) {
                console.log(lockDropRef.current, tickStoppedRef.current);
                softDrop(false);
            }
            else {
                holdMoveRef.current = e;
            };
        }
        else if (e.keyCode !== 27 && e.keyCode !== 112) {
            holdMoveRef.current = e;
        };
        if (lockPauseRef.current === false && e.type === 'keydown' && (e.keyCode === 27 || e.keyCode === 112)) {
            pauseGame();
        };
    };

    // clears variables & state and starts a new game 
    const playAgain = () => {
        setRotation(0);
        setLevel(0);
        setScore(0);
        setLinesCleared(0);
        setSevenBag([]);
        setNextSeven([]);
        setBoardArray(emptyBoard);

        clearInterval(window.tickInterval);

        bagRef.current = sevenBag;
        tetRef.current = 0;
        lockMovementRef.current = false;
        lockGravityRef.current = false;
        gravityInProgressRef.current = false;
        softDropInProgressRef.current = false;
        lockDropRef.current = false;
        lockHoldPieceRef.current = false;
        tetReadyRef.current = false;
        pauseRef.current = false;
        tickStoppedRef.current = false;
        holdMoveRef.current = '';

        setShowGameOver(false);
        setTimeout(() => {
            startGame();
        }, 100);
    };

    // starts game (either 'from scratch' or from a pause depending on parameter value)
    const startGame = (unpause = false) => {
        tickStoppedRef.current = false;
        if (unpause === false) {
            // setAudioState(audio.play());
            audioState.play();
            // audio.play();
            const startButton = document.getElementById('startButton');
            startButton.style.display = 'none';
            generateBag();
            document.addEventListener('keydown', controllerFunction);
            document.addEventListener('keyup', controllerFunction);
        };
        // interval for gravity function
        window.tickInterval = setInterval(() => {
            // console.log('tick: ', tick);
            setTick(prevTick => prevTick + 1);
        }, ((0.8 - (levelRef.current * 0.007)) ** levelRef.current) * 1000);
    }; 

    // updates some refs and calls gravity function every tick of the interval 
    useEffect(() => {
        if (currentTetCoords.length > 0) {
            linesClearedRef.current = linesCleared;
            levelRef.current = level;
            bagRef.current = sevenBag;
            nextBagRef.current = nextSeven;
            heldPieceRef.current = heldPiece;
            if (lockGravityRef.current === false) {
                lockMovementRef.current = true;
                gravityInProgressRef.current = true;
                gravity();
            };
        };
    }, [tick]);

    // useEffect(() => {
    //     console.log('lockdrop: ', lockDropRef.current);
    // }, [lockDropRef.current]);

    
    // useEffect(() => {
    //     console.log('lockmovement: ', lockMovementRef.current);
    // }, [lockMovementRef.current]);

    // useEffect(() => {
    //     console.log('tickstopped: ', tickStoppedRef.current);
    // }, [tickStoppedRef.current]);

    // updates refs and calls the gravity collision check function whenever the board state is changed
    useEffect(() => {
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

    // spawns next tetromino on board when the ref is changed to true
    useEffect(() => {
        if (tetReadyRef.current === true) {
            createTetromino();
        };
    }, [tetReadyRef.current]);

    // re-executes user input that was deferred by the controller function 
    useEffect(() => {
        if (typeof holdMoveRef.current === 'object') {
            controllerFunction(holdMoveRef.current);
            holdMoveRef.current = '';
        };
    }, [holdMoveRef.current]);

    return (
        <div className="GamePage Wrapper">
            <NavBar user={user} handleLogout={handleLogout} />
            <div className="GameContainer">
                <InfoBox level={level} score={score} heldPiece={heldPiece} generateTetrominoHTML={generateTetrominoHTML} />
                <GameBoard startGame={startGame} boardArray={boardArray} showPauseButton={showPauseButton} />
                <NextList sevenBag={sevenBag} currentTetromino={tetRef.current} nextSeven={nextSeven} generateTetrominoHTML={generateTetrominoHTML} />
                {showGameOver ? <div id="gameOverContainer"><h2>GAME OVER</h2><button onClick={playAgain} id="playAgainButton"><p>PLAY AGAIN</p></button><Link to='/scores' id="seeScoresButton">See High Scores</Link></div> : null}
            </div>
        </div>
    );
}


export default GamePage;
