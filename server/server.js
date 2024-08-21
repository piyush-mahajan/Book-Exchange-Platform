import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import bookRoutes from "./routes/books.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route Middleware
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Start the server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
