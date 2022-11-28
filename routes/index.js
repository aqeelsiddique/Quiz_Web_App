const express = require('express');
const { getQuestion, insertQuestion, delQuestion, result , storeresult, delresult, createQuestion } = require('../controllers/QuestionController');
const Question = require('../models/question');
const router = express.Router();

/* GET home page. */


router.route('/question').post(insertQuestion).get(getQuestion).delete(delQuestion)
// create one quiz question
// router.post('/questions', async (req, res) => {
//   try {
//       const { description } = req.body
//       const { alternatives } = req.body

//       const question = await Question.create({
//           description,
//           alternatives
//       })

//       return res.status(201).json(question)
//   } catch (error) {
//       return res.status(500).json({"error":error})
//   }
// })

router.get('/view', (req, res) => {
  res.json("show a page")
})

router.route("/result").get(result).post(storeresult).delete(delresult)


router.get('/', (req, res) => {
  res.redirect('/dashboard');
});

module.exports = router;
