import mongoose from "mongoose";
const book_schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ISBN: {
    type: Number,
    required: true,
  },
  publication_date: {
    type: Date,
    default: Date.now(),
  },
  genre: {
    type: String,
    required: true,
  },
  totalCopies: {
    type: Number,
    required: true,
  },
});

const book_model= new mongoose.model('book',book_schema)
export {book_model}