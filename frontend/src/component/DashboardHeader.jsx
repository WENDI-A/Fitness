import React, { useState, useEffect } from "react";
import { FaBell, FaUserCircle, FaSignOutAlt, FaHome, FaBars, FaTimes } from "react-icons/fa";
import SimpleThemeToggle from "../components/SimpleThemeToggle";
import { getAdminNotifications, markNotificationAsRead, markAllNotificationsAsRead } from "../services/api/notificationApi";

const DashboardHeader = ({ user, onLogout, onGoToWebsite }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch notifications for admin users
  useEffect(() => {
    const fetchNotifications = async () => {
      if (user?.role !== 'admin') return;
      
      try {
        setLoading(true);
        const data = await getAdminNotifications();
        if (data && typeof data === 'object') {
          setNotifications(Array.isArray(data.notifications) ? data.notifications : []);
          setUnreadCount(typeof data.unreadCount === 'number' ? data.unreadCount : 0);
        } else {
          setNotifications([]);
          setUnreadCount(0);
          console.warn('Unexpected notifications data format:', data);
        }
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
        setNotifications([]);
        setUnreadCount(0);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === 'admin') {
      fetchNotifications();
      // Set up polling for new notifications every 30 seconds
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  // Close notifications dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showNotifications && !event.target.closest('.notification-dropdown')) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showNotifications]);


  const handleNotificationClick = async (notificationId) => {
    try {
      await markNotificationAsRead(notificationId);
      // Update local state
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notificationId ? { ...notif, is_read: true } : notif
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();
      setNotifications(prev => 
        prev.map(notif => ({ ...notif, is_read: true }))
      );
      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };

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

          {/* Notification Bell - Only for Admin */}
          {user?.role === 'admin' && (
            <div className="relative notification-dropdown">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
              >
                <FaBell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Notifications</h3>
                      {unreadCount > 0 && (
                        <button
                          onClick={handleMarkAllAsRead}
                          className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto">
                    {loading ? (
                      <div className="p-4 text-center text-gray-500">Loading...</div>
                    ) : notifications.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">No notifications</div>
                    ) : (
                      notifications.slice(0, 10).map((notification) => (
                        <div
                          key={notification.id}
                          onClick={() => handleNotificationClick(notification.id)}
                          className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                            !notification.is_read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              !notification.is_read ? 'bg-blue-500' : 'bg-gray-300'
                            }`} />
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-gray-800 dark:text-white">
                                {notification.title}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-2">
                                {new Date(notification.createdAt).toLocaleDateString()} {new Date(notification.createdAt).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  
                  {notifications.length > 10 && (
                    <div className="p-3 border-t border-gray-200 dark:border-gray-700 text-center">
                      <span className="text-sm text-gray-500">Showing 10 of {notifications.length} notifications</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

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
