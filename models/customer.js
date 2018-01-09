/**
 * Created by SaddeM on 28/12/2017.
 */

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CustomerSchema = new Schema({
    "firstname" : { type : String , maxlength: 30 , required : true},
    "lastname" : { type : String , maxlength: 30 , required : true},
    "company" : { type : String , maxlength: 30},
    "email" : { type : String , required : true, maxlength: 70,
        validate: {
            validator: function(v) {
                return /(.+)@(.+){2,}\.(.+){2,}/.test(v);
            },
            message: '{VALUE} is not a valid email!'
        }},
    "telephone" : { type : String , maxlength: 50},
    "winner" : { type : Boolean },
    "created_at": {type: String},
    "uniq" : { type : String , required : true}

});


module.exports = mongoose.model('customers', CustomerSchema);