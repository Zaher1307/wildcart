const {
  // ForeignKeyConstraintError,
  // DatabaseError,
  UniqueConstraintError,
  ConnectionError,
  ConnectionRefusedError
} = require('sequelize')

const log = require('../configs/winston-config')

function createSequelizeErrorObject(err) {
  log.debug('creating error object')
  // log.debug(err.constructor.name)

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
  }
}

module.exports = createSequelizeErrorObject
