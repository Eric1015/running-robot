// How to load in modules
const Scene = require('Scene');
// Use export keyword to make a symbol available in scripting debug console
const Diagnostics = require('Diagnostics');
//for boolean reaction
const Reactive = require('Reactive');

function changeAppearance(){
  Promise.all([
    Scene.root.findFirst('Diamond')
  ]).then(function(results){
    const diamond = results[0];
    Diagnostics.log("Start");
    
    // Diagnostics.log(diamond.cameraVisibility);
    //control the locaiton of object
    let x_ax, y_ax, z_ax;
    x_ax = 0;
    y_ax = 0;
    z_ax = -1;
    
    diamond.transform.x = x_ax;
    diamond.transform.y = y_ax;
    diamond.transform.z = z_ax;
    
    
    // control the visibility of object
    let x, y;
    x = 3; y = 2;
    if((x+y) % 2 === 0){
      diamond.cameraVisibility.forBackCamera = false;
    }
    
    Diagnostics.log("Finish the visibility of object");
  });
}

module.exports = {
  changeAppearance
};