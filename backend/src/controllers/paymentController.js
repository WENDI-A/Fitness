import { User, Payment } from "../models/index.js";
import { Op } from "sequelize";

// Get User Payments
export const getUserPayments = async (req, res) => {
  try {
    const userId = req.params.userId || req.user?.id || 1;

    const payments = await Payment.findAll({
      where: { user_id: userId },
      order: [['payment_date', 'DESC']]
    });

    const formattedPayments = payments.map(p => ({
      id: p.id,
      amount: p.amount,
      currency: p.currency,
      method: p.payment_method,
      status: p.status,
      date: p.payment_date,
      description: p.description || (p.payment_type === 'subscription' ? 'Subscription Payment' : 'Payment'),
      transactionId: p.transaction_id
    }));

    res.json(formattedPayments);
  } catch (error) {
    console.error('Error fetching user payments:', error);
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