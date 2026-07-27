import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

import notfound from "./middleware/notfound.js";
import errorHandler from "./middleware/errorHandler.js";

import authRoutes from "./routes/authRoutes.js";

import cartRoutes from "./routes/cartRoutes.js";

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);


app.use(notfound);
app.use(errorHandler);

app.use("/api/cart", cartRoutes);

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "High Performance E-commerce Engine is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});