// Copyright(C) 2020 Shawn Hodgson
// Game example code from w3chools
// https://www.w3schools.com/graphics/game_intro.asp 
// https://www.w3schools.com/graphics/tryit.asp?filename=trygame_default_gravity
// Modified from the example to be more object oriented

'use strict';

import GameArea from "./GameArea.js"
import GameObject from "./GameObject.js"
import AI_Model from "./AI_Model.js"

export default class App{
    constructor(){
        this.gameSpeed = 20;
        this.highScore = 0;
        this.AIRun = 0;
        this.firstTime = true;
        this.init();
        this.eventHandlers();
    }

    init() {
        if(this.firstTime) {
            // Only initialize these once
            this.Score = new GameObject("30px", "Consolas", "black", 280, 40, "text");
            this.GameView = new GameArea();
            this.AI = new AI_Model();
            this.AI.createModel();
            this.firstTime = false;
        }
        // Reset the Game
        this.GamePiece = new GameObject(30, 30, "red", 10, 120);
        this.GamePiece.hasCrashed = false;
        this.Obstacles = [];
        this.AIRun++;
        this.updateUI();
        this.GameView.frameNo = 0;
        this.GameView.clear();
        this.isPaused = false;

        
        // Start Game update
        this.updateGameSpeed();
    }

    eventHandlers() {
        document.querySelector("#game-speed").addEventListener("change", event =>{
            this.updateGameSpeed();
        });

        document.querySelector("#pause-btn").addEventListener("click", event =>{
            clearInterval(this.Interval);
            if(this.isPaused) {
                this.Interval = setInterval( () => {
                    this.update( this.GamePiece, this.GameView, this.Obstacles, this.Score, this.AI )
                }, this.gameSpeed);
                this.isPaused = false;
                return;
            }
            this.isPaused = true;
        });
    }

    //Game Update 
    update( GamePiece, GameView, Obstacles, Score, AI ) {    
        for (let i = 0; i < Obstacles.length; i += 1) {
            if(Obstacles[i].x <= -10){
                Obstacles.shift();
            }
            if (GamePiece.crashWith(Obstacles[i])) {
                // Restart game and update TF model
                this.restartGame();
                return;
            } 
        }
        GameView.clear();
        GameView.frameNo += 1;
        if (GameView.frameNo == 1 || this.everyinterval(150)) {
            GameView.createNewObstacles(Obstacles);
        }
        for (let i = 0; i < Obstacles.length; i += 1) {
            Obstacles[i].x += -1;
            Obstacles[i].update(GameView.context);
        }
        Score.text="SCORE: " + GameView.frameNo;
        Score.update(GameView.context);
        AI.getState(GamePiece, Obstacles, GamePiece.doAddData)
        GamePiece.doNewAction(AI)
        GamePiece.newPos(GameView);
        GamePiece.update(GameView.context);
    }

    updateGameSpeed() {
        if(!this.GamePiece.hasCrashed) {
            this.gameSpeed = document.querySelector("#game-speed").value;
            clearInterval(this.Interval)
    
            this.Interval = setInterval( () => {
                this.update( this.GamePiece, this.GameView, this.Obstacles, this.Score, this.AI )
            }, this.gameSpeed);
        }
    }

    updateUI() {
        if (this.GameView.frameNo > this.highScore) { this.highScore = this.GameView.frameNo; }
        document.querySelector("#highscore").innerHTML = `Highscore: ${this.highScore}`;
        document.querySelector("#run-log").innerHTML = `Run Number: ${this.AIRun}`
    }

    restartGame() {
        clearInterval(this.Interval)
        this.GamePiece.hasCrashed = true;
        
        // Grabbing the current state to update AI
        this.AI.getState(this.GamePiece, this.Obstacles);
        this.AI.updateModel();
        setTimeout(() => {
            this.init();
        }, 1000);
        return;
    } 

    everyinterval(n) {
        if ((this.GameView.frameNo / n) % 1 == 0) {return true;}
        return false;
    }
}