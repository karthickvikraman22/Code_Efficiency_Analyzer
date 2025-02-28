const mongoose = require('mongoose')

const storeSchema = new mongoose.Schema({
    user_id: { type: String },
    data: [
        {
            _id:false,
            question_id: { type: String },
            code: { type: String }
        }
    ],
}, { versionKey: false })

const storeModel = mongoose.model("code", storeSchema)

module.exports = { storeModel }