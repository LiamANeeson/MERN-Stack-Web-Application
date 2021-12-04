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

    return res.json({status: 'ok'})
}

const getPosts = async function (req, res) {
    // let decoded = null
    // try{
    //     decoded = jwt.verify(req.headers['x-access-token'], 'Secret1234!')
    // } catch(error) {
    //     console.log(error)
    //     return res.json({ status: 'error', error: 'invalid token'})
    // }

    let allPosts = [];

    await Post.find().then(posts => {allPosts = posts})

    return res.json({status: 'ok', posts: allPosts})
}

module.exports = {createPost, getPosts}
