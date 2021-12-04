const express = require('express')
const app = express()
const bcrypt = require('bcryptjs')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')
const userRouter = require('./Routes/userRouter')
const postRouter = require('./Routes/postRouter')

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/mern_assignment')

userRouter.loginRouter(app)
userRouter.registerRouter(app)
postRouter.createPost(app)
postRouter.getPosts(app)

// Delete Profile 
app.delete('/api/delete', async (req, res) => {
    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, 'Secret1234!')
        const email = decoded.email
        const user = await User.deleteOne({email: email })

        return res.json({status:'ok', quote: user.quote })
    } catch(error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token'})
    }
})

// Update Profile 
app.patch('/api/update', async (req, res) => {
    // Find the login user by id
    const user = await User.findOne({_id: req.body.id});
    if (user) {
        const newUser = {
            name: req.body.name || user.name,
            email: req.body.email || user.email,
        }
        newUser.password = (
            req.body.password ? await bcrypt.hash(req.body.password, 10) : user.password
        )

        const updatedUser = await User.findOneAndUpdate({_id: req.body.id}, newUser);
        console.log(updatedUser)
        const token = jwt.sign({
            name: updatedUser.name,
            email: updatedUser.email,
            id: updatedUser.id,
        }, 'Secret1234!')
        return res.json({status: 'ok', user: token})
    }
})

app.get('/api/quote', async (req, res) => {    

    const token = req.headers['x-access-token']

    try {
    const decoded = jwt.verify(token, 'Secret1234!')
    const email = decoded.email
    const user = await User.findOne({email: email })

    return res.json({status:'ok', quote: user.quote })
    } catch(error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token'})
    }

})

app.post('/api/quote', async (req, res) => {    

    const token = req.headers['x-access-token']

    try {
    const decoded = jwt.verify(token, 'Secret1234!')
    const email = decoded.email
    await User.updateOne(
        {email: email }, 
        {$set: {quote: req.body.quote}}
    )
    
    return res.json({status:'ok' })
    } catch(error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token'})
    }

})

app.listen(1337, () => {
    console.log('Server started on 1337')
})
    