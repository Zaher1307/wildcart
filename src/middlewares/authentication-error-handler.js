const log = require('../configs/winston-config')

function authenticationErrorHandler(err, req, res, next) {
  log.debug('logging in auth failed')
  if (err.status === 401) {
    return res.status(err.status).json(err.message)
  } else {
    next()
  }
}

module.exports = authenticationErrorHandler
