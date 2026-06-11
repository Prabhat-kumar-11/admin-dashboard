import api from './apiService';

export const authService = {
  login: (email, password) => {
    return api.post('/auth/login', { email, password });
  },

  register: (name, email, password) => {
    return api.post('/auth/register', { name, email, password });
  },

  getCurrentUser: () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    return api.get('/auth/me');
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};
