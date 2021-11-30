const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')
const loginRouter = require('./Routes/loginRouter')
const registerRouter = require('./Routes/registerRouter')


app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/mern_assignment')

registerRouter(app)

loginRouter(app)

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
    