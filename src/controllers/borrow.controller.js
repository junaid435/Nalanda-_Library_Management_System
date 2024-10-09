import {
  book_total_copies_update,
  find_book_by_id,
  total_available_books,
  total_book_count,
} from "../repositories/book.repository.js";
import {
  active_members_repo,
  borrow_book_repo,
  borrow_history_repo,
  borrow_return_repo,
  borrowed_books,
  check_borrow_book,
  most_borrow_books_repo,
} from "../repositories/borrow.repository.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const borrow_book = asyncHandler(async (req, res) => {
  const { id } = req.body;
  let book_data = await find_book_by_id(id);
  //checking the book is still have copys
  if (!book_data) {
    throw new apiError(404, " book is not found");
  }
  if (book_data?.total_copies <= 0) {
    throw new apiError(
      409,
      "The book is currently out of stock and cannot be borrowed"
    );
  }
  let user = await check_borrow_book(id, req.user._id);
  if (user) {
    throw new apiError(400, "You can only borrow this book once");
  }
  await borrow_book_repo(req);
  await book_total_copies_update(book_data, false);

  res.status(201).json(new apiResponse(201, [], "borrow book successfully"));
});

const borrow_return = asyncHandler(async (req, res) => {
  const { id } = req.body;
 
  let user = await check_borrow_book(id, req.user._id);
  if (!user) {
    throw new apiError(404, "You have not borrowed this book");
  }

  if (user?.return_status === true) {
    throw new apiError(
      400,
      "This book has already been returned and cannot be returned again"
    );
  }
  await borrow_return_repo(id);
  await book_total_copies_update(book_data, true);
  res
    .status(201)
    .json(new apiResponse(201, [], "borrow book returned successfully"));
});
const borrow_history = asyncHandler(async (req, res) => {
  let data = await borrow_history_repo(req.user._id);
  res.status(200).json(new apiResponse(200, data));
});
const most_borrow_books = asyncHandler(async (req, res) => {
  let data = await most_borrow_books_repo();
  //report template
  const report = {
    reportTitle: "Top 5 Most Borrowed Books Report",
    reportGeneratedAt: new Date().toISOString(),
    topBooks: data.map((book, index) => ({
      rank: index + 1,
      title: book._id,
      borrowCount: book.count,
    })),
    summary: `The most borrowed book is ${data[0]._id} with ${data[0].count} borrows.`,
  };
  res.status(200).json(new apiResponse(200, report));
});
const active_members = asyncHandler(async (req, res) => {
  const data = await active_members_repo();
  res.status(200).json(new apiResponse(200, data));
});
const book_availability = asyncHandler(async (req, res) => {
  //available books
  let available_books = await total_available_books();
  //total book count
  let count = await total_book_count();
  //   borrow books list
  let borrow_books = await borrowed_books();
  res
    .status(200)
    .json(new apiResponse(200, { count, available_books, borrow_books }));
});
export {
  borrow_book,
  borrow_return,
  borrow_history,
  most_borrow_books,
  active_members,
  book_availability,
};
