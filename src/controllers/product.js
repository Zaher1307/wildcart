const { ValidationError } = require('sequelize')

const {
  retrieveProducts, insertProduct, retrieveProduct, modifyProduct,
  retrieveSellerProducts
} = require('../services/product')
const failureResponse = require('../utils/failure-response')

async function createProduct(req, res, next) {
  try {
    const id = await insertProduct(req.body, req.user.id)
    res.status(201).json({ id })
  } catch (err) {
    if (err instanceof ValidationError) {
      const invalidField = err.errors[0].path
      err.message = `${invalidField} must be valid`
      err.status = 400
    }
    next(err)
  }
}

async function getProducts(req, res, next) {
  try {
    const products = await retrieveProducts()
    res.status(200).json({ products })
  } catch (err) {
    next(err)
  }
}

async function getProduct(req, res, next) {
  try {
    const product = await retrieveProduct(req.params.productId)
    if (!product) {
      return failureResponse(res, 404, 'product not found')
    }
    res.status(200).json({ product })
  } catch (err) {
    next(err)
  }
}

async function updateProduct(req, res, next) {
  if (!req.body.quantity || !req.body.price) {
    return failureResponse(res, 400, 'both quantity and price are required')
  }
  try {
    await modifyProduct(req.body, req.params.productId)
    res.sendStatus(200)
  } catch (err) {
    if (err instanceof ValidationError) {
      const invalidField = err.errors[0].path
      err.message = `${invalidField} must be valid`
      err.status = 400
    }
    next(err)
  }
}

async function getSellerProducts(req, res, next) {
  try {
    const products = await retrieveSellerProducts(req.params.sellerId)
    res.status(200).json({ products })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  getSellerProducts
}
