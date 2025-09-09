import { Trainer } from "../models/index.js";
import { Op } from "sequelize";

// Get all trainers
export const getAllTrainers = async (req, res) => {
  try {
    // Return mock trainer data
    const mockTrainers = [
      {
        id: 1,
        name: "Sarah Johnson",
        specialization: ["Yoga", "Pilates", "Flexibility"],
        experience: 5,
        rating: 4.8,
        reviews: 124,
        hourlyRate: 800,
        bio: "Certified yoga instructor with 5+ years of experience. Specializes in Hatha and Vinyasa yoga styles.",
        certifications: ["RYT-500", "Pilates Certification", "First Aid"],
        availability: ["Monday", "Wednesday", "Friday"],
        isAvailable: true,
        nextAvailable: "Today 2:00 PM"
      },
      {
        id: 2,
        name: "Mike Wilson",
        specialization: ["HIIT", "Cardio", "Weight Loss"],
        experience: 8,
        rating: 4.9,
        reviews: 89,
        hourlyRate: 1200,
        bio: "High-intensity interval training specialist. Helps clients achieve rapid fitness results through structured programs.",
        certifications: ["NASM-CPT", "HIIT Specialist", "Nutrition Coach"],
        availability: ["Tuesday", "Thursday", "Saturday"],
        isAvailable: false,
        nextAvailable: "Tomorrow 10:00 AM"
      },
      {
        id: 3,
        name: "David Brown",
        specialization: ["Strength Training", "Bodybuilding", "Powerlifting"],
        experience: 10,
        rating: 4.7,
        reviews: 156,
        hourlyRate: 1500,
        bio: "Former competitive bodybuilder with extensive knowledge in strength training and muscle building.",
        certifications: ["CSCS", "Powerlifting Coach", "Sports Nutrition"],
        availability: ["Monday", "Tuesday", "Thursday", "Friday"],
        isAvailable: true,
        nextAvailable: "Today 4:00 PM"
      }
    ];

    res.json(mockTrainers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get trainer by ID
export const getTrainerById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Mock trainer data - in real app, fetch from database
    const mockTrainer = {
      id: parseInt(id),
      name: "Sarah Johnson",
      specialization: ["Yoga", "Pilates", "Flexibility"],
      experience: 5,
      rating: 4.8,
      reviews: 124,
      hourlyRate: 800,
      bio: "Certified yoga instructor with 5+ years of experience.",
      certifications: ["RYT-500", "Pilates Certification", "First Aid"],
      availability: ["Monday", "Wednesday", "Friday"],
      isAvailable: true,
      nextAvailable: "Today 2:00 PM"
    };

    res.json(mockTrainer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get trainer availability
export const getTrainerAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.query;
    
    // Mock availability data
    const mockAvailability = {
      trainer_id: parseInt(id),
      date: date || new Date().toISOString().split('T')[0],
      available_slots: [
        { time: "09:00", duration: 60, available: true },
        { time: "10:00", duration: 60, available: false },
        { time: "14:00", duration: 60, available: true },
        { time: "15:00", duration: 60, available: true },
        { time: "16:00", duration: 60, available: false }
      ]
    };

    res.json(mockAvailability);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Book personal training session
export const bookPersonalTraining = async (req, res) => {
  try {
    const { trainer_id, trainer_name, date, time, duration, price, notes } = req.body;
    const userId = req.user?.id || 1;
    
    const newSession = {
      id: Date.now(), // Simple ID generation for mock
      user_id: userId,
      trainer_id,
      trainer_name,
      date,
      time,
      duration,
      price,
      notes,
      status: "confirmed",
      location: "Studio A",
      created_at: new Date().toISOString()
    };
    
    res.status(201).json({
      message: 'Training session booked successfully',
      session: newSession
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user training sessions
export const getUserTrainingSessions = async (req, res) => {
  try {
    const userId = req.params.userId || req.user?.id || 1;
    
    // Mock training sessions data
    const mockSessions = [
      {
        id: 1,
        user_id: userId,
        trainer_id: 1,
        trainer_name: "Sarah Johnson",
        date: "2025-01-21",
        time: "14:00",
        duration: 60,
        price: 800,
        notes: "Focus on flexibility and core strength",
        status: "confirmed",
        location: "Studio A"
      },
      {
        id: 2,
        user_id: userId,
        trainer_id: 3,
        trainer_name: "David Brown",
        date: "2025-01-23",
        time: "16:00",
        duration: 90,
        price: 1875,
        notes: "Strength training session",
        status: "confirmed",
        location: "Weight Room"
      }
    ];

    res.json(mockSessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel training session
export const cancelTrainingSession = async (req, res) => {
  try {
    const { id } = req.params;
    
    res.json({
      message: 'Training session cancelled successfully',
      sessionId: parseInt(id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Legacy function for backward compatibility
export const getTrainers = getAllTrainers;