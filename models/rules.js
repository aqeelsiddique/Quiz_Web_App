const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RulesSchema = new Schema({
    name:{
        type: String,
        required:true,
    },
    prize:{
        type:Number,
        required:true,
    },
   des:{
    type:String,
    required:true
   }
});

RulesSchema.virtual('url').get(function(){
    return'/dashboard/rules/' + this._id;
});

module.exports = mongoose.model("Rules",RulesSchema);

