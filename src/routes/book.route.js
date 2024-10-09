import { Router } from "express";
import { create_book, delete_book, list_book, update_book } from "../controllers/book.controller.js";
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
route.use(verifyJWT)

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

route.route('/list_book').get(list_book)
route.use(isAdmin)
route.route('/create_book').post(create_book)
route.route('/update_book').patch(update_book)
route.route('/delete_book').delete(delete_book)
export default route;
