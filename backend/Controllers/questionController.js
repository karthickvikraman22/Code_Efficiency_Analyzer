const asyncHandler = require('express-async-handler')
const { questionModel, easyModel, mediumModel, hardModel } = require('../Models/questionSchema');

const question = asyncHandler(async (req, res) => {
    const data = await questionModel.find()
    res.status(200).json(data)
})

const easy = asyncHandler(async (req, res) => {
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
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = { question, easy, medium, hard, specific }