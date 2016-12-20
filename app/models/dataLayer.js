/**
 * Created by sidhu on 12/14/2016.
 */
var mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence');

var Schema = mongoose.Schema;
//autoIncrement = require('mongoose-auto-increment');

var datalayerSchema = new Schema({
    dataLayer: String,
    reqParamKeyVal: String,
    dataLayerName: String,
    projectId: String
});

datalayerSchema.plugin(AutoIncrement, { inc_field: 'pid' });

module.exports = mongoose.model('dataLayer', datalayerSchema);