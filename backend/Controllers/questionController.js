const asyncHandler=require('express-async-handler')
const { questionModel } = require('../Models/questionSchema');

const question=asyncHandler(async(req,res)=>{
    const data=await questionModel.find()
    res.status(200).json(data)
})

module.exports={question}