const { Model, DataTypes } = require('sequelize')

class User extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userType: {
        type: DataTypes.ENUM(['customer', 'seller']),
        defaultValue: 'customer'
      }
    }, {
      sequelize,
      tableName: 'user',
      underscored: true,
      timestamps: false
    })
  }

  static associate(models) {
    const Customer = this.sequelize.models.Customer
    const Seller = this.sequelize.models.Seller

    this.hasOne(Customer, { foreignKey: 'id', onDelete: 'CASCADE' })
    this.hasOne(Seller, { foreignKey: 'id', onDelete: 'CASCADE' })
  }
}

module.exports = User
