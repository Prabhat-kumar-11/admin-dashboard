import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Task Service
export const taskService = {
  // Get all user's tasks
  getUserTasks: (page = 1, limit = 10, status = '') => {
    return api.get('/tasks', {
      params: { page, limit, status: status || undefined },
    });
  },

  // Create task
  createTask: (taskData) => {
    return api.post('/tasks', taskData);
  },

  // Get single task
  getTask: (id) => {
    return api.get(`/tasks/${id}`);
  },

  // Update task
  updateTask: (id, updateData) => {
    return api.put(`/tasks/${id}`, updateData);
  },

  // Delete task
  deleteTask: (id) => {
    return api.delete(`/tasks/${id}`);
  },
};

// Admin Service
export const adminService = {
  // User Management
  getAllUsers: (page = 1, limit = 10, search = '') => {
    return api.get('/admin/users', {
      params: { page, limit, search: search || undefined },
    });
  },

  deleteUser: (id) => {
    return api.delete(`/admin/users/${id}`);
  },

  updateUserStatus: (id, status) => {
    return api.put(`/admin/users/${id}/status`, { status });
  },

  // Task Monitoring
  getAllTasks: (page = 1, limit = 10, status = '') => {
    return api.get('/admin/tasks', {
      params: { page, limit, status: status || undefined },
    });
  },

  deleteTask: (id) => {
    return api.delete(`/admin/tasks/${id}`);
  },

  // Activity Logs
  getActivityLogs: (page = 1, limit = 10, action = '', userId = '') => {
    return api.get('/admin/activity-logs', {
      params: {
        page,
        limit,
        action: action || undefined,
        userId: userId || undefined,
      },
    });
  },

  // Analytics
  getAnalytics: () => {
    return api.get('/admin/analytics');
  },
};

export default api;
