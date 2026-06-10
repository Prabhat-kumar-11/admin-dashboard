const Task = require('../models/Task');
const { logActivity } = require('../middleware/activityLogger');
const { ACTIVITY_ACTIONS } = require('../config/constants');

// Get all tasks for user
exports.getUserTasks = async (userId, page = 1, limit = 10, filter = {}) => {
  try {
    const skip = (page - 1) * limit;
    const query = { createdBy: userId, ...filter };

    const tasks = await Task.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Task.countDocuments(query);

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

// Create task
exports.createTask = async (taskData, userId, req) => {
  try {
    const task = await Task.create({
      ...taskData,
      createdBy: userId,
    });

    // Log activity
    await logActivity(
      userId,
      ACTIVITY_ACTIONS.CREATE_TASK,
      `Task "${task.title}" created`,
      { taskId: task._id },
      req
    );

    return task;
  } catch (error) {
    throw error;
  }
};

// Get single task
exports.getTaskById = async (taskId) => {
  try {
    const task = await Task.findById(taskId).populate('createdBy', 'name email');
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  } catch (error) {
    throw error;
  }
};

// Update task
exports.updateTask = async (taskId, userId, updateData, req) => {
  try {
    const task = await Task.findById(taskId);

    if (!task) {
      throw new Error('Task not found');
    }

    // Verify ownership
    if (task.createdBy.toString() !== userId.toString()) {
      throw new Error('Not authorized to update this task');
    }

    // Update task
    Object.assign(task, updateData);
    await task.save();

    // Log activity
    await logActivity(
      userId,
      ACTIVITY_ACTIONS.UPDATE_TASK,
      `Task "${task.title}" updated`,
      { taskId: task._id, changes: updateData },
      req
    );

    return task;
  } catch (error) {
    throw error;
  }
};

// Delete task
exports.deleteTask = async (taskId, userId, req) => {
  try {
    const task = await Task.findById(taskId);

    if (!task) {
      throw new Error('Task not found');
    }

    // Verify ownership
    if (task.createdBy.toString() !== userId.toString()) {
      throw new Error('Not authorized to delete this task');
    }

    await Task.findByIdAndDelete(taskId);

    // Log activity
    await logActivity(
      userId,
      ACTIVITY_ACTIONS.DELETE_TASK,
      `Task "${task.title}" deleted`,
      { taskId: task._id },
      req
    );

    return task;
  } catch (error) {
    throw error;
  }
};
