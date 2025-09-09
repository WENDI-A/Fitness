import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import {
  getAllTrainers,
  getTrainerById,
  getTrainerAvailability,
  bookPersonalTraining,
  getUserTrainingSessions,
  cancelTrainingSession,
  getTrainers
} from "../controllers/trainerController.js";

const router = express.Router();

// Temporarily disable authentication for testing
// router.use(verifyToken);

// Trainer routes
router.get("/", getAllTrainers);
router.get("/legacy", getTrainers); // Legacy route
router.get("/:id", getTrainerById);
router.get("/:id/availability", getTrainerAvailability);

// Training session routes
router.post("/book-session", bookPersonalTraining);
router.get("/sessions/user/:userId", getUserTrainingSessions);
router.delete("/sessions/:id", cancelTrainingSession);

export default router;