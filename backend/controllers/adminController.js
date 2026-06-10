const adminService = require('../services/adminService');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';

    const result = await adminService.getAllUsers(page, limit, search);

    res.status(200).json({
      message: 'Users retrieved successfully',
      ...result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await adminService.deleteUser(id, req.user._id, req);

    res.status(200).json({
      message: 'User deleted successfully',
      user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update user status
exports.updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const user = await adminService.updateUserStatus(id, status, req.user._id, req);

    res.status(200).json({
      message: 'User status updated successfully',
      user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;

    const filter = status ? { status } : {};

    const result = await adminService.getAllTasks(page, limit, filter);

    res.status(200).json({
      message: 'Tasks retrieved successfully',
      ...result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await adminService.deleteTask(id, req.user._id, req);

    res.status(200).json({
      message: 'Task deleted successfully',
      task,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get activity logs
exports.getActivityLogs = async (req, res) => {
  try {
    const ActivityLog = require('../models/ActivityLog');
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const action = req.query.action;
    const userId = req.query.userId;

    const filter = {};
    if (action) filter.action = action;
    if (userId) filter.userId = userId;

    const skip = (page - 1) * limit;

    const logs = await ActivityLog.find(filter)
      .populate('userId', 'name email')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await ActivityLog.countDocuments(filter);

    res.status(200).json({
      message: 'Activity logs retrieved successfully',
      logs,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalLogs: total,
        logsPerPage: limit,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get analytics
exports.getAnalytics = async (req, res) => {
  try {
    const analytics = await adminService.getAnalytics();

    res.status(200).json({
      message: 'Analytics retrieved successfully',
      analytics,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
