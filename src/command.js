// Load in the required modules
const Scene = require('Scene');
const Diagnostics = require('Diagnostics');
const TouchGestures = require('TouchGestures');
const Reactive = require('Reactive');
const Time = require('Time');
const Patches = require('Patches');

function right(transform){
    transform.rotationY = Reactive.asin(1);
}
function left(transform){
    transform.rotationY = Reactive.asin(-1);
}
function forward(transform){
    transform.rotationY = Reactive.acos(-1);
}

const timeInMilliseconds_1 = 20;
function moveTouch(command, object){
    const objectTransform = object.transform;
    for(let i = 0; i < command.length; i++){
        TouchGestures.onTap(command[i]).subscribe(function (gesture){
            if(i === 0){
                //right
                right(objectTransform);
                let myBoolean = true;
                Patches.inputs.setBoolean('myBoolean', myBoolean);
                const intervalTimer = Time.setInterval(function(){
                    objectTransform.x = Reactive.val(objectTransform.x.pinLastValue() + 0.01);
                }, timeInMilliseconds_1);
                const timeoutTimer = Time.setTimeout(function(){
                    Time.clearInterval(intervalTimer);
                    myBoolean = false;
                    Patches.inputs.setBoolean('myBoolean', myBoolean);
                    isGoal();
                    isGameOver();
                }, 200);
            } else if(i === 1){
                // left
                left(objectTransform);
                let myBoolean = true;
                Patches.inputs.setBoolean('myBoolean', myBoolean);
                const intervalTimer = Time.setInterval(function(){
                    objectTransform.x = Reactive.val(objectTransform.x.pinLastValue() - 0.01);
                }, timeInMilliseconds_1);
                const timeoutTimer = Time.setTimeout(function(){
                    Time.clearInterval(intervalTimer);
                    myBoolean = false;
                    Patches.inputs.setBoolean('myBoolean', myBoolean);
                    isGoal();
                    isGameOver();
                }, 200);
            } else {
                // forward
                forward(objectTransform);
                let myBoolean = true;
                Patches.inputs.setBoolean('myBoolean', myBoolean);
                const intervalTimer = Time.setInterval(function(){
                    objectTransform.z = Reactive.val(objectTransform.z.pinLastValue() - 0.01);
                }, timeInMilliseconds_1);
                const timeoutTimer = Time.setTimeout(function(){
                    Time.clearInterval(intervalTimer);
                    myBoolean = false;
                    Patches.inputs.setBoolean('myBoolean', myBoolean);
                    isGoal();
                    isGameOver();
                }, 200);
            }
        });
    }
}

var gameClear = false;

const timeInMilliseconds = 50;
function movePress(command, object){
    for(let i = 0; i < command.length; i++){
        const objectTransform = object.transform;
        TouchGestures.onLongPress(command[i]).subscribe(function (gesture){
            if(i === 0){
                //right
                right(objectTransform);
                let myBoolean = true;
                Patches.setBooleanValue('myBoolean', myBoolean);
                const intervalTimer = Time.setInterval(function(){
                    objectTransform.x = Reactive.val(objectTransform.x.pinLastValue() + 0.03);
                    isGoal();
                    if(!gameClear){
                        // Diagnostics.log("object is not hidden");
                        isGameOver();
                    }
                }, timeInMilliseconds);
                gesture.state.monitor().subscribe(function (state) {
                    if(state.newValue === 'ENDED') {
                        Time.clearInterval(intervalTimer);
                        let myBoolean = false;
                        Patches.setBooleanValue('myBoolean', myBoolean);
                    }
                });
            } else if(i === 1){
                // left
                left(objectTransform);
                let myBoolean = true;
                Patches.setBooleanValue('myBoolean', myBoolean);
                const intervalTimer = Time.setInterval(function(){
                    objectTransform.x = Reactive.val(objectTransform.x.pinLastValue() - 0.03);
                    isGoal();
                    if(!gameClear){
                        // Diagnostics.log("object is not hidden");
                        isGameOver();
                    }
                }, timeInMilliseconds);
                gesture.state.monitor().subscribe(function (state) {
                    if(state.newValue === 'ENDED') {
                        Time.clearInterval(intervalTimer);
                        let myBoolean = false;
                        Patches.setBooleanValue('myBoolean', myBoolean);
                    }
                });
            } else {
                // forward
                forward(objectTransform);
                let myBoolean = true;
                Patches.setBooleanValue('myBoolean', myBoolean);
                const intervalTimer = Time.setInterval(function(){
                    objectTransform.z = Reactive.val(objectTransform.z.pinLastValue() - 0.03);
                    isGoal();
                    if(!gameClear){
                        // Diagnostics.log("object is not hidden");
                        isGameOver();
                    }
                }, timeInMilliseconds);
                gesture.state.monitor().subscribe(function (state) {
                    if(state.newValue === 'ENDED') {
                        Time.clearInterval(intervalTimer);
                        myBoolean = false;
                        Patches.setBooleanValue('myBoolean', myBoolean);
                    }
                });
            }
        });
    }
}


function isGameOver() {
    Promise.all([
        Scene.root.findByPath('planeTracker0/Argon'),
        Scene.root.findByPath('**/canvas1/road*'),
        Scene.root.findFirst('command'),
    ]).then(function (results) {
        // Diagnostics.log("GOT HERE")
        const object = results[0][0];
        const roads = results[1];
        const command = results[2];

        const objectTransform_x = object.transform.x.mul(1450).pinLastValue();
        const objectTransform_z = object.transform.z.mul(-1450).pinLastValue();

        let isOnRoad = false;
        for (let road of roads) {
            const road_x = road.transform.x.pinLastValue();
            const road_y = road.transform.y.pinLastValue();
            if (objectTransform_x >= road_x - 250 && objectTransform_x <= road_x + 250 && objectTransform_z >= road_y - 250 && objectTransform_z <= road_y + 250) {
                isOnRoad = true;
                break;
            }
        }
        // it is game over if isOnRoad is false
        if(!isOnRoad){
            gameOver();
        }
    })
}
function gameOver(){
    Promise.all([
        Scene.root.findByPath('planeTracker0/Argon'),
        Scene.root.findByPath('**/canvas1/road*'),
        Scene.root.findFirst('command'),
        Scene.root.findFirst('gameover'),
        Scene.root.findFirst('start_button'),
        Scene.root.findFirst('goal'),
    ]).then(function(results){
        const object = results[0][0];
        const roads = results[1];
        const command = results[2];
        const gameover = results[3];
        const start = results[4];
        const goal = results[5];

        object.hidden = true;
        roads.forEach(function(road){
            road.hidden = true;
        });
        command.hidden = true;
        gameover.hidden = false;
        start.hidden = false;
        goal.hidden = true;
    });
}

function isGoal() {
    Promise.all([
        Scene.root.findByPath('planeTracker0/Argon'),
        Scene.root.findFirst('canvas2'),
        Scene.root.findFirst('road7'),
    ]).then(function(results) {
        const object = results[0][0];
        const goal_tape = results[1];
        const lastRoad = results[2];

        const objectTransform_x = object.transform.x.mul(1450).pinLastValue();
        const objectTransform_z = object.transform.z.mul(-1450).pinLastValue();

        const goal_x = lastRoad.transform.x.pinLastValue();
        const goal_y = lastRoad.transform.y.pinLastValue();

        if (objectTransform_z >= goal_y + 200
            && objectTransform_x >= goal_x - 250 
            && objectTransform_x <= goal_x + 250
        ) {
            goal();
            gameClear = true;
        } else {
            gameClear = false;
        }
    });
}

function goal() {
    Promise.all([
        Scene.root.findByPath('planeTracker0/Argon'),
        Scene.root.findFirst('command'),
        Scene.root.findFirst('start_button'),
        Scene.root.findByPath('**/canvas1/road*'),
        Scene.root.findFirst('gameclear'),
    ]).then(function(results) {
        const object = results[0][0];
        const command = results[1];
        const startButton = results[2];
        const roads = results[3];
        const gameclear = results[4];

        object.hidden = true;
        command.hidden = true;
        startButton.hidden = false;
        roads.forEach(function(road){
            road.hidden = true;
        });
        gameclear.hidden = false;
    });
}


function command(){
    Promise.all([
        Scene.root.findFirst('Argon'),
        Scene.root.findByPath('**/canvas0/command/*'),
    ]).then(function (results){
        const object = results[0];
        const command = results[1];


        /**----------- Tap UI --------------------- */
        moveTouch(command, object);

        /**----------- LongPress UI --------------- */
        movePress(command, object);
    });
}

module.exports = {
    command
}