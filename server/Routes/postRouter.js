const postController = require('../controllers/postController')

const postRouter = app => app.post('/api/post', postController)

module.exports = postRouter