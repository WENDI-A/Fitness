import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Payment = sequelize.define("Payment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  },
  subscription_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "Subscriptions",
      key: "id",
    },
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  currency: {
    type: DataTypes.STRING,
    defaultValue: "ETB",
  },
  payment_method: {
    type: DataTypes.ENUM("cash", "card", "bank_transfer", "mobile_money"),
    allowNull: false,
  },
  transaction_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("pending", "completed", "failed", "refunded"),
    defaultValue: "pending",
  },
  payment_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

export default Payment;