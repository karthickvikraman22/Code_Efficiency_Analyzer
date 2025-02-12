const asyncHandler = require('express-async-handler')
const { storeModel } = require("../Models/codeSchema")

const getCode=asyncHandler(async(req,res)=>{
   const {id} =req.body
   const storedCode=await storeModel.findOne({question_id:id})
   if(!storedCode){
      return res.status(200).json({message:"not found"})
   }
   res.status(200).json({message:"found",code:storedCode.code})
})

module.exports={getCode}