const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    Name: { type: String, required: true },
    quesHead: { type: String, required: true },
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

const questionModel = mongoose.model("questions", questionSchema);

module.exports = { questionModel };
