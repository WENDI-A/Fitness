import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import { getDashboardOverview } from "../controllers/dashboardController.js";

const router = express.Router();

// Temporarily disable authentication for testing
// router.use(verifyToken);

// Dashboard overview
router.get("/overview/:userId", getDashboardOverview);

// Note: Individual routes have been moved to dedicated route files
// /api/payments - paymentRoutes.js
// /api/schedule - scheduleRoutes.js
// /api/subscriptions - subscriptionRoutes.js
// /api/nutrition - nutritionPlanRoutes.js
// /api/feedback - feedbackRoutes.js
// /api/trainers - trainerRoutes.js
// /api/memberships - membershipRoutes.js

export default router;
