// Load in the required modules
const Materials = require('Materials');
const Scene = require('Scene');
const Diagnostics = require('Diagnostics');
const TouchGestures = require('TouchGestures');
const Reactive = require('Reactive');
const DeviceMotion = require('DeviceMotion');
const CameraInfo = require('CameraInfo');
const Instruction = require('Instruction');
const NativeUI = require('NativeUI');

function scale(objects){
    for(let i = 0; i < objects.length; i++){
        objects[i].transform.scaleX = 8;
        objects[i].transform.scaleY = 8;
        objects[i].transform.scaleZ = 8;
    
    
        // decide the location of diamond
        objects[i].transform.z = -1;

        // objects[i].transform.z = deviceWorldTransform.z;
        

        objects[i].cameraVisibility.forBackCamera = false;
    }
}
function objectmoveTouch(signs, objects, idx){
    //up, right, left, down
    const objectTransform = objects[idx].transform;
    for(let i = 0; i < signs.length; i++){
        TouchGestures.onTap(signs[i]).subscribe(function (gesture) {
            if(i === 0){
                //forward
                objectTransform.z = Reactive.val(objectTransform.z.pinLastValue() - 0.2);;
            } else if (i === 1){
                //right
                objectTransform.x = Reactive.val(objectTransform.x.pinLastValue() + 0.2);
            } else if (i === 2){
                //left
                objectTransform.x = Reactive.val(objectTransform.x.pinLastValue() - 0.2);
            } else if (i === 3) {
                //back
                objectTransform.z = Reactive.val(objectTransform.z.pinLastValue() + 0.2);
            } else if (i === 4){
                //up
                objectTransform.y = Reactive.val(objectTransform.y.pinLastValue() + 0.2);
            } else {
                //down
                objectTransform.y = Reactive.val(objectTransform.y.pinLastValue() - 0.2)
            }
        });
    }
}

const deviceWorldTransform = DeviceMotion.worldTransform;
const devicePosition = CameraInfo.captureDevicePosition;


function objectUI(){
    Promise.all([
        Scene.root.findByPath('planeTracker0/*'),
        Scene.root.findByPath('**/canvas0/rectangle_button'),
        Scene.root.findByPath('**/canvas0/rectangle0/*'),
        Scene.root.findFirst('rectangle0')
    ]).then(function(results){
        Diagnostics.log("Start!");
        const objects = results[0];
        const button = results[1][0];
        const direction_sign = results[2];
        const rectangle = results[3];
        // Diagnostics.log(direction_sign[0]);


        /**================ object control ==================== */
        scale(objects);
        // Subscribe to tap gestures on the plane
        TouchGestures.onTap().subscribe(function (gesture) {
            // Diagnostics.log("Tap!")
            objects[0].cameraVisibility.forBackCamera = true;
            direction_sign.forEach(function(sign){
                sign.hidden = true;
            });
            button.hidden = false;
            
        });
        const objectTransform = objects[0].transform;
        // Subscribe to rotation gestures on the plane
        TouchGestures.onRotate(objects[0]).subscribe(function (gesture) {
            // Store the last known y-axis rotation value of the plane
            const lastRotationY = objectTransform.rotationY.pinLastValue();
        
            // Update the z-axis rotation of the plane by adding the gesture rotation and
            // multiply it by -1 to have it rotate in the correct direction
            objectTransform.rotationY = gesture.rotation.mul(-1).add(lastRotationY);
        
        });

        /*==================== button UI ==================================*/
        direction_sign.forEach(function(sign){
            sign.hidden = true;
        });
        //command button to move object
        objectmoveTouch(direction_sign, objects, 0);
        // make appear for move command
        TouchGestures.onLongPress(button).subscribe(function (gesture) {
            Diagnostics.log("Long!")
            direction_sign.forEach(function(sign){
                sign.hidden = false;
            });
            button.hidden = true;
        });
        let sample_url = 'Type your location before share';
        NativeUI.setText('text0',sample_url)
        TouchGestures.onTap(button).subscribe(function (gesture){
            // Diagnostics.log('editext!')
            NativeUI.enterTextEditMode('text0');
        });
        NativeUI.getText('text0').monitor().subscribe(function(textUpdate){
            Diagnostics.log('You entered ' + textUpdate.newValue);  
        });

        Diagnostics.log('Finish!');
    });
}

module.exports = {
    objectUI
}