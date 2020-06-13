// Load in the required modules
const Materials = require('Materials');
const Scene = require('Scene');
const Diagnostics = require('Diagnostics');
const TouchGestures = require('TouchGestures');
const Reactive = require('Reactive');
const DeviceMotion = require('DeviceMotion');
const CameraInfo = require('CameraInfo');

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
        Scene.root.findByPath('**/canvas0/plane*'),
        Scene.root.findByPath('**/canvas0/rectangle*/*')
    ]).then(function(results){
        Diagnostics.log("Start!");
        const objects = results[0];
        const button = results[1][0];
        const direction_sign = results[2];
        // Diagnostics.log(direction_sign[0]);

        scale(objects);
        // Subscribe to tap gestures on the plane
        TouchGestures.onTap().subscribe(function (gesture) {
            // Diagnostics.log("Tap!")
            objects[0].cameraVisibility.forBackCamera = true;
        });

        // Translate the position of the finger on the screen to the plane's
        // co-ordinate system
        objectmoveTouch(direction_sign, objects, 0);

        // Subscribe to rotation gestures on the plane
        TouchGestures.onRotate(objects[0]).subscribe(function (gesture) {
            const objectTransform = objects[0].transform;
            // Store the last known y-axis rotation value of the plane
            const lastRotationY = objectTransform.rotationY.pinLastValue();
        
            // Update the z-axis rotation of the plane by adding the gesture rotation and
            // multiply it by -1 to have it rotate in the correct direction
            objectTransform.rotationY = gesture.rotation.mul(-1).add(lastRotationY);
        
        });
        Diagnostics.log('Finish!');
    });
}

module.exports = {
    objectUI
}