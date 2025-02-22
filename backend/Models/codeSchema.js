const mongoose = require('mongoose')

const storeSchema = new mongoose.Schema({
    user_id: { type: String },
    data: [{
        question_id: { type: String },
        code: { type: String }
    }],
});

const storeModel = mongoose.model("code", storeSchema)

module.exports = { storeModel }