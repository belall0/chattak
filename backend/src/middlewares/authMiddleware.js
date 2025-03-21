import jwt from 'jsonwebtoken';
import { promisify } from 'node:util';

import User from '../models/user.model.js';
import catchAsync from '../utils/catchAsync.js';
import HttpError from '../utils/httpError.js';

export const protectRoute = catchAsync(async (req, res, next) => {
  // Check if token exists
  let token = '';
  const isTokenHeaderExist =
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer') &&
    req.headers.authorization.split(' ')[1] !== 'null';

  if (isTokenHeaderExist) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new HttpError('You are not logged in. Please log in to access this route.', 401));
  }

  // Verify the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new HttpError('The user belonging to this token no longer exists.', 401));
  }

  // Check if user changed password after token was issued
  if (currentUser.isPasswordUpdatedAfter(decoded.iat)) {
    return next(new HttpError('User recently changed password. Please log in again.', 401));
  }

  // Set user in response locals to be used in the next middleware
  req.user = currentUser;

  // Grant access to protected route
  next();
});
