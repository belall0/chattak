import HttpError from '../utils/httpError.js';

/**
 * Handles Mongoose CastError (invalid data type)
 */
export const handleDBCastError = (err) => {
  // 1. Extract the invalid path and value
  const message = `Invalid ${err.path} value: ${err.value}`;

  // 2. Return a new instance of HttpError with a 400 status code to be caught by the global error handler
  return new HttpError(message, 400);
};

/**
 * Handles MongoDB duplicate key errors
 */
export const handleDBDuplicateFields = (err) => {
  // 1. Extract the duplicate key and value
  const { keyValue } = err;

  // 2. Extract the property and value from the keyValue object
  const property = Object.keys(keyValue)[0];
  const value = keyValue[property];

  // 3. Create a message with the property and value
  const message = `Duplicate value for ${property}: '${value}'`;

  // 4. Return a new instance of HttpError with a 400 status code to be caught by the global error handler
  return new HttpError(message, 400);
};

/**
 * Handles Mongoose validation errors
 */
export const handleDBValidationError = (err) => {
  // 1. Extract all error messages from the error object
  const errorMessages = Object.values(err.errors)
    .reverse()
    .map((err, indx) => {
      const { message } = err;
      return `${indx + 1}) ${message}`;
    });

  return new HttpError(errorMessages.join('. '), 400);
};
