const validator = require('validator')
const {
  createUser
} = require('../services/user')
const failureResponse = require('../utils/failure-response')
const passport = require('../config/passport-config')(require('passport'))

async function register(req, res, next) {
  const {
    userName, email, firstName, lastName, password,
    phoneNumber, address, shopName, userType
  } = req.body

  if (
    !userName ||
    !email ||
    !firstName ||
    !lastName ||
    !password ||
    !phoneNumber ||
    !address ||
    !userType
  ) {
    return failureResponse(res, 400, 'required fields are missing')
  }

  if (userType === 'seller' && !shopName) {
    return failureResponse(res, 400, 'required fields are missing')
  }

  if (!validator.isStrongPassword(password)) {
    return failureResponse(res, 400, 'weak password')
  }

  if (!validator.isEmail(email)) {
    return failureResponse(res, 400, 'invalid email')
  }

  if (!validator.isMobilePhone(phoneNumber)) {
    return failureResponse(res, 400, 'invalid phone number')
  }

  try {
    await createUser(req.body)
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
}

async function login(req, res, next) {
  passport.authenticate('local', { session: true }, (err, user, info) => {
    if (err) {
      console.log(err)
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
