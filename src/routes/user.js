const express = require('express')

const { register, login, logout } = require('../controllers/user')
const authenticationErrorHandler =
  require('../middlewares/authentication-error-handler')
const sequelizeErrHandler = require('../middlewares/sequelize-error-handler')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)

router.use(sequelizeErrHandler)
router.use(authenticationErrorHandler)

module.exports = router
