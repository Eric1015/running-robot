// Load in the required modules
const Materials = require('Materials');
const Scene = require('Scene');
const Diagnostics = require('Diagnostics');
const TouchGestures = require('TouchGestures');
const NativeUI = require('NativeUI');
const Textures = require('Textures');

function scale(object){
    object.transform.scaleX = 8;
    object.transform.scaleY = 8;
    object.transform.scaleZ = 8;

    object.transform.z = -0.5;
    object.transform.y = 0.2;
}



function controlUI(){
    Promise.all([
        Scene.root.findByPath('**/canvas0/plane*'),
        Scene.root.findByPath('planeTracker0/*'),
    ]).then(function(results){
        const planes = results[0];
        Diagnostics.log(planes[0].getMaterial());
        const objects = results[1];

        Diagnostics.log('Start');

        // Diagnostics.log(objects[0]);
        objects[0].cameraVisibility.forBackCamera = false;
        objects[1].cameraVisibility.forBackCamera = false;
        objects[2].cameraVisibility.forBackCamera = false;
        // Diagnostics.log("!");
        scale(objects[0]);
        scale(objects[1]);
        scale(objects[2]);

        for(let i = 0; i < objects.length; i++){
            TouchGestures.onTap(planes[i]).subscribe(function (gesture) {
                // Diagnostics.log("Tap!")
                for(let j = 0; j < objects.length; j++){
                    if(j === i){
                        objects[i].cameraVisibility.forBackCamera = true;        
                    } else {
                        objects[j].cameraVisibility.forBackCamera = false;
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