const { UniqueConstraintError, ValidationError } = require('sequelize')

async function errHandler(err, req, res, next) {
  const error = err.errors[0]
  const field = error.path === 'user_name' ? 'username' : error.path
  if (err instanceof UniqueConstraintError) {
    res.status(409).json({ message: `${field} is already exists` })
  } else if (err instanceof ValidationError) {
    res.status(400).json({
      message: `${field} must have a valid value`
    })
  } else {
    res.status(500).json({ message: 'un expected error' })
  }
}

module.exports = errHandler
