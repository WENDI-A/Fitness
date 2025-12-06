import express from "express";
import { 
    getAdminNotifications, 
    markNotificationAsRead, 
    markAllNotificationsAsRead 
} from "../controllers/notificationController.js";
import { verifyToken, verifyAdmin } from "../middlewares/auth.js";

const router = express.Router();

// Apply authentication and admin verification to all routes
router.use(verifyToken);
router.use(verifyAdmin);

// GET all notifications for admin
router.get("/", getAdminNotifications);

// PATCH mark single notification as read
router.patch("/:id/read", markNotificationAsRead);

// PATCH mark all notifications as read
router.patch("/read-all", markAllNotificationsAsRead);

export default router;
