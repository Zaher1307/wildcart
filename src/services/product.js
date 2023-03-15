const crypto = require('crypto')
const { sequelize, Product, ProductCategory, Seller } = require('../models')

async function retrieveProducts() {
  return await Product.findAll({
    attributes: {
      include: [
        [sequelize.col('Seller.shop_name'), 'shopName'],
        [sequelize
          .fn('array_agg', sequelize.col('category_name')), 'categories']
      ],
      exclude: ['image']
    },
    include: [
      {
        model: Seller,
        attributes: []
      },
      {
        model: ProductCategory,
        as: 'categories',
        attributes: []
      }
    ],
    group: ['Product.id', 'shop_name'],
    raw: true,
    nest: true
  })
}

async function insertProduct(product, sellerId) {
  const id = crypto.randomUUID()

  product.categories = product.categories.map(category => {
    return { categoryName: category, productId: id }
  })
  await Product.create({
    id,
    sellerId,
    categories: product.categories,
    name: product.name,
    brand: product.brand,
    quantity: product.quantity,
    price: product.price
  },
  {
    include: {
      model: ProductCategory,
      as: 'categories'
    }
  })
  return id
}

async function retrieveProduct(id) {
  return await Product.findByPk(id, {
    attributes: {
      include: [
        [sequelize.col('Seller.shop_name'), 'shopName'],
        [sequelize
          .fn('array_agg', sequelize.col('category_name')), 'categories']
      ],
      exclude: ['image']
    },
    include: [
      {
        model: Seller,
        attributes: []
      },
      {
        model: ProductCategory,
        as: 'categories',
        attributes: []
      }
    ],
    group: ['Product.id', 'shop_name'],
    raw: true,
    nest: true
  })
}

async function modifyProduct(product, productId) {
  await Product.update({
    quantity: product.quantity, price: product.price
  }, {
    where: { id: productId }
  })
}

async function retrieveSellerProducts(sellerId) {
  return await Product.findAll({
    where: { sellerId },
    attributes: {
      include: [
        [sequelize.col('Seller.shop_name'), 'shopName'],
        [sequelize
          .fn('array_agg', sequelize.col('category_name')), 'categories']
      ],
      exclude: ['image']
    },
    include: [
      {
        model: Seller,
        attributes: []
      },
      {
        model: ProductCategory,
        as: 'categories',
        attributes: []
      }
    ],
    group: ['Product.id', 'shop_name'],
    raw: true,
    nest: true
  })
}

module.exports = {
  retrieveProducts,
  insertProduct,
  retrieveProduct,
  modifyProduct,
  retrieveSellerProducts
}
