/**
 * Created by sidhu on 12/14/2016.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
//autoIncrement = require('mongoose-auto-increment');

var datalayerSchema = new Schema({
    dataLayer: String,
    reParamKeyVal: String,
    dataLayerName: String,
    projectId: String
});
module.exports = mongoose.model('dataLayer', datalayerSchema);