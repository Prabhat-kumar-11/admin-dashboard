import React, { useEffect, useState } from 'react';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import { ActivityLogsTable } from '../../components/tables/ActivityTable';
import { adminService } from '../../services/apiService';
import { showToast } from '../../components/common/Toast';

const ActivityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [actionFilter, setActionFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    fetchActivityLogs();
  }, [currentPage, actionFilter, searchTerm, sortOrder]);

  const fetchActivityLogs = async () => {
    try {
      setIsLoading(true);
      const response = await adminService.getActivityLogs(
        currentPage,
        10,
        actionFilter,
        '',
        searchTerm,
        sortOrder
      );
      setLogs(response.data.logs);
      setPagination(response.data.pagination);
    } catch (error) {
      showToast.error('Failed to load activity logs');
    } finally {
      setIsLoading(false);
    }
  };

  const actions = [
    'LOGIN',
    'LOGOUT',
    'CREATE_TASK',
    'UPDATE_TASK',
    'DELETE_TASK',
    'USER_STATUS_UPDATE',
    'USER_DELETED',
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Sidebar />

      <main className="md:ml-64 pt-4 pb-8">
        <div className="container">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Activity Logs</h1>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Activities</label>
                <input
                  type="text"
                  placeholder="Search by user or description..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Action</label>
                <select
                  value={actionFilter}
                  onChange={(e) => {
                    setActionFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Actions</option>
                  {actions.map((action) => (
                    <option key={action} value={action}>
                      {action.replace(/_/g, ' ')}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort by Date</label>
                <select
                  value={sortOrder}
                  onChange={(e) => {
                    setSortOrder(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="desc">Newest First</option>
                  <option value="asc">Oldest First</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <ActivityLogsTable
              logs={logs}
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

export default ActivityLogs;
