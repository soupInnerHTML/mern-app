const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    content: { type: String, default: "Напишите что-нибудь..." },
    color: { type: String, required: true },
    owner: { type: Types.ObjectId, ref: 'User' },
    tags: { type: Array, default: [] },
    pos: {
        x: Number,
        y: Number
    }
})

module.exports = model('Bookmark', schema)