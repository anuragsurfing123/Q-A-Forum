var express=require('express');
const mongoose = require('mongoose');
const bodyparser=require('body-parser');
const passport=require('passport');
//bring all routs
const auth=require('./routes/api/auth');
const questions=require('./routes/api/questions');
const profile=require('./routes/api/profile');
var cors = require('cors');





var app=express();
app.use(cors());
//midleware for body-parser
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
//mongoDB configuration
const db =require("./setup/myurl").mongoURL;

//Attempt to connect to databse
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
    .then(()=>console.log('mongo db connected Successfully'))
    .catch(err=>console.log(err));

//passport middleware

app.use(passport.initialize());


//config for jwt strategy

require('./strategies/jsonStrategy')(passport);





//just for testing
app.get('/',(req,res)=>{
    res.send('Hello I am anurag Mishra In big Stack');
});
//actual routes
app.use('/api/auth',auth);
app.use('/api/questions',questions);
app.use('/api/profile',profile);
const port=process.env.PORT || 9000;

app.listen(port,()=>console.log(`Server is running at port ${port}`))