import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Subscription = sequelize.define("Subscription", {
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
  membership_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Memberships",
      key: "id",
    },
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("active", "expired", "cancelled"),
    defaultValue: "active",
  },
  payment_status: {
    type: DataTypes.ENUM("paid", "pending", "failed"),
    defaultValue: "pending",
  },
  auto_renew: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
    price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    field: 'total_amount'   // maps model.price to DB column total_amount
  },
  membership_type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Subscription;