// Load in the required modules
const Scene = require('Scene');
const Diagnostics = require('Diagnostics');
const TouchGestures = require('TouchGestures');
const Reactive = require('Reactive');

function resetObject(object){
    //determine the position of object
    object.transform.x = 0;
    object.transform.y = -0.08;
    object.transform.z = 0;

    object.transform.rotationY = Reactive.acos(-1);
}

function home(){
    Promise.all([
        Scene.root.findFirst('start_button'),
        Scene.root.findFirst('home_text'),
        Scene.root.findFirst('command'),
        Scene.root.findByPath('planeTracker0/Argon'),
        Scene.root.findByPath('**/canvas0/Argon_home'),
        Scene.root.findByPath('**/canvas1/road*'),
        Scene.root.findFirst('gameover'),
    ]).then(function(results){
        const start = results[0];
        const home_txt = results[1];
        const command = results[2];
        const ojbect = results[3][0];
        const object_home = results[4][0];
        const roads = results[5];
        const gameover = results[6];

        //touch start button, game start (hide home page, command and road appear)
        TouchGestures.onTap(start).subscribe(function(gesture){
            start.hidden = true;
            home_txt.hidden = true;
            command.hidden = false;
            ojbect.hidden = false;
            object_home.hidden = true;
            gameover.hidden = true;
            let currentX = 0;
            let currentY = -500;
            let roadsArray = generateRandomArray(9);
            Diagnostics.log(roadsArray);
            roadsArray.forEach((roadNumber, i) => {
                if (roadNumber === 0) {
                    currentY += 500;
                } else if (roadNumber === 1) {
                    currentX -= 500;
                } else if (roadNumber === 2) {
                    currentX += 500;
                }
                roads[i].transform.x = currentX;
                roads[i].transform.y = currentY;
            })
            roads.forEach((road) => {
                road.hidden = false;
            })

            resetObject(ojbect);
        });
    });
}

function generateRandomArray(totalSteps) {
    let randomArray = [0, 0, 0, 1, 2]
    let randomArray_1 = [0, 0, 0, 1]
    let randomArray_2 = [0, 0, 0, 2]
    let result = [0]
    while(result.length < totalSteps) {
        let lastNumber = result[result.length - 1]
        let secondLastNumber = 0;
        if (result.length > 1) {
            secondLastNumber = result[result.length - 2]
        }
        let nextNumber = 0;
        if (lastNumber === 0 && secondLastNumber === 0) {
            nextNumber = randomArray[Math.floor(Math.random() * randomArray.length)];
        } else if (lastNumber === 0 && secondLastNumber === 1) {
            nextNumber = randomArray_1[Math.floor(Math.random() * randomArray_1.length)];
        } else if (lastNumber === 0 && secondLastNumber === 2) {
            nextNumber = randomArray_2[Math.floor(Math.random() * randomArray_2.length)];
        } else if (lastNumber === 1) {
            nextNumber = randomArray_1[Math.floor(Math.random() * randomArray_1.length)];
        } else if (lastNumber === 2) {
            nextNumber = randomArray_2[Math.floor(Math.random() * randomArray_2.length)];
        }
        result.push(nextNumber)
    }
    return result
}

module.exports = {
    home
}