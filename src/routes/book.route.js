import { Router } from "express";
import {
  create_book,
  delete_book,
  list_book,
  update_book,
} from "../controllers/book.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin_auth.middleware.js";
const route = Router();
/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API for books CRUD operations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - ISBN
 *         - publication_date
 *         - genre
 *         - total_copies
 *         - author
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the book
 *           example: "Harry Potter and the Chamber of Secrets"
 *         ISBN:
 *           type: integer
 *           description: Unique ISBN number of the book
 *           example: 9780439064873
 *         publication_date:
 *           type: string
 *           format: date
 *           description: Publication date of the book
 *           example: "1998-07-02"
 *         genre:
 *           type: string
 *           description: Genre of the book
 *           example: "Fantasy"
 *         total_copies:
 *           type: integer
 *           description: Total number of copies available in the library
 *           example: 100
 *         author:
 *           type: string
 *           description: Name of the author of the book
 *           example: "J.K. Rowling"
 */
route.use(verifyJWT);

/**
 * @swagger
 * /book/list_book:
 *   get:
 *     summary: Retrieve a list of books
 *     tags:
 *       - Books
 *     description: Retrieve a list of all books. This route supports pagination and filters based on genre and author. Only accessible by users with 'member' or 'admin' roles.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The page number for pagination
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *         description: Filter books by genre
 *         example: "Fantasy"
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: Filter books by author name
 *         example: "J.K. Rowling"
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *
 *       401:
 *         description: Unauthorized - JWT Token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Invalid access token"
 *
 */

route.route("/list_book").get(list_book);
route.use(isAdmin);

/**
 * @swagger
 * /book/create_book:
 *   post:
 *     summary: Create a new book
 *     description: Create a new book entry in the library. This route can only be accessed by users with 'admin' roles. Admin users must provide all required fields to successfully create a book.
 *     tags:
 *       - Books
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "The Great Gatsby"
 *               ISBN:
 *                 type: number
 *                 example: 9780743273565
 *               publication_date:
 *                 type: string
 *                 format: date
 *                 example: "1925-04-10"
 *               genre:
 *                 type: string
 *                 example: "Fiction"
 *               total_copies:
 *                 type: number
 *                 example: 10
 *               author:
 *                 type: string
 *                 example: "F. Scott Fitzgerald"
 *             required:
 *               - title
 *               - ISBN
 *               - publication_date
 *               - genre
 *               - total_copies
 *               - author
 *     responses:
 *       201:
 *         description: Book successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 data:
 *                   type: array
 *                   items: {}
 *                 message:
 *                   type: string
 *                   example: "Book created successfully"
 *       403:
 *         description: Access denied (only admins can access this route)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 403
 *                 message:
 *                   type: string
 *                   example: "Access Denied: Admins only"
 *       401:
 *         description: Invalid or expired access token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Invalid access token"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Input cannot be empty"
 *       500:
 *         description: Duplicate ISBN error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "The ISBN already exists. Please use a different ISBN."
 */


route.route("/create_book").post(create_book);
/**
 * @swagger
 * /book/update_book:
 *   patch:
 *     summary: Update an existing book
 *     description: Update an existing book entry in the library. This route can only be accessed by users with 'admin' roles. Admin users must provide all required fields to successfully update a book. The book is identified by its unique ID.
 *     tags:
 *       - Books
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the book to update (e.g., unique identifier in the database)
 *                 example: "670615775614f750b560b5ff"
 *               title:
 *                 type: string
 *                 example: "The Great Gatsby"
 *               ISBN:
 *                 type: number
 *                 example: 9780743273565
 *               publication_date:
 *                 type: string
 *                 format: date
 *                 example: "1925-04-10"
 *               genre:
 *                 type: string
 *                 example: "Fiction"
 *               total_copies:
 *                 type: number
 *                 example: 10
 *               author:
 *                 type: string
 *                 example: "F. Scott Fitzgerald"
 *             required:
 *               - id
 *               - title
 *               - ISBN
 *               - publication_date
 *               - genre
 *               - total_copies
 *               - author
 *     responses:
 *       200:
 *         description: Book successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items: {}
 *                 message:
 *                   type: string
 *                   example: "Book updated successfully"
 *       403:
 *         description: Access denied (only admins can access this route)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 403
 *                 message:
 *                   type: string
 *                   example: "Access Denied: Admins only"
 *       401:
 *         description: Invalid or expired access token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Invalid access token"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Input cannot be empty"
 *       500:
 *         description: Duplicate ISBN error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "The ISBN already exists. Please use a different ISBN."
 */

route.route("/update_book").patch(update_book);
/**
 * @swagger
 * /book/delete_book:
 *   delete:
 *     summary: Delete a specific book
 *     description: Delete a specific book from the library. This route can only be accessed by users with 'admin' roles. Admin users must provide the unique ID of the book they wish to delete.
 *     tags:
 *       - Books
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: The ID of the book to delete (unique identifier)
 *         schema:
 *           type: string
 *           example: "670615775614f750b560b5ff"
 *     responses:
 *       200:
 *         description: Book successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items: {}
 *                 message:
 *                   type: string
 *                   example: "Book deleted successfully"
 *       403:
 *         description: Access denied (only admins can access this route)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 403
 *                 message:
 *                   type: string
 *                   example: "Access Denied: Admins only"
 *       401:
 *         description: Invalid or expired access token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Invalid access token"
 *       404:
 *         description: Book is not found or already deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Book is not found or already deleted"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */


route.route("/delete_book").delete(delete_book);
export default route;
