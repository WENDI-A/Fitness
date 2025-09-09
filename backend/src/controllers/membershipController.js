import { Membership, User } from "../models/index.js";
import { Op } from "sequelize";

// Get User Membership
export const getUserMembership = async (req, res) => {
  try {
    const userId = req.user?.id || 1;
    
    // Return mock membership data
    const mockMembership = {
      id: 1,
      user_id: userId,
      title: "Premium Membership",
      category: "premium",
      status: "active",
      startDate: "2024-01-15",
      endDate: "2025-01-15",
      autoRenew: true,
      price: 99,
      features: [
        "Unlimited gym access",
        "All group classes",
        "Personal trainer sessions",
        "Nutrition consultation",
        "Premium equipment access",
        "Guest passes (2/month)"
      ]
    };

    res.json(mockMembership);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all memberships
export const getMemberships = async (req, res) => {
  try {
    const memberships = await Membership.findAll({
      where: { is_active: true },
      order: [['category', 'ASC'], ['validity_days', 'ASC']]
    });
    res.json(memberships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new membership
export const createMembership = async (req, res) => {
  try {
    const { title, category, men_price, women_price, validity_days, features, is_highlighted } = req.body;
    
    const newMembership = await Membership.create({
      title: title,
      category: category,
      men_price: men_price,
      women_price: women_price,
      validity_days: validity_days,
      features: features || [],
      is_highlighted: is_highlighted || false,
      is_active: true
    });
    
    res.status(201).json({
      message: 'Membership created successfully',
      membership: newMembership
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get memberships by category
export const getMembershipsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const memberships = await Membership.findAll({
      where: { category, is_active: true },
      order: [['validity_days', 'ASC']]
    });
    res.json(memberships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};