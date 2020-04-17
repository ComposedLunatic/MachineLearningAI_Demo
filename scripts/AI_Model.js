// Copyright(C) 2020 Shawn Hodgson

'use strict'
// import nFetch from "./node-fetch"
import TrainingData from "./TrainingData.js"
const _BUFFER = 2;

export default class AIModel{
    constructor() {
        // Set the model
        this.AIModel = tf.sequential();

        // Data for model to train/predict
        this.normState = []; 

        this.trainingData = new TrainingData();
    }

    createModel() {  
        // Add a single hidden layer
        // Takes in [lastAction, Distance from wall, distance from gap, and if the AI is in the gap]
        this.AIModel.add(tf.layers.dense({
            inputShape: [4],
            activation: 'sigmoid',
            units: 6,
            shuffle: true,
            useBias: true
        }));
        
        // Add an output layer
        // Returns [up, down, and nothing] (0-1) values to determine action
        this.AIModel.add(tf.layers.dense({
            inputShape: [6],
            units: 3, 
            useBias: true
        }));

        // compile the model
        this.AIModel.compile({
            loss: 'meanSquaredError',
            optimizer: tf.train.adam(0.1)
        })
    }

    async updateModel() {
        await this.AIModel.fit(
           tf.tensor2d( this.trainingData.inputs ), 
           tf.tensor2d( this.trainingData.labels ), 
            { epochs: 2 });
    }

    // Predicts what the best action the AI should make is.
    predict() {
        return new Promise ((resolve,reject) => {
            let action = 0;
            let prediction = this.AIModel.predict(tf.tensor2d(this.normState, [1, 4]));
            let predictionData = prediction.data();

            predictionData.then((result) => {
                // move up
                if(result[0] > result[1] && result[0] > result[2]) {
                    action = 1;
                }
                // move down
                else if(result[1] > result[0] && result[1] > result[2]) {
                    action = 2;
                }
                // stay in place
                else if(result[2] > result[0] && result[2] > result[1]) {
                    action = 3;
                }

                resolve(action);
            });
        });
    }

    getState(AI, obstacleList, updateTData = false) {
        // Get distance from gap, if the AI is in the gap, and the desired output
       let stateValues = AI.calcStateValues(obstacleList, _BUFFER)

        // Normilize and store data
        this.normState = this.trainingData.normalizeState( 
            [stateValues.lastAction,
            stateValues.distFromWall,
            stateValues.distFromGap,
            stateValues.isInGap] );

        // Updating the TrainingData so AIModel has more to learn from
        if (updateTData) {
            this.trainingData.addNewData( this.normState, stateValues.desiredOutput );
        }
    }    
}