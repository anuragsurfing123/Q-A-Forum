const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jsonwt = require("jsonwebtoken");
const passport = require("passport");
const key=require('../../setup/myurl');
const { check, validationResult } = require("express-validator");


//@type    GET
//@route   /api/auth
//@desc    just for testning
//@access   PUBLIC
router.get('/',(req,res)=>{
    res.json({test:"Auth is being tested"});
});

//Import Schema for person register
const Person=require("../../models/Person");


//@type    POST
//@route   /api/auth/register
//@desc    route dor registration of user
//@access   PUBLIC

router.post('/register',
[
    check("name", "minimum lenngth should be 3 character").isLength({ min: 3 }),
    check("email", "Enter a valid email").isEmail(),
    check("password", "minimum lenngth should be 3 character").isLength({ min: 3 }),
    


  ],

(req,res)=>{


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(422).json({
       error: errors.array()[0].msg
     });
   }


    Person.findOne({email:req.body.email})
    .then(person=>{
        if(person){
            return res.status(400).json({error:'Email is already registered in our System'})
        }else{
            const newPerson= new Person({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,

            });
            //Encrypt Password using Bcrypt
            
            bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newPerson.password, salt, (err, hash) => {
            if (err) throw err;
            newPerson.password = hash;
            newPerson
              .save()
              .then(person => res.json(person))
              .catch(err => console.log(err));
          });
            });



        }
    })
    .catch(err=>console.log(err));
});



//@type    POST
//@route   /api/auth/login
//@desc    route for login of user
//@access   PUBLIC
router.post('/login',(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;

    Person.findOne({email})
    .then(person=>{
        if(!person){
            return res.status(404).json({error:'User not found with this email'});
        }
        
            bcrypt
            .compare(password,person.password)
        .then(isCorrect=>{
            if(isCorrect){
               // res.json({success:'user is able to login successfully'});
                //use payload and create token for user

                const payload={
                    id:person.id,
                    name:person.name,
                    email:person.email,

                };
                
                jsonwt.sign(
                    payload,
                    key.secret,
                    {expiresIn:99999},
                    
                    (err,token)=>{
                       const {_id,name,email,role}=person
                        res.json({
                            
                            token:token,
                            person:{_id,name,email,role}
                            
                            //here Bearer send by postman by default

                        });
                    }
                )
                
            }
            else{
                res.status(400).json({error:'Password is not correct'})

            }

        })
        .catch(err=>console.log(err))
        
        
    })
    .catch(err=>console.log(err));
    
});













router.get("/signout",(req, res) => {
    res.clearCookie("token");
    res.json({
      message: "User signout successfully"
    });
  });




//@type    GET
//@route   /api/auth/profile
//@desc    route for profile of user
//@access   PRIVATE


router.get("/profile",
 passport.authenticate("jwt", { session: false }),
 (req, res) =>{
        res.json({
            id:req.user.id,
            name:req.user.name,
            email:req.user.email,
            profilepic:req.user.profilepic,

        })
    }
);







router.get("/allprofile",
passport.authenticate("jwt", { session: false }),
(req,res)=>{
    
    Person.find()
    .then(person=>{
        if(!person){
            return res.status(404).json({error:'No User'});
        }
        else{
            res.json(person)
        }
    }
        )
    }
)




module.exports=router;
