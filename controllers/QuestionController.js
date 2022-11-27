// import Question from "../models/question"
// import result from '../models/Resultmodel';
const Resul = require('../models/Resultmodel')
const Question = require("../models/question")





exports.getQuestion = async function(req, res) {
    try {
        const q = await Question.find()
        res.json(q)

    }
    catch(error) {

    }
    // res.json("api get question")

}
// export async function getQuestion(req, res) {
//     res.json("api get question")
// }
exports.insertQuestion = async function(req, res) {
    try {
        const { description } = req.body
        const { alternatives } = req.body

        const question = await Question.create({
            description,
            alternatives
        })

        return res.status(201).json(question)
    } catch (error) {
        return res.status(500).json({"error":error})
    }

    // try{
        
    //     Question.insertMany({questions:[0], answers:[1]}, function(err, data){
    //         res.json({msg:"Data saved Sucessfully"})
    //     }
    //         )

    // }
    // catch(error) {
    //     res.json({error})
    // }
    // res.json("api post question")

}
exports.delQuestion = async function(req, res) {
    res.json("api delete question")

}
////////////////////////////////////result portion/////////////////

exports.result = async function(req, res) {
    res.json("api show a result")

}
exports.storeresult = async function(req, res) {
    res.json("api store a result")

}
exports.delresult = async function(req, res) {
    res.json("api delete result")

}




// Handle process create on POST.
exports.createQuestion = [
    // Convert the category to an array.
   
    
  
    // Process request after validation and sanitization.
    (req, res, next) => {
      // Extract the validation errors from a request.

      
      // Create a Process object with escaped and trimmed data.
      const process = new Question({
        // name: req.body.name,
        machine: req.body.machine,
        question: req.body.question,
        option1: req.body.option1,
        option2: req.body.option2,
        // serial_number: req.body.serial_number,
      });
  
      if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/error messages.
  
        // Get all machines and categories for form.
        async.parallel(
          {
            machines: function (callback) {
              Machine.find(callback);
            },
            categories: function (callback) {
              Category.find(callback);
            },
          },
          function (err, results) {
            if (err) {
              return next(err);
            }
  
            // Mark our selected categories as checked.
            for (let i = 0; i < results.categories.length; i++) {
              if (process.category.indexOf(results.categories[i]._id) > -1) {
                results.categories[i].checked = 'checked';
              }
            }
            res.render('process_form', {
              title: 'Create Process',
              machines: results.machines,
              categories: results.categories,
              process: process,
              errors: errors.array(),
            });
          }
        );
        return;
      } else {
        // Data from form is valid. Save process.
        process.save(function (err) {
          if (err) {
            return next(err);
          }
          //successful - redirect to new process record.
          res.redirect(process.url);
        });
      }
    },
  ];