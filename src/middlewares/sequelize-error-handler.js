const createSequelizeErrorObject = require('../utils/sequelize-error-creator')
const log = require('../configs/winston-config')

async function sequelizeErrHandler(err, req, res, next) {
  log.debug('entering error handler middleware', err)

  log.debug(err.constructor)
  const responseError = createSequelizeErrorObject(err)
  if (responseError) {
    return res.status(responseError.status).json({
      message: responseError.message
    })
  }
  next(err)
}

module.exports = sequelizeErrHandler
