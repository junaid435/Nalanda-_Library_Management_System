import {
  create_book_repo,
  delete_book_repo,
  find_book_by_id,
  list_book_repo,
  update_book_repo,
} from "../repositories/book.repository.js";
import { apiError } from "../utils/apiError.js";
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
const delete_book = asyncHandler(async (req, res) => {
  const data=await find_book_by_id(req.query.id)
  if(!data){
    throw new apiError(404,"book is not found or already deleted")
  }
  await delete_book_repo(req.query.id);
  res.status(200).json(new apiResponse(200, [], "book deleted successfully"));
});
const list_book = asyncHandler(async (req, res) => {
  let data = await list_book_repo(req.query);

  res.status(200).json(data);
});
export { create_book, update_book, delete_book, list_book };
