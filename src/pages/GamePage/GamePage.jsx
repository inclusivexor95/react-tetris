import './GamePage.css';
import React, { useState, useEffect, useRef } from 'react';
import GameBoard from '../../components/GameBoard/GameBoard';
import NextList from '../../components/NextList/NextList';
import InfoBox from '../../components/InfoBox/InfoBox';


const GamePage = () => {
    const [gameOn, setGameOn] = useState(false);
    const [sevenBag, setSevenBag] = useState([]);
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

    const generateBag = () => {
        const bag = sevenBag;
        
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
                        setSevenBag(bag);
                        setTetReady(true);
                    };
                };
            };

            checkBag();
        };

        randomTetromino();
    };

    const updateTetPos = () => {
        const whichNumber = sevenBag[currentTetromino] + 1;
        const arrayClone = [...boardArray];

        prevTetCoords.forEach((minoCoord) => {
            console.log('erasing: ', [minoCoord[0], minoCoord[1]], 'tetready? ', tetReady, 'currentTet: ', currentTetCoords);
            arrayClone[minoCoord[0]][minoCoord[1]] = 0;
        });

        currentTetCoords.forEach((minoCoord) => {
            arrayClone[minoCoord[0]][minoCoord[1]] = whichNumber;
        });
        
        setBoardArray(arrayClone);
        setPrevTetCoords(currentTetCoords);
    };

    const createTetromino = () => {
        const tetCoords = [];

        console.log('prevtetcoords in createtetromino: ', prevTetCoords, ' creating ', currentTetromino);

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

    const collisionDetection = (coords) => {
        // returns only brand new coordinates (to avoid false positives with old position)
        const newCoords = coords.filter((newMinoCoord) => {
            return currentTetCoords.every((oldMinoCoord) => {
                return (newMinoCoord[0] !== oldMinoCoord[0] || newMinoCoord[1] !== oldMinoCoord[1]);
            });
        });

        // checks if any new coordinates are occupied
        return newCoords.some((newMinoCoord) => {
            return (newMinoCoord[0] < 0 || boardArray[newMinoCoord[0]][newMinoCoord[1]] !== 0);
        });
    };

    const gravity = () => {
        const tetCoords = [...currentTetCoords];

        const newTetCoords = tetCoords.map((minoCoord) => {
            return [minoCoord[0] - 1, minoCoord[1]];
        });
        
        if (!collisionDetection(newTetCoords)) {
            setCurrentTetCoords(newTetCoords);
        }
        else {
            // const prevCoordsCopy = [...prevTetCoords];
            setCurrentTetromino(currentTetromino + 1);
            // setPrevTetCoords([]);
            // console.log('prevcoordscopy', prevCoordsCopy);
            // prevCoordsCopy[0][0] = prevCoordsCopy[1][0] = prevCoordsCopy[2][0] = prevCoordsCopy[3][0] = 39; 
            // setPrevTetCoords(prevCoordsCopy);
            
            setTetReady(true);
        };
    };

    const startGame = () => {
        // let count = 0;
        if (gameOn === false) {
            setGameOn(true);
            generateBag();
            setInterval(() => {
                // count++;
                // console.log(count);
                setTick(prevTick => prevTick + 1);

            }, 400);
        };
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

    // useEffect(() => {
    //     if (currentTetCoords.length > 0) {
    //         setInterval(() => {
    //             gravity();
    //         }, 1000);
    //     };
    // }, [currentTetCoords.length]);

    useEffect(() => {
        console.log(prevTetCoords);
    }, [prevTetCoords]);

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
            <NextList sevenBag={sevenBag} tetrominoIndex={tetrominoIndex} />
        </div>
    );
};


export default GamePage;
