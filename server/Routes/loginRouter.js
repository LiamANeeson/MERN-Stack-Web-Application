const postLogin = require('../controllers/loginController')

const loginRouter = app => app.post('/api/login', postLogin)

module.exports = loginRouter