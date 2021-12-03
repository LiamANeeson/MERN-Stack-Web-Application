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

module.exports = {postRegister, postLogin}