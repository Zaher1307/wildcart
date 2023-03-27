const express = require('express')

const {
  getProducts, createProduct, getProduct, updateProduct, getSellerProducts
} = require('../controllers/product')
const { authenticateSeller } = require('../middlewares/authenticate')

const router = express.Router()

router.post('/', authenticateSeller, createProduct)
router.get('/', getProducts)
router.get('/:productId', getProduct)
router.patch('/:productId', updateProduct)
router.get('/seller/:sellerId', getSellerProducts)

module.exports = router
