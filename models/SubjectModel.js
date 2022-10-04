const mongoose = require("mongoose");

const SubjectSchema = mongoose.Schema({
    Subject:{
        type: String,
        required:[true, "Please enter Subject name:"],
        trim:true
    }
})


module.exports = mongoose.model('Subject', SubjectSchema);