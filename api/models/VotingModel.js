const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MemberSchema = new Schema({
    _id: { type: Number, required: true },
    code: { type: String, required: true },
    name: { type: String, required: true },
    gender: { type: String, required: true },
    voted: { type: Boolean, required: true },
    votes_people: [String],
    num_of_votes: { type: Number, required: true, default: 0}
}, { collection: 'member' })

module.exports = mongoose.model('Members', MemberSchema)