import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.js";
import membershipRoutes from "./routes/membershipRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import trainerRoutes from "./routes/trainerRoutes.js";
 
 
 

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/trainers", trainerRoutes);
 

// bleClasses);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ message: "Fitness API is running!" });
});

export default app;
