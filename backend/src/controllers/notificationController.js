import { Notification } from "../models/index.js";

// Get all notifications for admin
export const getAdminNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      order: [['createdAt', 'DESC']],
      limit: 50 // Limit to last 50 notifications
    });
    
    const unreadCount = await Notification.count({
      where: { is_read: false }
    });
    
    res.json({ 
      notifications, 
      unreadCount 
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Failed to load notifications" });
  }
};

// Mark notification as read
export const markNotificationAsRead = async (req, res) => {
  try {
    // Input validation
    if (!req.params.id || isNaN(req.params.id)) {
      return res.status(400).json({ message: "Valid notification ID required" });
    }

    const { id } = req.params;
    
    const notification = await Notification.findByPk(id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    
    notification.is_read = true;
    await notification.save();
    
    res.json({ message: "Notification marked as read", notification: { id: notification.id, is_read: notification.is_read } });
  } catch (error) {
    console.error("Error updating notification:", error);
    res.status(500).json({ message: "Failed to update notification" });
  }
};

// Mark all notifications as read
export const markAllNotificationsAsRead = async (req, res) => {
  try {
    await Notification.update(
      { is_read: true },
      { where: { is_read: false } }
    );
    
    res.json({ message: "All notifications marked as read" });
  } catch (error) {
    console.error("Error updating notifications:", error);
    res.status(500).json({ message: "Failed to update notifications" });
  }
};

// Create notification (helper function for other controllers)
export const createNotification = async (title, message, type, related_id = null, priority = "medium") => {
  try {
    const notification = await Notification.create({
      title,
      message,
      type,
      related_id,
      priority
    });
    return notification;
  } catch (error) {
    console.error("Error creating notification:", error);
    return null;
  }
};
