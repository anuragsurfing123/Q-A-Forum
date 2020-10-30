const express=require('express');
const router=express.Router();
const { check, validationResult } = require("express-validator");
const mongoose=require('mongoose');
const passport=require('passport');
//load person model
const Person=require("../../models/Person");
//load profile model
const Profile=require("../../models/Profile");

//@type    GET
//@route   /api/profile
//@desc    route for profile of personal user
//@access   PRIVATE
router.get('/',
passport.authenticate('jwt',{session:false}),
(req,res)=>{
    Profile.findOne({user:req.user.id})
    .then(profile=>{
        if(!profile){
            return res.status(404).json({error:"user Profile is not available"});
        }
        res.json(profile);
    })
    .catch(err=>console.log('got some error'+err));


});

//@type    POST
//@route   /api/profile
//@desc    route for PDATING/SAVING profile of personal user
//@access   PRIVATE

router.post(
    '/',
    [
        check("username", "username should be at least 3 char").isLength({ min: 3 }),
        check("website", "website URL Type is required").isURL(),
        check("country", "password should be at least 3 char").isLength({ min: 3 }),
        check("languages", "password should be at least 3 char").isLength({ min: 3 }),


      ],
    passport.authenticate('jwt',{session:false}),
    (req,res)=>{
        const errors = validationResult(req);
   if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }
        const profileValues={};
        profileValues.user=req.user.id;
        if(req.body.username) profileValues.username=req.body.username;
        if(req.body.website) profileValues.website=req.body.website;
        if(req.body.country) profileValues.country=req.body.country;
        if(req.body.portfolio) profileValues.portfolio=req.body.portfolio;
        if(typeof req.body.languages!==undefined){
            profileValues.languages=req.body.languages.split(",");
        }

        //get social link
        profileValues.social={};
        
        if(req.body.youtube) profileValues.social.youtube=req.body.youtube;
        if(req.body.facebook) profileValues.social.facebook=req.body.facebook;
        if(req.body.instagram) profileValues.social.instagram=req.body.instagram;
        
        //Do Database Stuff
        Profile.findOne({user:req.user.id})
        .then(profile=>{
            if(profile){
                Profile.findOneAndUpdate(
                    {user:req.user.id},
                    {$set:profileValues},
                    {new:true}
                ).then(profile=>{
                    res.json(profile)
                }).catch(err=>json({error:'problem in update'+err}))

            }else{
                Profile.findOne({username:profileValues.username}).then(
                    profile=>{
                        //username already exists
                        if(profile){
                            res.status(400).json({error:'username already exist'});
                        }
                        //save user
                        new Profile(profileValues).save()
                        .then(profile=>{
                            res.json(profile)
                        })
                        .catch(err=>console.log(err))
                    }
                ).catch(err=>console.log(err))
            }
        })
        .catch(err=>console.log('Problem in fetching profile'+err))
    }

);






//@type    GET
//@route   /api/profile/:username
//@desc    route for getting profile based on USERNAME
//@access   PUBLIC

router.get('/:username',(req,res)=>{
    Profile.findOne({username:req.params.username})
    .populate('user',['name','profilepic'])
    .then(profile=>{
        if(!profile){
            res.status(400).json({error:'User Not Found'})
        }
        res.json(profile);
    })
    .catch(err=>console.log('Error in fetching username '+ err));
})



//@type    GET
//@route   /api/profile/everyone
//@desc    route for getting profile everyone
//@access   PUBLIC
router.get('/find/everyone',(req,res)=>{
    Profile.find()
    .populate('user',['name','profilepic'])
    .then(profiles=>{
        if(!profiles){
            res.status(400).json({error:'No Profile was Found'})
        }
        res.json(profiles);
    })
    .catch(err=>console.log('Error in fetching username '+ err));
});

//@type    DELETE
//@route   /api/profile/
//@desc    route for deleting user based on id
//@access   PRIVATE
router.delete('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
Profile.findOne({user:req.user.id})
Profile.findOneAndRemove({user:req.user.id})
.then(()=>{
    Person.findOneAndRemove({_id:req.user.id})
    .then(()=>res.json({success:"delete was success"}))
    .catch(err=>console.log(err))
})
.catch(err=>console.log(err))
});



//@type    POST
//@route   /api/profile/mywork
//@desc    route for adding work profile of a person
//@access   PRIVATE
router.post(
    "/workrole",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      Profile.findOne({ user: req.user.id })
        .then(profile => {
          
          const newWork = {
            role: req.body.role,
            company: req.body.company,
            country: req.body.country,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            details: req.body.details
          };
          profile.workrole.unshift(newWork);
          profile
            .save()
            .then(profile => res.json(profile))
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
  );
  //@type    DELETE
//@route   /api/profile/workrole/:w_id
//@desc    route for deleting a specific workrole
//@access   PRIVATE
router.delete("/workrole/:w_id",
passport.authenticate("jwt", { session: false }),(req,res)=>{
    Profile.findOne({user:req.user.id})
    .then(profile=>{

        const removethis=profile.workrole.map(item=>item.id)
        .indexOf(req.params.w_id);

        profile.workrole.splice(removethis,1);

        profile.save()
        .then(profile=>res.json(profile))
        .catch(err=>console.log(err));
    })
    .catch(err=>console.log(err))
});


  //@type    POST
//@route   /api/profile/workrole/:w_id
//@desc    route for deleting a specific workrole
//@access   PRIVATE



module.exports=router;
