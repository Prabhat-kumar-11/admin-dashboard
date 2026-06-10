import React, { useEffect, useState } from 'react';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import { adminService } from '../../services/apiService';
import { showToast } from '../../components/common/Toast';
import { StatsCard } from '../../components/cards/StatsCards';
import { FiUsers, FiCheckSquare } from 'react-icons/fi';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await adminService.getAnalytics();
      setAnalytics(response.data.analytics);
    } catch (error) {
      showToast.error('Failed to load analytics');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Sidebar />

      <main className="md:ml-64 pt-4 pb-8">
        <div className="container">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

          {isLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : analytics ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <StatsCard
                  icon={FiUsers}
                  label="Total Users"
                  value={analytics.users.total}
                  color="blue"
                />
                <StatsCard
                  icon={FiUsers}
                  label="Active Users"
                  value={analytics.users.active}
                  color="green"
                />
                <StatsCard
                  icon={FiCheckSquare}
                  label="Total Tasks"
                  value={analytics.tasks.total}
                  color="purple"
                />
                <StatsCard
                  icon={FiCheckSquare}
                  label="Completed Tasks"
                  value={analytics.tasks.completed}
                  color="orange"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Task Breakdown</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pending</span>
                      <span className="font-bold text-yellow-600">{analytics.tasks.pending}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">In Progress</span>
                      <span className="font-bold text-blue-600">{analytics.tasks.inProgress}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Completed</span>
                      <span className="font-bold text-green-600">{analytics.tasks.completed}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">User Status</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Active Users</span>
                      <span className="font-bold text-green-600">{analytics.users.active}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Inactive Users</span>
                      <span className="font-bold text-red-600">{analytics.users.inactive}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Tasks</span>
                      <span className="font-bold text-blue-600">{analytics.tasks.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Completion Rate</span>
                      <span className="font-bold text-green-600">
                        {analytics.tasks.total > 0 
                          ? Math.round((analytics.tasks.completed / analytics.tasks.total) * 100) 
                          : 0}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
