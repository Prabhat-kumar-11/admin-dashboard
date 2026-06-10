const User = require('../models/User');
const Task = require('../models/Task');
const ActivityLog = require('../models/ActivityLog');
const { logActivity } = require('../middleware/activityLogger');
const { STATUS, ACTIVITY_ACTIONS } = require('../config/constants');

// Get all users
exports.getAllUsers = async (page = 1, limit = 10, search = '') => {
  try {
    const query = search
      ? { $or: [{ name: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }] }
      : {};

    const skip = (page - 1) * limit;

    const users = await User.find(query).skip(skip).limit(limit).sort({ createdAt: -1 });
    const total = await User.countDocuments(query);

    return {
      users,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalUsers: total,
        usersPerPage: limit,
      },
    };
  } catch (error) {
    throw error;
  }
};

// Delete user
exports.deleteUser = async (userId, adminId, req) => {
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Log activity
    await logActivity(
      adminId,
      ACTIVITY_ACTIONS.USER_DELETED,
      `User ${user.email} has been deleted`,
      { deletedUserId: userId },
      req
    );

    return user;
  } catch (error) {
    throw error;
  }
};

// Update user status
exports.updateUserStatus = async (userId, status, adminId, req) => {
  try {
    // Validate status
    if (![STATUS.ACTIVE, STATUS.INACTIVE].includes(status)) {
      throw new Error('Invalid status');
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { status },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new Error('User not found');
    }

    // Log activity
    await logActivity(
      adminId,
      ACTIVITY_ACTIONS.USER_STATUS_UPDATE,
      `User ${user.email} status changed to ${status}`,
      { userId, newStatus: status },
      req
    );

    return user;
  } catch (error) {
    throw error;
  }
};

// Get all tasks
exports.getAllTasks = async (page = 1, limit = 10, filter = {}) => {
  try {
    const skip = (page - 1) * limit;

    const tasks = await Task.find(filter)
      .populate('createdBy', 'name email')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Task.countDocuments(filter);

    return {
      tasks,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalTasks: total,
        tasksPerPage: limit,
      },
    };
  } catch (error) {
    throw error;
  }
};

// Delete task
exports.deleteTask = async (taskId, adminId, req) => {
  try {
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      throw new Error('Task not found');
    }

    // Log activity
    await logActivity(
      adminId,
      ACTIVITY_ACTIONS.DELETE_TASK,
      `Task "${task.title}" has been deleted`,
      { deletedTaskId: taskId },
      req
    );

    return task;
  } catch (error) {
    throw error;
  }
};

// Get analytics
exports.getAnalytics = async () => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ status: STATUS.ACTIVE });
    const inactiveUsers = await User.countDocuments({ status: STATUS.INACTIVE });

    const totalTasks = await Task.countDocuments();
    const completedTasks = await Task.countDocuments({ status: 'Completed' });
    const pendingTasks = await Task.countDocuments({ status: 'Pending' });
    const inProgressTasks = await Task.countDocuments({ status: 'In Progress' });

    const tasksByStatus = await Task.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    const recentActivities = await ActivityLog.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .limit(10);

    return {
      users: {
        total: totalUsers,
        active: activeUsers,
        inactive: inactiveUsers,
      },
      tasks: {
        total: totalTasks,
        completed: completedTasks,
        pending: pendingTasks,
        inProgress: inProgressTasks,
      },
      tasksByStatus,
      recentActivities,
    };
  } catch (error) {
    throw error;
  }
};
