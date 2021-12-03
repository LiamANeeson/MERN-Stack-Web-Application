//UserRouter
//Register -------------------------------------------
const userController = require('../controllers/userController')
const registerRouter = app => app.post('/api/register', userController.postRegister)

//Login
// const postLogin = require('../controllers/userController')
const loginRouter = app => app.post('/api/login', userController.postLogin)

module.exports = {registerRouter, loginRouter}