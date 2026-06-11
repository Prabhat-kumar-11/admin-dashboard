import React from 'react';
import { formatDate, getStatusColor } from '../../utils/helpers';
import { Pagination } from '../common/Common';

export const UsersTable = ({ users, onDelete, onStatusChange, isLoading, pagination, onPageChange }) => {
  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!users || users.length === 0) {
    return <div className="text-center py-8 text-gray-500">No users found</div>;
  }

  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Name</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Email</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Role</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Joined</th>
              <th className="px-6 py-3 text-center font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={user.status}
                    onChange={(e) => onStatusChange(user._id, e.target.value)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${getStatusColor(user.status)}`}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-gray-600">{formatDate(user.createdAt)}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => onDelete(user._id)}
                    className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination && <Pagination {...pagination} onPageChange={onPageChange} />}
    </>
  );
};

export const TasksTable = ({ tasks, onDelete, isLoading, pagination, onPageChange }) => {
  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!tasks || tasks.length === 0) {
    return <div className="text-center py-8 text-gray-500">No tasks found</div>;
  }

  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Title</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Created By</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Priority</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">Due Date</th>
              <th className="px-6 py-3 text-center font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{task.title}</td>
                <td className="px-6 py-4 text-gray-600">
                  {task.createdBy?.name || 'Unknown'}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {task.dueDate ? formatDate(task.dueDate) : '-'}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => onDelete(task._id)}
                    className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination && <Pagination {...pagination} onPageChange={onPageChange} />}
    </>
  );
};
