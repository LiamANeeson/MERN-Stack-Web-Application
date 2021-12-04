const mongoose = require('mongoose')

const Post = new mongoose.Schema(
    {
        title: {type: String, required: true },
        author: {type: String, required: true, unique: false},
        dateCreated: {type: Date},
        text: {type: String },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'user-data' }
    }, { collection: 'post' }
)

const model = mongoose.model('post', Post)

module.exports = model