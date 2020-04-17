// Copyright(C) 2020 Shawn Hodgson

'use strict'

export default class TrainingData {

    constructor(){
        this.inputs = [];
        this.labels = [];
    }

    normalizeState( curState ) {
        let newState = [];
        // Each index has a differnet min/max
        
        // last state 1-3
        newState.push( (curState[0] - 1)/(3 - 1) );

        // Distance form wall 0-439
        newState.push( curState[1]/439 );
        
        // Distance from gap -200-250
        newState.push( (curState[2] - (-200))/(250 - (-200)) );

        // Don't have to normalize since its either 1 or 0
        newState.push( curState[3] );

        return newState;
    }

    addNewData( normState, desiredOutput ) {
        this.inputs.push( normState )
        this.labels.push( desiredOutput )
    }

}