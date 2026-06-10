import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  FiHome,
  FiCheckSquare,
  FiUsers,
  FiActivity,
  FiBarChart2,
  FiList,
} from 'react-icons/fi';

const Sidebar = () => {
  const { isAdmin } = useAuth();

  const userMenuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: FiHome },
    { path: '/tasks', label: 'My Tasks', icon: FiCheckSquare },
  ];

  const adminMenuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: FiHome },
    { path: '/admin/users', label: 'User Management', icon: FiUsers },
    { path: '/admin/tasks', label: 'Task Monitoring', icon: FiList },
    { path: '/admin/activities', label: 'Activity Logs', icon: FiActivity },
    { path: '/admin/analytics', label: 'Analytics', icon: FiBarChart2 },
  ];

  const menuItems = isAdmin() ? adminMenuItems : userMenuItems;

  return (
    <aside className="fixed left-0 top-16 w-64 h-full bg-gray-900 text-white overflow-y-auto hidden md:block">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`
              }
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
