import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import { getMemberships, createMembership, getMembershipsByCategory, getUserMembership } from "../controllers/membershipController.js";

const router = express.Router();

// Temporarily disable authentication for testing
// router.use(verifyToken);

// Membership routes
router.get("/", getMemberships);
router.get("/user", getUserMembership);
router.get("/category/:category", getMembershipsByCategory);
router.post("/", createMembership);

export default router;
