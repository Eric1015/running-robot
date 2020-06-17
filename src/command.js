// Load in the required modules
const Scene = require('Scene');
const Diagnostics = require('Diagnostics');
const TouchGestures = require('TouchGestures');
const Reactive = require('Reactive');
const Time = require('Time');

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
const timeInMilliseconds = 500;
function movePress(command, object){
    const objectTransform = object.transform;
    for(let i = 0; i < command.length; i++){
        TouchGestures.onLongPress(command[i]).subscribe(function (gesture){
            if(i === 0){
                //right
                gesture.state.monitor().subscribe(function (state) {
                    if(state.newValue !== 'END') {
                        const intervalTimer = Time.setInterval(function(){
                            objectTransform.x = Reactive.val(objectTransform.x.pinLastValue() + 0.01);
                        }, timeInMilliseconds)
                    } else {
                        Time.clearInterval(intervalTimer);
                    }   
                });
            } else if(i === 1){
                // left
                gesture.state.monitor().subscribe(function (state) {
                });
            } else {
                // forward
                gesture.state.monitor().subscribe(function (state) {
                });
            }
        });
    }
}


function command(){
    Promise.all([
        Scene.root.findFirst('Diamond'),
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