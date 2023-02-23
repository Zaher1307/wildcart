const { Model, DataTypes } = require('sequelize')

class Product extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      sellerId: {
        type: DataTypes.UUID,
        references: {
          model: 'seller',
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      image: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      tableName: 'product',
      underscored: true,
      timestamps: false
    })
  }

  static associate() {
    const Review = this.sequelize.models.Review
    const Order = this.sequelize.models.Order
    const ProductCategory = this.sequelize.models.ProductCategory
    const Seller = this.sequelize.models.Seller

    this.hasMany(Review, { foreignKey: 'productId', onDelete: 'CASCADE' })
    this.hasMany(Order, { foreignKey: 'productId', onDelete: 'CASCADE' })
    this.hasMany(ProductCategory, {
      foreignKey: 'productId',
      onDelete: 'CASCADE',
      as: 'categories'
    })
    this.belongsTo(Seller, { foreignKey: 'sellerId', onDelete: 'CASCADE' })
  }
}

module.exports = Product
