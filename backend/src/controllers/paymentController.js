import { User, Payment } from "../models/index.js";
import { Op } from "sequelize";

// Get User Payments
export const getUserPayments = async (req, res) => {
  try {
    const userId = req.user?.id || 1;
    
    // Return mock payment data
    const mockPayments = [
      {
        id: 1,
        amount: 4000,
        currency: "ETB",
        method: "Card",
        status: "completed",
        date: "2025-01-15",
        description: "Monthly Membership - Individual",
        transactionId: "TXN123456789"
      },
      {
        id: 2,
        amount: 3500,
        currency: "ETB",
        method: "Mobile Money",
        status: "completed",
        date: "2025-01-10",
        description: "Personal Training Session",
        transactionId: "TXN123456788"
      },
      {
        id: 3,
        amount: 4000,
        currency: "ETB",
        method: "Bank Transfer",
        status: "pending",
        date: "2025-01-01",
        description: "Monthly Membership - Individual",
        transactionId: "TXN123456787"
      }
    ];

    res.json(mockPayments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create New Payment
export const createPayment = async (req, res) => {
  try {
    const { amount, currency, payment_method, subscription_id, notes } = req.body;
    const userId = req.user?.id || 1; // TODO: Get from auth middleware
    
    const newPayment = await Payment.create({
      user_id: userId,
      subscription_id: subscription_id || null,
      amount: amount,
      currency: currency || 'ETB',
      payment_method: payment_method,
      transaction_id: `TXN${Date.now()}`,
      status: 'completed',
      payment_date: new Date(),
      notes: notes || null
    });
    
    res.status(201).json({
      message: 'Payment created successfully',
      payment: newPayment
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};