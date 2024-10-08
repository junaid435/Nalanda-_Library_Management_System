import { Router } from "express";
import { create_book, update_book } from "../controllers/book.controller.js";
const route = Router();
route.route('/create_book').post(create_book)
route.route('/update_book').patch(update_book)
export default route;
