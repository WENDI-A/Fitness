import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import mysql2 from "mysql2";
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "latest_fitness",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",

  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || "18350",
    dialect: "mysql",
    dialectModule: mysql2,
    logging: false,
  }
);

export default sequelize;
