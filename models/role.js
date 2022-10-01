const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    organizername:{
        type: String,
        required:true
    },
    competition:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    teammembers:{
        type:Number,
        required:true
    }
});

RoleSchema.virtual('url').get(function(){
    return '/dashboard/role/' + this._id;
});

module.exports = mongoose.model('role',RoleSchema);