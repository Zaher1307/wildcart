const { Model, DataTypes } = require('sequelize')

class Review extends Model {
  static init(sequelize) {
    super.init({
      customerId: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
          model: 'customer',
          key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false
      },
      productId: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
          model: 'product',
          key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false
      },
      rate: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5
        }
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: 'review',
      underscored: true,
      timestamps: true,
      updatedAt: false
    })
  }

  static associate() {
    const Customer = this.sequelize.models.Customer
    const Product = this.sequelize.models.Product

    this.belongsTo(Customer, { foreignKey: 'customerId', onDelete: 'CASCADE' })
    this.belongsTo(Product, { foreignKey: 'productId', onDelete: 'CASCADE' })
  }
}

module.exports = Review
