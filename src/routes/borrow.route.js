import { Router } from "express";
import { active_members, book_availability, borrow_book, borrow_history, borrow_return, most_borrow_books } from "../controllers/borrow.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
/**
 * @swagger
 * tags:
 *   name: Borrowing
 *   description: API for managing borrowing records
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Borrowing:
 *       type: object
 *       required:
 *         - user
 *         - book
 *         - return_status
 *         - date
 *       properties:
 *         user:
 *           type: string
 *           description: The ID of the user who borrowed the book
 *           example: "603d8d8e8426b9d576b90c50"
 *         book:
 *           type: string
 *           description: The ID of the book that was borrowed
 *           example: "603d8d8e8426b9d576b90c51"
 *         return_status:
 *           type: boolean
 *           description: Indicates whether the book has been returned
 *           example: false
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date when the book was borrowed
 *           example: "2024-10-09T12:00:00Z"
 */

const route = Router();
route.use(verifyJWT)

/**
 * @swagger
 * /borrow/borrow_book:
 *   post:
 *     summary: Borrow a book
 *     description: Allows users to borrow a book from the library. This route can be accessed by both admin and member roles. Users must provide the unique ID of the book they wish to borrow.
 *     tags:
 *       - Borrowing
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the book to borrow (unique identifier)
 *                 example: "670615775614f750b560b5ff"
 *     responses:
 *       201:
 *         description: Book borrowed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 data:
 *                   
 *                 message:
 *                   type: string
 *                   example: "Borrow book successfully"
 *       400:
 *         description: User has already borrowed this book
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
 *                   example: "You can only borrow this book once"
 *       404:
 *         description: Book not found
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
 *                   example: "Book not found"
 *       409:
 *         description: The book is currently out of stock and cannot be borrowed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 409
 *                 message:
 *                   type: string
 *                   example: "The book is currently out of stock and cannot be borrowed"
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



route.route('/borrow_book').post(borrow_book)

/**
 * @swagger
 * /borrow/borrow_return:
 *   patch:
 *     summary: Return a borrowed book
 *     description: Allows users to return a book they have borrowed from the library. This route can be accessed by both admin and member roles. Users must provide the unique ID of the book they wish to return.
 *     tags:
 *       - Borrowing
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the book to return (unique identifier)
 *                 example: "670615775614f750b560b5ff"
 *     responses:
 *       200:
 *         description: Book returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Book returned successfully"
 *     
 *       400:
 *         description: User has not borrowed this book
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
 *                   example: "You have not borrowed this book"
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

route.route('/borrow_return').patch(borrow_return)
/**
 * @swagger
 * /borrow/borrow_history:
 *   get:
 *     summary: Retrieve borrowing history
 *     description: Allows users to retrieve their borrowing history from the library. This route can be accessed by both admin and member roles. Users need to be authenticated to access this endpoint.
 *     tags:
 *       - Borrowing
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved borrowing history
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
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: ID of the borrowed record
 *                         example: "670615775614f750b560b5ff"
 *                       book:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             description: ID of the borrowed book
 *                             example: "670615775614f750b560b5ff"
 *                           title:
 *                             type: string
 *                             description: Title of the borrowed book
 *                             example: "Harry Potter and the Chamber of Secrets"
 *                           author:
 *                             type: string
 *                             description: Author of the borrowed book
 *                             example: "J.K. Rowling"
 *                       user:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             description: ID of the user who borrowed the book
 *                             example: "60b85f3b0d36c80015d4c542"
 *                           name:
 *                             type: string
 *                             description: Name of the user
 *                             example: "John Doe"
 *                       return_status:
 *                         type: boolean
 *                         description: Indicates if the book has been returned
 *                         example: false
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         description: Date when the book was borrowed
 *                         example: "2023-10-01T10:30:00Z"
 *                 message:
 *                   type: string
 *                   example: "Borrowing history retrieved successfully"
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

route.route('/borrow_history').get(borrow_history)
/**
 * @swagger
 * /borrow/most_borrow_books:
 *   get:
 *     summary: Retrieve the most borrowed books report
 *     description: Allows users to retrieve a report on the top 5 most borrowed books from the library. This route can be accessed by both admin and member roles. Users need to be authenticated to access this endpoint.
 *     tags:
 *       - Borrowing
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the most borrowed books report
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     reportTitle:
 *                       type: string
 *                       example: "Top 5 Most Borrowed Books Report"
 *                     reportGeneratedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-10-01T10:30:00Z"
 *                     topBooks:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           rank:
 *                             type: integer
 *                             description: Rank of the book based on the number of borrows
 *                             example: 1
 *                           title:
 *                             type: string
 *                             description: Title of the borrowed book
 *                             example: "Harry Potter and the Chamber of Secrets"
 *                           borrowCount:
 *                             type: integer
 *                             description: Total number of times the book has been borrowed
 *                             example: 50
 *                     summary:
 *                       type: string
 *                       description: Summary of the most borrowed book
 *                       example: "The most borrowed book is 'Harry Potter and the Chamber of Secrets' with 50 borrows."
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

route.route('/most_borrow_books').get(most_borrow_books)
route.route('/active_members').get(active_members)
route.route('/book_availability').get(book_availability)
export default route;
