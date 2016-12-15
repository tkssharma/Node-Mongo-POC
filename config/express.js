// modules =================================================
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');
var compress = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var config = require('./config')

//============================================================//

module.exports = function() {

    var app = express();

    // set our port
    var port = process.env.PORT || 8080;

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    // get all data/stuff of the body (POST) parameters
    // parse application/json
    app.use(bodyParser.json());

    // parse application/vnd.api+json as json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));

    // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
    app.use(methodOverride('X-HTTP-Method-Override'));


    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));


    // set the static files location /public/img will be /img for users
   // app.use(express.static(__dirname + '../public'));
    app.use(express.static('./public'));

    // routes ==================================================
    require('../app/routes')(app); // configure our routes

    // start app ===============================================
    // startup our app at http://localhost:8080

    return app;
}