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
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: ID of the user who borrowed the book
 *                           example: "60b85f3b0d36c80015d4c542"
 *                         name:
 *                           type: string
 *                           description: Name of the user
 *                           example: "John Doe"
 *                     book:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: ID of the borrowed book
 *                           example: "670615775614f750b560b5ff"
 *                         title:
 *                           type: string
 *                           description: Title of the borrowed book
 *                           example: "Harry Potter and the Chamber of Secrets"
 *                         author:
 *                           type: string
 *                           description: Author of the borrowed book
 *                           example: "J.K. Rowling"
 *                 message:
 *                   type: string
 *                   example: "Borrow book successfully"
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
route.route('/borrow_return').patch(borrow_return)
route.route('/borrow_history').get(borrow_history)
route.route('/most_borrow_books').get(most_borrow_books)
route.route('/active_members').get(active_members)
route.route('/book_availability').get(book_availability)
export default route;
