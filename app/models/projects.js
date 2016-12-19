/**
 * Created by sidhu on 12/13/2016.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var AutoIncrement = require('mongoose-sequence');


//mongoose.plugin(AutoIncrement);

var ProjectSchema = new Schema({
    projectTitle: String,
    country: String,
    businessUnit: String,
    application: String
});
ProjectSchema.plugin(AutoIncrement, { inc_field: 'id' });

module.exports = mongoose.model('Project', ProjectSchema);