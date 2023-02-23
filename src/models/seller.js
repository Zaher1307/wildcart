const { Model, DataTypes } = require('sequelize')

class Seller extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      shopName: {
        type: DataTypes.STRING,
        allownull: false
      }
    }, {
      sequelize,
      tableName: 'seller',
      underscored: true,
      timestamps: false
    })
  }

  static associate(models) {
    const Product = this.sequelize.models.Product
    const User = this.sequelize.models.User

    this.hasMany(Product, { foreignKey: 'sellerId', onDelete: 'CASCADE' })
    this.belongsTo(User, { foreignKey: 'id', onDelete: 'CASCADE' })
  }
}

module.exports = Seller
