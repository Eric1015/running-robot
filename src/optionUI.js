// Load in the required modules
const Materials = require('Materials');
const Scene = require('Scene');
const Diagnostics = require('Diagnostics');
const TouchGestures = require('TouchGestures');
const NativeUI = require('NativeUI');
const Textures = require('Textures');
const CameraInfo = require('CameraInfo');

function scale(object){
    object.transform.scaleX = 8;
    object.transform.scaleY = 8;
    object.transform.scaleZ = 8;

    object.transform.z = -0.5;
    object.transform.y = 0.3;
}

function captureHidden(planes, buttons, hiddenplane){
    for(let i = 0; i < planes.length; i++){
        planes[i].hidden = hiddenplane;
        buttons[i].hidden = hiddenplane;
    }
}



function controlUI(){
    Promise.all([
        Scene.root.findByPath('**/canvas0/plane*'),
        Scene.root.findByPath('planeTracker0/*')
    ]).then(function(results){
        const planes = results[0];
        const objects = results[1];
        const buttons = [];
        for(let i = 0; i < planes.length; i++){
            buttons.push(planes[i].find('button' + i));
        }

        Diagnostics.log('Start');

        // set default value of visibility of objects
        objects[0].cameraVisibility.forBackCamera = false;
        objects[1].cameraVisibility.forBackCamera = false;
        objects[2].cameraVisibility.forBackCamera = false;

        buttons[0].cameraVisibility.forBackCamera = false;
        buttons[1].cameraVisibility.forBackCamera = false;
        buttons[2].cameraVisibility.forBackCamera = false;
        // set the default scale value for each objects
        scale(objects[0]);
        scale(objects[1]);
        scale(objects[2]);

        // Hide the plane when capturing a photo or recording a video
        // Store references to the photo capture and video recording boolean signals
        const isCapturingPhoto = CameraInfo.isCapturingPhoto;
        const isRecordingVideo = CameraInfo.isRecordingVideo;
        
        // Create a boolean signal that returns true if either boolean sign
        const hidePlane = isCapturingPhoto.or(isRecordingVideo);
        captureHidden(planes, buttons, hidePlane);

        //change the visibility by touhch
        let oldIndex;


        for(let i = 0; i < objects.length; i++){
            TouchGestures.onTap(planes[i]).subscribe(function (gesture) {
                // Diagnostics.log("Tap!")
                // if(oldIndex === undefined){
                //     objects[i].cameraVisibility.forBackCamera = true;
                //     oldIndex = i;
                // } else if (oldIndex !== i){
                //     objects[oldIndex].cameraVisibility.forBackCamera = false;
                //     objects[i].cameraVisibility.forBackCamera = true;
                //     oldIndex = i;
                // } else {
                //     objects[oldIndex].cameraVisibility.forBackCamera = false;
                //     oldIndex = i;
                // }
                for(let j = 0; j < objects.length; j++){
                    if(i === j){
                        objects[i].cameraVisibility.forBackCamera = true;
                        buttons[i].cameraVisibility.forBackCamera = true;
                    } else {
                        objects[j].cameraVisibility.forBackCamera = false;
                        buttons[j].cameraVisibility.forBackCamera = false;
                    }
                }
            });
        }

        Diagnostics.log('Finish');
    })
}

module.exports = {
    controlUI
}