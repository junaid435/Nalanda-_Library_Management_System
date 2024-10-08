import { Router } from "express";
import { create_book, delete_book, list_book, update_book } from "../controllers/book.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
const route = Router();
route.use(verifyJWT)
route.route('/create_book').post(create_book)
route.route('/update_book').patch(update_book)
route.route('/delete_book').delete(delete_book)
route.route('/list_book').get(list_book)
export default route;
