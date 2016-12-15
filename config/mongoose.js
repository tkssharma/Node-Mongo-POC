var config = require('./config.js'),
    mongoose = require('mongoose');
//MONGOOSE.connect(process.env.MONGOLAB_URI || self.config.WEBSERVER.DBURI);
module.exports = function() {


    // Create the database connection
    var db = mongoose.connect(process.env.MONGOLAB_URI || config.db);

    // When successfully connected
    mongoose.connection.on('connected', function() {
        console.log('Mongoose default connection open to ' + config.db);
    });

    // If the connection throws an error
    mongoose.connection.on('error', function(err) {
        console.log('Mongoose default connection error: ' + err);
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', function() {
        console.log('Mongoose default connection disconnected' + config.db);
    });

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', function() {
        mongoose.connection.close(function() {
            console.log('Mongoose default connection disconnected through app termination' + config.db);
            process.exit(0);
        });
    });
   
    return db;
}