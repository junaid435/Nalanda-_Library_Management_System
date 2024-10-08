import mongoose, { Schema } from "mongoose";
const borrow_schema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: "book",
  },
  return_status: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const borrow_model = new mongoose.model("borrow", borrow_schema);
export { borrow_model };
