import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Membership = sequelize.define(
  "Membership",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    category: {
      type: DataTypes.ENUM("individual", "group", "family", "personalized"),
      allowNull: false,
    },
    duration_months: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    features: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    max_classes_per_month: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    includes_personal_training: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_highlighted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },  
  {
    // keep default timestamps (createdAt/updatedAt) to match sequelize sync behavior
  }
);

export default Membership;