const postController = require('../controllers/postController')

const createPost = app => app.post('/api/post', postController.createPost)
const getPosts = app => app.get('/api/posts', postController.getPosts)

module.exports = {createPost, getPosts}
