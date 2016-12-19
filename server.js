// server.js


// write API where i want to save project info and then add clinet to it 
// two collections 
// project    clients 

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var mongoose = require('./config/mongoose.js'),
    express = require('./config/express.js'),
    config = require('./config/config.js');

var app = express();
var mongoose = mongoose();

app.listen(process.env.PORT || config.port);
console.log("App Listning on port " + config.port);