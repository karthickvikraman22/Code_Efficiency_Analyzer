const asyncHandler=require('express-async-handler')
const { questionModel, easyModel, mediumModel, hardModel } = require('../Models/questionSchema');

const question=asyncHandler(async(req,res)=>{
    const data=await questionModel.find()
    res.status(200).json(data)
})

const easy=asyncHandler(async(req,res)=>{
    const data=await easyModel.find()
    res.status(200).json(data)
}) 

const medium=asyncHandler(async(req,res)=>{
    const data=await mediumModel.find()
    res.status(200).json(data)
})

const hard=asyncHandler(async(req,res)=>{
    const data=await hardModel.find()
    res.status(200).json(data)
})


const specificQues=asyncHandler(async(req,res)=>{
    const { difficulty, id } = req.params;
    const levels={
        question:questionModel,
        easy:easyModel,
        medium:mediumModel,
        hard:hardModel
    }
    const model=levels[difficulty]
    const data=await model.findOne({_id:id})
    if(data){
        res.status(200).json(data)
    }
})

module.exports={question,easy,medium,hard,specificQues}