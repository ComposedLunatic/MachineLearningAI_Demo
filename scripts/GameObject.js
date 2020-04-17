// Copyright(C) 2020 Shawn Hodgson
// Game example code from w3chools
// https://www.w3schools.com/graphics/game_intro.asp 
// https://www.w3schools.com/graphics/tryit.asp?filename=trygame_default_gravity
// Modified from the example to be more object oriented

'use strict';

// Component Object
export default class component{
    constructor(width, height, color, x, y, type){
        // For the Score
        this.type = type;
        this.score = 0;

        // For obstacles and player
        this.width = width;
        this.height = height;
        this.color = color;
        this.speedX = 0;
        this.speedY = 0;    
        this.x = x;
        this.y = y;
        this.playerSpeed = 0;
        this.lastAction = 3;
        this.hasCrashed = false;

    }

    // Update method
    update(gameArea) {
        let ctx = gameArea;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = this.color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    accelerate(n) {
        this.playerSpeed = n;
        
    }

    newPos(gameArea) {
        this.x += this.speedX;
        this.y += this.speedY + this.playerSpeed;
        this.centerY = this.y + 15
        this.hitScreenBounds(gameArea);
    }

    // Method to keep Player in the canvas
    hitScreenBounds(GameArea) {
        let rockbottom = GameArea.canvas.height - this.height;
        if (this.y > rockbottom ) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
        else if (this.y < 0){
            this.y = 0;
            this.gravitySpeed = 0;
        }
    }
    // Crash method
    crashWith(otherobj) {
        let myright = this.x + (this.width);
        let mybottom = this.y + (this.height);
        let otherright = otherobj.x + (otherobj.width);
        let otherbottom = otherobj.y + (otherobj.height);
        let crash = true;
        if ((mybottom < otherobj.y) || (this.y > otherbottom) || (myright < otherobj.x) || (this.x > otherright)) {
            crash = false;
        }
        return crash;
    }


    // 
    // Functions I added for demo
    // 

    async doNewAction(AI) {
        let action = await AI.predict()

        // Could make a switch here but it's only 3 actions, seems overkill
        // Move up
        if (action == 1) {
            this.lastAction = 1;
            this.playerSpeed = -1.5;
        }
        // Move down
        else if (action == 2) {
            this.lastAction = 2;
            this.playerSpeed = 1.5;
        }
        // Don't move
        else if (action == 3) {
            this.lastAction = 3;
            this.playerSpeed = 0;
        }        
    }

    calcStateValues(obstacleList, _BUFFER) {
        // Get the x value for first wall
        let curObstacal = 0;
        let distFromWall = obstacleList[curObstacal].x - (this.x + this.width);

        let distFromGap = 0;
        let isInGap = false;
        let desiredOutput = [];

         // If value is negative, take this value, Player moves up
        if ((((obstacleList[curObstacal + 1].y) - (this.y + this.height)) < -_BUFFER)){
            distFromGap = (Math.round((obstacleList[curObstacal + 1].y) - (this.y + this.height)));
            desiredOutput = [1, 0, 0];
        }
        // If value is positive, take this value, Player moves down
        else if ((((obstacleList[curObstacal].height) - this.y) >  _BUFFER)){
            distFromGap = Math.round((obstacleList[curObstacal].height) - this.y);
            desiredOutput = [0, 1, 0];
        }
        // Otherwise Player is in the gap
        else { 
            isInGap = true;
            desiredOutput = [0, 0, 1];
        }

        return {
            lastAction: this.lastAction,
            distFromWall: distFromWall,
            distFromGap: distFromGap,
            isInGap: isInGap,
            desiredOutput: desiredOutput
        }
    }
}