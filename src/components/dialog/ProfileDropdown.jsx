import React, { useEffect, useRef } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';

const ProfileDropdown = ({ isOpen, onClose }) => {
  const dropdownRef = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Close dropdown on clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.addEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  // Handle profileEdit
  const handleProfileEdit = () => {
    navigate("/user/profile");
    onClose();
  };

  // handle Logout
  const handleLogout = () => {
    logout();
    navigate("/auth/login");
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden animate-slideDown"
    >
      {/* User Info Header */}
      <div className="px-4 py-3 bg-linear-to-r from-purple-50 to-blue-50 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-semibold">
            {user?.firstName?.[0]}
            {user?.lastName?.[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-gray-600 truncate">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-2">
        {/* Profile Edit */}
        <button
          onClick={handleProfileEdit}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors group"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
            <User size={16} className="text-blue-600" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-medium text-gray-900">Edit Profile</p>
            <p className="text-xs text-gray-500">Update your information</p>
          </div>
        </button>

        {/* Divider */}
        <div className="my-1 border-t border-gray-100"></div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-red-50 transition-colors group"
        >
          <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
            <LogOut size={16} className="text-red-600" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-medium text-gray-900">Logout</p>
            <p className="text-xs text-gray-500">Sign out of your account</p>
          </div>
        </button>
      </div>
    </div>
  );
}

export default ProfileDropdown