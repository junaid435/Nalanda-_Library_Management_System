import { user_register_repo } from "../repositories/auth.repository.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const user_register = asyncHandler(async (req, res) => {
  await user_register_repo(req.body);
  res
    .status(201)
    .json(new apiResponse(201, [], "user registered successfully"));
});

export { user_register };
