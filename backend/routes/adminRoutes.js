const express = require('express');
const adminController = require('../controllers/adminController');
const { authenticateUser, authorizeAdmin, verifyUserStatus } = require('../middleware/auth');

const router = express.Router();

// All admin routes require authentication, admin role, and active status
router.use(authenticateUser, verifyUserStatus, authorizeAdmin);

// User Management
router.get('/users', adminController.getAllUsers);
router.delete('/users/:id', adminController.deleteUser);
router.put('/users/:id/status', adminController.updateUserStatus);

// Task Monitoring
router.get('/tasks', adminController.getAllTasks);
router.delete('/tasks/:id', adminController.deleteTask);

// Activity Logs
router.get('/activity-logs', adminController.getActivityLogs);

// Analytics
router.get('/analytics', adminController.getAnalytics);

module.exports = router;
