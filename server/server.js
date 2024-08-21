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
const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URL
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        // useFindAndModify: false,
      }
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${PORT}`);
});
