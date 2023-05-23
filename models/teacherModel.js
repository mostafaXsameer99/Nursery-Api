const mongoose=require("mongoose")


const Schema=new mongoose.Schema({
    _id:Number,
    fullName:String,
    password:String,
    email:String,
    image:String,
})
module.exports=mongoose.model("Teachers",Schema);
