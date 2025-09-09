import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import { getUserSubscription, createSubscription, getSubscriptionHistory, getAvailableUpgrades, getSubscriptionOptions } from "../controllers/subscriptionController.js";

const router = express.Router();

// Temporarily disable authentication for testing
// router.use(verifyToken);

// Subscription routes
router.get("/options", getSubscriptionOptions);
router.get("/:userId", getUserSubscription);
router.get("/history/:userId", getSubscriptionHistory);
router.get("/upgrades/:userId", getAvailableUpgrades);
router.post("/", createSubscription);

export default router;