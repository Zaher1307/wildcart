const {
  // DatabaseError,
  ForeignKeyConstraintError,
  UniqueConstraintError,
  ConnectionError,
  ConnectionRefusedError
} = require('sequelize')

const log = require('../configs/winston-config')

function createSequelizeErrorObject(err) {
  log.debug('creating error object')

  if (err instanceof ConnectionRefusedError) {
    log.info('cannot connect to database, timeout')

    return {
      status: 503,
      message: 'cannot connect to database, timeout'
    }
  } else if (err instanceof ConnectionError) {
    log.info('cannot connect to database, authentication failed')

    return {
      status: 503,
      message: 'cannot connect to database, authentication failed'
    }
  } else if (err instanceof UniqueConstraintError) {
    log.info('unique constraint error')

    return {
      status: 409,
      message: `${err.errors[0].value} already exists`
    }
  } else if (err instanceof ForeignKeyConstraintError) {
    log.debug(err.detail)
    return {
      status: 409,
      message: err.parent.detail
    }
  }
}

module.exports = createSequelizeErrorObject
