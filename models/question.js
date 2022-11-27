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

