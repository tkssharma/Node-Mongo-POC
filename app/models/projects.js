/**
 * Created by sidhu on 12/13/2016.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
//autoIncrement = require('mongoose-auto-increment');

var ProjectSchema = new Schema({
    projectTitle: String,
    country: String,
    businesUnit: String,
    application: String
});

module.exports = mongoose.model('Project', ProjectSchema);
