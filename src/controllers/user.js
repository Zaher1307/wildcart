const { createUser } = require('../services/user')
const failureResponse = require('../utils/failure-response')
const passport = require('../configs/passport-config')(require('passport'))
const { inputTypes, validateInput } = require('../utils/validate-input')

async function register(req, res, next) {
  const message = validateInput(req.body, inputTypes.REGISTER)
  if (message) {
    return failureResponse(res, 400, message)
  }

  try {
    await createUser(req.body)
    return res.sendStatus(201)
  } catch (err) {
    next(err)
  }
}

async function login(req, res, next) {
  const message = validateInput(req.body, inputTypes.LOGIN)
  if (message) {
    return failureResponse(res, 400, message)
  }

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
