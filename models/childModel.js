const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
    city: String,
    street: String,
    Building: Number
}, { _id: false })


const Schema = new mongoose.Schema({
    _id: Number,
    fullName: String,
    age: Number,
    level: String,
    address: addressSchema,
    class:{type:Number,ref:"classes"}
})

module.exports = mongoose.model("Child", Schema);