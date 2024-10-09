import { find_user_email_repo } from "../repositories/auth.repository.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  let token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    throw new apiError(401, "Invalid access token");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.USER_SECRET);
    const user = await find_user_email_repo(decodedToken['email']);
    if (!user) {
      throw new apiError(401, "Invalid access token");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new apiError(401, "Invalid access token");
  }
});
