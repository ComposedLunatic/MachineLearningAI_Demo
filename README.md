# Machine Learning Game Demo

A simple Flappy Bird-esque game that uses Tensorflow.js to learn and get better as it plays.

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/en/)

### Installing

1. Clone repo or download zip file.
2. Run `npm install` in the project directory.
```
    c:\<someFolder>\<anotherFolder>\demoClone>npm install
```
3. Run `npm run serve` to start up the server.
```
    c:\<someFolder>\<anotherFolder>\demoClone>npm run serve
```
4. Go to [localhost:3000](http://localhost:3000) in your web browser.

## How it works
 
The AI has 3 actions that it can take: move up, move down and don't move (do nothing). It decides on which action to take by taking into account the last action taken, the AI's distance from the wall, the AI's distance from the gap and
if the AI is currently in the gap. Everytime the AI wants to move it takes in all this information and uses the AI Model to predict the best action it should take. The AI model gets updated at the end of every run, the data to update the model is gathered everytime an obstacle is spawned and when the AI crashes. On average the AI gets "good" at the game around the 60 run mark.

## Authors

* **Shawn Hodgson** - *Initial work* - [My github](https://github.com/ComposedLunatic)

## Acknowledgments

* **W3Schools** - Game example code from w3chools:
    [Game Demo page](https://www.w3schools.com/graphics/game_intro.asp) 
    [Code Demo page](https://www.w3schools.com/graphics/tryit.asp?filename=trygame_default_gravity)

