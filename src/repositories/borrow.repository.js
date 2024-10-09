import { borrow_model } from "../models/borrow.models.js";

const borrow_book_repo = (req) => {
  
  const borrow_book = new borrow_model({
    user: req.user._id,
    book: req.body.id,
  });

  return borrow_book.save();
};
const borrow_return_repo = (id) => {
  return borrow_model.findByIdAndUpdate(
    { _id: id },
    { $set: { return_status: true } }
  );
};
const check_borrow_book=(bookid,userid)=>{
  return borrow_model.findOne({book:bookid,user:userid})
}
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
const active_members_repo = () => {
  return borrow_model.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $addFields: {
        user: { $first: "$user" },
      },
    },
    {
      $group: {
        _id: "$user.email",
        count: { $sum: 1 },
      },
    },
  ]);
};
const borrowed_books = () => {
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
        totalBorrowCount: { $sum: 1 },
        allReturnTrue: { $min: "$return_status" },
      },
    },
    {
      $match: {
        allReturnTrue: false,
      },
    },
    {
      $project: {
        _id: 1,
        totalBorrowCount: 1,
      },
    },
  ]);
};
export {
  borrow_book_repo,
  borrow_return_repo,
  borrow_history_repo,
  most_borrow_books_repo,
  active_members_repo,
  borrowed_books,
  check_borrow_book
};
