const mongoose=require('mongoose')

const questionSchema=new mongoose.Schema({
    Name:{type:String},
    quesHead: {type:String},
    quesDesc: {type:String},
    sample: {type:String},
})
const questionModel=mongoose.model("questions",questionSchema)

const easyModel=mongoose.model("easy",questionSchema,"easy")

const mediumModel=mongoose.model("medium",questionSchema,"medium")

const hardModel=mongoose.model("hard",questionSchema,"hard")

module.exports={questionModel,easyModel,mediumModel,hardModel}