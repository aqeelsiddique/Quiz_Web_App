import mongoose from "mongoose"

const Schema = mongoose.Schema;

const questionmodel = new Schema({

    questions: {
        type: Array , default: [ ],
    },
    answers: {
        type: Array , default: [ ],
    },
    createdAt: {
        type: Date, default: Date.now
    }
    
})
module.exports = mongoose.model('Question', questionmodel);



