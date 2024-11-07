import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import dotenv from 'dotenv';  // Import dotenv

import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import { protectRoute } from "./middleware/protectRoute.js";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = ENV_VARS.PORT || 5000;  // Use fallback port if not provided in .env
const __dirname = path.resolve();

app.use(express.json()); // Parse incoming requests with JSON payload
app.use(cookieParser()); // Parse cookies

// Set up routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);

// Serve static files in production
if (ENV_VARS.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  // Catch-all route to serve the frontend's index.html
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Start server and connect to MongoDB
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`MongoDB connected!`);
    console.log(`Server started at http://localhost:${PORT}`);
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1); // Exit the process if the MongoDB connection fails
  }
});
