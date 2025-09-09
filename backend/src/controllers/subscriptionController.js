import { User, Subscription } from "../models/index.js";
import { Op } from "sequelize";

// Get User Subscription
export const getUserSubscription = async (req, res) => {
  try {
    const userId = req.params.userId || req.user?.id || 1;
    
    const subscription = await Subscription.findOne({
      where: { 
        user_id: userId,
        status: 'active'
      },
      include: [{
        model: User,
        attributes: ['id', 'first_name',"last_name", 'email']
      }],
      order: [['createdAt', 'DESC']]
    });

    if (!subscription) {
      return res.json(null);
    }

    // Calculate days remaining
    const endDate = new Date(subscription.end_date);
    const today = new Date();
    const daysRemaining = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));

    const subscriptionData = {
      id: subscription.id,
      user_id: subscription.user_id,
      membershipType: subscription.membership_type || "Individual - 1 Month",
      status: subscription.status,
      startDate: subscription.start_date,
      endDate: subscription.end_date,
      price: subscription.price || 4000,
      currency: "ETB",
      autoRenew: subscription.auto_renew || false,
      daysRemaining: Math.max(0, daysRemaining)
    };

    res.json([subscriptionData]);
  } catch (error) {
    console.error('Error fetching user subscription:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get User Subscription History
export const getSubscriptionHistory = async (req, res) => {
  try {
    const userId = req.params.userId || req.user?.id || 1;
    
    const subscriptions = await Subscription.findAll({
      where: { 
        user_id: userId,
        status: { [Op.in]: ['completed', 'expired', 'cancelled'] }
      },
      order: [['createdAt', 'DESC']],
      limit: 10
    });

    const history = subscriptions.map(sub => ({
      id: sub.id,
      type: sub.membership_type || "Individual - 1 Month",
      period: `${new Date(sub.start_date).toLocaleDateString()} - ${new Date(sub.end_date).toLocaleDateString()}`,
      amount: sub.price || 4000,
      status: sub.status
    }));

    res.json(history);
  } catch (error) {
    console.error('Error fetching subscription history:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get Available Upgrades
export const getAvailableUpgrades = async (req, res) => {
  try {
    const userId = req.params.userId || req.user?.id || 1;
    
    // Get current subscription to determine available upgrades
    const currentSub = await Subscription.findOne({
      where: { 
        user_id: userId,
        status: 'active'
      }
    });

    // Mock upgrade options based on current subscription
    const upgrades = [
      {
        id: 1,
        name: "Individual - 6 Month",
        currentPrice: 20400,
        discountedPrice: 18360,
        savings: 2040,
        features: ["15 free pass days", "10 Free Guest Coupons", "Priority booking"]
      },
      {
        id: 2,
        name: "Group Package - 3 Month", 
        currentPrice: 12000,
        discountedPrice: 10800,
        savings: 1200,
        features: ["Group training sessions", "Community events", "5 Free Guest Coupons"]
      },
      {
        id: 3,
        name: "Premium - 12 Month",
        currentPrice: 48000,
        discountedPrice: 43200,
        savings: 4800,
        features: ["Personal trainer sessions", "Nutrition consultation", "Premium equipment access"]
      }
    ];

    res.json(upgrades);
  } catch (error) {
    console.error('Error fetching available upgrades:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get Subscription Options
export const getSubscriptionOptions = async (req, res) => {
  try {
    const options = [
      {
        id: 1,
        name: "Individual - 1 Month",
        duration: 1,
        basePrice: 4000,
        features: ["Access to gym equipment", "Basic fitness classes", "Locker access"],
        description: "Perfect for trying out our facilities"
      },
      {
        id: 2,
        name: "Individual - 3 Month",
        duration: 3,
        basePrice: 4000,
        totalPrice: 10680,
        discount: 10,
        features: ["Access to gym equipment", "All fitness classes", "Locker access", "2 guest passes"],
        description: "Great value for regular gym-goers"
      },
      {
        id: 3,
        name: "Individual - 6 Month",
        duration: 6,
        basePrice: 4000,
        totalPrice: 20400,
        discount: 15,
        features: ["Access to gym equipment", "All fitness classes", "Locker access", "5 guest passes", "Priority booking"],
        description: "Best value for committed fitness enthusiasts"
      },
      {
        id: 4,
        name: "Group Package - 3 Month",
        duration: 3,
        basePrice: 4000,
        totalPrice: 12000,
        features: ["Group training sessions", "Community events", "Locker access", "3 guest passes"],
        description: "Perfect for training with friends"
      },
      {
        id: 5,
        name: "Premium - 12 Month",
        duration: 12,
        basePrice: 4000,
        totalPrice: 43200,
        discount: 20,
        features: ["Personal trainer sessions", "Nutrition consultation", "Premium equipment access", "Unlimited guest passes"],
        description: "Ultimate fitness experience"
      }
    ];

    res.json(options);
  } catch (error) {
    console.error('Error fetching subscription options:', error);
    res.status(500).json({ message: error.message });
  }
};

// Create Subscription
export const createSubscription = async (req, res) => {
  try {
    const { user_id, membership_id, start_date, end_date, status, auto_renew, membership_type, price } = req.body;
    
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    
    const newSubscription = await Subscription.create({
      user_id: user_id,
      membership_id: membership_id || req.body.membership_id,
      start_date: startDate,
      end_date: endDate,
      status: status || 'active',
      auto_renew: auto_renew || false,
      price: price,
      payment_status: 'pending',
      membership_type: membership_type
    });
    
    res.status(201).json({
      message: 'Subscription created successfully',
      subscription: newSubscription
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ error: 'Failed to create subscription' });
  }
};