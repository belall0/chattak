import HttpError from '../utils/httpError.js';

/**
 * Handles invalid JWT token errors
 */
export const handleJWTError = (err) => {
  return new HttpError('Invalid token. Please log in again', 401);
};

/**
 * Handles expired JWT token errors
 */
export const handleJWTExpiredError = (err) => {
  return new HttpError('Your token has expired. Please log in again', 401);
};
