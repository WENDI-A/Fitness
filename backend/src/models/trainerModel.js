import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Trainer = sequelize.define("Trainer", {
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
  specialization: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  certification: {
    type: DataTypes.TEXT,
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
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

export default Trainer;