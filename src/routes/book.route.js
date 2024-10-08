import { Router } from "express";
import { create_book, delete_book, update_book } from "../controllers/book.controller.js";
const route = Router();
route.route('/create_book').post(create_book)
route.route('/update_book').patch(update_book)
route.route('/delete_book').delete(delete_book)
export default route;
