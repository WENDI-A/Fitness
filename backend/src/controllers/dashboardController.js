import { User } from "../models/index.js";
import { Op } from "sequelize";

// Get Dashboard Overview Data
export const getDashboardOverview = async (req, res) => {
  try {
    const userId = req.user?.id || 1; // Fallback for testing
    
    // Get user info
    const user = await User.findByPk(userId);

    // For now, return mock data since we don't have database setup
    const mockData = {
      user: user || { id: userId, name: "John Doe", email: "john@example.com" },
      recentPayments: [
        { id: 1, amount: 4000, status: "completed", date: "2025-01-15", description: "Monthly Membership" },
        { id: 2, amount: 3500, status: "completed", date: "2025-01-10", description: "Personal Training" }
      ],
      upcomingClasses: [
        { id: 1, class_name: "Yoga Class", date: "2025-01-20", time: "18:00" },
        { id: 2, class_name: "Strength Training", date: "2025-01-22", time: "19:00" }
      ],
      nutritionPlan: { id: 1, name: "Weight Loss Plan", calories: 1800, is_active: true },
      stats: {
        totalWorkouts: 24,
        totalPayments: 12,
        memberSince: new Date("2024-01-01")
      }
    };

    res.json(mockData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};







