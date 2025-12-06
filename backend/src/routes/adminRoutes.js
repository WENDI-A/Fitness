    import express from "express";
    import { 
        getUsersForAdmin, 
        getAllSubscriptions,
        getAllPayments,
        getAllFeedback,
        acceptFeedback, 
        declineFeedback,
        acceptUser,
        declineUser,
        updateSubscriptionStatus,
        updatePaymentStatus
    } from "../controllers/AdminController.js";
    import { verifyToken, verifyAdmin } from "../middlewares/auth.js";

    const router = express.Router();

    // Apply authentication and admin verification to all routes
    router.use(verifyToken);
    router.use(verifyAdmin);

    // GET all users (for admin panel)
    router.get("/users", getUsersForAdmin);
    
    // GET all subscriptions
    router.get("/subscriptions", getAllSubscriptions);
    
    // GET all payments
    router.get("/payments", getAllPayments);
    
    // GET all feedback
    router.get("/feedback", getAllFeedback);

    // User management
    router.post("/users/:id/accept", acceptUser);
    router.post("/users/:id/decline", declineUser);

    // Subscription management
    router.patch("/subscriptions/:id/status", updateSubscriptionStatus);

    // Payment management
    router.patch("/payments/:id/status", updatePaymentStatus);

    // Feedback management
    router.patch("/feedback/:id/accept", acceptFeedback);
    router.patch("/feedback/:id/decline", declineFeedback);

    export default router;
