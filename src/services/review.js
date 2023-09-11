const { Review } = require('../models')

async function insertReview(productId, customerId, body) {
  return await Review.create({
    customerId,
    productId,
    rate: body.rate,
    comment: body.comment
  })
}

module.exports = {
  insertReview
}
