import React, { useState } from 'react';
import { FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getInitials } from '../../utils/helpers';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            T
          </div>
          <h1 className="text-xl font-bold text-gray-800 hidden sm:block">Task Manager</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-lg">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {getInitials(user?.name)}
            </div>
            <span className="text-sm font-medium text-gray-700">{user?.name}</span>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {user?.role}
            </span>
          </div>

          <div className="relative group">
            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {openMenu ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
            {openMenu && (
              <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg p-2 z-50">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <FiLogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
