import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import { getUserPayments, createPayment } from "../controllers/paymentController.js";

const router = express.Router();

// Temporarily disable authentication for testing
// router.use(verifyToken);

// Payment routes
router.get("/", getUserPayments);
router.post("/", createPayment);

export default router;