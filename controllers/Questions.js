const Question = require('../models/SimpleCatQuestions');
const MediumQuestion= require('../models/MediumCatQuestions')
const catchasynerror = require('./midlleware/catchasynerror');
const HardQuestions = require('../models/MediumCatQuestions');
const ApiFeatures = require('./utills/appfeature');





//////////////simplw quiz question section   only Postmethod Controller
///CReate a quiz Questions only access by admin
exports.CreateQuestion = catchasynerror(async (req, res, next) => {
    // req.body.user = req.user.id; 

    const MultipleQuestions = await Question.create(req.body);
    res.status(201).json({
        success:true,
        MultipleQuestions
        
    });
});



//////////////////////////medium Questions Sections only access by admin

exports.CreatemediumQuestions = catchasynerror(async (req, res, next) => {
    // req.body.user = req.user.id; 

    const MediumQuestions = await MediumQuestion.create(req.body);
    res.status(201).json({
        success:true,
        MediumQuestions
        
    });
});

/////////////////////////////Hard Questions Add Sections only by only admin 

exports.CreateHardQuestions = catchasynerror(async (req, res, next) => {
    // req.body.user = req.user.id; 

    const HardQuestion = await HardQuestions.create(req.body);
    res.status(201).json({
        success:true,
        HardQuestion
        
    });
});



//////////////////////get method controller code  Simple question

exports.getSimpleQuestions = catchasynerror(async (req, res, next) => {
    const resultPerPage = 1;
    const apifeature =  new ApiFeatures(Question.find(), req.query).search().filter().pagination(resultPerPage)
    const SimpleCatQuestions = await apifeature.query;
    // let totalamount = 0;
    // orders.forEach((order) => {
    //   totalamount += order.totalPrice
    // })
    res.status(200).json({
      success:true,
      SimpleCatQuestions 
    //   totalamount,
    //   orders,
    })
  })
  ///////////////////delete a method code controller Simple Questions 


  ////--- admin  @AQeel$Umer

exports.deleteQuestion = catchasynerror( async (req, res, next) => {
    let dQuestion = await Question.findById(req.params.id);

    if(!dQuestion){
        return next("Question not found",404);
    }
    await dQuestion.deleteOne();


    res.status(200).json({
        success:true,
        message:"Questions delete successfull"
    })
})














