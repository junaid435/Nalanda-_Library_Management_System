import { Router } from "express";
import { create_book } from "../controllers/book.controller.js";
const route = Router();
route.route('/create_book').post(create_book)

export default route;
