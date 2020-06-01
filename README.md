# Tennis Scoreboard
Simple tennis multiplayer game (frontend),
Before running this game, you also need to run the backend found [here](https://github.com/krzykus/Tennis-backend).

## How to run
1. Clone both repos
2. In the backend folder run: `node server.js`
3. In the frontend folder run: `npm start`

## Rules of the game

First player to join will start and be the "attacking side" and will chose where to serve (Left or Right)
Second player to join will be the "defending side" and will chose where to defend (Left or Right)
After both players chosen the side then the game will check:

If both sides chosen the same side (i.e Left-Left) then the game continues and the roles reverse.
If both sides chosen differently (i.e Left-Right) then the attacking side scores.

Scoring follows the rules of tennis.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).