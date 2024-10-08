import {
  create_book_repo,
  update_book_repo,
} from "../repositories/book.repository.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const create_book = asyncHandler(async (req, res) => {
  await create_book_repo(req.body);
  res.status(201).json(new apiResponse(201, [], "book created successfully"));
});

const update_book = asyncHandler(async (req, res) => {
  await update_book_repo(req.body);
  res.status(200).json(new apiResponse(200, [], "book updated successfully"));
});
export { create_book, update_book };
