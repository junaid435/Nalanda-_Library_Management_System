import mongoose from "mongoose";
const user_schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  is_admin: {
    type: Boolean,
    default: false,
  },
});

const user_model = new mongoose.model("user", user_schema);
export { user_model };
