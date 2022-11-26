// import Question from "../models/question"
// import result from '../models/Resultmodel';
const Resul = require('../models/Resultmodel')





exports.getQuestion = async function(req, res) {
    res.json("api get question")

}
// export async function getQuestion(req, res) {
//     res.json("api get question")
// }
exports.insertQuestion = async function(req, res) {
    res.json("api post question")

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
