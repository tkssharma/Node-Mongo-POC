/*jshint multistr: true ,node: true*/
"use strict";

var

    ERROR = require('./error');

// validate the authentication header
exports.validateAuthHeader = function(config) {
    return function(req, res, next) {
        if (req.headers["x-auth-id"] !== config.AUTH_ID) {
            return ERROR({ status: 404 }, req, res);
        }
        return next();
    };
};
// add middleware if needed 
exports.homePage = function(config) {

    return function(req, res, next) {

        next();
    };
};
