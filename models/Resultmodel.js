const mongoose = require('mongoose');

const {Schema}  = mongoose ;

const resultmodel = new Schema({

    name: {
        type: String,
    },
    result: {
        type: Array , default: [ ],
    },
    attempts: {
        type: Number , default:0,
    },
    points: {
        type: Number , default:0,
    },
    achieved: {
        type: String , default:'',
    },

    createdAt: {
        type: Date, default: Date.now
    }
    
})
module.exports = {
    resultmodel

}
// export default mongoose.model("result", resultmodel)
// export const result = monoose.model("Result", resultmodel)