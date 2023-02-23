const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const process = require('process')
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'dev'
const config = require(
  path.join(__dirname, '/../config/database-config.js')
)[env]
const db = {}

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)

fs
  .readdirSync(__dirname)
  .filter((file) => (
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js' &&
    file.indexOf('.test.js') === -1
  ))
  .map((file) => {
    const model = require(path.join(__dirname, file))
    model.init(sequelize)
    return model
  })
  .forEach((model) => {
    if (model.associate) {
      model.associate(db)
    }
    db[model.name] = model
  })

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
