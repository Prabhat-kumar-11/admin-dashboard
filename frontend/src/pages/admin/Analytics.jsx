import React, { useEffect, useState } from 'react';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import { TasksPieChart, UsersBarChart } from '../../components/charts/Charts';
import { adminService } from '../../services/apiService';
import { showToast } from '../../components/common/Toast';
import { StatsCard } from '../../components/cards/StatsCards';
import { FiUsers, FiCheckSquare } from 'react-icons/fi';

const Analytics = () => {
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <Sidebar />
        <main className="md:ml-64 pt-4 pb-8">
          <div className="text-center py-8">Loading...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Sidebar />

      <main className="md:ml-64 pt-4 pb-8">
        <div className="container">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Analytics</h1>

          {analytics && (
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

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Tasks by Status</h2>
                  <TasksPieChart data={analytics.tasksByStatus} />
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">User Statistics</h2>
                  <UsersBarChart
                    data={[
                      { name: 'Active', value: analytics.users.active },
                      { name: 'Inactive', value: analytics.users.inactive },
                    ]}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Task Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-600">Pending</span>
                      <span className="text-2xl font-bold text-yellow-600">
                        {analytics.tasks.pending}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-600">In Progress</span>
                      <span className="text-2xl font-bold text-blue-600">
                        {analytics.tasks.inProgress}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-600">Completed</span>
                      <span className="text-2xl font-bold text-green-600">
                        {analytics.tasks.completed}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-gray-600 font-medium">Total</span>
                      <span className="text-2xl font-bold text-blue-600">
                        {analytics.tasks.total}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">User Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-600">Active</span>
                      <span className="text-2xl font-bold text-green-600">
                        {analytics.users.active}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-600">Inactive</span>
                      <span className="text-2xl font-bold text-red-600">
                        {analytics.users.inactive}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-gray-600 font-medium">Total</span>
                      <span className="text-2xl font-bold text-blue-600">
                        {analytics.users.total}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Metrics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-600">Completion Rate</span>
                      <span className="text-2xl font-bold text-green-600">
                        {analytics.tasks.total > 0
                          ? Math.round((analytics.tasks.completed / analytics.tasks.total) * 100)
                          : 0}
                        %
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-gray-600">Avg Tasks/User</span>
                      <span className="text-2xl font-bold text-blue-600">
                        {analytics.users.total > 0
                          ? Math.round(analytics.tasks.total / analytics.users.total)
                          : 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Analytics;
