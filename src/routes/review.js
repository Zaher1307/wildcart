const express = require('express')
const { createReview } = require('../controllers/review')
const { authenticateCustomer } = require('../middlewares/authenticate')

const router = express.Router()

router.post('/:productId', authenticateCustomer, createReview)

module.exports = router
