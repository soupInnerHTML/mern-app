const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    time: { type: String },
    icon: { type: String, required: true },
    label: { type: String, required: true },
    desc: { type: String, required: true },
    theme: { type: String },
    variant: { type: String },
    owner: { type: Types.ObjectId, ref: User },
})

module.exports = model('Todo', schema)