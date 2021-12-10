const mongoose = require('mongoose')

const User = new mongoose.Schema(
    {
        name: {type: String, required: true },
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        quote: {type: String },
        posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'post' }],
        likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'post' }],
        savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'post' }],
    }, { collection: 'user-data' }
)

const model = mongoose.model('UserData', User)

module.exports = model