import { User, Feedback } from "../models/index.js";
import { verifyToken } from "../middlewares/auth.js";

import { Op } from "sequelize";

// Get User Feedback
export const getUserFeedback = async (req, res) => {
  try {
    const userId = req.user?.id || 1;

    // Return mock feedback data
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Query feedback table for this user
    const feedbacks = await Feedback.findAll({
      where: { user_id: userId },
      order: [["createdAt", "DESC"]], // newest first

    })

    res.json(feedbacks);

  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ message: error.message });
  }
};

// Create a new feedback
export const createFeedback = async (req, res) => {
  try {
    // console.log("req.user:", req.user);
    // console.log("req.body:", req.body);

    const { rating, comment, feedback_type, trainer_id, class_id, is_anonymous } = req.body;
    const userId = req.user?.id || 1; // TODO: Get from auth middleware

    const newFeedback = await Feedback.create({
      user_id: userId,
      trainer_id: trainer_id || null,
      rating: rating,
      comment: comment || null,
      feedback_type: feedback_type,
      is_anonymous: is_anonymous || false,
      status: 'pending'
    });

    res.status(201).json({
      message: 'Feedback created successfully',
      feedback: newFeedback
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};