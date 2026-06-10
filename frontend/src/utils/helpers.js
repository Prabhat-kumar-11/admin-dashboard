// Utility functions for common operations

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTime = (date) => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const getStatusColor = (status) => {
  const colors = {
    Active: 'bg-green-100 text-green-800',
    Inactive: 'bg-red-100 text-red-800',
    Pending: 'bg-yellow-100 text-yellow-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    Completed: 'bg-green-100 text-green-800',
    Low: 'bg-gray-100 text-gray-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    High: 'bg-red-100 text-red-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

export const getActionBadgeColor = (action) => {
  const colors = {
    LOGIN: 'bg-blue-100 text-blue-800',
    LOGOUT: 'bg-gray-100 text-gray-800',
    CREATE_TASK: 'bg-green-100 text-green-800',
    UPDATE_TASK: 'bg-yellow-100 text-yellow-800',
    DELETE_TASK: 'bg-red-100 text-red-800',
    USER_STATUS_UPDATE: 'bg-purple-100 text-purple-800',
    USER_DELETED: 'bg-red-100 text-red-800',
  };
  return colors[action] || 'bg-gray-100 text-gray-800';
};

export const getInitials = (name) => {
  if (!name) return 'U';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};
