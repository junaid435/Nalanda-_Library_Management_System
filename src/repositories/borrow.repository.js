import { book_model } from "../models/book.models.js";
import { borrow_model } from "../models/borrow.models.js";

const borrow_book_repo = (req) => {
  const borrow_book = new borrow_model({
    user: req.user._id,
    book: req.body.id,
  });

  return borrow_book.save();
};
const borrow_return_repo = (id) => {
  return book_model.findByIdAndUpdate(
    { _id: id },
    { $set: { return_status: true } }
  );
};
const borrow_history_repo = (userID) => {
  return borrow_model.find({ user: userID }).populate("user").populate("book");
};
const most_borrow_books_repo = () => {
  return borrow_model.aggregate([
    {
      $lookup: {
        from: "books",
        localField: "book",
        foreignField: "_id",
        as: "book",
      },
    },
    {
      $addFields: {
        book: { $first: "$book" },
      },
    },
    {
      $group: {
        _id: "$book.title",
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1 },
    },
    {
      $limit: 5,
    },
  ]);
};
export {
  borrow_book_repo,
  borrow_return_repo,
  borrow_history_repo,
  most_borrow_books_repo,
};
