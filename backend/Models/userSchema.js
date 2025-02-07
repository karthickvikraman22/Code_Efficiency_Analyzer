const mongoose=require('mongoose')

const userschema=new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true},
    password: { type: String, required: true }
})
const usermodel=mongoose.model("users",userschema)
module.exports=usermodel

