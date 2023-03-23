const bcrypt = require('bcrypt')
const { User } = require('../models/')
const LocalStrategy = require('passport-local').Strategy
const { Op } = require('sequelize')

const opts = {
  usernameField: 'userNameOrEmail',
  passwordField: 'password'
}

function serialize(user, done) {
  done(null, user.id)
}

async function deserialize(id, done) {
  try {
    const user = await User.findByPk(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
}

async function verify(userNameOrEmail, password, done) {
  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ userName: userNameOrEmail }, { email: userNameOrEmail }]
      }
    })
    console.log(user)
    if (!user) {
      return done(null, false, {
        status: 401, message: 'incorrect username or email'
      })
    }

    if (!await bcrypt.compare(password, user.password)) {
      return done(null, false, { status: 401, message: 'incorrect password' })
    }

    done(null, user)
  } catch (err) {
    done(err)
  }
}

module.exports = (passport) => {
  passport.serializeUser(serialize)
  passport.deserializeUser(deserialize)
  passport.use(new LocalStrategy(opts, verify))

  return passport
}
