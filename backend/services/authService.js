const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { logActivity } = require('../middleware/activityLogger');

// Generate JWT Token
exports.generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

// Register User
exports.registerUser = async (name, email, password) => {
  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error('User already exists with this email');
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
    });

    return user;
  } catch (error) {
    throw error;
  }
};

// Login User
exports.loginUser = async (email, password, req) => {
  try {
    // Validate input
    if (!email || !password) {
      throw new Error('Please provide email and password');
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Log activity
    await logActivity(user._id, 'LOGIN', `User ${user.email} logged in`, null, req);

    return user;
  } catch (error) {
    throw error;
  }
};

// Get user by ID
exports.getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw error;
  }
};
