const asyncHandler = require('express-async-handler')
const { questionModel, easyModel, mediumModel, hardModel } = require('../Models/questionSchema')
const jwt = require('jsonwebtoken')
const usermodel = require('../Models/userSchema')

const isauth = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]
    if (!token) return res.status(401).json({ message: "Access denied" })
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch (error) {
        res.status(403).json({ message: "Invalid token" })
    }
}

const question = asyncHandler(async (req, res) => {
    const data = await questionModel.find()
    res.status(200).json(data)
})

const easy = asyncHandler(async (req, res) => {
    const userid = req.user
    const data = await easyModel.find()
    res.status(200).json(data)
})

const medium = asyncHandler(async (req, res) => {
    const data = await mediumModel.find()
    res.status(200).json(data)
})

const hard = asyncHandler(async (req, res) => {
    const data = await hardModel.find()
    res.status(200).json(data)
})

const specific = asyncHandler(async (req, res) => {
    const { scope, id } = req.params;
    const modelMap = {
        Basic: questionModel,
        Easy: easyModel,
        Medium: mediumModel,
        Hard: hardModel
    }
    const model = modelMap[scope]

    try {
        const data = await model.find({ _id: id });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })
    }
})

const likeCode = asyncHandler(async (req, res) => {
    const { questionName, id, user_id, scope, color } = req.body
    const islike = color === "black"
    const userUpdate = islike ? { $push: { liked: { questionId:id, questionName } } } : { $pull: { liked: { id } } }
    const user = await usermodel.findOneAndUpdate(
        { email: user_id },
        userUpdate,
        { new: true }
    )
    const modelMap = {
        Basic: questionModel,
        Easy: easyModel,
        Medium: mediumModel,
        Hard: hardModel
    }
    const model = modelMap[scope]
    const questionUpdate = islike ? { $inc: { likes: 1 } } : { $inc: { likes: -1 } }
    const question = await model.findOneAndUpdate(
        { _id: id },
        questionUpdate,
        { new: true }
    );
    const colored = islike ? "#15803d" : "black"
    res.status(200).json({ message: 'Success', color: colored });
})

module.exports = { question, easy, medium, hard, specific, isauth, likeCode }