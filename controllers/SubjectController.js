const Subject = require('../models/SubjectModel');
const catchasynerror = require('./midlleware/catchasynerror');
const ErrorHandler = require('./utills/errorHandler');



exports.create_subject = async (req, res, next) => {
      // Validate that the name field is not empty.
  
  
  
  // req.body.user = req.user.id; 
  
  const Subject_name = await Subject.create(req.body);
  res.status(201).json({
      success:true,
      Subject_name
  });
  };

  //////////get a  Subject list


  exports.Subject_list = function (req, res, next) {
    Subject.find()
      .sort([['Subject', 'ascending']])
      .exec(function (err, Subject_list) {
        if (err) {
          return next(err);
        }
        // Successful, so render.
        res.status(201).json({
          success:true,
          Subject_list
          
          
      });
  
        res.render('Subject_list', {
          title: 'Subject_list',
          Subject_list: Subject_list,
        });
      });
  };



  
  ///////////////////delete a method code controller Subject


  ////--- admin  @AQeel$Umer

exports.deleteSubject = catchasynerror( async (req, res, next) => {
  let dSubject = await Subject.findById(req.params.id);

  if(!dSubject){
      return next("Question not found",404);
  }
  await dSubject.deleteOne();


  res.status(200).json({
      success:true,
      message:"Subject delete successfull",
    
  })
})
//update a Subject----only admin update the Subject
exports.updateSubjec = catchasynerror( async (req, res, next) => {
  let dSubject = await Subject.findByIdAndUpdate(req.params.id );

  if(!dSubject){
      return next("Question not found",404);
  }


  res.status(200).json({
      success:true,
      message:"Subject update successfull",
      dSubject
    
  })
})

exports.updateSubject = catchasynerror(async (req, res, next) => {
  let uSubject = await Subject.findById(req.params.id);

  if(!uSubject){
      return next(new ErrorHandler("product not found",404));
  }
  uSubject = await Subject.findByIdAndUpdate(req.params.id, req.body , {
      new:true,
      runValidators:true,
      useFindAndModify:false
  });
  res.status(200).json({
      success:true,
      uSubject
  })
});

// exports.updatsubject = async (req, res, next) => {
//   Subject.findByIdAndUpdate(req.body.id, 
//     {Subject:req.body.Subject}, function(err, data) {
//         if(err){
//             console.log(err);
//         }
//         else{
//             res.send(data);
//             console.log("Data updated!");
//         }
//     });  
  

// }

// router.post('/update', function(req, res) {
//   Subject.findByIdAndUpdate(req.body.id, 
//   {name:req.body.name}, function(err, data) {
//       if(err){
//           console.log(err);
//       }
//       else{
//           res.send(data);
//           console.log("Data updated!");
//       }
//   });  
// });


//