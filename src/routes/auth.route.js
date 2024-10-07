import { Router } from "express";
import { user_login, user_register } from "../controllers/auth.controller.js";

const route = Router();

route.route('/register').post(user_register)
route.route('/login').post(user_login)
export default route