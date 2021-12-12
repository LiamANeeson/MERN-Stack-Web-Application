const mongoose = require('mongoose')

const User = new mongoose.Schema(
    {
        name: {type: String, required: true },
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        quote: {type: String },
        profilePic: {type: String, default: "http://res.cloudinary.com/dxghxvvfj/image/upload/v1638815617/mx3zqvd4z8bwtv7qsq6w.png" },
        posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'post' }],
        likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'post' }],
        savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'post' }],
    }, { collection: 'user-data' }
)

const model = mongoose.model('UserData', User)

module.exports = model
