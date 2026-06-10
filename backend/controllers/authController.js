const authService = require('../services/authService');

// Register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await authService.registerUser(name, email, password);
    const token = authService.generateToken(user._id);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: user.toJSON(),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await authService.loginUser(email, password, req);
    const token = authService.generateToken(user._id);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: user.toJSON(),
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

// Get Current User
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await authService.getUserById(req.user._id);

    res.status(200).json({
      user: user.toJSON(),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Logout
exports.logout = async (req, res) => {
  try {
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
