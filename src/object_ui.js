// Load in the required modules
const Materials = require('Materials');
const Scene = require('Scene');
const Diagnostics = require('Diagnostics');
const TouchGestures = require('TouchGestures');

function scale(objects){
    for(let i = 0; i < objects.length; i++){
        objects[i].transform.scaleX = 8;
        objects[i].transform.scaleY = 8;
        objects[i].transform.scaleZ = 8;
    
    
        // decide the location of diamond
        objects[i].transform.z = -1;

        objects[i].cameraVisibility.forBackCamera = false;
    }
}
function scale_plane(planes){
    for(let i = 0; i < planes.length; i++){
        planes[i].transform.scaleX = 0.6;
        planes[i].transform.scaleY = 0.6; 
    }
}

function objectUI(){
    Promise.all([
        Scene.root.findByPath('planeTracker0/*'),
        Scene.root.findByPath('planeTracker0/*/plane')
    ]).then(function(results){
        Diagnostics.log("Start!");
        const objects = results[0];
        const planes = results[1];
        // Diagnostics.log(planes[0].transform.scaleX);

        scale(objects);
        scale_plane(planes);
        // Subscribe to tap gestures on the plane
        TouchGestures.onTap().subscribe(function (gesture) {
            // Diagnostics.log("Tap!")
            objects[0].cameraVisibility.forBackCamera = true;
        });

        // Translate the position of the finger on the screen to the plane's
        // co-ordinate system
        for(let i = 0; i < planes.length; i++){
            const planeTransform = planes[i].transform;
            TouchGestures.onPan(planes[i]).subscribe(function (gesture) {
                const gestureTransform = Scene.unprojectToFocalPlane(gesture.location);
    
                planeTransform.x = gestureTransform.x;
                planeTransform.y = gestureTransform.y;    
            });
        }

        // Subscribe to rotation gestures on the plane
        for(let i = 0; i < planes.length; i++){
            TouchGestures.onRotate(planes[i]).subscribe(function (gesture) {
                const planeTransform = planes[i].transform;
                // Store the last known y-axis rotation value of the plane
                const lastRotationY = planeTransform.rotationY.pinLastValue();
            
                // Update the z-axis rotation of the plane by adding the gesture rotation and
                // multiply it by -1 to have it rotate in the correct direction
                planeTransform.rotationY = gesture.rotation.mul(-1).add(lastRotationY);
            
            });
        }
        Diagnostics.log('Finish!');
    });
}

module.exports = {
    objectUI
}