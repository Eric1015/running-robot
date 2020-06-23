// Load in the required modules
const Scene = require('Scene');
const Diagnostics = require('Diagnostics');
const Home = require('./home.js');
const Command = require('./command.js');

//Default setting (hide command and rooad)
const command = Scene.root.find('command');
command.hidden = true;
const object = Scene.root.find('Argon');
object.hidden = true;
const goal = Scene.root.find('goal');
goal.hidden = true;

//make home page
Home.home();

//load command module
Command.command();