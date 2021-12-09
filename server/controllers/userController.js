const bcrypt = require('bcryptjs')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')


// Register User 
const postRegister = async function (req, res) {
    console.log(req.body)
    try{
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await User.create({
           name: req.body.name,
           email: req.body.email,
           password: newPassword,
       })
       
       res.json({status: 'ok'})
    } catch (err){
        console.log(err)
        res.json({status: 'error', error: 'Duplicate email'})
    } 
}

// User Login
const postLogin = async function (req, res){
    const user = await User.findOne(
        {
        email: req.body.email,
     })

     if(!user) {
         return { status: 'error', error: 'Invalid login'}
     }

     const isPasswordValid = await bcrypt.compare(req.body.password, user.password)

     if (isPasswordValid){
         

         const token = jwt.sign({
             name: user.name,
             email: user.email,
             id: user.id,
         }, 'Secret1234!'
         )
         console.log(user,token)
         return res.json({status: 'ok', user: token})
     }
     else{
         return res.json({status: 'error', user: false})
     }
}

const getSavedPosts = async function (req, res) {
    let decoded = null
    try{
        decoded = jwt.verify(req.headers['x-access-token'], 'Secret1234!')
    } catch(error) {
        console.log(error)
        return res.json({ status: 'error', error: 'invalid token'})
    }
// Problem 
    const user = await User.findById(decoded.id).populate('savedPosts')
    console.log(user)
    return res.json({status: 'ok', user: user})
}

const savePost = async function (req, res) {
    let decoded = null
    try{
        decoded = jwt.verify(req.headers['x-access-token'], 'Secret1234!')
    } catch(error) {
        console.log(error)
        return res.json({ status: 'error', error: 'invalid token'})
    }

    const updatedUser = await User.findByIdAndUpdate(
        {_id: decoded.id},
        { $push: { savedPosts: req.body.postID } },
        { new: true, useFindAndModify: false }
    )

    return res.json({status: 'ok', updatedUser: updatedUser})
}

module.exports = {postRegister, postLogin, getSavedPosts, savePost}