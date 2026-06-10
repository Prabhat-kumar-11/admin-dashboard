import React, { useEffect, useState } from 'react';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import { UsersTable } from '../../components/tables/DataTables';
import { adminService } from '../../services/apiService';
import { showToast } from '../../components/common/Toast';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchTerm]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await adminService.getAllUsers(currentPage, 10, searchTerm);
      setUsers(response.data.users);
      setPagination(response.data.pagination);
    } catch (error) {
      showToast.error('Failed to load users');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await adminService.deleteUser(userId);
      showToast.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      showToast.error('Failed to delete user');
    }
  };

  const handleStatusChange = async (userId, status) => {
    try {
      await adminService.updateUserStatus(userId, status);
      showToast.success('User status updated successfully');
      fetchUsers();
    } catch (error) {
      showToast.error('Failed to update user status');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Sidebar />

      <main className="md:ml-64 pt-4 pb-8">
        <div className="container">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">User Management</h1>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <UsersTable
              users={users}
              onDelete={handleDeleteUser}
              onStatusChange={handleStatusChange}
              isLoading={isLoading}
              pagination={pagination}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserManagement;
