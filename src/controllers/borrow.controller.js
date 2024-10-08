import {
  book_total_copies_update,
  find_book_by_id,
} from "../repositories/book.repository.js";
import {
  borrow_book_repo,
  borrow_history_repo,
  borrow_return_repo,
} from "../repositories/borrow.repository.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const borrow_book = asyncHandler(async (req, res) => {
  const { id } = req.body;
  let book_data = await find_book_by_id(id);
  if (book_data?.total_copies <= 0) {
    throw new apiError(
      409,
      "The book is currently out of stock and cannot be borrowed"
    );
  }
  await borrow_book_repo(req);
  await book_total_copies_update(book_data, false);

  res.status(201).json(new apiResponse(201, [], "borrow book successfully"));
});

const borrow_return = asyncHandler(async (req, res) => {
  const { id } = req.body;
  let book_data = await find_book_by_id(id);
  if (!book_data) {
    throw new apiError(404, "The book is founded");
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
export { borrow_book, borrow_return, borrow_history };
