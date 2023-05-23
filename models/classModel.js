const mongoose=require("mongoose")


const Schema=new mongoose.Schema({
    _id:Number,
    name:String,
    supervisor:{type:Number,ref:"teachers"},
    children:{type:Array,ref:"children"}
})


module.exports=mongoose.model("class",Schema)