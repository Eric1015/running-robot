// Load in the required modules
const Scene = require('Scene');
const Diagnostics = require('Diagnostics');
const TouchGestures = require('TouchGestures');
const Reactive = require('Reactive');
const Time = require('Time');
const Animation = require('Animation');
const Audio = require('Audio');

function switchAnimation(){
}

function moveTouch(command, object){
    const objectTransform = object.transform;
    for(let i = 0; i < command.length; i++){
        TouchGestures.onTap(command[i]).subscribe(function (gesture){
            if(i === 0){
                //right
                objectTransform.x = Reactive.val(objectTransform.x.pinLastValue() + 0.1);
            } else if(i === 1){
                // left
                objectTransform.x = Reactive.val(objectTransform.x.pinLastValue() - 0.1);
            } else {
                // forward
                objectTransform.z = Reactive.val(objectTransform.z.pinLastValue() - 0.1);
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
                const intervalTimer = Time.setInterval(function(){
                    objectTransform.x = Reactive.val(objectTransform.x.pinLastValue() + 0.03)
                }, timeInMilliseconds);
                gesture.state.monitor().subscribe(function (state) {
                    if(state.newValue === 'ENDED') {
                        Time.clearInterval(intervalTimer);
                    }
                });
            } else if(i === 1){
                // left
                const intervalTimer = Time.setInterval(function(){
                    objectTransform.x = Reactive.val(objectTransform.x.pinLastValue() - 0.03)
                }, timeInMilliseconds);
                gesture.state.monitor().subscribe(function (state) {
                    if(state.newValue === 'ENDED') {
                        Time.clearInterval(intervalTimer);
                    }
                });
            } else {
                // forward
                const intervalTimer = Time.setInterval(function(){
                    objectTransform.z = Reactive.val(objectTransform.z.pinLastValue() - 0.03)
                }, timeInMilliseconds);
                gesture.state.monitor().subscribe(function (state) {
                    if(state.newValue === 'ENDED') {
                        Time.clearInterval(intervalTimer);
                    }
                });
            }
        });
    }
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
    command,
    switchAnimation
}