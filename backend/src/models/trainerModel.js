import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Trainer = sequelize.define("Trainer", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  specializations: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  certifications: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  experience_years: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  hourly_rate: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  availability: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  rating: {
    type: DataTypes.DECIMAL(3, 2),
    allowNull: true,
    defaultValue: 0.00,
  },
  total_reviews: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  hire_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
}, {
  timestamps: true, // handles createdAt & updatedAt
  indexes: [
    { fields: ["rating"] },
    { fields: ["is_active"] },
    { fields: ["experience_years"] },
  ],
});

export default Trainer;
