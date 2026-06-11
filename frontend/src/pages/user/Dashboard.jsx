import React, { useEffect, useState } from 'react';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import { StatsCard } from '../../components/cards/StatsCards';
import { FiCheckSquare } from 'react-icons/fi';
import { taskService } from '../../services/apiService';
import { showToast } from '../../components/common/Toast';

const UserDashboard = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [allTasks, completedTasks, pendingTasks, inProgressTasks] = await Promise.all([
        taskService.getUserTasks(1, 1),
        taskService.getUserTasks(1, 1, 'Completed'),
        taskService.getUserTasks(1, 1, 'Pending'),
        taskService.getUserTasks(1, 1, 'In Progress'),
      ]);

      setStats({
        tasks: {
          total: allTasks.data.pagination.totalTasks,
          completed: completedTasks.data.pagination.totalTasks,
          pending: pendingTasks.data.pagination.totalTasks,
          inProgress: inProgressTasks.data.pagination.totalTasks,
        },
      });
    } catch (error) {
      showToast.error('Failed to load dashboard');
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
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

          {isLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : stats ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatsCard
                icon={FiCheckSquare}
                label="Total Tasks"
                value={stats.tasks.total}
                color="blue"
              />
              <StatsCard
                icon={FiCheckSquare}
                label="Completed Tasks"
                value={stats.tasks.completed}
                color="green"
              />
              <StatsCard
                icon={FiCheckSquare}
                label="Pending Tasks"
                value={stats.tasks.pending}
                color="orange"
              />
            </div>
          ) : null}

          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Stats</h2>
            {stats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">{stats.tasks.total}</p>
                  <p className="text-gray-600 text-sm mt-1">Total Tasks</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">{stats.tasks.completed}</p>
                  <p className="text-gray-600 text-sm mt-1">Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-yellow-600">{stats.tasks.pending}</p>
                  <p className="text-gray-600 text-sm mt-1">Pending</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">{stats.tasks.inProgress}</p>
                  <p className="text-gray-600 text-sm mt-1">In Progress</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
