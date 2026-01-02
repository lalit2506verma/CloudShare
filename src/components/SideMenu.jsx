import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { UserRound } from 'lucide-react';
import { SIDE_MENU_DATA } from '../data/SideMenuData';
import { useNavigate } from 'react-router-dom';

const SideMenu = ({onclose, activeMenu}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const getFullName = () => {

    const firstName = user.firstName || "";
    const lastName = user.lastName || "";

    // Trim and add firstName and LastName only if both exist
    const fullName = `${firstName} ${lastName}`.trim();

    return fullName || "";
  }

  const handleNavigation = (path) => {
    navigate(path);

    // Close Mobile menu after navigation
    if (onclose) {
      onclose();
    }
  }
  
  return (
    <div className="w-64 h-[calc(100vh-63px)] bg-white border-r border-gray-200/50 p-5 sticky top-15.25">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        {user?.photoURL ? (
          <img
            src={user?.photoURL || ""}
            alt="Profile Image"
            className="size-20 bg-slate-400 rounded-full"
          />
        ) : (
          <UserRound className="size-20 text-xl text-blue-500 rounded-full border-4" />
        )}

        <h5 className="text-gray-950 font-semibold leading-6">
          {getFullName()}
        </h5>
      </div>

      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={index}
          className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 transition-all duration-200 cursor-pointer ${activeMenu == item.label ? "bg-purple-500 text-white font-medium shadow-md hover:bg-purple-600": "hover:bg-gray-100"}`}
          onClick={() => handleNavigation(item.path)}
        >
          <item.icon className="text-xl" />
          <span className="font-semibold">{ item.label }</span>
        </button>
      ))}
    </div>
  );
}

export default SideMenu