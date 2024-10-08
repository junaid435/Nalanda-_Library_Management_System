import { create_book_repo } from "../repositories/book.repository.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const create_book=asyncHandler(async(req,res)=>{
  await create_book_repo(req.body)
  res.status(201).json(new apiResponse(201,[],'book created successfully'))
})


export{
    create_book
}