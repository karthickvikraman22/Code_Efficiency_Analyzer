const mongoose = require('mongoose')

const userschema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    solved: { type: Number, default: 0 }
})
const usermodel = mongoose.model("users", userschema)
module.exports = usermodel

