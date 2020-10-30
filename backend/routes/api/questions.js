const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const passport=require("passport")
const { check, validationResult } = require("express-validator");




//load person model
const Person=require("../../models/Person");
//load profile model
const Profile=require("../../models/Profile");
//load question model
const Question=require("../../models/Question");



getquestionById = (req, res, next, id) => {
  Question.findById(id).exec((err, cate) => {
    if (err) {
      return res.status(400).json({
        error: "Category not found in DB"
      });
    }
    req.question = cate;
    
    next();
  });
};







getUserById=(req,res,next,id)=>{
  Person.findById(id).exec((err,user)=>{
if(err || !user){
  return res.status(400).json({
      error:"No User Found in DB"
  })

}
req.profile=user
next();
  })
}


router.param("userId",getUserById);
router.param("QuestionId",getquestionById);


//api/questions

// @type      GET

// @route    /api/questions
// @desc     route for submitting questions
// @access   PUBLIC
router.get('/',(req,res)=>{
    Question.find()
    .sort({date:"desc"})
    .then(question=>res.json(question))
    .catch(err=>res.json({error:"No Questions Two Display"}))
});




router.get('/:QuestionId',(req,res)=>{
  Question.find({_id:req.question})
  .then(question=>res.json(question))
    .catch(err=>res.json({error:"No Questions Two Display"}))
});
// @type      POST

// @route    /api/questions
// @desc     route for submitting questions
// @access   PRIVATE


router.post('/',
[
    check("textone", "Insert Question").isLength({ min: 3 }),
    check("texttwo", "Describe Question").isLength({ min: 3 }),
    check("name", "Your Name").isLength({ min: 3 }),
    


  ],
passport.authenticate('jwt',{session:false}),(req,res)=>{


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(422).json({
       error: errors.array()[0].msg
     });
   }

    const newQuestion=new Question({
        textone:req.body.textone,
        texttwo:req.body.texttwo,
        user:req.user.id,
        name:req.body.name,
    });
    newQuestion.save()
    .then(question=>res.json(question))
    .catch(err=>console.log("Unable to push question to database"+err))
});



// @type     POST
// @route    /api/answers/:id
// @desc     route for submitting answers to  questions
// @access   PRIVATE

router.post(
    '/answers/:id',
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      Question.findById(req.params.id)
        .then(question => {
          const newAnswer = {
            user: req.user.id,
            name: req.body.name,
            text: req.body.text
          };
          question.answers.unshift(newAnswer);
  
          question
            .save()
            .then(question => res.json(question))
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
  )



// @type     POST
// @route    /api/question/upvote/:id
// @desc     route for upvoting
// @access   PRIVATE
router.post('/upvote/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user:req.user.id})
    .then(profile=>{
        Question.findById(req.params.id)
        .then(question=>{
            if(question.upvotes.filter(upvote=>upvote.user.toString()===req.user.id.toString()).length>0){
                return res.status(400).json({error:"user already upvoted"})

            }
            question.upvotes.unshift({user:req.user.id})
            question.save()
            .then(question=>res.json(question))
            .catch(err=>console.log(err))
        })
        .catch()
    })
    .catch(err=>console.log(err))
});

//api/questions/
// router.delete('/delete/:questionId/:userId',passport.authenticate('jwt',{session:false}),(req,res)=>{
//   Question.find(req.params.questionId).remove((error,deletedProduct)=>{
//     if(error){
      
//       return res.status(400).json({

//         error:"Failed To delete Product"
//       })
//     }
//     res.json({
//       message:"Deletion Was Success",
      
      
//     })
//   })

// })



router.delete('/delete/:QuestionId/:userId',passport.authenticate('jwt',{session:false}),(req, res) => {
  const question = req.question;

  question.remove((error, question) => {
    if (error) {
      return res.status(400).json({
        error: "Failed to delete this category"
      });
    }
    res.json({
      message: "Successfull deleted"
    });
  });
}

)

//delete Answers
router.delete('/delete/:AnswerId/:QuestionId/:userId',passport.authenticate('jwt',{session:false}),(req, res) => {
  const question = req.question;
  question.updateOne({$pull:{answers:{_id:req.params.AnswerId}}}, (err, model)=>{
    if(err){
      res.json({error:"answer not deleted"})
    }
    res.json({message:"Successfully Deleted"})
  })
  

  
  
  
} 

)
//assignment

// remove upvoting
// delete questions

// delete all questions

// Create a seperate for linux questions (3 part error exctra)



//update question

router.put('/:QuestionId',passport.authenticate('jwt',{session:false}),(req, res) => {
  const question = req.question;
  

  
question.textone=req.body.textone;
question.texttwo=req.body.texttwo;
question.name=req.body.name;


  
  

question.save((err, updatedquestion) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to update category"
      });
    }
    res.json(updatedquestion);
  });
}
);


module.exports=router;