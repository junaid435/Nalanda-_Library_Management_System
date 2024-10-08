import { user_model } from "../models/user.models.js";
import bcrypt from "bcrypt";
import { apiError } from "../utils/apiError.js";

const user_register_repo = async (email, name, password) => {
  const user = new user_model({
    email: email,
    password: password,
    name: name,
  });
  return user.save();
};

const find_user_email_repo = async (email) => {
  return await user_model.findOne({ email: email });
};



export { user_register_repo, find_user_email_repo };
