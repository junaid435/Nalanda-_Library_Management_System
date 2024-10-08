import { Router } from "express";
import { borrow_book } from "../controllers/borrow.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const route = Router();
route.use(verifyJWT)
route.route('/borrow_book').post(borrow_book)
export default route;
