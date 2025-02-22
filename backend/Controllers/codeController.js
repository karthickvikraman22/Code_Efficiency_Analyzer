const asyncHandler = require('express-async-handler')
const { storeModel } = require("../Models/codeSchema")

const getCode = asyncHandler(async (req, res) => {
   const { question_id, user_id } = req.body
   const storedCode = await storeModel.findOne({ user_id })
   let questionIndex
   if (!storedCode) {
      return res.status(200).json({ message: "not found" })
   }
   else {
      questionIndex = storedCode.data.findIndex((q) => q.question_id === question_id)
      if (questionIndex === -1) {
         return res.status(200).json({ message: "not found" })
      }
   }
   res.status(200).json({ message: "found", code: storedCode.data[questionIndex].code })
})

module.exports = { getCode }