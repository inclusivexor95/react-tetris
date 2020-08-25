import './GamePage.css';
import React, { useState, useEffect, useRef } from 'react';
import GameBoard from '../../components/GameBoard/GameBoard';
import NextList from '../../components/NextList/NextList';
import InfoBox from '../../components/InfoBox/InfoBox';


const GamePage = () => {
    const [sevenBag, setSevenBag] = useState([]);
    const [nextSeven, setNextSeven] = useState([]);
    const [movement, setMovement] = useState(false);
    const [boardAltered, setBoardAltered] = useState(0);
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

    const coordsRef = useRef(currentTetCoords);
    const prevCoordsRef = useRef(prevTetCoords);
    const boardRef = useRef(boardArray);
    
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

    const updateTetPos = (newCoords, oldCoords, board, eventCase = false) => {
        const whichNumber = sevenBag[currentTetromino] + 1;
        // const arrayClone = boardRef.current;
        const arrayClone = board;

        // let prevCoords;
        // let currentCoords;

        // if (eventCase) {
        // //     prevCoords = prevCoordsRef.current;
        // //     currentCoords = coordsRef.current;
        //     arrayClone = board;
        // }
        // else {
        // //     prevCoords = prevTetCoords;
        // //     currentCoords = currentTetCoords;
        //     arrayClone = boardRef.current;
        // };

        oldCoords.forEach((minoCoord) => {
            console.log('board: ', board[minoCoord[0]][minoCoord[1]]);
            arrayClone[minoCoord[0]][minoCoord[1]] = 0;
        });
        
        newCoords.forEach((minoCoord) => {
            arrayClone[minoCoord[0]][minoCoord[1]] = whichNumber;
            console.log('newboard: ', board[minoCoord[0]][minoCoord[1]]);
        });

        setBoardArray(arrayClone);
        setBoardAltered(boardAltered + 1);
        setPrevTetCoords(newCoords);
    };

    const createTetromino = () => {
        const tetCoords = [];

        tetrominoIndex[sevenBag[currentTetromino]].shape.forEach((cell, index) => {
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

        setCurrentTetCoords(tetCoords);
        setPrevTetCoords(tetCoords);
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
        
        return brandNewCoords.some((newMinoCoord) => {
            if (newMinoCoord[0] < 0 || board[newMinoCoord[0]][newMinoCoord[1]] !== 0) {
                console.log('collision, newCoords are ', newCoords, 'board looks like', boardArray, ' collision is at ', newMinoCoord);
            };
            return (newMinoCoord[0] < 0 || board[newMinoCoord[0]][newMinoCoord[1]] !== 0);
        });

    };

    const gravity = () => {
        const newTetCoords = currentTetCoords.map((minoCoord) => {
            return [minoCoord[0] - 1, minoCoord[1]];
        });
        
        if (!collisionDetection(newTetCoords, currentTetCoords)) {
            setCurrentTetCoords(newTetCoords);
            updateTetPos(newTetCoords, currentTetCoords, boardRef.current);
            setMovement(true);
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
        const currentCoords = coordsRef.current;
        const newTetCoords = currentCoords.map((minoCoord) => {
            return [minoCoord[0] + y, minoCoord[1] + x];
        });
        if (!collisionDetection(newTetCoords, currentCoords, true)) {
            currentCoords.forEach((minoCoord) => {
                console.log('boardArray: ', boardArray[minoCoord[0]][minoCoord[1]], 'boardRef: ', boardRef.current[minoCoord[0]][minoCoord[1]]);
            });
            // console.log('no collision');
            setCurrentTetCoords(newTetCoords);
            updateTetPos(newTetCoords, currentCoords, boardRef.current, true);
            setMovement(movement + 1);
        }
        else {
            console.log('collision');
        };
    };

    const controllerFunction = (e) => {
        
        switch(e.keyCode) {
            case 37:
                shiftTetromino(-1, 0);
                // console.log('left');
                break;
            case 39:
            
                shiftTetromino(1, 0);
                // console.log('right');
                break;
            default:
                break;
        };
    };

    const startGame = () => {
        generateBag();
        document.addEventListener('keydown', controllerFunction);
        window.tickInterval = setInterval(() => {
            setTick(prevTick => prevTick + 1);
        }, 1000);
    }; 

    useEffect(() => {
        if (currentTetCoords.length > 0) {
            
            gravity();
            // updateTetPos();
            
            if (tetReady === true) {
                setTetReady(false);
            };
        };
    }, [tick]);

    useEffect(() => {
        if (movement === true) {
            coordsRef.current = currentTetCoords;
            prevCoordsRef.current = prevTetCoords;
            setMovement(false);
        };
    }, [movement]);

    useEffect(() => {
        boardRef.current = boardArray;
    }, [boardAltered]);

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
