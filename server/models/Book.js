import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
});

export default mongoose.model("Book", BookSchema);
