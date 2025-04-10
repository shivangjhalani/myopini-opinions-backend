const mongoose = require('mongoose');
const { AppError } = require('../utils/errors');

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Handle Mongoose validation errors
  if (err instanceof mongoose.Error.ValidationError) {
    const errors = Object.values(err.errors).map(error => error.message);
    return res.status(400).json({
      status: 'fail',
      error: 'Validation Error',
      details: errors
    });
  }

  // Handle Mongoose CastError (invalid ObjectId)
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      status: 'fail',
      error: 'Invalid input',
      details: err.message
    });
  }

  // Handle custom AppError instances
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err.message
    });
  }

  // Handle unknown errors
  return res.status(500).json({
    status: 'error',
    error: 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { details: err.message })
  });
};

module.exports = errorHandler;