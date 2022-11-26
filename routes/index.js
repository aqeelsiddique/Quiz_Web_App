const express = require('express');
const { getQuestion, insertQuestion, delQuestion, result , storeresult, delresult } = require('../controllers/QuestionController');
const router = express.Router();

/* GET home page. */


router.route('/question').post(insertQuestion).get(getQuestion).delete(delQuestion)

router.get('/view', (req, res) => {
  res.json("show a page")
})

router.route("/result").get(result).post(storeresult).delete(delresult)


router.get('/', (req, res) => {
  res.redirect('/dashboard');
});

module.exports = router;
