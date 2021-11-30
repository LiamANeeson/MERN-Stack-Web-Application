
const postRegister = require('../controllers/registerController')

const registerRouter = app => app.post('/api/register', postRegister)

module.exports = registerRouter