const mongoose = require('mongoose')

const categoriesEnum = [
    'Films',
    'Music',
    'Books',
    'Podcasts',
    'Sports'
];

const Post = new mongoose.Schema(
    {
        title: {type: String, required: true },
        author: {type: String, required: true, unique: false},
        dateCreated: {type: Date},
        text: {type: String },
        likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user-data' }],
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'user-data' },
        awardCount: {type: Number},
        category: {type: String, enum: categoriesEnum, unique: false},
    }, { collection: 'post' }
)

// Add text index to title, author and text fields to support text search aross those fields
// using the $text operator
// (https://stackoverflow.com/questions/28775051/best-way-to-perform-a-full-text-search-in-mongodb-and-mongoose)
Post.index({title: 'text', author: 'text', text: 'text'});

const model = mongoose.model('post', Post)

module.exports = model