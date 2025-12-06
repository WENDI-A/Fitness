const API_BASE_URL = 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  };
};

// Get all notifications for admin
export const getAdminNotifications = async () => {
  const res = await fetch(`${API_BASE_URL}/notifications`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch notifications');
  return res.json();
};

// Mark notification as read
export const markNotificationAsRead = async (notificationId) => {
  const res = await fetch(`${API_BASE_URL}/notifications/${notificationId}/read`, {
    method: 'PATCH',
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to mark notification as read');
  return res.json();
};

// Mark all notifications as read
export const markAllNotificationsAsRead = async () => {
  const res = await fetch(`${API_BASE_URL}/notifications/read-all`, {
    method: 'PATCH',
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to mark all notifications as read');
  return res.json();
};
