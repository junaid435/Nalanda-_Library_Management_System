import { apiError } from "../utils/apiError.js";

const user_validation_email = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let res = regex.test(email);
  if (!res) {
    throw new apiError(400, "Invalid email format");
  }
};
const validation_space = (input) => {
  input=input+''
  if (input.trim() == "") {
    throw new apiError(400, "input cannot be empty");
  }
  return true;
};

export {user_validation_email,validation_space};
