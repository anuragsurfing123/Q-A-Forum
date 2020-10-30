const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const PersonSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    username:{
        type:String,
        
    },
    profilepic:{
        type:String,
        default:""
       
    },
    date:{
        type:Date,
        default:Date.now
    },
    role:{
        type:Number,
        default:0,
    }
});

module.exports=Person=mongoose.model("myPerson",PersonSchema);