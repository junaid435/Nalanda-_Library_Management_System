import { Router } from "express";
import { user_register } from "../controllers/auth.controlller.js";

const route = Router();

route.route('/register').post(user_register)

export default route