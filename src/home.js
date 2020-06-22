// Load in the required modules
const Scene = require('Scene');
const Diagnostics = require('Diagnostics');
const TouchGestures = require('TouchGestures');

function home(){
    Promise.all([
        Scene.root.findFirst('start_button'),
        Scene.root.findFirst('home_text'),
        Scene.root.findFirst('command'),
        Scene.root.findByPath('planeTracker0/Argon'),
        Scene.root.findByPath('**/canvas0/Argon_home')
    ]).then(function(results){
        const start = results[0];
        const home_txt = results[1];
        const command = results[2];
        const ojbect = results[3][0];
        const object_home = results[4][0];

        //touch start button, game start (hide home page, command and road appear)
        TouchGestures.onTap(start).subscribe(function(gesture){
            start.hidden = true;
            home_txt.hidden = true;
            command.hidden = false;
            ojbect.hidden = false;
            object_home.hidden = true;
        });

        //determine the position of object
        ojbect.transform.x = 0;
        ojbect.transform.y = 0;
        ojbect.transform.z = -0.25;
    });
}

module.exports = {
    home
}