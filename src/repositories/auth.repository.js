import { user_model } from "../models/user.models.js";
import bcrypt from "bcrypt";
import { apiError } from "../utils/apiError.js";

const user_register_repo = async (user_data) => {
  const { email, password, name } = user_data;
  const salt = await bcrypt.genSalt(12);

  const hashePassword = await bcrypt.hash(password.toString(), salt);

  const userData = await find_user_email_repo(email);
  if (userData) {
    throw new apiError(409, "email already used");
  }

  const user = new user_model({
    email: email,
    password: hashePassword,
    name: name,
  });
  return user.save();
};

//this will find user data with email
const find_user_email_repo = async (email) => {
  return await user_model.findOne({ email: email });
};

export { user_register_repo, find_user_email_repo };
