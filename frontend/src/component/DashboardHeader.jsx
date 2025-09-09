import React, { useState } from "react";
import { FaBell, FaUserCircle, FaSignOutAlt, FaHome, FaBars, FaTimes } from "react-icons/fa";
import SimpleThemeToggle from "../components/SimpleThemeToggle";

const DashboardHeader = ({ user, onLogout, onGoToWebsite }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-4 py-3 z-30">
      <div className="flex items-center justify-between">
        
        {/* Left side: Welcome text */}
        <h1 className="text-lg sm:text-2xl font-semibold text-gray-800 dark:text-white">
          Welcome back, {user?.first_name}!
        </h1>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-4">
          <SimpleThemeToggle />

          <button className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors">
            <FaBell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>

          <div className="flex items-center space-x-3">
            <FaUserCircle className="w-8 h-8 text-gray-600 dark:text-gray-300" />
            <div className="text-sm hidden lg:block">
              <div className="font-medium text-gray-800 dark:text-white">
                {user?.first_name} {user?.last_name}
              </div>
              <div className="text-gray-600 dark:text-gray-300 capitalize">
                {user?.role || "Member"}
              </div>
            </div>
          </div>

          <button
            onClick={onGoToWebsite}
            className="flex items-center space-x-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <FaHome className="w-4 h-4" />
            <span>Website</span>
          </button>

          <button
            onClick={onLogout}
            className="flex items-center space-x-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <FaSignOutAlt className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-gray-600 dark:text-gray-300"
        >
          {mobileOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {mobileOpen && (
        <div className="flex flex-col items-start mt-3 space-y-3 md:hidden">
          <SimpleThemeToggle />
          <button onClick={onGoToWebsite} className="flex items-center space-x-2 w-full px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            <FaHome />
            <span>Website</span>
          </button>
          <button onClick={onLogout} className="flex items-center space-x-2 w-full px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      )}
    </header>
  );
};

export default DashboardHeader;
