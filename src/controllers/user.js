const { UniqueConstraintError } = require('sequelize')

const { createUser } = require('../services/user')
const failureResponse = require('../utils/failure-response')
const passport = require('../configs/passport-config')(require('passport'))
const validateRegister = require('../utils/validate-register')

async function register(req, res, next) {
  const message = validateRegister(req.body)
  if (message) {
    return failureResponse(res, 400, message)
  }

  try {
    await createUser(req.body)
    res.sendStatus(201)
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      const field = err.errors[0].path === 'user_name' ? 'username' : err.path
      err.message = `${field} is already exists`
      err.status = 409
    }
    next(err)
  }
}

async function login(req, res, next) {
  passport.authenticate('local', { session: true }, (err, user, info) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      return next(info)
    }
    req.login(user, (err) => {
      if (err) {
        return next(err)
      }

      res.sendStatus(200)
    })
  })(req, res, next)
}

async function logout(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err)
    }

    res.sendStatus(200)
  })
}

module.exports = {
  register,
  login,
  logout
}
