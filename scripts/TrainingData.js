// Copyright(C) 2020 Shawn Hodgson

'use strict'

export default class TrainingData {

    constructor(){
        this.inputs = [];
        this.labels = [];
    }

    normalizeState( curState ) {
        let newState = [];
        // Normalizing values to increase accuracy of model
        // Formula I'm using is x = (CurrentValue - MinValue)/(MaxVal - MinVal)
        // Distance form wall 0-439
        newState.push( curState[0]/439 );
        // Distance above Gap 0 - 200
        newState.push( (curState[1]/200) );
        // Distance below Gap 0 - 200
        newState.push( (curState[2]/200) );
        // Don't have to normalize since its either 1 or 0
        newState.push( curState[3] );

        return newState;
    }

    addNewData( normState, desiredOutput ) {
        this.inputs.push( normState )
        this.labels.push( desiredOutput )
    }
}