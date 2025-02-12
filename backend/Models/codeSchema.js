const mongoose=require('mongoose')

const storeSchema=new mongoose.Schema({
    question_id:{type:Number},
    code:{type:String}
})

const storeModel=mongoose.model("code",storeSchema)

module.exports = {storeModel}