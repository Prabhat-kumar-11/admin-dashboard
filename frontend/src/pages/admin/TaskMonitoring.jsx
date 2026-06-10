import React, { useEffect, useState } from 'react';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import { TasksTable } from '../../components/tables/DataTables';
import { adminService } from '../../services/apiService';
import { showToast } from '../../components/common/Toast';

const TaskMonitoring = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchTasks();
  }, [currentPage, statusFilter]);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const response = await adminService.getAllTasks(currentPage, 10, statusFilter);
      setTasks(response.data.tasks);
      setPagination(response.data.pagination);
    } catch (error) {
      showToast.error('Failed to load tasks');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await adminService.deleteTask(taskId);
      showToast.success('Task deleted successfully');
      fetchTasks();
    } catch (error) {
      showToast.error('Failed to delete task');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Sidebar />

      <main className="md:ml-64 pt-4 pb-8">
        <div className="container">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Task Monitoring</h1>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <TasksTable
              tasks={tasks}
              onDelete={handleDeleteTask}
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

export default TaskMonitoring;
