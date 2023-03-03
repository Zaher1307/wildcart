const failureResponse = (res, statusCode, msg) => {
  return res.status(statusCode).json({ msg })
}

module.exports = failureResponse
