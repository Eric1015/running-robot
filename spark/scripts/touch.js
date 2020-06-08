// How to load in modules
const Scene = require('Scene');
const Materials = require('Materials');
// Use export keyword to make a symbol available in scripting debug console
const Diagnostics = require('Diagnostics');
const TouchGestures = require('TouchGestures');


function setDiamond(){
    // Locate the plane in the Scene
    Promise.all([
        Scene.root.findFirst('Diamond'),
        Scene.root.findFirst('planeTracker0'),
        Scene.root.findFirst('plane0')
    ]).then(function(results){
        const diamond = results[0];
        const plane_track = results[1];
        const plane = results[2];
        Diagnostics.log('Start');
        // diamond.cameraVisibility.forBackCamera = false;
        // make size of diamond
        diamond.transform.scaleX = 8;
        diamond.transform.scaleY = 8;
        diamond.transform.scaleZ = 8;

        diamond.transform.rotationX = -3.2;

        // decide the location of diamond
        diamond.transform.z = -1;

        // Subscribe to tap gestures on the plane
        const material = Materials.get('Diamond_mat');
        TouchGestures.onTap(diamond).subscribe(function (gesture) {

            diamond.cameraVisibility.forBackCamera = false;
        
        });

        // Diagnostics.log(diamond.transform);

        Diagnostics.log('Finish');
    });
}

module.exports = {
    setDiamond
};