const taskService = require('../services/taskService');

// Get user's tasks
exports.getUserTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;

    const filter = status ? { status } : {};

    const result = await taskService.getUserTasks(req.user._id, page, limit, filter);

    res.status(200).json({
      message: 'Tasks retrieved successfully',
      ...result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create task
exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const task = await taskService.createTask(
      { title, description, priority, dueDate },
      req.user._id,
      req
    );

    res.status(201).json({
      message: 'Task created successfully',
      task,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get task
exports.getTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await taskService.getTaskById(id);

    // Verify ownership (unless user is admin)
    if (task.createdBy._id.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Not authorized to view this task' });
    }

    res.status(200).json({
      message: 'Task retrieved successfully',
      task,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await taskService.updateTask(id, req.user._id, req.body, req);

    res.status(200).json({
      message: 'Task updated successfully',
      task,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await taskService.deleteTask(id, req.user._id, req);

    res.status(200).json({
      message: 'Task deleted successfully',
      task,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
