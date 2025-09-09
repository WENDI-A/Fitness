import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import { getUserFeedback, createFeedback } from "../controllers/feedbackController.js";

const router = express.Router();

// Temporarily disable authentication for testing
// router.use(verifyToken);

// Feedback routes
router.get("/", getUserFeedback);
router.post("/", createFeedback);

export default router;