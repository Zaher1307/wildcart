async function errHandler(err, req, res, next) {
  const message = err.message || 'something went wrong'
  const status = err.status || 500
  res.status(status).json({ message })
}

module.exports = errHandler
