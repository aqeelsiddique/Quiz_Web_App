const mongoose = require("mongoose");

const updateCategorySchema = mongoose.Schema({
    name:{
        type: String,
        required:[true, "Please enter a Catory name"],
        trim:true
    }
})


module.exports = mongoose.model('updateCategory', updateCategorySchema);
