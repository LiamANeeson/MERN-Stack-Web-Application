//UserRouter
//Register -------------------------------------------
const userController = require('../controllers/userController')
const registerRouter = app => app.post('/api/register', userController.postRegister)

//Login
// const postLogin = require('../controllers/userController')
const loginRouter = app => app.post('/api/login', userController.postLogin)

const getSavedPosts = app => app.get('/api/saved-posts', userController.getSavedPosts)
const savePost = app => app.post('/api/save-post', userController.savePost)

module.exports = {registerRouter, loginRouter, getSavedPosts, savePost}