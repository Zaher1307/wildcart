const { Model, DataTypes } = require('sequelize')

class Customer extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
          model: 'user',
          key: 'id'
        }
      }
    }, {
      sequelize,
      tableName: 'customer',
      timestamps: false
    })
  }

  static associate(models) {
    const Review = this.sequelize.models.Review
    const Order = this.sequelize.models.Order
    const User = this.sequelize.models.User

    this.hasMany(Review, { foreignKey: 'customerId', onDelete: 'CASCADE' })
    this.hasMany(Order, { foreignKey: 'customerId', onDelete: 'CASCADE' })
    this.belongsTo(User, { foreignKey: 'id', onDelete: 'CASCADE' })
  }
}

module.exports = Customer
