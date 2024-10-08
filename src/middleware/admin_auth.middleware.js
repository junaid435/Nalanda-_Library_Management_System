import { apiError } from "../utils/apiError.js";

const isAdmin = (req, res, next) => {
  if (req.user.is_admin === true) {
    next();
  } else {
    throw new apiError(403, "Access Denied: Admins only");
  }
};
export { isAdmin };
