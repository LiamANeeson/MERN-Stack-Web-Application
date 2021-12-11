const postController = require('../controllers/postController')

const createPost = app => app.post('/api/post', postController.createPost)
const getPosts = app => app.get('/api/posts', postController.getPosts)
const getPostsByCategory = app => app.get('/api/posts-by-category', postController.getPostsByCategory)
const likePost = app => app.get('/api/likePost', postController.likePost)
const searchPosts = app => app.get('/api/search', postController.searchPosts)

module.exports = {createPost, getPosts, getPostsByCategory, likePost, searchPosts}
