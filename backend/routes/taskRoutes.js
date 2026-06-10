const express = require('express');
const taskController = require('../controllers/taskController');
const { authenticateUser, authorizeUser, verifyUserStatus } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication and active status
router.use(authenticateUser, verifyUserStatus);

// Get all user's tasks
router.get('/', taskController.getUserTasks);

// Create task
router.post('/', taskController.createTask);

// Get specific task
router.get('/:id', taskController.getTask);

// Update task
router.put('/:id', taskController.updateTask);

// Delete task
router.delete('/:id', taskController.deleteTask);

module.exports = router;
