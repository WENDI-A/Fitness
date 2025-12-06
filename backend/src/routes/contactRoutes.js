import express from "express";
import {
    submitContact,
    getAllContacts,
    updateContactStatus,
    deleteContact
} from "../controllers/contactController.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// Public route - submit contact form
router.post("/submit", submitContact);

// Admin routes - require authentication
router.get("/", verifyToken, getAllContacts);
router.patch("/:id/status", verifyToken, updateContactStatus);
router.delete("/:id", verifyToken, deleteContact);

export default router;
