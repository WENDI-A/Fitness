import sequelize from "../config/db.js";
import User from "./userModel.js";
import Membership from "./membershipModel.js";
import Trainer from "./trainerModel.js";
import Payment from "./paymentModel.js";
import Subscription from "./subscriptionModel.js"; 
import Feedback from "./feedbackModel.js";

// Define associations with reduced indexes to avoid MySQL 64 key limit
// User associations - only essential indexes
User.hasMany(Subscription, { foreignKey: 'user_id', constraints: false });
User.hasMany(Payment, { foreignKey: 'user_id', constraints: false });
User.hasMany(Feedback, { foreignKey: 'user_id', constraints: false });
// User.hasMany(NutritionPlan, { foreignKey: 'user_id', constraints: false });
// User.hasMany(Booking, { foreignKey: 'user_id', constraints: false });
User.hasOne(Trainer, { foreignKey: 'user_id' });

// Subscription associations
Subscription.belongsTo(User, { foreignKey: 'user_id' });
Subscription.belongsTo(Membership, { foreignKey: 'membership_id', constraints: false });

// Membership associations
Membership.hasMany(Subscription, { foreignKey: 'membership_id', constraints: false });

// Trainer associations
Trainer.belongsTo(User, { foreignKey: 'user_id' });
// Trainer.hasMany(Class, { foreignKey: 'trainer_id', constraints: false });
// Trainer.hasMany(NutritionPlan, { foreignKey: 'trainer_id', constraints: false });

// // Class associations
// Class.belongsTo(Trainer, { foreignKey: 'trainer_id' });
// Class.hasMany(Booking, { foreignKey: 'class_id', constraints: false });

// // Booking associations
// Booking.belongsTo(User, { foreignKey: 'user_id' });
// Booking.belongsTo(Class, { foreignKey: 'class_id' });
// Booking.belongsTo(Trainer, { foreignKey: 'trainer_id' });
// Booking.belongsTo(Schedule, { foreignKey: 'schedule_id' });

// Essential associations only
Payment.belongsTo(User, { foreignKey: 'user_id' });
Feedback.belongsTo(User, { foreignKey: 'user_id' });

export {
  sequelize,
  User,
  Membership,
  Trainer,
  Payment,
  Subscription,
  Feedback,
   
};
