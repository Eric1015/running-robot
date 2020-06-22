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
                Patches.setBooleanValue('myBoolean', myBoolean);
                const intervalTimer = Time.setInterval(function(){
                    objectTransform.x = Reactive.val(objectTransform.x.pinLastValue() + 0.01);
                }, timeInMilliseconds_1);
                const timeoutTimer = Time.setTimeout(function(){
                    Time.clearInterval(intervalTimer);
                    myBoolean = false;
                    Patches.setBooleanValue('myBoolean', myBoolean);
                    isGameOver();
                }, 200);
            } else if(i === 1){
                // left
                left(objectTransform);
                let myBoolean = true;
                Patches.setBooleanValue('myBoolean', myBoolean);
                const intervalTimer = Time.setInterval(function(){
                    objectTransform.x = Reactive.val(objectTransform.x.pinLastValue() - 0.01);
                }, timeInMilliseconds_1);
                const timeoutTimer = Time.setTimeout(function(){
                    Time.clearInterval(intervalTimer);
                    myBoolean = false;
                    Patches.setBooleanValue('myBoolean', myBoolean);
                    isGameOver();
                }, 200);
            } else {
                // forward
                forward(objectTransform);
                let myBoolean = true;
                Patches.setBooleanValue('myBoolean', myBoolean);
                const intervalTimer = Time.setInterval(function(){
                    objectTransform.z = Reactive.val(objectTransform.z.pinLastValue() - 0.01);
                }, timeInMilliseconds_1);
                const timeoutTimer = Time.setTimeout(function(){
                    Time.clearInterval(intervalTimer);
                    myBoolean = false;
                    Patches.setBooleanValue('myBoolean', myBoolean);
                    isGameOver();
                }, 200);
            }
        });
    }
}


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
                    objectTransform.x = Reactive.val(objectTransform.x.pinLastValue() + 0.03)
                }, timeInMilliseconds);
                isGameOver();
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
                    objectTransform.x = Reactive.val(objectTransform.x.pinLastValue() - 0.03)
                }, timeInMilliseconds);
                isGameOver();
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
                    objectTransform.z = Reactive.val(objectTransform.z.pinLastValue() - 0.03)
                }, timeInMilliseconds);
                isGameOver();
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
        Scene.root.findFirst('Argon'),
        Scene.root.findByPath('**/canvas1/road*'),
        Scene.root.findFirst('command'),
    ]).then(function (results) {
        Diagnostics.log("GOT HERE")
        const object = results[0];
        const roads = results[1];
        const command = results[2];

        let isOnRoad = false;
        for (let road of roads) {
            if (object.transform.x >= road.transform.x - 250 && object.transform.x <= road.transform.x + 250 && object.transform.y >= road.transform.y - 250 && object.transform.y <= road.transform.y) {
                isOnRoad = true;
                break;
            }
        }
        // it is game over if isOnRoad is false
    })
}


function command(){
    Promise.all([
        Scene.root.findFirst('Argon'),
        Scene.root.findByPath('**/canvas0/command/*')
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