import './GamePage.css';
import React, { useState, useEffect, useRef } from 'react';
import GameBoard from '../../components/GameBoard/GameBoard';
import NextList from '../../components/NextList/NextList';
import InfoBox from '../../components/InfoBox/InfoBox';


const GamePage = () => {
    const [sevenBag, setSevenBag] = useState([]);
    const [nextSeven, setNextSeven] = useState([]);
    const [movement, setMovement] = useState(0);
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

    const updateTetPos = (eventCase = false) => {
        // console.log(currentTetCoords, prevTetCoords);
        const whichNumber = sevenBag[currentTetromino] + 1;
        // const arrayClone = [...boardArray];
        const arrayClone = boardRef.current;

        let prevCoords;
        let currentCoords;

        if (eventCase) {
            prevCoords = prevCoordsRef.current;
            currentCoords = coordsRef.current;
        }
        else {
            prevCoords = prevTetCoords;
            currentCoords = currentTetCoords;
        };

        // console.log('moving from ', prevCoords, ' to ', currentCoords);
        
        // prevTetCoords.forEach((minoCoord) => {
        //     arrayClone[minoCoord[0]][minoCoord[1]] = 0;
        // });

        // currentTetCoords.forEach((minoCoord) => {
        //     arrayClone[minoCoord[0]][minoCoord[1]] = whichNumber;
        // });
        prevCoords.forEach((minoCoord) => {
            arrayClone[minoCoord[0]][minoCoord[1]] = 0;
        });

        currentCoords.forEach((minoCoord) => {
            arrayClone[minoCoord[0]][minoCoord[1]] = whichNumber;
            // console.log(arrayClone[minoCoord[0]][minoCoord[1]]);
        });

        // console.log(arrayClone);
        // currentCoords.forEach((minoCoord) => {
        // })

        // console.log(arrayClone, currentCoords, whichNumber);

        setBoardArray(arrayClone);
        setBoardAltered(boardAltered + 1);
        // boardRef.current = arrayClone;
        // console.log(boardRef.current);
        setPrevTetCoords(currentCoords);
        // setPrevTetCoords(currentTetCoords);
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

    const collisionDetection = (coords, eventCase = false) => {
        let currentCoords;
        let board;

        if (eventCase) {
            // prevCoords = prevCoordsRef.current;
            currentCoords = prevCoordsRef.current;
            board = boardRef.current;
        }
        else {
            // prevCoords = prevTetCoords;
            currentCoords = currentTetCoords;
            board = boardArray;
        };
        // returns only brand new coordinates (to avoid false positives with old position)
        const newCoords = coords.filter((newMinoCoord) => {
            return currentCoords.every((oldMinoCoord) => {
                if (newMinoCoord[0] !== oldMinoCoord[0] || newMinoCoord[1] !== oldMinoCoord[1]) {
                    // console.log(newMinoCoord, ' and ', oldMinoCoord, ' are different');
                }
                return (newMinoCoord[0] !== oldMinoCoord[0] || newMinoCoord[1] !== oldMinoCoord[1]);
            });
        });
        // console.log('checking new ', newCoords, ' for collision, current coords are ', currentCoords);
        console.log(currentTetCoords, coords)
        // checks if any new coordinates are occupied
        // return newCoords.some((newMinoCoord) => {
        //     return (newMinoCoord[0] < 0 || boardArray[newMinoCoord[0]][newMinoCoord[1]] !== 0);
        // });
        return newCoords.some((newMinoCoord) => {
            if (newMinoCoord[0] < 0 || boardArray[newMinoCoord[0]][newMinoCoord[1]] !== 0) {
                console.log('collision, newCoords are ', newCoords, 'board looks like', boardArray, ' collision is at ', newMinoCoord);
            //     return true;
            };
            return (newMinoCoord[0] < 0 || board[newMinoCoord[0]][newMinoCoord[1]] !== 0);
        }); 
    };

    const gravity = () => {
        // const tetCoords = [...currentTetCoords];

        const newTetCoords = currentTetCoords.map((minoCoord) => {
            return [minoCoord[0] - 1, minoCoord[1]];
        });
        
        if (!collisionDetection(newTetCoords)) {
            setCurrentTetCoords(newTetCoords);
            setMovement(movement + 1);
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
        const newTetCoords = coordsRef.current.map((minoCoord) => {
            // console.log(currentTetCoords);
            return [minoCoord[0] + y, minoCoord[1] + x];
        });
        // console.log('moving ', x, y, ' from ', coordsRef.current, ' to ', newTetCoords);
        if (!collisionDetection(newTetCoords, true)) {
            console.log('no collision');
            setCurrentTetCoords(newTetCoords);
            setMovement(movement + 1);
            updateTetPos(true);
            // console.log('working', shiftedCoords);
        }
        else {
            console.log('collision');
        };
    };

    const controllerFunction = (e) => {
        
        switch(e.keyCode) {
            case 37:
                // newTetCoords = currentTetCoords.map((minoCoord) => {
                //     return [minoCoord[0], minoCoord[1] - 1];
                // });
                // if (!collisionDetection(newTetCoords)) {
                //     setCurrentTetCoords(newTetCoords);
                //     console.log('working', newTetCoords);
                // };
                shiftTetromino(-1, 0);
                break;
            case 39:
                // newTetCoords = currentTetCoords.map((minoCoord) => {
                //     return [minoCoord[0], minoCoord[1] + 1];
                // });
                // if (!collisionDetection(newTetCoords)) {
                //     setCurrentTetCoords(newTetCoords);
                // };
                shiftTetromino(1, 0);
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
            updateTetPos();
            
            if (tetReady === true) {
                setTetReady(false);
            };
        };
    }, [tick]);

    useEffect(() => {
        coordsRef.current = currentTetCoords;
        prevCoordsRef.current = prevTetCoords;
        
        // console.log('movement', coordsRef.current);
    }, [movement]);

    useEffect(() => {
        boardRef.current = boardArray;
        // console.log(boardRef.current);
    }, [boardAltered]);

    useEffect(() => {
        if (tetReady === true) {
            createTetromino();
            // setTetReady(false);
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
