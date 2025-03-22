import User from './../models/user.model.js';
import catchAsync from './../utils/catchAsync.js';
import HttpError from '../utils/httpError.js';
import { generateToken } from '../utils/jwt.js';

export const signup = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    res.status(400);
    throw new HttpError('Please provide name, email and password', 400);
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(409);
    throw new HttpError('User with this email already exists', 409);
  }

  try {
    // Create an instance of user document
    const user = new User({
      name,
      email,
      password,
    });

    // Generate authentication token
    const token = generateToken(user._id);

    // Set Cookie
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    res.cookie('jwt', token, cookieOptions);

    // Save user to database
    await user.save();

    // Return user data and token (excluding password)
    res.status(201).json({
      success: true,

      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },

      token,
    });
  } catch (error) {
    // Let the global error handler take care of it
    throw error;
  }
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    res.status(400);
    throw new HttpError('Please provide both email and password');
  }

  // Find user by email
  const user = await User.findOne({ email });

  // Check if user exists and password is correct
  if (!user || !(await user.isPasswordCorrect(password))) {
    res.status(401);
    throw new HttpError('Invalid email or password');
  }

  // Generate token and set cookie
  const token = generateToken(user._id);
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };

  res.cookie('jwt', token, cookieOptions);

  res.status(200).json({
    success: true,

    data: {
      id: user._id,
      name: user.name,
      email: user.email,
    },

    token,
  });
});

export const logout = catchAsync(async (req, res) => {
  // Set cookie to 'loggedout' and expire in 10 seconds
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 10 * 1000),
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  };
  res.cookie('jwt', 'loggedout', cookieOptions);

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
});
