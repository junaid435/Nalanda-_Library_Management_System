import { Router } from "express";
import { borrow_book, borrow_history, borrow_return, most_borrow_books } from "../controllers/borrow.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const route = Router();
route.use(verifyJWT)
route.route('/borrow_book').post(borrow_book)
route.route('/borrow_return').patch(borrow_return)
route.route('/borrow_history').get(borrow_history)
route.route('/most_borrow_books').get(most_borrow_books)
export default route;
