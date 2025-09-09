import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Feedback = sequelize.define("Feedback", {
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
  trainer_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "Trainers",
      key: "id",
    },
  },
  class_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
     
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  feedback_type: {
    type: DataTypes.ENUM("trainer", "class", "facility", "equipment", "general"),
    allowNull: false,
  },
  is_anonymous: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "reviewed", "resolved"),
    defaultValue: "pending",
  },
});

export default Feedback;