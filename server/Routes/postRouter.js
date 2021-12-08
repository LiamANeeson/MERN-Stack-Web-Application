const postController = require('../controllers/postController')

const createPost = app => app.post('/api/post', postController.createPost)
const getPosts = app => app.get('/api/posts', postController.getPosts)
const likePost = app => app.get('/api/likePost', postController.likePost)
const searchPosts = app => app.get('/api/search', postController.searchPosts)

module.exports = {createPost, getPosts, likePost, searchPosts}
