import { User, Feedback } from "../models/index.js";
import { Op } from "sequelize";

// Get User Feedback
export const getUserFeedback = async (req, res) => {
  try {
    const userId = req.user?.id || 1;
    
    // Return mock feedback data
    const mockFeedback = [
      {
        id: 1,
        user_id: userId,
        rating: 5,
        comment: "Great gym facilities and friendly staff!",
        type: "general",
        targetName: "Gym Experience",
        date: "2025-01-15",
        status: "published"
      },
      {
        id: 2,
        user_id: userId,
        rating: 4,
        comment: "The yoga classes are excellent, very relaxing.",
        type: "class",
        targetName: "Morning Yoga",
        date: "2025-01-10",
        status: "published"
      }
    ];

    res.json(mockFeedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new feedback
export const createFeedback = async (req, res) => {
  try {
    const { rating, comment, feedback_type, trainer_id, class_id, is_anonymous } = req.body;
    const userId = req.user?.id || 1; // TODO: Get from auth middleware
    
    const newFeedback = await Feedback.create({
      user_id: userId,
      trainer_id: trainer_id || null,
      class_id: class_id || null,
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