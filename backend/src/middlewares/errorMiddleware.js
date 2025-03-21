import * as mongooseErrorHandler from './mongooseErrorHandler.js';
import * as jwtErrorHandler from './jwtErrorHandler.js';

const ENV = process.env.NODE_ENV;

/**
 * Sends detailed error response in development environment
 */
const sendErrorDev = (err, req, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

/**
 * Sends limited error response in production environment
 */
const sendErrorProd = (err, req, res) => {
  // Handle operational errors (expected errors)
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Handle programming errors (unexpected) - hide details
  res.status(500).json({
    status: 'error',
    message: 'Internal server error, please try again later',
  });
};

/**
 * Global error handling middleware,
 * catches all errors in the request-response when you invoke next(new HttpError())
 */

const globalMiddlewareHandler = (err, req, res, next) => {
  // 1. Set default error properties
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (ENV === 'development') {
    // just send the error as it is without hiding details
    sendErrorDev(err, req, res);
  } else if (ENV === 'production') {
    // 1. Create a copy of the error object to avoid mutating the original error object
    let error = { ...err };

    // NOTE: spread operator does not copy properties defined in prototype chain
    // so we need to copy them manually
    error.message = err.message;
    error.name = err.name;
    error.code = err.code;

    // Handle Mongoose errors
    if (error.name === 'CastError') {
      error = mongooseErrorHandler.handleDBCastError(error);
    } else if (error.name === 'ValidationError') {
      error = mongooseErrorHandler.handleDBValidationError(error);
    } else if (error.code === 11000) {
      error = mongooseErrorHandler.handleDBDuplicateFields(error);
    }
    // Handle JWT errors
    else if (error.name === 'JsonWebTokenError') {
      error = jwtErrorHandler.handleJWTError();
    } else if (error.name === 'TokenExpiredError') {
      error = jwtErrorHandler.handleJWTExpiredError();
    }

    sendErrorProd(error, req, res);
  }
};

export default globalMiddlewareHandler;
