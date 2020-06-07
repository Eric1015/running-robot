/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 */

//==============================================================================
// Welcome to scripting in Spark AR Studio! Helpful links:
//
// Scripting Basics - https://fb.me/spark-scripting-basics
// Reactive Programming - https://fb.me/spark-reactive-programming
// Scripting Object Reference - https://fb.me/spark-scripting-reference
// Changelogs - https://fb.me/spark-changelog
//
// For projects created with v87 onwards, JavaScript is always executed in strict mode.
//==============================================================================

// How to load in modules
const Scene = require('Scene');
// Use export keyword to make a symbol available in scripting debug console
const Diagnostics = require('Diagnostics');
//for boolean reaction
const Reactive = require('Reactive');

Promise.all([
  Scene.root.findFirst('Diamond'),
  Scene.root.findFirst('planeTracker')
]).then(function(results){
  const diamond = results[0];
  const planetracker = results[1];
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



// To use variables and functions across files, use export/import keyword
// export const animationDuration = 10;

// Use import keyword to import a symbol from another file
// import { animationDuration } from './script.js'

// To access scene objects
// const directionalLight = Scene.root.find('directionalLight0');

// To access class properties
// const directionalLightIntensity = directionalLight.intensity;

// To log messages to the console
// Diagnostics.log('Console message logged from the script.');
