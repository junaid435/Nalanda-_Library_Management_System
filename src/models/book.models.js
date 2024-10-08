import mongoose from "mongoose";
const book_schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ISBN: {
    type: Number,
    required: true,
    unique: true,
  },
  publication_date: {
    type: Date,
    default: Date.now(),
  },
  genre: {
    type: String,
    required: true,
  },
  total_copies: {
    type: Number,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

const book_model = new mongoose.model("book", book_schema);
export { book_model };
