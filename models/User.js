const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    email: { type: String, required: true, unique: true },
    avatar: { type: String },
    password: { type: String, required: true }
})

module.exports = model('User', schema)