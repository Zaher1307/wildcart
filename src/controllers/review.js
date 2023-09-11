const { insertReview } = require('../services/review')
const failureResponse = require('../utils/failure-response')

async function createReview(req, res, next) {
  const { rate, comment } = req.body
  if (!rate || !comment) {
    return failureResponse(res, 400, 'rate and comment are required')
  }
  if (rate > 5 || rate < 0) {
    return failureResponse(res, 400, 'rate must be between 0 and 5')
  }
  try {
    const review = await insertReview(
      req.params.productId, req.user.id, req.body
    )
    res.status(201).json({ review })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  createReview
}
