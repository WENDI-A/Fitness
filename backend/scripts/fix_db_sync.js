import { sequelize } from "../src/models/index.js";

async function fixDb() {
    try {
        await sequelize.authenticate();
        console.log("Connected to DB.");

        // Disable foreign key checks to allow dropping tables with relationships
        await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");

        console.log("Dropping Feedbacks table...");
        await sequelize.query("DROP TABLE IF EXISTS Feedbacks");

        console.log("Dropping Trainers table...");
        await sequelize.query("DROP TABLE IF EXISTS Trainers");

        console.log("Dropping trainers table (case variant)...");
        await sequelize.query("DROP TABLE IF EXISTS trainers");

        await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");

        console.log("Cleanup complete.");
        process.exit(0);
    } catch (error) {
        console.error("Error fixing DB:", error);
        process.exit(1);
    }
}

fixDb();
