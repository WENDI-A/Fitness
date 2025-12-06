import { Feedback, User, Subscription, Payment, Membership } from "../models/index.js";

export const getUsersForAdmin = async (req, res) => {
    try {
        // Input validation
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: "Admin access required" });
        }

        const users = await User.findAll({
            include: [
                {
                    model: Subscription,
                    include: [{ model: Membership }]
                }
            ],
            attributes: { exclude: ['password_hash'] } // Don't expose password hashes
        });
        res.json({ users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Failed to load users" });
    }
}



export const getAllSubscriptions = async (req, res) => {
    try {
        // Input validation
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: "Admin access required" });
        }

        const subscriptions = await Subscription.findAll({
            include: [
                {
                    model: User,
                    attributes: ['id', 'first_name', 'last_name', 'email']
                },
                { model: Membership }
            ]
        });
        res.json({ subscriptions });
    } catch (error) {
        console.error("Error fetching subscriptions:", error);
        res.status(500).json({ message: "Failed to load subscriptions" });
    }
}



export const getAllPayments = async (req, res) => {
    try {
        // Input validation
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: "Admin access required" });
        }

        const payments = await Payment.findAll({
            include: [
                { model: User, attributes: ['id', 'first_name', 'last_name', 'email'] },
                { model: Subscription, include: [{ model: Membership }] }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.json({ payments });
    } catch (error) {
        console.error("Error fetching payments:", error);
        res.status(500).json({ message: "Failed to load payments" });
    }
}





export const getAllFeedback = async (req, res) => {
    try {
        // Input validation
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: "Admin access required" });
        }

        const feedback = await Feedback.findAll({
            include: [
                { model: User, attributes: ['id', 'first_name', 'last_name', 'email'] }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.json({ feedback });
    } catch (error) {
        console.error("Error fetching feedback:", error);
        res.status(500).json({ message: "Failed to load feedback" });
    }
}


export const acceptUser = async (req, res) => {
    try {
        // Input validation
        if (!req.params.id || isNaN(req.params.id)) {
            return res.status(400).json({ message: "Valid user ID required" });
        }

        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.status = "accepted";
        await user.save();
        res.json({ message: "User accepted", user: { id: user.id, status: user.status } });
    } catch (error) {
        console.error("Accept user error:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const declineUser = async (req, res) => {
    try {
        // Input validation
        if (!req.params.id || isNaN(req.params.id)) {
            return res.status(400).json({ message: "Valid user ID required" });
        }

        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.status = "declined";
        await user.save();
        res.json({ message: "User declined", user: { id: user.id, status: user.status } });
    } catch (error) {
        console.error("Decline user error:", error);
        res.status(500).json({ message: "Server error" });
    }
}


export const updateSubscriptionStatus = async (req, res) => {
    try {
        // Input validation
        if (!req.params.id || isNaN(req.params.id)) {
            return res.status(400).json({ message: "Valid subscription ID required" });
        }

        const { id } = req.params;
        const { status, payment_status } = req.body;
        
        // Validate status values
        const validStatuses = ['active', 'expired', 'cancelled'];
        const validPaymentStatuses = ['paid', 'pending', 'failed'];
        
        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }
        
        if (payment_status && !validPaymentStatuses.includes(payment_status)) {
            return res.status(400).json({ message: "Invalid payment status value" });
        }
        
        const subscription = await Subscription.findByPk(id);
        if (!subscription) {
            return res.status(404).json({ message: "Subscription not found" });
        }
        
        if (status) subscription.status = status;
        if (payment_status) subscription.payment_status = payment_status;
        
        await subscription.save();
        res.json({ message: "Subscription updated", subscription: { id: subscription.id, status: subscription.status, payment_status: subscription.payment_status } });
    } catch (error) {
        console.error("Update subscription error:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const updatePaymentStatus = async (req, res) => {
    try {
        // Input validation
        if (!req.params.id || isNaN(req.params.id)) {
            return res.status(400).json({ message: "Valid payment ID required" });
        }

        const { id } = req.params;
        const { status, notes } = req.body;
        
        // Validate status values
        const validStatuses = ['pending', 'completed', 'failed', 'refunded'];
        
        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid payment status value" });
        }
        
        const payment = await Payment.findByPk(id);
        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        
        if (status) payment.status = status;
        if (notes) payment.notes = notes;
        
        await payment.save();
        res.json({ message: "Payment updated", payment: { id: payment.id, status: payment.status, notes: payment.notes } });
    } catch (error) {
        console.error("Update payment error:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const acceptFeedback = async (req, res) => {
    try {
        // Input validation
        if (!req.params.id || isNaN(req.params.id)) {
            return res.status(400).json({ message: "Valid feedback ID required" });
        }

        const { id } = req.params;
        const feedback = await Feedback.findByPk(id);
        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }
        feedback.status = "reviewed";
        await feedback.save();
        res.json({ message: "Feedback accepted", feedback: { id: feedback.id, status: feedback.status } });
    } catch (error) {
        console.error("Accept feedback error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const declineFeedback = async (req, res) => {
    try {
        // Input validation
        if (!req.params.id || isNaN(req.params.id)) {
            return res.status(400).json({ message: "Valid feedback ID required" });
        }

        const { id } = req.params;
        const feedback = await Feedback.findByPk(id);
        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }
        feedback.status = "resolved";
        await feedback.save();
        res.json({ message: "Feedback resolved", feedback: { id: feedback.id, status: feedback.status } });
    } catch (error) {
        console.error("Decline feedback error:", error);
        res.status(500).json({ message: "Server error" });
    }
}

