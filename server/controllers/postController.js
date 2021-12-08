const jwt = require('jsonwebtoken')
const Post = require('../models/post.model')
const User = require('../models/user.model')


const createPost = async function (req, res){
    let decoded = null
    try{
        decoded = jwt.verify(req.headers['x-access-token'], 'Secret1234!')
    } catch(error) {
        console.log(error)
        return res.json({ status: 'error', error: 'invalid token'})
    }

    let postID = null;

    await Post.create({
        title: req.body.title,
        author: decoded.name,
        dateCreated: new Date(),
        text: req.body.text,
        user: decoded.id,
    }).then(
        post => {
            postID = post._id
        }
    )

    const myUser = await User.findByIdAndUpdate(
        {_id: decoded.id},
        { $push: { posts: postID } },
        { new: true, useFindAndModify: false }
    )

    return res.status(201).json({status: 'ok'})
}

const searchPosts = async function (req, res){
    let foundPosts = [];

    await Post.find({
        $text: {$search: req.query.query}
    }).then(
        results => {
            foundPosts = results
        }
    )
    if (foundPosts.length !== 0) {
        return res.json({status: 'ok', foundPosts: foundPosts})
    } else {
        return res.status(404).send()
    }
}

const getPosts = async function (req, res) {
    let allPosts = [];

    await Post.find().then(posts => {allPosts = posts})

    return res.json({status: 'ok', posts: allPosts})
}

const likePost = async function (req, res) {
    let decoded = null
    try{
        decoded = jwt.verify(req.headers['x-access-token'], 'Secret1234!')
    } catch(error) {
        console.log(error)
        return res.json({ status: 'error', error: 'invalid token'})
    }

    const updatedPost = await Post.findByIdAndUpdate(
        {_id: req.body.postID},
        { $push: { likedBy: decoded.id } },
        { new: true, useFindAndModify: false }
    )

    const updatedUser = await User.findByIdAndUpdate(
        {_id: decoded.id},
        { $push: { likedPosts: req.body.postID } },
        { new: true, useFindAndModify: false }
    )

    return res.json({status: 'ok', updatedPost: updatedPost, updatedUser: updatedUser})
}

module.exports = {createPost, getPosts, likePost, searchPosts}
