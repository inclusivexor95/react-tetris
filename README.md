# Tetris with React.js

This project consists of a full stack web application (hosted [here](https://matt-react-tetris.herokuapp.com) on heroku) built with a React frontend, a Node/Express backend and data storage using MongoDB (aka the MERN stack). The core function of the webapp is a recreation of the classic game "Tetris" using React.js, in addition to user signup/login/highscore tracking functions using the backend.

## Game Background

Tetris is a tile-matching video game created by Russian software engineer Alexey Pajitnov in 1984. It has been published by several companies, most prominently during a dispute over the appropriation of the game's rights in the late 1980s. After a significant period of publication by Nintendo, the rights reverted to Pajitnov in 1996, who co-founded The Tetris Company with Henk Rogers to manage Tetris licensing.

In Tetris, players must complete lines by moving differently shaped pieces (tetrominoes), which descend onto the playing field. The completed lines disappear and grant the player points, and the player can proceed to fill the vacated spaces. The game ends when the playing field is filled. The longer the player can delay this inevitable outcome, the higher their score will be. In multiplayer games, the players must last longer than their opponents, and in certain versions, players can inflict penalties on opponents by completing a significant number of lines. Some adaptations have provided variations to the game's theme, such as three-dimensional displays or a system for reserving pieces.

## Website Guide

When the URL (https://matt-react-tetris.herokuapp.com) is initially loaded, a simple landing page is displayed.

![Landing page screenshot](/public/assets/images/landingScreenshot.png)

At the top left and top right are the "Create an Account" and "Log In" buttons, which take you to their respective form pages. Once a user has created an account/logged in, the user's name and a "Log Out" button are shown instead. In the center is the "Play" button, which takes you to the game page.

![Game page screenshot](/public/assets/images/gameStartScreenshot.png)

The displayed central component is where the game can be played after clicking the "Start" button. When the game starts, music will play, however it can be muted by clicking on the grey volume icon under the column shaped component on the left. The other grey icon shaped like a target links to the highscores page.

## Playing the Game

When the game is started, a coloured piece or "Tetromino" will fall from the top of the central component/game board. Six similar pieces will populate the column component on the right, under the "Next" header. These Tetrominoes will spawn next in the same order (from top to bottom).

![Screenshot of game being played](/public/assets/images/gamePlayScreenshot.png)

When the Tetrominoes collide with each other or the bottom of the game board they lock into position. The game ends when the Tetrominoes stack too high so as to touch the top of the game board. The object of the game is to last as long as possible without that happening by using the keyboard controls to move the active (falling) Tetromino into different positions.

### Keyboard Controls

| Action | Key | Action | Key |
| --- | --- | --- | --- |
| Left Shift | Left Arrow | Soft Drop | Down Arrow |
| Right Shift | Right Arrow | Hard Drop | Space |
| Rotate Clockwise | X or Up Arrow | Hold | C or Shift |
| Rotate Counterclockwise | Z or Ctrl | Pause | Esc or F1 | 

Additionally, when multiple Tetrominoes are arranged to form a horizontal line, that line disappears, and everything above it falls down, allowing a skilled user to last almost indefinitely. When a line is cleared (as well as when soft and hard drops are performed), the user scores points. More points are scored the higher the game's level, and also when multiple lines are cleared at the same time. Both the current level and score are shown in the left column component.

Level can be increased by clearing a set number of lines (10 lines for level 1, 20 for level 2, 30 for level 3, etc.). However, in addition to scoring more points, increasing the level also causes the game (and music) to speed up, increasing the difficulty.

### Glossary

**Tetromino:** the coloured pieces that that make up the game of Tetris. Each Tetromino is a different configuration of four squares, known as "Minoes".

**Left/Right Shift:** moves the Tetromino sideways by 1 square.

**Soft Drop:** greatly increases the Tetromino's falling speed while the button is held.

**Hard Drop:** instantly transports the Tetromino downward and locks it into place.

**Hold:** swaps the active (falling) Tetromino with the currently held Tetromino. If there is no currently held Tetromino, the active Tetromino will still be held, and the next Tetromino in the right column component will be used. The black box labeled "Hold" in the left column component displays the currently held Tetromino.
