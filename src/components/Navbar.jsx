import { Menu, UserRound, Wallet, X } from "lucide-react";
import React, { useState } from "react";
import { TbCloudShare } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import SideMenu from "./SideMenu";
import DisplayCredits from "./DisplayCredits";

const Navbar = ({openSideMenu, setOpenSideMenu, activeMenu}) => {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-between gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-4 sm:px-7 sticky top-0 z-30">
      {/* Left Side - Title and menu button */}
      <div className="flex items-center gap-5">
        {/* Mobile Menu Toggle - Only show if user is logged in */}
        {user && (
          <button
            onClick={() => setOpenSideMenu(!openSideMenu)}
            className="block lg:hidden text-black hover:bg-gray-100 p-1 rounded transition-colors"
          >
            {openSideMenu ? (
              <X className="text-2xl" />
            ) : (
              <Menu className="text-2xl" />
            )}
          </button>
        )}

        <Link to="/" className="flex items-center gap-2">
          <TbCloudShare className="text-blue-600" size={25} />
          <span className="text-lg font-semibold text-black truncate">
            Cloud Share
          </span>
        </Link>
      </div>

      {/* Right side - Profile and credits button */}
      {user && (
        <div className="flex items-center gap-4">
          <Link to="/subscription">
            <DisplayCredits credits={5}/>
          </Link>
          
          {/* Profile Button */}
          <div className="relative">
            <button className="flex items-center justify-center rounded-full size-9 bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-300 hover:border-gray-700">
              <UserRound className="text-gray-700" />
            </button>
          </div>
        </div>
      )}

      {/* Mobile side menu */}
      {openSideMenu && (
        <div className="fixed top-18.25 left-0 right-0 bg-white border-b border-gray-200 lg:hidden z-20">
          {/* Side menu bar */}
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
