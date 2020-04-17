// Copyright(C) 2020 Shawn Hodgson
// Game example code from w3chools
// https://www.w3schools.com/graphics/game_intro.asp 
// https://www.w3schools.com/graphics/tryit.asp?filename=trygame_default_gravity
// Modified from the example to be more object oriented

'use strict';
import GameObject from "./GameObject.js"

// Game area Object
export default class GameArea{
    // Create a html canvas
    constructor() {
       this.canvas = document.createElement("canvas");
       this.context = this.canvas.getContext("2d");
       this.canvas.width = 480;
       this.canvas.height = 270;
       document.body.insertBefore(this.canvas, document.body.childNodes[0]);
       this.frameNo = 0;
    }

    createNewObstacles(ObstacleList) {
        let x = this.canvas.width;
        let minHeight = 20;
        let maxHeight = 200;
        let height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        let minGap = 50;
        let maxGap = 150;
        let gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        ObstacleList.push(new GameObject(10, height, "green", x, 0));
        ObstacleList.push(new GameObject(10, x - height - gap, "green", x, height + gap));
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}