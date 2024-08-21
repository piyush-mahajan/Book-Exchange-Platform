import express from "express";
import Book from "../models/Book.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books" });
  }
});

router.post("/", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "your-secret-key");
    const book = new Book({ ...req.body, userId: decoded.userId });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(401).json({ message: "Unauthorized or invalid token" });
  }
});

export default router; // Use export default instead of module.exports
