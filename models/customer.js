/**
 * Created by SaddeM on 28/12/2017.
 */

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CustomerSchema = new Schema({
    "email" : { type : String , required : true,
        validate: {
            validator: function(v) {
                return /(.+)@(.+){2,}\.(.+){2,}/.test(v);
            },
            message: '{VALUE} is not a valid email!'
        }},
    "telephone" : { type : String , maxlength: 50},
    "winner" : { type : Boolean },
    "created_at": {type: Date, default: Date.now}
});


module.exports = mongoose.model('customers', CustomerSchema);