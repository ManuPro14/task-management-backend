const { stack } = require("../app");

const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: err.messahe || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  })
}

class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

module.exports = {errorHandler, CustomError};