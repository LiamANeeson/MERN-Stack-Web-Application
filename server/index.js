const express = require('express')
const app = express()
const bcrypt = require('bcryptjs')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')
const userRouter = require('./Routes/userRouter')
const postRouter = require('./Routes/postRouter')
const stripe = require('stripe')('sk_test_51K5uTyEt5WMsJ772iDlCjsxgH03cwuTC6HxkoOujUISK0Ts41XvYgzXW4wwhAGIU8hBDCqVQV7rfCCoycjvfElMM00pF8aczPz');

app.use(cors())
app.use(express.json())

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    next()
})

mongoose.connect('mongodb://localhost:27017/mern_assignment')

userRouter.loginRouter(app)
userRouter.registerRouter(app)
userRouter.getCurrentUser(app)
userRouter.getLikedPosts(app)
userRouter.getSavedPosts(app)
userRouter.savePost(app)
postRouter.createPost(app)
postRouter.getPosts(app)
postRouter.getPostsByCategory(app)
postRouter.likePost(app)
postRouter.searchPosts(app)

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

app.post('/api/updatePic', async (req, res) => {
    const token = req.headers['x-access-token']

    try{
        const decoded = jwt.verify(token, 'Secret1234!')
        const email = decoded.email
        await User.updateOne(
            {email:email },
            {$set: {profilePic: req.body.ProfilePicSelected}}
        )

        return res.json({status: 'ok'})
    } catch(error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token'})
    }
})

app.get('/api/updatePic', async (req, res) => {    

    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, 'Secret1234!')
        const email = decoded.email
        const user = await User.findOne({email: email })

        return res.json({status:'ok', profilePic: user.profilePic })
    } catch(error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token'})
    }

})

app.post('/api/award-post', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
        {
            price: 'price_1K5ul7Et5WMsJ772RuM5h7PE',
            quantity: 1,
        }],
        mode: 'payment',
        success_url: `http://localhost:3000/dashboard?award-status=success`,
        cancel_url: `http://localhost:3000/dashboard?award-status=fail`,
    })
    res.json({url: session.url})
});

app.listen(1337, () => {
    console.log('Server started on 1337')
})
    