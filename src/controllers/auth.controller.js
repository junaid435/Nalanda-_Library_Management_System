import {
  find_user_email_repo,
  user_register_repo,
} from "../repositories/auth.repository.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import { apiError } from "../utils/apiError.js";
import Jwt from "jsonwebtoken";
import {
  user_validation_email,
  validation_space,
} from "../validation/user.validation.js";



const user_register = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;  
  //validation
  user_validation_email(email);
  validation_space(password);
  validation_space(name);
  //hashing password
  const salt = await bcrypt.genSalt(12);
  const hashePassword = await bcrypt.hash(password.toString(), salt);

  // user validation check if the email is already used or not
  const userData = await find_user_email_repo(email);
  if (userData) {
    throw new apiError(409, "email already used");
  }
  await user_register_repo(email, name, hashePassword);
  res
    .status(201)
    .json(new apiResponse(201, [], "user registered successfully"));
});

const user_login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //validation
  user_validation_email(email);
  validation_space(password);
  //user validation check if the user valid or not
  const userData = await find_user_email_repo(email);
  if (!userData) {
    throw new apiError(404, "User not found");
  }
  const result = await bcrypt.compare(
    password.toString(),
    userData["password"]
  );
  if (!result) {
    throw new apiError(401, "incorrect password");
  }
  //jwt token create
  const token = Jwt.sign(
    {
      email: userData["email"],
      role: userData["is_admin"] ? "admin" : "member",
    },
    process.env.USER_SECRET
  );
  res.status(200).json(new apiResponse(200, token, "user login successfully"));
});

export { user_register, user_login };
