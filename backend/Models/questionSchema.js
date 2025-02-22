const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    quesHeading: { type: String, required: true },
    function: { type: String, required: true },
    quesDesc: { type: String, required: true },
    sample: { type: String },
    return: { type: String, required: true },
    testcases: [
        {
            input: mongoose.Schema.Types.Mixed,
            expectedOutput: String,
        }
    ]
});

const questionModel = mongoose.model("questions", questionSchema)

const easyModel = mongoose.model("easy", questionSchema, "easy")

const mediumModel = mongoose.model("medium", questionSchema, "medium")

const hardModel = mongoose.model("hard", questionSchema, "hard")

module.exports = { questionModel, easyModel, mediumModel, hardModel }
