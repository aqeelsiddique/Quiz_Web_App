// const mongoose = require('mongoose');

// const {Schema}  = mongoose ;

// const questionmodel = new Schema({
//     description: String,
//     alternatives: [
//         {
//             text: {
//                 type: String,
//                 required: true
//             },
//             isCorrect: {
//                 type: Boolean,
//                 required: true,
//                 default: false
//             }
//         }
//     ],

//     questions: {
//         type: Array , default: [ ],
//     },
//     answers: {
//         type: Array , default: [ ],
//     },
//     createdAt: {
//         type: Date, default: Date.now
//     }
    
// })
// module.exports = {
//     questionmodel

// }
// module.exports = mongoose.model('Question', questionmodel);

const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({

    // question: { type: String, required: true },
    // option1: { type: String, required: true },
    // option2: { type: String, required: true },
    description: String,
    alternatives: [
        {
            text: {
                type: String,
                required: true
            },
            isCorrect: {
                type: Boolean,
                required: true,
                default: false
            }
        }
    ]
})

module.exports = mongoose.model('Question', QuestionSchema)

