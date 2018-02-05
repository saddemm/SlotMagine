/**
 * Created by SaddeM on 28/12/2017.
 */

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ConfigSchema = new Schema({
    "email_text" : { type : String},
    "restriction" : { type : Boolean}

});


module.exports = mongoose.model('configs', ConfigSchema);