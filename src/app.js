import express from "express";
import cors from "cors";
const app = express();
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

//middlewares
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

import { errorHandler } from "./middleware/error.middleware.js";

//routes
import auth_route from "./routes/auth.route.js";
import book_route from "./routes/book.route.js";
import borrow_route from "./routes/borrow.route.js";

app.use("/api/v1/user", auth_route);
app.use("/api/v1/book", book_route);
app.use("/api/v1/borrow", borrow_route);

app.use(errorHandler);

export { app };
