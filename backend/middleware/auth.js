const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { ROLES } = require('../config/constants');

// Authenticate user - verify JWT token
exports.authenticateUser = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Authorize admin - only admin users can access
exports.authorizeAdmin = (req, res, next) => {
  if (req.user.role !== ROLES.ADMIN) {
    return res.status(403).json({
      message: 'Access denied. Admin role required.',
    });
  }
  next();
};

// Authorize user - only authenticated users (User or Admin) can access
exports.authorizeUser = (req, res, next) => {
  if (req.user.role !== ROLES.USER && req.user.role !== ROLES.ADMIN) {
    return res.status(403).json({
      message: 'Access denied. User role required.',
    });
  }
  next();
};

// Verify user is active
exports.verifyUserStatus = (req, res, next) => {
  if (req.user.status === 'Inactive') {
    return res.status(403).json({
      message: 'Your account is inactive. Please contact the administrator.',
    });
  }
  next();
};
